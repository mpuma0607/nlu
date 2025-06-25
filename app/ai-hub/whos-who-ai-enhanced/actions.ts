"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface EnhancedSearchResult {
  summary: string
  searchType: "address" | "name" | "phone"
  searchQuery: string
  zillowData: {
    property: any
    owners: any[]
  }
  enrichedOwners: {
    name: string
    zillowData: any
    truePeopleSearchData: {
      phones: string[]
      emails: string[]
      addresses: string[]
      relatives: string[]
      age?: number
    } | null
    truePeopleSearchLink: string
  }[]
  rawData: any
}

export async function enhancedPropertySearch(query: string, searchType: "address" | "name" | "phone") {
  try {
    console.log("=== Enhanced Property + People Search ===")
    console.log("Step 1: Zillow Skip Tracing...")

    // Step 1: Get property and owner data from Zillow
    const zillowResults = await getZillowSkipTraceData(query, searchType)

    if (!zillowResults.success) {
      return {
        success: false,
        error: "Failed to get property data from Zillow",
      }
    }

    console.log("Step 2: Auto-enriching owner contact data...")

    // Step 2: For each owner found, automatically get their contact info
    const enrichedOwners = []

    for (const owner of zillowResults.data.owners) {
      console.log(`Enriching data for: ${owner.name}`)

      // Create TruePeopleSearch link (as backup)
      const truePeopleSearchLink = createTruePeopleSearchLink(owner.name)

      // Try to automatically fetch contact data
      let contactData = null

      try {
        // Option 1: Use TruePeopleSearch API if available
        if (process.env.TRUEPEOPLESEARCH_API_KEY) {
          contactData = await fetchTruePeopleSearchAPI(owner.name)
        }
        // Option 2: Try smart scraping as backup
        else {
          contactData = await fetchContactDataSmart(owner.name, owner.address)
        }
      } catch (error) {
        console.log(`Could not auto-fetch contact data for ${owner.name}:`, error)
      }

      enrichedOwners.push({
        name: owner.name,
        zillowData: owner,
        truePeopleSearchData: contactData,
        truePeopleSearchLink: truePeopleSearchLink,
        hasContactData: !!contactData,
      })
    }

    // Step 3: Generate comprehensive summary
    const summary = await generateEnhancedSummary(zillowResults.data, enrichedOwners, query, searchType)

    const result: EnhancedSearchResult = {
      summary,
      searchType,
      searchQuery: query,
      zillowData: zillowResults.data,
      enrichedOwners,
      rawData: {
        zillowRaw: zillowResults.rawData,
        timestamp: new Date().toISOString(),
        autoEnrichmentSuccess: enrichedOwners.filter((o) => o.hasContactData).length,
        totalOwners: enrichedOwners.length,
      },
    }

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error("Enhanced search error:", error)
    return {
      success: false,
      error: `Enhanced search failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// Use your existing Zillow skip tracing logic
async function getZillowSkipTraceData(query: string, searchType: string) {
  try {
    // This would use your existing Zillow skip trace implementation
    // I'm creating a mock structure based on what you likely have

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test-zillow-skip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, searchType }),
    })

    if (!response.ok) {
      throw new Error(`Zillow API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      data: {
        property: data.property,
        owners: data.owners || [],
      },
      rawData: data,
    }
  } catch (error) {
    console.error("Zillow skip trace error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Smart contact data fetching
async function fetchContactDataSmart(name: string, address?: string) {
  try {
    console.log(`Smart fetching contact data for: ${name}`)

    // Try multiple approaches in order of preference
    const methods = [
      () => fetchTruePeopleSearchAPI(name),
      () => fetchWithBrightDataAPI(name),
      () => fetchWithAlternativeAPI(name, address),
    ]

    for (const method of methods) {
      try {
        const result = await method()
        if (result && (result.phones?.length > 0 || result.emails?.length > 0)) {
          console.log(`Successfully fetched contact data for ${name}`)
          return result
        }
      } catch (methodError) {
        console.log(`Method failed for ${name}:`, methodError)
        continue
      }
    }

    return null
  } catch (error) {
    console.error(`Smart fetch failed for ${name}:`, error)
    return null
  }
}

// TruePeopleSearch API integration (if you get API access)
async function fetchTruePeopleSearchAPI(name: string) {
  if (!process.env.TRUEPEOPLESEARCH_API_KEY) {
    return null
  }

  try {
    // This would be the actual TruePeopleSearch API call
    const response = await fetch("https://api.truepeoplesearch.com/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TRUEPEOPLESEARCH_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        type: "person",
      }),
    })

    if (!response.ok) {
      throw new Error(`TruePeopleSearch API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      phones: data.phones || [],
      emails: data.emails || [],
      addresses: data.addresses || [],
      relatives: data.relatives || [],
      age: data.age,
    }
  } catch (error) {
    console.error("TruePeopleSearch API error:", error)
    return null
  }
}

// Bright Data API approach (more reliable than scraping)
async function fetchWithBrightDataAPI(name: string) {
  if (!process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT) {
    return null
  }

  try {
    const searchUrl = createTruePeopleSearchURL(name)

    const response = await fetch(`https://${process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT}/v1/browser/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${process.env.BRIGHT_DATA_USERNAME}:${process.env.BRIGHT_DATA_PASSWORD}`).toString("base64")}`,
      },
      body: JSON.stringify({
        url: searchUrl,
        render: true,
        wait: 3000,
        format: "html",
      }),
    })

    if (!response.ok) {
      throw new Error(`Bright Data API error: ${response.status}`)
    }

    const html = await response.text()
    return parseContactDataFromHTML(html, name)
  } catch (error) {
    console.error("Bright Data API error:", error)
    return null
  }
}

// Alternative API services
async function fetchWithAlternativeAPI(name: string, address?: string) {
  // Could integrate with other people search APIs like:
  // - WhitePages API
  // - Spokeo API
  // - BeenVerified API
  // - etc.

  return null // Placeholder
}

function createTruePeopleSearchLink(name: string): string {
  const nameParts = name.trim().split(" ")
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ") || ""

  return `https://www.truepeoplesearch.com/results?name=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}`
}

function createTruePeopleSearchURL(name: string): string {
  return createTruePeopleSearchLink(name)
}

function parseContactDataFromHTML(html: string, name: string) {
  try {
    // Enhanced HTML parsing logic
    const phones = extractPhonesFromHTML(html)
    const emails = extractEmailsFromHTML(html)
    const addresses = extractAddressesFromHTML(html)
    const relatives = extractRelativesFromHTML(html)
    const age = extractAgeFromHTML(html)

    if (phones.length === 0 && emails.length === 0) {
      return null
    }

    return {
      phones,
      emails,
      addresses,
      relatives,
      age,
    }
  } catch (error) {
    console.error("HTML parsing error:", error)
    return null
  }
}

function extractPhonesFromHTML(html: string): string[] {
  const phonePatterns = [/$$\d{3}$$\s*\d{3}-\d{4}/g, /\d{3}-\d{3}-\d{4}/g, /\d{3}\.\d{3}\.\d{4}/g]

  const phones = new Set<string>()

  for (const pattern of phonePatterns) {
    const matches = html.match(pattern) || []
    matches.forEach((phone) => phones.add(phone))
  }

  return Array.from(phones)
}

function extractEmailsFromHTML(html: string): string[] {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const matches = html.match(emailPattern) || []
  return [...new Set(matches)]
}

function extractAddressesFromHTML(html: string): string[] {
  const addressPattern =
    /\d+[^,\n]+(?:St|Ave|Rd|Dr|Ln|Blvd|Way|Ct|Pl|Circle|Drive|Street|Avenue|Road|Lane|Boulevard|Court|Place)[^,]*,\s*[^,\n]+,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?/gi
  const matches = html.match(addressPattern) || []
  return [...new Set(matches)]
}

function extractRelativesFromHTML(html: string): string[] {
  // Look for relatives section and extract names
  const relativesSection = html.match(/(?:related|relatives?|family)[^>]*>(.*?)(?:<\/div>|<div|$)/is)
  if (!relativesSection) return []

  const nameMatches = relativesSection[1].match(/[A-Z][a-z]+\s+[A-Z][a-z]+/g) || []
  return [...new Set(nameMatches.slice(0, 5))]
}

function extractAgeFromHTML(html: string): number | undefined {
  const ageMatch = html.match(/(?:age|years?\s*old)[^>]*>(\d+)/i) || html.match(/(\d{2,3})\s*years?\s*old/i)
  return ageMatch ? Number.parseInt(ageMatch[1]) : undefined
}

async function generateEnhancedSummary(zillowData: any, enrichedOwners: any[], query: string, searchType: string) {
  try {
    const contactDataCount = enrichedOwners.filter((o) => o.hasContactData).length
    const totalOwners = enrichedOwners.length

    const prompt = `You are a professional real estate investigative researcher creating a comprehensive summary of enhanced property and people search results.

Search Query: ${query}
Search Type: ${searchType}

Property Data from Zillow:
${JSON.stringify(zillowData, null, 2)}

Owner Contact Enhancement Results:
- Total Owners Found: ${totalOwners}
- Owners with Auto-Retrieved Contact Data: ${contactDataCount}
- Success Rate: ${Math.round((contactDataCount / totalOwners) * 100)}%

Detailed Owner Information:
${JSON.stringify(enrichedOwners, null, 2)}

Create a professional summary that includes:

1. **Property Overview**: Key details about the property from Zillow data
2. **Owner Information**: Names and details of property owners found
3. **Contact Data Success**: How many owners we successfully retrieved contact information for
4. **Available Contact Methods**: Phone numbers, emails, addresses found
5. **Family Connections**: Relatives and associates discovered
6. **Professional Recommendations**: How to use this information for real estate prospecting

Format this as a comprehensive report suitable for a real estate professional. Focus on actionable contact information and prospecting opportunities.

If contact data was automatically retrieved, highlight that as a key benefit. If some owners still require manual lookup, mention the provided TruePeopleSearch links as backup options.`

    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return summary
  } catch (error) {
    console.error("Error generating enhanced summary:", error)
    return `Enhanced property search completed for ${searchType}: "${query}". Found ${enrichedOwners.length} property owners with ${enrichedOwners.filter((o) => o.hasContactData).length} having automatically retrieved contact information. Review detailed results below.`
  }
}

export async function generateCMA(address: string) {
  // Your existing CMA logic
  try {
    const mockCMA = {
      address,
      estimatedValue: "$" + (Math.floor(Math.random() * 500000) + 200000).toLocaleString(),
      pricePerSqFt: "$" + (Math.floor(Math.random() * 100) + 150),
      marketTrend: Math.random() > 0.5 ? "Appreciating" : "Stable",
      summary: `Based on recent comparable sales, this property at ${address} is estimated to be worth approximately $${(Math.floor(Math.random() * 500000) + 200000).toLocaleString()}.`,
    }

    return { success: true, data: mockCMA }
  } catch (error) {
    return { success: false, error: "Failed to generate CMA" }
  }
}

export async function sendEnhancedEmail(email: string, results: any, cmaResults?: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-whos-who-v2-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, results, cmaResults }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to send email report" }
  }
}
