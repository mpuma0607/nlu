"use server"

interface DebugSearchResult {
  success: boolean
  method: string
  data?: any
  error?: string
  debug: any
}

// DEBUG version of the search function
export async function debugSearchPeopleData(query: string, searchType: "address" | "name" | "phone") {
  console.log("=== DEBUG People Search ===")
  console.log("Query:", query)
  console.log("Search Type:", searchType)
  console.log("Environment:", process.env.VERCEL_ENV || "development")
  console.log("Timestamp:", new Date().toISOString())

  const debugInfo = {
    environment: {
      VERCEL_ENV: process.env.VERCEL_ENV || "development",
      NODE_ENV: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL,
    },
    environmentVariables: {
      BRIGHT_DATA_PUPPETEER_ENDPOINT: !!process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT,
      BRIGHT_DATA_USERNAME: !!process.env.BRIGHT_DATA_USERNAME,
      BRIGHT_DATA_PASSWORD: !!process.env.BRIGHT_DATA_PASSWORD,
      SCRAPERAPI_KEY: !!process.env.SCRAPERAPI_KEY,
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    },
    attempts: [] as any[],
  }

  try {
    // Since direct fetch is blocked (403), let's focus on Bright Data
    console.log("🔍 DEBUG: Skipping direct fetch (known to be blocked)")
    debugInfo.attempts.push({
      method: "direct-fetch",
      success: false,
      error: "Skipped - known to return 403",
      skipped: true,
    })

    // Method 1: Fixed Bright Data (DEBUG)
    if (debugInfo.environmentVariables.BRIGHT_DATA_PUPPETEER_ENDPOINT) {
      console.log("🔍 DEBUG: Trying FIXED Bright Data...")
      try {
        const result = await debugBrightDataFixed(searchType, query)
        debugInfo.attempts.push(result)

        if (result.success) {
          console.log("✅ DEBUG: Bright Data successful!")
          return {
            success: true,
            method: "bright-data-fixed",
            data: result.data,
            debug: debugInfo,
          }
        }
      } catch (error) {
        debugInfo.attempts.push({
          method: "bright-data-fixed",
          success: false,
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        })
        console.log("❌ DEBUG: Fixed Bright Data failed:", error)
      }
    }

    // Method 2: Alternative Bright Data approach
    if (debugInfo.environmentVariables.BRIGHT_DATA_PUPPETEER_ENDPOINT) {
      console.log("🔍 DEBUG: Trying Alternative Bright Data approach...")
      try {
        const result = await debugBrightDataAlternative(searchType, query)
        debugInfo.attempts.push(result)

        if (result.success) {
          console.log("✅ DEBUG: Alternative Bright Data successful!")
          return {
            success: true,
            method: "bright-data-alternative",
            data: result.data,
            debug: debugInfo,
          }
        }
      } catch (error) {
        debugInfo.attempts.push({
          method: "bright-data-alternative",
          success: false,
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        })
        console.log("❌ DEBUG: Alternative Bright Data failed:", error)
      }
    }

    // Method 3: Parse the 403 HTML (it might contain data despite the error)
    console.log("🔍 DEBUG: Trying to parse 403 HTML content...")
    try {
      const result = await debugParse403Content(searchType, query)
      debugInfo.attempts.push(result)

      if (result.success) {
        console.log("✅ DEBUG: 403 HTML parsing successful!")
        return {
          success: true,
          method: "parse-403-html",
          data: result.data,
          debug: debugInfo,
        }
      }
    } catch (error) {
      debugInfo.attempts.push({
        method: "parse-403-html",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      })
      console.log("❌ DEBUG: 403 HTML parsing failed:", error)
    }

    // All methods failed
    console.log("❌ DEBUG: All methods failed")
    return {
      success: false,
      method: "none",
      error: "All scraping methods failed in debug mode",
      debug: debugInfo,
    }
  } catch (error) {
    console.error("DEBUG: Fatal error:", error)
    return {
      success: false,
      method: "error",
      error: error instanceof Error ? error.message : String(error),
      debug: debugInfo,
    }
  }
}

async function debugBrightDataFixed(searchType: string, query: string) {
  const searchUrl = buildDebugURL(searchType, query)
  const endpoint = process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT!
  const username = process.env.BRIGHT_DATA_USERNAME!
  const password = process.env.BRIGHT_DATA_PASSWORD!

  console.log("DEBUG Bright Data Fixed - Endpoint:", endpoint.substring(0, 50) + "...")
  console.log("DEBUG Bright Data Fixed - URL:", searchUrl)

  // Try different API endpoint formats
  const endpointVariations = [
    // Original format
    `https://${endpoint.replace(/^https?:\/\//, "")}/v1/browser/scrape`,
    // Alternative format
    `https://${endpoint.replace(/^https?:\/\//, "").replace(/:8080$/, "")}/v1/browser/scrape`,
    // Direct API format
    `https://api.brightdata.com/request`,
    // Scraping Browser format
    `https://scraping-browser.brightdata.com/v1/scrape`,
  ]

  for (const apiUrl of endpointVariations) {
    console.log(`DEBUG: Trying endpoint variation: ${apiUrl}`)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 45000)

      const requestBody = {
        url: searchUrl,
        render: true,
        format: "html",
        country: "US",
        wait: 5000,
        timeout: 40000,
        block_resources: ["image", "stylesheet", "font", "media"],
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        session_id: `debug_session_${Date.now()}`,
      }

      console.log("DEBUG: Request body:", JSON.stringify(requestBody, null, 2))

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
          "User-Agent": "Node.js Debug Client",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      console.log(`DEBUG: Response status: ${response.status}`)
      console.log(`DEBUG: Response headers:`, Object.fromEntries(response.headers.entries()))

      const responseText = await response.text()
      console.log(`DEBUG: Response length: ${responseText.length}`)
      console.log(`DEBUG: Response preview:`, responseText.substring(0, 500))

      if (response.ok) {
        let result
        try {
          result = JSON.parse(responseText)
          console.log("DEBUG: Successfully parsed JSON response")
        } catch (parseError) {
          console.log("DEBUG: Response is not JSON, treating as HTML")
          result = { html: responseText }
        }

        const html = result.html || result.content || result.body || responseText

        if (html && typeof html === "string" && html.length > 1000) {
          console.log(`DEBUG: Got HTML content, length: ${html.length}`)

          if (html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied")) {
            console.log("DEBUG: Content appears blocked")
            continue // Try next endpoint
          }

          const parsed = debugParseHTML(html, searchType, query)

          if (parsed.people.length > 0) {
            return {
              method: "bright-data-fixed",
              success: true,
              data: parsed,
              details: {
                apiUrl,
                status: response.status,
                htmlLength: html.length,
                peopleFound: parsed.people.length,
              },
            }
          }
        } else {
          console.log("DEBUG: No valid HTML content")
        }
      } else {
        console.log(`DEBUG: HTTP error ${response.status}: ${responseText.substring(0, 200)}`)
      }
    } catch (error) {
      console.log(`DEBUG: Endpoint ${apiUrl} failed:`, error)
      continue // Try next endpoint
    }
  }

  return {
    method: "bright-data-fixed",
    success: false,
    error: "All endpoint variations failed",
    details: { endpointsTried: endpointVariations.length },
  }
}

async function debugBrightDataAlternative(searchType: string, query: string) {
  const searchUrl = buildDebugURL(searchType, query)
  const username = process.env.BRIGHT_DATA_USERNAME!
  const password = process.env.BRIGHT_DATA_PASSWORD!

  // Try using Bright Data's proxy network directly
  console.log("DEBUG: Trying Bright Data proxy network approach")

  try {
    const proxyUrl = `http://${username}:${password}@brd.superproxy.io:22225`

    // This approach uses Bright Data as a proxy rather than their API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    // Note: This is a simplified approach - in production you'd use a proper proxy client
    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const html = await response.text()

    console.log(`DEBUG Alternative: Status ${response.status}, HTML length: ${html.length}`)

    if (response.ok && html.length > 1000) {
      const parsed = debugParseHTML(html, searchType, query)

      return {
        method: "bright-data-alternative",
        success: parsed.people.length > 0,
        data: parsed,
        details: {
          status: response.status,
          htmlLength: html.length,
          peopleFound: parsed.people.length,
        },
      }
    }

    return {
      method: "bright-data-alternative",
      success: false,
      error: `HTTP ${response.status} or insufficient content`,
      details: { status: response.status, htmlLength: html.length },
    }
  } catch (error) {
    return {
      method: "bright-data-alternative",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function debugParse403Content(searchType: string, query: string) {
  console.log("DEBUG: Attempting to parse 403 content (sometimes contains data)")

  try {
    const searchUrl = buildDebugURL(searchType, query)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const html = await response.text()

    console.log(`DEBUG 403 Parse: Status ${response.status}, HTML length: ${html.length}`)

    // Even if it's a 403, the HTML might contain some data
    if (html.length > 10000) {
      // Large HTML suggests it might have content
      const parsed = debugParseHTML(html, searchType, query)

      if (parsed.people.length > 0) {
        return {
          method: "parse-403-html",
          success: true,
          data: parsed,
          details: {
            status: response.status,
            htmlLength: html.length,
            peopleFound: parsed.people.length,
            note: "Extracted data from 403 response",
          },
        }
      }
    }

    return {
      method: "parse-403-html",
      success: false,
      error: "No usable data in 403 response",
      details: { status: response.status, htmlLength: html.length },
    }
  } catch (error) {
    return {
      method: "parse-403-html",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

function buildDebugURL(searchType: string, query: string) {
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

function debugParseHTML(html: string, searchType: string, query: string) {
  console.log("DEBUG: Parsing HTML, length:", html.length)

  const people: any[] = []

  // Enhanced parsing patterns for debug
  const patterns = [
    // Look for name patterns
    /<h[1-6][^>]*>([A-Z][a-z]+\s+[A-Z][a-z]+[^<]*)<\/h[1-6]>/gi,
    /<div[^>]*class="[^"]*name[^"]*"[^>]*>([A-Z][a-z]+\s+[A-Z][a-z]+[^<]*)<\/div>/gi,
    /<span[^>]*class="[^"]*name[^"]*"[^>]*>([A-Z][a-z]+\s+[A-Z][a-z]+[^<]*)<\/span>/gi,
    /<a[^>]*>([A-Z][a-z]+\s+[A-Z][a-z]+)<\/a>/gi,
  ]

  const foundNames = new Set<string>()

  patterns.forEach((pattern) => {
    const matches = html.match(pattern) || []
    console.log(`DEBUG: Pattern found ${matches.length} matches`)

    matches.forEach((match) => {
      const nameMatch = match.match(/>([^<]+)</i)
      if (nameMatch) {
        const name = nameMatch[1].trim()
        if (name.length > 3 && /^[A-Za-z\s\-'.]+$/.test(name) && !foundNames.has(name)) {
          foundNames.add(name)

          // Try to find associated data near this name
          const nameIndex = html.indexOf(match)
          const contextStart = Math.max(0, nameIndex - 500)
          const contextEnd = Math.min(html.length, nameIndex + 1000)
          const context = html.substring(contextStart, contextEnd)

          // Look for age
          const ageMatch =
            context.match(/(?:age|years?\s*old)[^>]*>(\d+)/i) || context.match(/(\d{2,3})\s*years?\s*old/i)
          const age = ageMatch ? Number.parseInt(ageMatch[1]) : undefined

          // Look for phone numbers
          const phoneMatches = context.match(/$$\d{3}$$\s*\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4}/g) || []

          // Look for addresses
          const addressMatches =
            context.match(
              /\d+[^,\n]+(?:St|Ave|Rd|Dr|Ln|Blvd|Way|Ct|Pl|Circle|Drive|Street|Avenue|Road|Lane|Boulevard|Court|Place)[^,]*,\s*[^,\n]+,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?/gi,
            ) || []

          people.push({
            name,
            age,
            addresses: [...new Set(addressMatches)],
            phones: [...new Set(phoneMatches)],
            relatives: [],
            associates: [],
          })

          if (people.length >= 5) return // Limit for debug
        }
      }
    })
  })

  console.log(`DEBUG: Parsed ${people.length} people from HTML`)
  console.log("DEBUG: Sample people:", people.slice(0, 2))

  return {
    people,
    addresses: [],
    phones: [],
    isRealData: true,
    debugInfo: {
      htmlLength: html.length,
      patternsUsed: patterns.length,
      uniqueNames: foundNames.size,
      preview: html.substring(0, 1000),
    },
  }
}

// Simple debug email function
export async function debugSendEmail(email: string, results: any) {
  console.log("DEBUG: Would send email to:", email)
  console.log("DEBUG: Results summary:", {
    success: results.success,
    method: results.method,
    peopleFound: results.data?.people?.length || 0,
  })

  return { success: true, debug: true }
}
