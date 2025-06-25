"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import puppeteer from "puppeteer"

interface SearchFormData {
  searchType: "address" | "name" | "phone"
  query: string
  email: string
}

interface SearchResult {
  summary: string
  searchType: "address" | "name" | "phone"
  searchQuery: string
  results: {
    people: PersonResult[]
    addresses: AddressResult[]
    phones: PhoneResult[]
    relatives: RelativeResult[]
    associates: AssociateResult[]
  }
  rawData: any
}

interface PersonResult {
  name: string
  age?: number
  addresses: string[]
  phones: string[]
  relatives: string[]
  associates: string[]
}

interface AddressResult {
  address: string
  residents: string[]
  previousResidents: string[]
  propertyType?: string
  yearBuilt?: number
}

interface PhoneResult {
  phone: string
  owner: string
  carrier?: string
  location?: string
  type?: string
}

interface RelativeResult {
  name: string
  relationship?: string
  age?: number
  addresses: string[]
}

interface AssociateResult {
  name: string
  connection?: string
  addresses: string[]
}

export async function searchTruePeopleSearch(formData: SearchFormData) {
  try {
    console.log("=== TruePeopleSearch Integration ===")
    console.log("Search Type:", formData.searchType)
    console.log("Query:", formData.query)

    // Scrape TruePeopleSearch.com
    const scrapedData = await scrapeTruePeopleSearch(formData.searchType, formData.query)

    if (!scrapedData || scrapedData.error) {
      return {
        success: false,
        error: scrapedData?.error || "Failed to retrieve search results from TruePeopleSearch",
      }
    }

    // Process and structure the scraped data
    const processedResults = processScrapedData(scrapedData, formData.searchType, formData.query)

    // Generate AI summary
    const aiSummary = await generateAISummary(processedResults, formData.searchType, formData.query)

    const finalResult: SearchResult = {
      summary: aiSummary,
      searchType: formData.searchType,
      searchQuery: formData.query,
      results: processedResults,
      rawData: scrapedData,
    }

    // Send email with results
    try {
      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-whos-who-v2-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            searchType: formData.searchType,
            query: formData.query,
            summary: aiSummary,
            results: processedResults,
            rawData: scrapedData,
          }),
        },
      )

      if (!emailResponse.ok) {
        console.error("Failed to send email:", await emailResponse.text())
      }
    } catch (emailError) {
      console.error("Email error:", emailError)
    }

    return {
      success: true,
      data: finalResult,
    }
  } catch (error) {
    console.error("TruePeopleSearch error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve search results",
    }
  }
}

async function scrapeTruePeopleSearch(searchType: string, query: string) {
  try {
    console.log("Fetching TruePeopleSearch data...")

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    const page = await browser.newPage()

    let searchUrl = `https://www.truepeoplesearch.com/results?`
    if (searchType === "name") {
      const [firstName, ...lastNameParts] = query.split(" ")
      const lastName = lastNameParts.join(" ")
      searchUrl += `name=${firstName}&lastname=${lastName}`
    } else if (searchType === "address") {
      searchUrl += `citystatezip=${query}`
    } else if (searchType === "phone") {
      searchUrl += `phoneno=${query}`
    } else {
      throw new Error("Invalid search type")
    }

    console.log("Navigating to:", searchUrl)
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" })

    // Wait for the search results to load. Adjust the timeout as needed.
    await page.waitForSelector(".card.people-card", { timeout: 10000 })

    const scrapedData = await page.evaluate(() => {
      const people: any[] = []
      const addresses: any[] = []
      const phones: any[] = []

      // Extract people results
      const personCards = Array.from(document.querySelectorAll(".card.people-card"))
      personCards.forEach((card) => {
        const nameElement = card.querySelector(".h4")
        const name = nameElement ? nameElement.textContent?.trim() : ""

        const ageElement = card.querySelector(".h6:nth-child(2)")
        const ageText = ageElement ? ageElement.textContent?.trim() : ""
        const age = ageText.includes("Age") ? Number.parseInt(ageText.split(" ")[1]) : undefined

        const addressElements = Array.from(card.querySelectorAll(".list-group-item a[data-label='Address']"))
        const addressesList = addressElements.map((a) => a.textContent?.trim()).filter(Boolean) as string[]

        const phoneElements = Array.from(card.querySelectorAll(".list-group-item a[data-label='Phone']"))
        const phonesList = phoneElements.map((a) => a.textContent?.trim()).filter(Boolean) as string[]

        const relativeElements = Array.from(card.querySelectorAll(".list-group-item a[data-label='Relative']"))
        const relativesList = relativeElements.map((a) => a.textContent?.trim()).filter(Boolean) as string[]

        const associateElements = Array.from(card.querySelectorAll(".list-group-item a[data-label='Associate']"))
        const associatesList = associateElements.map((a) => a.textContent?.trim()).filter(Boolean) as string[]

        people.push({
          name,
          age,
          addresses: addressesList,
          phones: phonesList,
          relatives: relativesList,
          associates: associatesList,
        })
      })

      // No direct address or phone listings on the main results page,
      // so we focus on extracting the person data.  More detailed scraping
      // would require navigating to individual result pages.

      const pageText = document.body.textContent || ""
      const url = window.location.href
      const title = document.title

      return {
        people,
        addresses,
        phones,
        pageText,
        url,
        title,
      }
    })

    await browser.close()
    console.log("TruePeopleSearch data fetched successfully.")
    return scrapedData
  } catch (error) {
    console.error("Search error:", error)
    return {
      error: `Failed to search TruePeopleSearch: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

function processScrapedData(scrapedData: any, searchType: string, query: string) {
  const results = {
    people: [] as PersonResult[],
    addresses: [] as AddressResult[],
    phones: [] as PhoneResult[],
    relatives: [] as RelativeResult[],
    associates: [] as AssociateResult[],
  }

  // Process people data
  if (scrapedData.people && Array.isArray(scrapedData.people)) {
    results.people = scrapedData.people
      .filter((person: any) => person.name && person.name.trim())
      .map((person: any) => ({
        name: person.name,
        age: person.age,
        addresses: person.addresses.filter((addr: string) => addr && addr.trim()),
        phones: person.phones.filter((phone: string) => phone && phone.trim()),
        relatives: person.relatives.filter((rel: string) => rel && rel.trim()),
        associates: person.associates.filter((assoc: string) => assoc && assoc.trim()),
      }))
  }

  // Process address data
  if (scrapedData.addresses && Array.isArray(scrapedData.addresses)) {
    results.addresses = scrapedData.addresses
      .filter((address: any) => address.address && address.address.trim())
      .map((address: any) => ({
        address: address.address,
        residents: address.residents.filter((res: string) => res && res.trim()),
        previousResidents: address.previousResidents.filter((res: string) => res && res.trim()),
        propertyType: address.propertyType,
        yearBuilt: address.yearBuilt,
      }))
  }

  // Process phone data
  if (scrapedData.phones && Array.isArray(scrapedData.phones)) {
    results.phones = scrapedData.phones
      .filter((phone: any) => phone.phone && phone.owner)
      .map((phone: any) => ({
        phone: phone.phone,
        owner: phone.owner,
        carrier: phone.carrier,
        location: phone.location,
        type: phone.type,
      }))
  }

  // Extract relatives and associates from people data
  results.people.forEach((person) => {
    person.relatives.forEach((relativeName) => {
      if (!results.relatives.find((r) => r.name === relativeName)) {
        results.relatives.push({
          name: relativeName,
          relationship: undefined,
          age: undefined,
          addresses: [],
        })
      }
    })

    person.associates.forEach((associateName) => {
      if (!results.associates.find((a) => a.name === associateName)) {
        results.associates.push({
          name: associateName,
          connection: undefined,
          addresses: [],
        })
      }
    })
  })

  return results
}

async function generateAISummary(results: any, searchType: string, query: string) {
  try {
    const prompt = `You are a professional investigative researcher creating a comprehensive summary of people search results.

Search Type: ${searchType}
Search Query: ${query}

Search Results:
- People Found: ${results.people.length}
- Addresses Found: ${results.addresses.length}
- Phone Numbers Found: ${results.phones.length}
- Relatives Found: ${results.relatives.length}
- Associates Found: ${results.associates.length}

Detailed Results:
${JSON.stringify(results, null, 2)}

Create a professional, comprehensive summary that includes:

1. **Search Overview**: What was searched and key findings
2. **Primary Results**: Main people, addresses, or phone numbers found
3. **Contact Information**: Available phone numbers and addresses
4. **Connections**: Relatives, associates, and relationships discovered
5. **Key Insights**: Important patterns, connections, or notable information
6. **Professional Recommendations**: How to use this information effectively for real estate prospecting

Format the summary in a clear, professional manner that would be suitable for a real estate professional. Focus on actionable information and maintain a respectful, professional tone throughout.

If the search was by address, emphasize property ownership and resident information.
If the search was by name, focus on contact details and address history.
If the search was by phone, highlight owner identification and associated information.`

    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return summary
  } catch (error) {
    console.error("Error generating AI summary:", error)
    return `Search completed for ${searchType}: ${query}. Found ${results.people.length} people, ${results.addresses.length} addresses, and ${results.phones.length} phone numbers. Please review the detailed results below for comprehensive information.`
  }
}
