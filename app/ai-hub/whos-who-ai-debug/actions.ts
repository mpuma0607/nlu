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
    // Method 1: Direct Fetch (DEBUG)
    console.log("🔍 DEBUG: Trying direct fetch...")
    try {
      const result = await debugDirectFetch(searchType, query)
      debugInfo.attempts.push(result)

      if (result.success) {
        console.log("✅ DEBUG: Direct fetch successful!")
        return {
          success: true,
          method: "direct-fetch",
          data: result.data,
          debug: debugInfo,
        }
      }
    } catch (error) {
      debugInfo.attempts.push({
        method: "direct-fetch",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      })
      console.log("❌ DEBUG: Direct fetch failed:", error)
    }

    // Method 2: Bright Data (DEBUG)
    if (debugInfo.environmentVariables.BRIGHT_DATA_PUPPETEER_ENDPOINT) {
      console.log("🔍 DEBUG: Trying Bright Data...")
      try {
        const result = await debugBrightData(searchType, query)
        debugInfo.attempts.push(result)

        if (result.success) {
          console.log("✅ DEBUG: Bright Data successful!")
          return {
            success: true,
            method: "bright-data",
            data: result.data,
            debug: debugInfo,
          }
        }
      } catch (error) {
        debugInfo.attempts.push({
          method: "bright-data",
          success: false,
          error: error instanceof Error ? error.message : String(error),
        })
        console.log("❌ DEBUG: Bright Data failed:", error)
      }
    } else {
      console.log("⚠️ DEBUG: Bright Data not configured")
      debugInfo.attempts.push({
        method: "bright-data",
        success: false,
        error: "Not configured",
      })
    }

    // Method 3: ScraperAPI (DEBUG)
    if (debugInfo.environmentVariables.SCRAPERAPI_KEY) {
      console.log("🔍 DEBUG: Trying ScraperAPI...")
      try {
        const result = await debugScraperAPI(searchType, query)
        debugInfo.attempts.push(result)

        if (result.success) {
          console.log("✅ DEBUG: ScraperAPI successful!")
          return {
            success: true,
            method: "scraperapi",
            data: result.data,
            debug: debugInfo,
          }
        }
      } catch (error) {
        debugInfo.attempts.push({
          method: "scraperapi",
          success: false,
          error: error instanceof Error ? error.message : String(error),
        })
        console.log("❌ DEBUG: ScraperAPI failed:", error)
      }
    } else {
      console.log("⚠️ DEBUG: ScraperAPI not configured")
      debugInfo.attempts.push({
        method: "scraperapi",
        success: false,
        error: "Not configured",
      })
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

async function debugDirectFetch(searchType: string, query: string) {
  const searchUrl = buildDebugURL(searchType, query)
  console.log("DEBUG Direct Fetch URL:", searchUrl)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const html = await response.text()

    console.log(`DEBUG Direct Fetch: Status ${response.status}, HTML length: ${html.length}`)

    if (!response.ok) {
      return {
        method: "direct-fetch",
        success: false,
        error: `HTTP ${response.status}`,
        details: { status: response.status, htmlLength: html.length },
      }
    }

    if (html.length < 1000) {
      return {
        method: "direct-fetch",
        success: false,
        error: "Minimal content received",
        details: { htmlLength: html.length, preview: html.substring(0, 200) },
      }
    }

    if (html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied")) {
      return {
        method: "direct-fetch",
        success: false,
        error: "Content blocked",
        details: { htmlLength: html.length, preview: html.substring(0, 200) },
      }
    }

    // Try to parse some basic data
    const parsed = debugParseHTML(html, searchType, query)

    return {
      method: "direct-fetch",
      success: parsed.people.length > 0,
      data: parsed,
      details: {
        status: response.status,
        htmlLength: html.length,
        peopleFound: parsed.people.length,
      },
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

async function debugBrightData(searchType: string, query: string) {
  const searchUrl = buildDebugURL(searchType, query)
  const endpoint = process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT!
  const username = process.env.BRIGHT_DATA_USERNAME!
  const password = process.env.BRIGHT_DATA_PASSWORD!

  const cleanEndpoint = endpoint.replace(/^https?:\/\//, "")
  const apiUrl = `https://${cleanEndpoint}/v1/browser/scrape`

  console.log("DEBUG Bright Data URL:", apiUrl)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

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
        timeout: 25000,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const responseText = await response.text()

    console.log(`DEBUG Bright Data: Status ${response.status}, Response length: ${responseText.length}`)

    if (!response.ok) {
      return {
        method: "bright-data",
        success: false,
        error: `HTTP ${response.status}`,
        details: {
          status: response.status,
          responseLength: responseText.length,
          preview: responseText.substring(0, 500),
        },
      }
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch {
      result = { html: responseText }
    }

    const html = result.html || result.content || result.body || responseText

    if (!html || html.length < 1000) {
      return {
        method: "bright-data",
        success: false,
        error: "No HTML content received",
        details: { responseLength: responseText.length, hasHtml: !!html },
      }
    }

    const parsed = debugParseHTML(html, searchType, query)

    return {
      method: "bright-data",
      success: parsed.people.length > 0,
      data: parsed,
      details: {
        status: response.status,
        htmlLength: html.length,
        peopleFound: parsed.people.length,
      },
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

async function debugScraperAPI(searchType: string, query: string) {
  const searchUrl = buildDebugURL(searchType, query)
  const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPERAPI_KEY}&url=${encodeURIComponent(searchUrl)}&render=true&country_code=us`

  console.log("DEBUG ScraperAPI request")

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch(scraperApiUrl, {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const html = await response.text()

    console.log(`DEBUG ScraperAPI: Status ${response.status}, HTML length: ${html.length}`)

    if (!response.ok) {
      return {
        method: "scraperapi",
        success: false,
        error: `HTTP ${response.status}`,
        details: { status: response.status, htmlLength: html.length },
      }
    }

    if (html.length < 1000) {
      return {
        method: "scraperapi",
        success: false,
        error: "Minimal content received",
        details: { htmlLength: html.length, preview: html.substring(0, 200) },
      }
    }

    if (html.includes("blocked") || html.includes("captcha")) {
      return {
        method: "scraperapi",
        success: false,
        error: "Content blocked",
        details: { htmlLength: html.length, preview: html.substring(0, 200) },
      }
    }

    const parsed = debugParseHTML(html, searchType, query)

    return {
      method: "scraperapi",
      success: parsed.people.length > 0,
      data: parsed,
      details: {
        status: response.status,
        htmlLength: html.length,
        peopleFound: parsed.people.length,
      },
    }
  } finally {
    clearTimeout(timeoutId)
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

  // Simple parsing for debug
  const nameMatches = html.match(/<h[1-6][^>]*>([A-Z][a-z]+\s+[A-Z][a-z]+)<\/h[1-6]>/gi) || []

  nameMatches.forEach((match, index) => {
    const nameMatch = match.match(/>([^<]+)</i)
    if (nameMatch && index < 3) {
      // Limit to first 3 for debug
      const name = nameMatch[1].trim()
      if (name.length > 3 && /^[A-Za-z\s]+$/.test(name)) {
        people.push({
          name,
          age: undefined,
          addresses: [],
          phones: [],
          relatives: [],
          associates: [],
        })
      }
    }
  })

  console.log(`DEBUG: Parsed ${people.length} people from HTML`)

  return {
    people,
    addresses: [],
    phones: [],
    isRealData: true,
    debugInfo: {
      htmlLength: html.length,
      nameMatches: nameMatches.length,
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
