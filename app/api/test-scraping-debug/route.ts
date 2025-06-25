import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testType = searchParams.get("type") || "basic"
  const query = searchParams.get("query") || "John Smith"

  try {
    console.log("=== Scraping Debug Test ===")
    console.log("Test Type:", testType)
    console.log("Query:", query)

    const results = {
      timestamp: new Date().toISOString(),
      environmentVariables: {
        BRIGHT_DATA_PUPPETEER_ENDPOINT: process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT ? "✅ Set" : "❌ Missing",
        BRIGHT_DATA_USERNAME: process.env.BRIGHT_DATA_USERNAME ? "✅ Set" : "❌ Missing",
        BRIGHT_DATA_PASSWORD: process.env.BRIGHT_DATA_PASSWORD ? "✅ Set" : "❌ Missing",
        SCRAPERAPI_KEY: process.env.SCRAPERAPI_KEY ? "✅ Set" : "❌ Missing",
      },
      tests: [] as any[],
    }

    // Test 1: Basic fetch to TruePeopleSearch
    if (testType === "basic" || testType === "all") {
      console.log("🔍 Testing basic fetch...")
      try {
        const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"
        const response = await fetch(testUrl, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        })

        const html = await response.text()
        results.tests.push({
          method: "basic-fetch",
          success: response.ok,
          status: response.status,
          htmlLength: html.length,
          blocked: html.includes("blocked") || html.includes("captcha") || html.includes("Access Denied"),
          hasContent: html.length > 1000,
          preview: html.substring(0, 500),
        })
      } catch (error) {
        results.tests.push({
          method: "basic-fetch",
          success: false,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    // Test 2: Bright Data endpoint test
    if (testType === "brightdata" || testType === "all") {
      console.log("🔍 Testing Bright Data...")
      if (process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT) {
        try {
          const endpoint = process.env.BRIGHT_DATA_PUPPETEER_ENDPOINT
          const username = process.env.BRIGHT_DATA_USERNAME
          const password = process.env.BRIGHT_DATA_PASSWORD

          // Test the endpoint format
          results.tests.push({
            method: "brightdata-config",
            endpoint: endpoint,
            username: username ? "✅ Set" : "❌ Missing",
            password: password ? "✅ Set" : "❌ Missing",
            endpointFormat: endpoint?.includes(":") ? "✅ Valid" : "❌ Invalid",
          })

          // Try to connect to Bright Data
          const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"
          const apiUrl = `https://${endpoint}/v1/browser/scrape`

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
          })

          const responseText = await response.text()
          let responseData
          try {
            responseData = JSON.parse(responseText)
          } catch {
            responseData = responseText
          }

          results.tests.push({
            method: "brightdata-api",
            success: response.ok,
            status: response.status,
            response: responseData,
            apiUrl: apiUrl,
          })
        } catch (error) {
          results.tests.push({
            method: "brightdata-api",
            success: false,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      } else {
        results.tests.push({
          method: "brightdata-api",
          success: false,
          error: "BRIGHT_DATA_PUPPETEER_ENDPOINT not configured",
        })
      }
    }

    // Test 3: ScraperAPI test
    if (testType === "scraperapi" || testType === "all") {
      console.log("🔍 Testing ScraperAPI...")
      if (process.env.SCRAPERAPI_KEY) {
        try {
          const testUrl = "https://www.truepeoplesearch.com/results?name=John&lastname=Smith"
          const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPERAPI_KEY}&url=${encodeURIComponent(testUrl)}&render=true`

          const response = await fetch(scraperApiUrl)
          const html = await response.text()

          results.tests.push({
            method: "scraperapi",
            success: response.ok,
            status: response.status,
            htmlLength: html.length,
            blocked: html.includes("blocked") || html.includes("captcha"),
            preview: html.substring(0, 500),
          })
        } catch (error) {
          results.tests.push({
            method: "scraperapi",
            success: false,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      } else {
        results.tests.push({
          method: "scraperapi",
          success: false,
          error: "SCRAPERAPI_KEY not configured",
        })
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
