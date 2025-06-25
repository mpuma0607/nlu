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
  let browser
  try {
    console.log("Launching browser for TruePeopleSearch scraping...")

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    })

    const page = await browser.newPage()

    // Set user agent to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    )

    // Navigate to TruePeopleSearch
    console.log("Navigating to TruePeopleSearch...")
    await page.goto("https://www.truepeoplesearch.com", {
      waitUntil: "networkidle2",
      timeout: 30000,
    })

    // Wait for the search form to load
    await page.waitForSelector('input[name="query"]', { timeout: 10000 })

    // Enter search query
    console.log("Entering search query:", query)
    await page.type('input[name="query"]', query)

    // Submit the search
    console.log("Submitting search...")
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 }),
      page.click('button[type="submit"], input[type="submit"]'),
    ])

    // Wait for results to load
    await page.waitForTimeout(3000)

    // Extract data from the results page
    console.log("Extracting search results...")
    const results = await page.evaluate(() => {
      const data = {
        people: [],
        addresses: [],
        phones: [],
        relatives: [],
        associates: [],
      }

      // Extract people information
      const personCards = document.querySelectorAll(".card, .person-card, .result-card, [data-person]")
      personCards.forEach((card) => {
        try {
          const nameElement = card.querySelector(".name, .person-name, h3, h4, .title")
          const ageElement = card.querySelector(".age, .person-age, [data-age]")
          const addressElements = card.querySelectorAll(".address, .location, .addr")
          const phoneElements = card.querySelectorAll(".phone, .tel, [data-phone]")

          if (nameElement) {
            const person = {
              name: nameElement.textContent?.trim() || "",
              age: ageElement ? Number.parseInt(ageElement.textContent?.replace(/\D/g, "") || "0") : undefined,
              addresses: Array.from(addressElements).map((el) => el.textContent?.trim() || ""),
              phones: Array.from(phoneElements).map((el) => el.textContent?.trim() || ""),
              relatives: [],
              associates: [],
            }

            // Extract relatives
            const relativesSection = card.querySelector(".relatives, .family, .related")
            if (relativesSection) {
              const relativeLinks = relativesSection.querySelectorAll("a, .relative-name")
              person.relatives = Array.from(relativeLinks).map((el) => el.textContent?.trim() || "")
            }

            // Extract associates
            const associatesSection = card.querySelector(".associates, .connections, .known")
            if (associatesSection) {
              const associateLinks = associatesSection.querySelectorAll("a, .associate-name")
              person.associates = Array.from(associateLinks).map((el) => el.textContent?.trim() || "")
            }

            if (person.name) {
              data.people.push(person)
            }
          }
        } catch (e) {
          console.log("Error extracting person data:", e)
        }
      })

      // Extract address information
      const addressCards = document.querySelectorAll(".address-card, .property-card, [data-address]")
      addressCards.forEach((card) => {
        try {
          const addressElement = card.querySelector(".address, .property-address, .addr")
          const residentsElements = card.querySelectorAll(".resident, .current-resident, .occupant")
          const previousElements = card.querySelectorAll(".previous, .former, .past-resident")

          if (addressElement) {
            const address = {
              address: addressElement.textContent?.trim() || "",
              residents: Array.from(residentsElements).map((el) => el.textContent?.trim() || ""),
              previousResidents: Array.from(previousElements).map((el) => el.textContent?.trim() || ""),
              propertyType: undefined,
              yearBuilt: undefined,
            }

            // Try to extract property details
            const typeElement = card.querySelector(".property-type, .type")
            if (typeElement) {
              address.propertyType = typeElement.textContent?.trim()
            }

            const yearElement = card.querySelector(".year-built, .built, [data-year]")
            if (yearElement) {
              const year = Number.parseInt(yearElement.textContent?.replace(/\D/g, "") || "0")
              if (year > 1800 && year <= new Date().getFullYear()) {
                address.yearBuilt = year
              }
            }

            if (address.address) {
              data.addresses.push(address)
            }
          }
        } catch (e) {
          console.log("Error extracting address data:", e)
        }
      })

      // Extract phone information
      const phoneElements = document.querySelectorAll(".phone-result, .phone-card, [data-phone-result]")
      phoneElements.forEach((element) => {
        try {
          const phoneElement = element.querySelector(".phone, .number, .tel")
          const ownerElement = element.querySelector(".owner, .name, .person")
          const carrierElement = element.querySelector(".carrier, .provider, .network")
          const locationElement = element.querySelector(".location, .city, .area")

          if (phoneElement && ownerElement) {
            const phone = {
              phone: phoneElement.textContent?.trim() || "",
              owner: ownerElement.textContent?.trim() || "",
              carrier: carrierElement?.textContent?.trim(),
              location: locationElement?.textContent?.trim(),
              type: undefined,
            }

            // Try to determine phone type
            const typeElement = element.querySelector(".type, .line-type")
            if (typeElement) {
              phone.type = typeElement.textContent?.trim()
            }

            if (phone.phone && phone.owner) {
              data.phones.push(phone)
            }
          }
        } catch (e) {
          console.log("Error extracting phone data:", e)
        }
      })

      // Get all text content for fallback parsing
      const pageText = document.body.textContent || ""

      return {
        ...data,
        pageText: pageText.substring(0, 5000), // First 5000 chars for AI processing
        url: window.location.href,
        title: document.title,
      }
    })

    console.log("Scraped results:", {
      people: results.people.length,
      addresses: results.addresses.length,
      phones: results.phones.length,
      hasPageText: !!results.pageText,
    })

    return results
  } catch (error) {
    console.error("Scraping error:", error)
    return {
      error: `Failed to scrape TruePeopleSearch: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  } finally {
    if (browser) {
      await browser.close()
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
