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
    console.log("=== Hybrid TruePeopleSearch Integration ===")
    console.log("Search Type:", searchType)
    console.log("Query:", query)
    console.log("Timestamp:", new Date().toISOString())

    // Environment check with better error handling
    const envCheck = {
      brightDataEndpoint: !!process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT,
      brightDataUsername: !!process.env.BRIGHT_DATA_USERNAME,
      brightDataPassword: !!process.env.BRIGHT_DATA_PASSWORD,
      scraperApiKey: !!process.env.SCRAPERAPI_KEY,
    }

    console.log("Environment Check:", envCheck)

    let scrapedData = null
    let method = "unknown"
    const errors: string[] = []

    // Method 1: Advanced Direct Fetch (Free - Try First)
    console.log("🆓 Trying advanced direct fetch...")
    try {
      scrapedData = await scrapeWithAdvancedFetch(searchType, query)
      if (scrapedData && hasValidData(scrapedData)) {
        method = "direct-fetch"
        console.log("✅ Direct fetch successful!")
      } else {
        scrapedData = null
        console.log("❌ Direct fetch returned no valid data")
      }
    } catch (error) {
      const errorMsg = `Direct fetch: ${error instanceof Error ? error.message : String(error)}`
      errors.push(errorMsg)
      console.log("❌ Direct fetch failed:", errorMsg)
    }

    // Method 2: Bright Data Puppeteer (Paid - Backup)
    if (!scrapedData && envCheck.brightDataEndpoint && envCheck.brightDataUsername && envCheck.brightDataPassword) {
      console.log("💰 Trying Bright Data Puppeteer...")
      try {
        scrapedData = await scrapeWithBrightData(searchType, query)
        if (scrapedData && hasValidData(scrapedData)) {
          method = "bright-data-puppeteer"
          console.log("✅ Bright Data Puppeteer successful!")
        } else {
          scrapedData = null
          console.log("❌ Bright Data returned no valid data")
        }
      } catch (error) {
        const errorMsg = `Bright Data: ${error instanceof Error ? error.message : String(error)}`
        errors.push(errorMsg)
        console.log("❌ Bright Data Puppeteer failed:", errorMsg)
      }
    } else if (!envCheck.brightDataEndpoint) {
      console.log("⚠️ Bright Data not configured - skipping")
      errors.push("Bright Data: Not configured")
    }

    // Method 3: ScraperAPI (Paid - Final Backup)
    if (!scrapedData && envCheck.scraperApiKey) {
      console.log("🔄 Trying ScraperAPI...")
      try {
        scrapedData = await scrapeWithScraperAPI(searchType, query)
        if (scrapedData && hasValidData(scrapedData)) {
          method = "scraperapi"
          console.log("✅ ScraperAPI successful!")
        } else {
          scrapedData = null
          console.log("❌ ScraperAPI returned no valid data")
        }
      } catch (error) {
        const errorMsg = `ScraperAPI: ${error instanceof Error ? error.message : String(error)}`
        errors.push(errorMsg)
        console.log("❌ ScraperAPI failed:", errorMsg)
      }
    } else if (!envCheck.scraperApiKey) {
      console.log("⚠️ ScraperAPI not configured - skipping")
      errors.push("ScraperAPI: Not configured")
    }

    if (!scrapedData) {
      console.log("❌ All methods failed. Errors:", errors)
      return {
        success: false,
        error: `Unable to retrieve data from TruePeopleSearch. All scraping methods failed.\n\nErrors:\n${errors.join("\n")}\n\nPlease check the debug endpoint at /api/test-scraping-debug for more details.`,
        debug: {
          environmentCheck: envCheck,
          errors: errors,
          timestamp: new Date().toISOString(),
        },
      }
    }

    console.log(`🎯 Successfully scraped using: ${method}`)

    // Process and structure the scraped data
    const processedResults = processScrapedData(scrapedData, searchType, query)

    // Generate AI summary
    const aiSummary = await generateAISummary(processedResults, searchType, query, method)

    const finalResult: SearchResult = {
      summary: aiSummary,
      searchType: searchType,
      searchQuery: query,
      results: processedResults,
      rawData: { ...scrapedData, scrapingMethod: method },
    }

    return {
      success: true,
      data: finalResult,
    }
  } catch (error) {
    console.error("TruePeopleSearch error:", error)
    return {
      success: false,
      error: `Failed to retrieve search results: ${error instanceof Error ? error.message : String(error)}`,
      debug: {
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
    }
  }
}

// Helper function to check if scraped data has valid results
function hasValidData(scrapedData: any): boolean {
  if (!scrapedData) return false

  const hasPeople = scrapedData.people?.length > 0
  const hasAddresses = scrapedData.addresses?.length > 0
  const hasPhones = scrapedData.phones?.length > 0

  return hasPeople || hasAddresses || hasPhones
}

async function scrapeWithBrightData(searchType: string, query: string) {
  try {
    const searchUrl = buildTruePeopleSearchURL(searchType, query)
    console.log("Bright Data Puppeteer scraping URL:", searchUrl)

    const puppeteerEndpoint = process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT!
    const username = process.env.BRIGHT_DATA_USERNAME!
    const password = process.env.BRIGHT_DATA_PASSWORD!

    console.log("Using Bright Data endpoint:", puppeteerEndpoint)

    // Method 1: Try Bright Data's Scraping Browser API
    console.log("Trying Bright Data Scraping Browser API...")

    const cleanEndpoint = puppeteerEndpoint.replace(/^https?:\/\//, "")
    const apiUrl = `https://${cleanEndpoint}/v1/browser/scrape`

    console.log("API URL:", apiUrl)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
        },
        body: JSON.stringify({
          url: searchUrl,
          render: true,
          format: "html",
          country: "US",
          wait: 3000,
          timeout: 30000,
          block_resources: ["image", "stylesheet", "font", "media"],
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
          },
          session_id: `session_${Date.now()}`,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      console.log("Bright Data API response status:", response.status)

      if (response.ok) {
        const responseText = await response.text()
        console.log("Response text length:", responseText.length)

        let result
        try {
          result = JSON.parse(responseText)
        } catch {
          result = { html: responseText }
        }

        const html = result.html || result.content || result.body || responseText

        if (html && html.length > 1000) {
          console.log("Bright Data Scraping Browser API success! HTML length:", html.length)

          if (html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied")) {
            console.log("Content appears to be blocked")
            throw new Error("Content blocked even with Bright Data")
          }

          return parseRealHTMLResults(html, searchType, query)
        } else {
          console.log("HTML too short or empty:", html?.length || 0)
          throw new Error("Received empty or minimal HTML content")
        }
      } else {
        const errorText = await response.text()
        console.log("API error response:", errorText)
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }
    } finally {
      clearTimeout(timeoutId)
    }
  } catch (error) {
    console.error("Bright Data Puppeteer error:", error)
    throw error
  }
}

async function scrapeWithScraperAPI(searchType: string, query: string) {
  try {
    const searchUrl = buildTruePeopleSearchURL(searchType, query)
    console.log("ScraperAPI scraping URL:", searchUrl)

    const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPERAPI_KEY}&url=${encodeURIComponent(searchUrl)}&render=true&country_code=us&premium=true`

    console.log("Making ScraperAPI request...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetch(scraperApiUrl, {
        method: "GET",
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      console.log("ScraperAPI response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`ScraperAPI error: ${response.status} - ${errorText}`)
      }

      const html = await response.text()
      console.log("ScraperAPI HTML received, length:", html.length)

      if (html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied")) {
        throw new Error("ScraperAPI request was blocked")
      }

      if (html.length < 1000) {
        throw new Error("ScraperAPI returned minimal content")
      }

      return parseRealHTMLResults(html, searchType, query)
    } finally {
      clearTimeout(timeoutId)
    }
  } catch (error) {
    console.error("ScraperAPI error:", error)
    throw error
  }
}

async function scrapeWithAdvancedFetch(searchType: string, query: string) {
  try {
    const searchUrl = buildTruePeopleSearchURL(searchType, query)
    console.log("Advanced fetch URL:", searchUrl)

    const strategies = [
      {
        name: "Chrome Desktop",
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
          DNT: "1",
        },
      },
      {
        name: "Mobile Safari",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
        },
      },
    ]

    for (const strategy of strategies) {
      try {
        console.log(`Trying strategy: ${strategy.name}`)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

        const response = await fetch(searchUrl, {
          method: "GET",
          headers: strategy.headers,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        console.log(`${strategy.name} response status:`, response.status)

        if (!response.ok) {
          console.log(`${strategy.name} failed with status: ${response.status}`)
          continue
        }

        const html = await response.text()
        console.log(`${strategy.name} HTML length: ${html.length}`)

        if (
          html.includes("blocked") ||
          html.includes("captcha") ||
          html.includes("Access Denied") ||
          html.includes("Please enable JavaScript") ||
          html.length < 1000
        ) {
          console.log(`${strategy.name} blocked or minimal content`)
          console.log("HTML preview:", html.substring(0, 200))
          continue
        }

        const parsed = parseRealHTMLResults(html, searchType, query)
        if (parsed && hasValidData(parsed)) {
          console.log(`${strategy.name} found real data!`)
          return parsed
        } else {
          console.log(`${strategy.name} parsed but no data found`)
        }
      } catch (strategyError) {
        console.log(`${strategy.name} error:`, strategyError)
        continue
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    throw new Error("All direct fetch strategies failed")
  } catch (error) {
    console.error("Advanced fetch error:", error)
    throw error
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

  console.log("Built URL:", searchUrl)
  return searchUrl
}

function parseRealHTMLResults(html: string, searchType: string, query: string) {
  try {
    console.log("Parsing real HTML results...")
    console.log("HTML preview:", html.substring(0, 500))

    const people: any[] = []
    const addresses: any[] = []
    const phones: any[] = []

    // Enhanced parsing for TruePeopleSearch structure
    const personPatterns = [
      /<div[^>]*class="[^"]*card[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<div[^>]*class="[^"]*result[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<div[^>]*class="[^"]*person[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<div[^>]*class="[^"]*link-to-details[^"]*"[^>]*>(.*?)<\/div>/gis,
    ]

    for (const pattern of personPatterns) {
      const matches = html.match(pattern) || []
      console.log(`Pattern found ${matches.length} potential matches`)

      matches.forEach((card, index) => {
        try {
          const namePatterns = [
            /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i,
            /<div[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/div>/i,
            /<span[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/span>/i,
            /<a[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/a>/i,
            /<a[^>]*>([A-Z][a-z]+\s+[A-Z][a-z]+)<\/a>/i,
          ]

          let name = ""
          for (const namePattern of namePatterns) {
            const nameMatch = card.match(namePattern)
            if (nameMatch && nameMatch[1].trim().length > 2 && /^[A-Za-z\s]+$/.test(nameMatch[1].trim())) {
              name = nameMatch[1].trim()
              break
            }
          }

          if (name && name.length > 2) {
            console.log(`Found person: ${name}`)

            const ageMatch = card.match(/(?:age|years?\s*old)[^>]*>(\d+)/i) || card.match(/(\d{2,3})\s*years?\s*old/i)
            const age = ageMatch ? Number.parseInt(ageMatch[1]) : undefined

            const addressMatches =
              card.match(
                /\d+[^,\n]+(?:St|Ave|Rd|Dr|Ln|Blvd|Way|Ct|Pl|Circle|Drive|Street|Avenue|Road|Lane|Boulevard|Court|Place)[^,]*,\s*[^,\n]+,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?/gi,
              ) || []

            const phonePatterns = [
              /$$\d{3}$$\s*\d{3}-\d{4}/g,
              /\d{3}-\d{3}-\d{4}/g,
              /\d{3}\.\d{3}\.\d{4}/g,
              /$$\d{3}$$\s*\d{3}\s*\d{4}/g,
            ]

            let phoneMatches: string[] = []
            for (const phonePattern of phonePatterns) {
              const matches = card.match(phonePattern) || []
              phoneMatches = phoneMatches.concat(matches)
            }

            const relativesSection = card.match(
              /(?:related|relatives?|family|associates?|aka|also\s*known)[^>]*>(.*?)(?:<\/div>|<div|$)/is,
            )
            let relatives: string[] = []
            if (relativesSection) {
              const relativeMatches = relativesSection[1].match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g) || []
              relatives = relativeMatches.filter((rel) => rel !== name && rel.length > 3)
            }

            if (name && (addressMatches.length > 0 || phoneMatches.length > 0 || relatives.length > 0)) {
              people.push({
                name,
                age,
                addresses: [...new Set(addressMatches)],
                phones: [...new Set(phoneMatches.map((p) => formatPhone(p)))],
                relatives: [...new Set(relatives.slice(0, 5))],
                associates: [],
              })
            }
          }
        } catch (cardError) {
          console.error(`Error parsing card ${index}:`, cardError)
        }
      })
    }

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

export async function generateCMA(address: string) {
  try {
    console.log("Generating CMA for:", address)

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

async function generateAISummary(results: any, searchType: string, query: string, method: string) {
  try {
    const prompt = `You are a professional investigative researcher creating a comprehensive summary of people search results from TruePeopleSearch.com.

Search Type: ${searchType}
Search Query: ${query}
Data Source: Real-time scraping from TruePeopleSearch.com (Method: ${method})

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
    return `Search completed for ${searchType}: ${query}. Found ${results.people.length} people, ${results.addresses.length} addresses, and ${results.phones.length} phone numbers using ${method} method. Please review the detailed results below for comprehensive information.`
  }
}
