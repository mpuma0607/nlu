import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const testType = searchParams.get("type") || "basic"
    const query = searchParams.get("query") || "John Smith"

    console.log("=== Scraping Debug Test Started ===")
    console.log("Test Type:", testType)
    console.log("Query:", query)

    const results = {
      timestamp: new Date().toISOString(),
      testType,
      query,
      environmentVariables: {
        BRIGHT_DATA_PUPPETEER_ENDPOINT: process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT ? "✅ Set" : "❌ Missing",
        BRIGHT_DATA_USERNAME: process.env.BRIGHT_DATA_USERNAME ? "✅ Set" : "❌ Missing",
        BRIGHT_DATA_PASSWORD: process.env.BRIGHT_DATA_PASSWORD ? "✅ Set" : "❌ Missing",
        SCRAPERAPI_KEY: process.env.SCRAPERAPI_KEY ? "✅ Set" : "❌ Missing",
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ? "✅ Set" : "❌ Missing",
      },
      tests: [] as any[],
    }

    // Test 1: Basic fetch to TruePeopleSearch
    if (testType === "basic" || testType === "all") {
      console.log("🔍 Testing basic fetch...")
      try {
        const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"
        console.log("Fetching URL:", testUrl)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch(testUrl, {
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
        console.log("Response status:", response.status)

        const html = await response.text()
        console.log("HTML length:", html.length)

        const isBlocked = html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied")
        const hasContent = html.length > 1000

        results.tests.push({
          method: "basic-fetch",
          success: response.ok,
          status: response.status,
          htmlLength: html.length,
          blocked: isBlocked,
          hasContent: hasContent,
          preview: html.substring(0, 500),
          url: testUrl,
        })

        console.log("Basic fetch test completed successfully")
      } catch (error) {
        console.error("Basic fetch error:", error)
        results.tests.push({
          method: "basic-fetch",
          success: false,
          error: error instanceof Error ? error.message : String(error),
          errorType: error instanceof Error ? error.constructor.name : typeof error,
        })
      }
    }

    // Test 2: Bright Data endpoint test
    if (testType === "brightdata" || testType === "all") {
      console.log("🔍 Testing Bright Data...")

      if (!process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT) {
        results.tests.push({
          method: "brightdata-config",
          success: false,
          error: "BRIGHT_DATA_PUPPETEER_ENDPOINT not configured",
        })
      } else {
        try {
          const endpoint = process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT
          const username = process.env.BRIGHT_DATA_USERNAME
          const password = process.env.BRIGHT_DATA_PASSWORD

          console.log("Bright Data endpoint:", endpoint)
          console.log("Username set:", !!username)
          console.log("Password set:", !!password)

          // Test the endpoint format
          results.tests.push({
            method: "brightdata-config",
            endpoint: endpoint,
            username: username ? "✅ Set" : "❌ Missing",
            password: password ? "✅ Set" : "❌ Missing",
            endpointFormat: endpoint?.includes(":") ? "✅ Valid" : "❌ Invalid",
          })

          if (username && password) {
            // Try to connect to Bright Data
            const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"
            const cleanEndpoint = endpoint.replace(/^https?:\/\//, "")
            const apiUrl = `https://${cleanEndpoint}/v1/browser/scrape`

            console.log("Trying API URL:", apiUrl)

            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
              },
              body: JSON.stringify({
                url: testUrl,
                render: true,
                format: "html",
                country: "US",
                wait: 3000,
                timeout: 30000,
              }),
              signal: controller.signal,
            })

            clearTimeout(timeoutId)
            console.log("Bright Data response status:", response.status)

            const responseText = await response.text()
            console.log("Response text length:", responseText.length)

            let responseData
            try {
              responseData = JSON.parse(responseText)
            } catch {
              responseData = { rawResponse: responseText.substring(0, 1000) }
            }

            results.tests.push({
              method: "brightdata-api",
              success: response.ok,
              status: response.status,
              response: responseData,
              apiUrl: apiUrl,
              responseLength: responseText.length,
            })
          }
        } catch (error) {
          console.error("Bright Data test error:", error)
          results.tests.push({
            method: "brightdata-api",
            success: false,
            error: error instanceof Error ? error.message : String(error),
            errorType: error instanceof Error ? error.constructor.name : typeof error,
          })
        }
      }
    }

    // Test 3: ScraperAPI test
    if (testType === "scraperapi" || testType === "all") {
      console.log("🔍 Testing ScraperAPI...")

      if (!process.env.SCRAPERAPI_KEY) {
        results.tests.push({
          method: "scraperapi",
          success: false,
          error: "SCRAPERAPI_KEY not configured",
        })
      } else {
        try {
          const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"
          const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPERAPI_KEY}&url=${encodeURIComponent(testUrl)}&render=true`

          console.log("ScraperAPI URL:", scraperApiUrl.replace(process.env.SCRAPERAPI_KEY, "***"))

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

          const response = await fetch(scraperApiUrl, {
            signal: controller.signal,
          })

          clearTimeout(timeoutId)
          console.log("ScraperAPI response status:", response.status)

          const html = await response.text()
          console.log("ScraperAPI HTML length:", html.length)

          const isBlocked = html.includes("blocked") || html.includes("captcha")

          results.tests.push({
            method: "scraperapi",
            success: response.ok,
            status: response.status,
            htmlLength: html.length,
            blocked: isBlocked,
            preview: html.substring(0, 500),
          })
        } catch (error) {
          console.error("ScraperAPI test error:", error)
          results.tests.push({
            method: "scraperapi",
            success: false,
            error: error instanceof Error ? error.message : String(error),
            errorType: error instanceof Error ? error.constructor.name : typeof error,
          })
        }
      }
    }

    console.log("=== Debug Test Completed ===")
    console.log("Total tests run:", results.tests.length)

    return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.error("Debug endpoint error:", error)

    // Return a more detailed error response
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

// Also add POST method for testing
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("POST request body:", body)

    return NextResponse.json({
      message: "POST method works",
      receivedData: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("POST method error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
