import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testType = searchParams.get("type") || "basic"
  const query = searchParams.get("query") || "John Smith"

  console.log("=== LIVE Scraping Debug Test ===")
  console.log("Test Type:", testType)
  console.log("Query:", query)
  console.log("Environment:", process.env.VERCEL_ENV || "development")

  try {
    const results = {
      timestamp: new Date().toISOString(),
      testType,
      query,
      environment: {
        VERCEL_ENV: process.env.VERCEL_ENV || "development",
        isVercel: !!process.env.VERCEL,
        NODE_ENV: process.env.NODE_ENV,
      },
      environmentVariables: {
        BRIGHT_DATA_PUPPETEER_ENDPOINT: process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT ? "✅ Set" : "❌ Missing",
        BRIGHT_DATA_USERNAME: process.env.BRIGHT_DATA_USERNAME ? "✅ Set" : "❌ Missing",
        BRIGHT_DATA_PASSWORD: process.env.BRIGHT_DATA_PASSWORD ? "✅ Set" : "❌ Missing",
        SCRAPERAPI_KEY: process.env.SCRAPERAPI_KEY ? "✅ Set" : "❌ Missing",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ? "✅ Set" : "❌ Missing",
      },
      tests: [] as any[],
    }

    // Test 1: Basic fetch to TruePeopleSearch
    if (testType === "basic" || testType === "all") {
      console.log("🔍 Testing basic fetch to TruePeopleSearch...")
      try {
        const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000)

        const response = await fetch(testUrl, {
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

        const isBlocked = html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied")
        const hasContent = html.length > 1000
        const hasResults = html.includes("result") || html.includes("person") || html.includes("address")

        results.tests.push({
          method: "basic-fetch",
          success: response.ok,
          status: response.status,
          htmlLength: html.length,
          blocked: isBlocked,
          hasContent: hasContent,
          hasResults: hasResults,
          preview: html.substring(0, 500),
          url: testUrl,
        })

        console.log(`Basic fetch: ${response.ok ? "✅ Success" : "❌ Failed"} - HTML: ${html.length} chars`)
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

    // Test 2: Bright Data test
    if (testType === "brightdata" || testType === "all") {
      console.log("🔍 Testing Bright Data...")

      if (!process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT) {
        results.tests.push({
          method: "brightdata",
          success: false,
          error: "BRIGHT_DATA_PUPPETEER_ENDPOINT not configured",
        })
      } else {
        try {
          const endpoint = process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT
          const username = process.env.BRIGHT_DATA_USERNAME
          const password = process.env.BRIGHT_DATA_PASSWORD

          if (!username || !password) {
            results.tests.push({
              method: "brightdata",
              success: false,
              error: "Bright Data credentials incomplete",
              details: {
                endpoint: !!endpoint,
                username: !!username,
                password: !!password,
              },
            })
          } else {
            const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"
            const cleanEndpoint = endpoint.replace(/^https?:\/\//, "")
            const apiUrl = `https://${cleanEndpoint}/v1/browser/scrape`

            console.log("Bright Data API URL:", apiUrl)

            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 30000)

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
                timeout: 25000,
              }),
              signal: controller.signal,
            })

            clearTimeout(timeoutId)
            const responseText = await response.text()

            let responseData
            try {
              responseData = JSON.parse(responseText)
            } catch {
              responseData = { rawResponse: responseText.substring(0, 1000) }
            }

            const html = responseData.html || responseData.content || responseText
            const htmlLength = typeof html === "string" ? html.length : 0

            results.tests.push({
              method: "brightdata",
              success: response.ok,
              status: response.status,
              responseLength: responseText.length,
              htmlLength: htmlLength,
              hasHtml: !!html && htmlLength > 1000,
              blocked: typeof html === "string" && (html.includes("blocked") || html.includes("captcha")),
              preview: typeof html === "string" ? html.substring(0, 500) : "No HTML content",
              apiUrl: apiUrl,
            })

            console.log(`Bright Data: ${response.ok ? "✅ Success" : "❌ Failed"} - HTML: ${htmlLength} chars`)
          }
        } catch (error) {
          console.error("Bright Data error:", error)
          results.tests.push({
            method: "brightdata",
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
          const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPERAPI_KEY}&url=${encodeURIComponent(testUrl)}&render=true&country_code=us`

          console.log("ScraperAPI request (key hidden)")

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 30000)

          const response = await fetch(scraperApiUrl, {
            signal: controller.signal,
          })

          clearTimeout(timeoutId)
          const html = await response.text()

          const isBlocked = html.includes("blocked") || html.includes("captcha")
          const hasContent = html.length > 1000

          results.tests.push({
            method: "scraperapi",
            success: response.ok,
            status: response.status,
            htmlLength: html.length,
            blocked: isBlocked,
            hasContent: hasContent,
            preview: html.substring(0, 500),
          })

          console.log(`ScraperAPI: ${response.ok ? "✅ Success" : "❌ Failed"} - HTML: ${html.length} chars`)
        } catch (error) {
          console.error("ScraperAPI error:", error)
          results.tests.push({
            method: "scraperapi",
            success: false,
            error: error instanceof Error ? error.message : String(error),
            errorType: error instanceof Error ? error.constructor.name : typeof error,
          })
        }
      }
    }

    // Test 4: HTML Parsing test (if we have HTML from previous tests)
    if (testType === "parsing" || testType === "all") {
      console.log("🔍 Testing HTML parsing...")

      const successfulTest = results.tests.find((test) => test.success && test.preview && test.preview.length > 100)

      if (successfulTest) {
        try {
          const mockHtml =
            successfulTest.preview +
            `
            <div class="card">
              <h3>John Smith</h3>
              <div>Age: 45</div>
              <div>123 Main St, Anytown, FL 12345</div>
              <div>(555) 123-4567</div>
              <div>Related: Jane Smith, Bob Smith</div>
            </div>
          `

          const people = []
          const nameMatch = mockHtml.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i)
          if (nameMatch) {
            const name = nameMatch[1].trim()
            const ageMatch = mockHtml.match(/Age:\s*(\d+)/i)
            const age = ageMatch ? Number.parseInt(ageMatch[1]) : undefined

            people.push({
              name,
              age,
              addresses: ["123 Main St, Anytown, FL 12345"],
              phones: ["(555) 123-4567"],
              relatives: ["Jane Smith", "Bob Smith"],
            })
          }

          results.tests.push({
            method: "html-parsing",
            success: people.length > 0,
            peopleFound: people.length,
            sampleData: people[0] || null,
            htmlSource: successfulTest.method,
          })

          console.log(`HTML Parsing: ${people.length > 0 ? "✅ Success" : "❌ Failed"} - Found ${people.length} people`)
        } catch (error) {
          results.tests.push({
            method: "html-parsing",
            success: false,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      } else {
        results.tests.push({
          method: "html-parsing",
          success: false,
          error: "No successful HTML content to parse from previous tests",
        })
      }
    }

    console.log("=== Debug Test Completed ===")
    console.log(`Total tests: ${results.tests.length}`)
    console.log(`Successful tests: ${results.tests.filter((t) => t.success).length}`)

    return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.error("Debug endpoint error:", error)
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
