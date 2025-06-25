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

    // Try multiple scraping methods in order of preference
    let scrapedData = null

    // Method 1: Browserless.io (if API key available)
    if (process.env.BROWSERLESS_API_KEY) {
      console.log("Trying Browserless.io...")
      scrapedData = await scrapeWithBrowserless(searchType, query)
    }

    // Method 2: ScraperAPI (if API key available)
    if (!scrapedData && process.env.SCRAPERAPI_KEY) {
      console.log("Trying ScraperAPI...")
      scrapedData = await scrapeWithScraperAPI(searchType, query)
    }

    // Method 3: Direct fetch with advanced techniques
    if (!scrapedData) {
      console.log("Trying advanced direct fetch...")
      scrapedData = await scrapeWithAdvancedFetch(searchType, query)
    }

    if (!scrapedData || scrapedData.error) {
      return {
        success: false,
        error:
          "Unable to retrieve real data from TruePeopleSearch. The service may be temporarily blocking requests. Please try again later.",
      }
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

async function scrapeWithBrowserless(searchType: string, query: string) {
  try {
    const searchUrl = buildTruePeopleSearchURL(searchType, query)
    console.log("Browserless scraping URL:", searchUrl)

    const browserlessUrl = `https://chrome.browserless.io/content?token=${process.env.BROWSERLESS_API_KEY}`

    const response = await fetch(browserlessUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: searchUrl,
        waitFor: 2000, // Wait 2 seconds for page to load
        gotoOptions: {
          waitUntil: "networkidle2",
        },
        rejectRequestPattern: [".*\\.css", ".*\\.png", ".*\\.jpg", ".*\\.jpeg", ".*\\.gif"], // Block unnecessary resources
      }),
    })

    if (!response.ok) {
      throw new Error(`Browserless API error: ${response.status}`)
    }

    const html = await response.text()
    console.log("Browserless HTML received, length:", html.length)

    return parseRealHTMLResults(html, searchType, query)
  } catch (error) {
    console.error("Browserless error:", error)
    return null
  }
}

async function scrapeWithScraperAPI(searchType: string, query: string) {
  try {
    const searchUrl = buildTruePeopleSearchURL(searchType, query)
    console.log("ScraperAPI scraping URL:", searchUrl)

    const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPERAPI_KEY}&url=${encodeURIComponent(searchUrl)}&render=true&country_code=us`

    const response = await fetch(scraperApiUrl, {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    })

    if (!response.ok) {
      throw new Error(`ScraperAPI error: ${response.status}`)
    }

    const html = await response.text()
    console.log("ScraperAPI HTML received, length:", html.length)

    return parseRealHTMLResults(html, searchType, query)
  } catch (error) {
    console.error("ScraperAPI error:", error)
    return null
  }
}

async function scrapeWithAdvancedFetch(searchType: string, query: string) {
  try {
    const searchUrl = buildTruePeopleSearchURL(searchType, query)
    console.log("Advanced fetch URL:", searchUrl)

    // Use multiple strategies
    const strategies = [
      // Strategy 1: Standard headers
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "Cache-Control": "max-age=0",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1",
          "Upgrade-Insecure-Requests": "1",
        },
      },
      // Strategy 2: Mobile user agent
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      },
      // Strategy 3: Different browser
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      },
    ]

    for (const strategy of strategies) {
      try {
        console.log("Trying strategy with User-Agent:", strategy.headers["User-Agent"].substring(0, 50) + "...")

        const response = await fetch(searchUrl, {
          method: "GET",
          headers: strategy.headers,
        })

        if (!response.ok) {
          console.log(`Strategy failed with status: ${response.status}`)
          continue
        }

        const html = await response.text()
        console.log(`Strategy success! HTML length: ${html.length}`)

        // Check if we got blocked
        if (
          html.includes("blocked") ||
          html.includes("captcha") ||
          html.includes("Access Denied") ||
          html.length < 1000
        ) {
          console.log("Strategy blocked or minimal content")
          continue
        }

        const parsed = parseRealHTMLResults(html, searchType, query)
        if (parsed && (parsed.people.length > 0 || parsed.addresses.length > 0 || parsed.phones.length > 0)) {
          return parsed
        }
      } catch (strategyError) {
        console.log("Strategy error:", strategyError)
        continue
      }

      // Add delay between attempts
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    throw new Error("All strategies failed")
  } catch (error) {
    console.error("Advanced fetch error:", error)
    return null
  }
}

function buildTruePeopleSearchURL(searchType: string, query: string) {
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

  return searchUrl
}

function parseRealHTMLResults(html: string, searchType: string, query: string) {
  try {
    console.log("Parsing real HTML results...")

    const people: any[] = []
    const addresses: any[] = []
    const phones: any[] = []

    // Enhanced parsing for TruePeopleSearch structure

    // Method 1: Look for person cards with various class patterns
    const personPatterns = [
      /<div[^>]*class="[^"]*card[^"]*person[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<div[^>]*class="[^"]*result[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<div[^>]*class="[^"]*person[^"]*"[^>]*>(.*?)<\/div>/gis,
    ]

    for (const pattern of personPatterns) {
      const matches = html.match(pattern) || []
      console.log(`Pattern found ${matches.length} matches`)

      matches.forEach((card) => {
        try {
          // Extract name with multiple patterns
          const namePatterns = [
            /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i,
            /<div[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/div>/i,
            /<span[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/span>/i,
            /<a[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/a>/i,
          ]

          let name = ""
          for (const namePattern of namePatterns) {
            const nameMatch = card.match(namePattern)
            if (nameMatch && nameMatch[1].trim().length > 2) {
              name = nameMatch[1].trim()
              break
            }
          }

          if (name) {
            // Extract age
            const ageMatch = card.match(/(?:age|years?\s*old)[^>]*>(\d+)/i) || card.match(/(\d{2,3})\s*years?\s*old/i)
            const age = ageMatch ? Number.parseInt(ageMatch[1]) : undefined

            // Extract addresses with better patterns
            const addressMatches =
              card.match(
                /\d+[^,\n]+(?:St|Ave|Rd|Dr|Ln|Blvd|Way|Ct|Pl|Circle|Drive|Street|Avenue|Road|Lane|Boulevard|Court|Place)[^,]*,\s*[^,\n]+,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?/gi,
              ) || []

            // Extract phone numbers with multiple formats
            const phonePatterns = [
              /$$\d{3}$$\s*\d{3}-\d{4}/g,
              /\d{3}-\d{3}-\d{4}/g,
              /\d{3}\.\d{3}\.\d{4}/g,
              /$$\d{3}$$\s*\d{3}-\d{4}/g,
            ]

            let phoneMatches: string[] = []
            for (const phonePattern of phonePatterns) {
              const matches = card.match(phonePattern) || []
              phoneMatches = phoneMatches.concat(matches)
            }

            // Extract relatives
            const relativesSection = card.match(
              /(?:related|relatives?|family|associates?)[^>]*>(.*?)(?:<\/div>|<div|$)/is,
            )
            const relatives = relativesSection ? relativesSection[1].match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g) || [] : []

            people.push({
              name,
              age,
              addresses: [...new Set(addressMatches)], // Remove duplicates
              phones: [...new Set(phoneMatches.map((p) => formatPhone(p)))], // Format and dedupe
              relatives: [...new Set(relatives.slice(0, 5))], // Limit and dedupe
              associates: [],
            })
          }
        } catch (cardError) {
          console.error("Error parsing card:", cardError)
        }
      })
    }

    // Extract standalone addresses
    const addressMatches =
      html.match(
        /\d+\s+[A-Za-z\s]+(?:St|Ave|Rd|Dr|Ln|Blvd|Way|Ct|Pl|Circle|Drive|Street|Avenue|Road|Lane|Boulevard|Court|Place)[^,]*,\s*[A-Za-z\s]+,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?/gi,
      ) || []

    addressMatches.forEach((address) => {
      const cleanAddress = address.trim()
      if (!addresses.find((a) => a.address === cleanAddress)) {
        addresses.push({
          address: cleanAddress,
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
      const formattedPhone = formatPhone(phone)
      if (!phones.find((p) => p.phone === formattedPhone)) {
        phones.push({
          phone: formattedPhone,
          owner: "Information available",
          carrier: undefined,
          location: undefined,
          type: undefined,
        })
      }
    })

    console.log(`Final parsed results: ${people.length} people, ${addresses.length} addresses, ${phones.length} phones`)

    return {
      people,
      addresses,
      phones,
      pageText: html.substring(0, 5000),
      url: buildTruePeopleSearchURL(searchType, query),
      title: "TruePeopleSearch Results",
      isRealData: true,
    }
  } catch (error) {
    console.error("HTML parsing error:", error)
    throw error
  }
}

function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
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
