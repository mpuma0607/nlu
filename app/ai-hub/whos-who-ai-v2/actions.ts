"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

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

// Main search function that the form expects
export async function searchPeopleData(query: string, searchType: "address" | "name" | "phone") {
  try {
    console.log("=== Real TruePeopleSearch Integration ===")
    console.log("Search Type:", searchType)
    console.log("Query:", query)

    // Use ScrapingBee API for reliable scraping
    let scrapedData = await scrapeWithScrapingBee(searchType, query)

    if (!scrapedData || scrapedData.error) {
      console.log("ScrapingBee failed, trying direct fetch...")
      // Fallback to direct fetch
      const directData = await fetchTruePeopleSearchDirect(searchType, query)
      if (!directData || directData.error) {
        return {
          success: false,
          error: "Unable to retrieve real data from TruePeopleSearch. Please try again later.",
        }
      }
      scrapedData = directData
    }

    // Process and structure the scraped data
    const processedResults = processScrapedData(scrapedData, searchType, query)

    // Generate AI summary
    const aiSummary = await generateAISummary(processedResults, searchType, query)

    const finalResult: SearchResult = {
      summary: aiSummary,
      searchType: searchType,
      searchQuery: query,
      results: processedResults,
      rawData: scrapedData,
    }

    return {
      success: true,
      data: finalResult,
    }
  } catch (error) {
    console.error("TruePeopleSearch error:", error)
    return {
      success: false,
      error: "Failed to retrieve real search results. The service may be temporarily unavailable.",
    }
  }
}

async function scrapeWithScrapingBee(searchType: string, query: string) {
  try {
    // Build TruePeopleSearch URL
    let searchUrl = "https://www.truepeoplesearch.com/results?"

    if (searchType === "name") {
      const nameParts = query.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""
      searchUrl += `name=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}`
    } else if (searchType === "address") {
      searchUrl += `citystatezip=${encodeURIComponent(query)}`
    } else if (searchType === "phone") {
      const cleanPhone = query.replace(/\D/g, "")
      searchUrl += `phoneno=${encodeURIComponent(cleanPhone)}`
    }

    console.log("Scraping URL:", searchUrl)

    // Use ScrapingBee API (you'd need to sign up and get an API key)
    const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${process.env.SCRAPINGBEE_API_KEY}&url=${encodeURIComponent(searchUrl)}&render_js=true&premium_proxy=true&country_code=us`

    const response = await fetch(scrapingBeeUrl, {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    })

    if (!response.ok) {
      throw new Error(`ScrapingBee API error: ${response.status}`)
    }

    const html = await response.text()
    console.log("HTML received from ScrapingBee, length:", html.length)

    return parseRealHTMLResults(html, searchType, query)
  } catch (error) {
    console.error("ScrapingBee error:", error)
    return { error: "ScrapingBee failed" }
  }
}

async function fetchTruePeopleSearchDirect(searchType: string, query: string) {
  try {
    console.log("Attempting direct fetch to TruePeopleSearch...")

    // Build search URL
    let searchUrl = "https://www.truepeoplesearch.com/results?"

    if (searchType === "name") {
      const nameParts = query.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""
      searchUrl += `name=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}`
    } else if (searchType === "address") {
      searchUrl += `citystatezip=${encodeURIComponent(query)}`
    } else if (searchType === "phone") {
      const cleanPhone = query.replace(/\D/g, "")
      searchUrl += `phoneno=${encodeURIComponent(cleanPhone)}`
    }

    console.log("Direct fetch URL:", searchUrl)

    // Use multiple user agents and headers to avoid blocking
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    ]

    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "User-Agent": randomUserAgent,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        DNT: "1",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    console.log("Direct fetch HTML received, length:", html.length)

    // Check if we got blocked
    if (html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied") || html.length < 1000) {
      throw new Error("Request was blocked or returned minimal content")
    }

    return parseRealHTMLResults(html, searchType, query)
  } catch (error) {
    console.error("Direct fetch error:", error)
    return { error: "Direct fetch failed" }
  }
}

function parseRealHTMLResults(html: string, searchType: string, query: string) {
  try {
    console.log("Parsing real HTML results...")

    const people: any[] = []
    const addresses: any[] = []
    const phones: any[] = []

    // More sophisticated parsing for TruePeopleSearch

    // Extract person cards (TruePeopleSearch uses specific class names)
    const personCardRegex = /<div[^>]*class="[^"]*card[^"]*"[^>]*>(.*?)<\/div>/gis
    const personMatches = html.match(personCardRegex) || []

    console.log(`Found ${personMatches.length} potential person cards`)

    personMatches.forEach((card, index) => {
      try {
        // Extract name
        const nameMatch =
          card.match(/<h4[^>]*class="[^"]*h4[^"]*"[^>]*>([^<]+)</i) ||
          card.match(/<div[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)</i) ||
          card.match(/<span[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)</i)

        if (nameMatch) {
          const name = nameMatch[1].trim()

          // Extract age
          const ageMatch = card.match(/age[^>]*>(\d+)</i) || card.match(/(\d{2,3})\s*years?\s*old/i)
          const age = ageMatch ? Number.parseInt(ageMatch[1]) : undefined

          // Extract addresses
          const addressMatches = card.match(/\d+[^,]+,\s*[^,]+,\s*[A-Z]{2}\s+\d{5}/g) || []

          // Extract phone numbers
          const phoneMatches =
            card.match(/$$\d{3}$$\s*\d{3}-\d{4}/g) || card.match(/\d{3}-\d{3}-\d{4}/g) || card.match(/\d{10}/g) || []

          // Extract relatives (look for "Related to" or similar sections)
          const relativesSection = card.match(/(?:related|relatives?|family)[^>]*>(.*?)(?:<\/div>|<div)/is)
          const relatives = relativesSection ? relativesSection[1].match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g) || [] : []

          if (name && name.length > 2) {
            people.push({
              name,
              age,
              addresses: addressMatches,
              phones: phoneMatches.map((p) => p.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")),
              relatives: relatives.slice(0, 5), // Limit to 5 relatives
              associates: [], // Associates are harder to extract reliably
            })
          }
        }
      } catch (cardError) {
        console.error(`Error parsing card ${index}:`, cardError)
      }
    })

    // Extract standalone addresses
    const addressMatches =
      html.match(
        /\d+\s+[A-Za-z\s]+(?:St|Ave|Rd|Dr|Ln|Blvd|Way|Ct|Pl|Circle|Drive|Street|Avenue|Road|Lane|Boulevard|Court|Place)[^,]*,\s*[A-Za-z\s]+,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?/g,
      ) || []

    addressMatches.forEach((address) => {
      if (!addresses.find((a) => a.address === address)) {
        addresses.push({
          address: address.trim(),
          residents: [],
          previousResidents: [],
          propertyType: undefined,
          yearBuilt: undefined,
        })
      }
    })

    // Extract standalone phone numbers
    const phoneMatches = html.match(/$$\d{3}$$\s*\d{3}-\d{4}/g) || []
    phoneMatches.forEach((phone) => {
      if (!phones.find((p) => p.phone === phone)) {
        phones.push({
          phone: phone.trim(),
          owner: "Information available",
          carrier: undefined,
          location: undefined,
          type: undefined,
        })
      }
    })

    console.log(`Parsed results: ${people.length} people, ${addresses.length} addresses, ${phones.length} phones`)

    // If we found actual data, return it
    if (people.length > 0 || addresses.length > 0 || phones.length > 0) {
      return {
        people,
        addresses,
        phones,
        pageText: html.substring(0, 5000), // More text for AI analysis
        url: `https://www.truepeoplesearch.com/results?${searchType}=${query}`,
        title: "TruePeopleSearch Results",
        isRealData: true,
      }
    } else {
      throw new Error("No data found in HTML")
    }
  } catch (error) {
    console.error("HTML parsing error:", error)
    throw error
  }
}

// CMA generation function
export async function generateCMA(address: string) {
  try {
    console.log("Generating CMA for:", address)

    // Mock CMA data - in production this would integrate with real estate APIs
    const mockCMA = {
      address,
      estimatedValue: "$" + (Math.floor(Math.random() * 500000) + 200000).toLocaleString(),
      pricePerSqFt: "$" + (Math.floor(Math.random() * 100) + 150),
      marketTrend: Math.random() > 0.5 ? "Appreciating" : "Stable",
      comparableHomes: [
        {
          address: "Similar property nearby",
          soldPrice: "$" + (Math.floor(Math.random() * 500000) + 200000).toLocaleString(),
          soldDate: "2024-01-15",
          sqft: Math.floor(Math.random() * 1000) + 1500,
        },
        {
          address: "Another comparable home",
          soldPrice: "$" + (Math.floor(Math.random() * 500000) + 200000).toLocaleString(),
          soldDate: "2024-02-20",
          sqft: Math.floor(Math.random() * 1000) + 1500,
        },
      ],
      summary: `Based on recent comparable sales in the area, this property at ${address} is estimated to be worth approximately $${(Math.floor(Math.random() * 500000) + 200000).toLocaleString()}. The local market shows ${Math.random() > 0.5 ? "stable" : "appreciating"} pricing with moderate activity over the past 12 months.`,
    }

    return {
      success: true,
      data: mockCMA,
    }
  } catch (error) {
    console.error("CMA generation error:", error)
    return {
      success: false,
      error: "Failed to generate CMA",
    }
  }
}

// Email sending function
export async function sendWhosWhoV2Email(email: string, results: any, cmaResults?: any) {
  try {
    console.log("Sending Who's Who V2 email to:", email)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-whos-who-v2-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        results,
        cmaResults,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: "Failed to send email report",
    }
  }
}

// Legacy function for backward compatibility
export async function searchTruePeopleSearch(formData: SearchFormData) {
  return await searchPeopleData(formData.query, formData.searchType)
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
    const prompt = `You are a professional investigative researcher creating a comprehensive summary of people search results from TruePeopleSearch.com.

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

IMPORTANT: Only include information that was actually found in the search results. Do not make up or assume information that is not present in the data.

Format the summary in a clear, professional manner that would be suitable for a real estate professional. Focus on actionable information and maintain a respectful, professional tone throughout.

If the search was by address, emphasize property ownership and resident information.
If the search was by name, focus on contact details and address history.
If the search was by phone, highlight owner identification and associated information.

If no results were found, clearly state that no information was available for this search query.`

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
