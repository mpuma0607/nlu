"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface SkipTraceFormData {
  firstName?: string
  lastName?: string
  phone?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  email: string
}

async function fetchAdditionalContactInfo(url: string, apiKey: string) {
  try {
    console.log("Fetching additional contact info from:", url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "zillow-working-api.p.rapidapi.com",
      },
    })

    if (response.ok) {
      const additionalData = await response.json()
      console.log("Additional contact data:", JSON.stringify(additionalData, null, 2))
      return additionalData
    }
  } catch (error) {
    console.error("Error fetching additional contact info:", error)
  }
  return null
}

export async function skipTraceProperty(formData: SkipTraceFormData) {
  try {
    const apiKey = process.env.RAPIDAPI_ZILLOW_KEY
    const enformionKey = process.env.ENFORMION_API_KEY
    const enformionPassword = process.env.ENFORMION_PASSWORD

    if (!enformionKey || !enformionPassword) {
      return {
        success: false,
        error: "EnformionGo API credentials not configured. Please contact administrator.",
      }
    }

    // Construct EnformionGo request body
    const enformionBody: Record<string, any> = {}

    if (formData.firstName) {
      enformionBody.FirstName = formData.firstName
    }
    if (formData.lastName) {
      enformionBody.LastName = formData.lastName
    }
    if (formData.phone) {
      enformionBody.PhoneNumber = formData.phone
    }
    if (formData.street) {
      enformionBody.Address = formData.street
      enformionBody.City = formData.city
      enformionBody.State = formData.state
      enformionBody.Zip = formData.zip
    }

    const enformionUrl = "https://devapi.enformion.com/PersonSearch"

    console.log("EnformionGo request URL:", enformionUrl)
    console.log("EnformionGo request body:", JSON.stringify(enformionBody, null, 2))

    const response = await fetch(enformionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        keyname: enformionKey,
        password: enformionPassword,
      },
      body: JSON.stringify(enformionBody),
    })

    console.log("API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", response.status, errorText)
      return {
        success: false,
        error: `API request failed: ${response.status} - ${errorText}`,
      }
    }

    const skipTraceData = await response.json()
    console.log("Skip trace data received:", JSON.stringify(skipTraceData, null, 2))

    // Extract address from EnformionGo response
    let fullAddress = ""
    const additionalContactData = null

    if (skipTraceData && Array.isArray(skipTraceData) && skipTraceData.length > 0) {
      const firstResult = skipTraceData[0]

      // Extract full address from the response
      if (firstResult.addresses && firstResult.addresses.length > 0) {
        const address = firstResult.addresses[0]
        fullAddress =
          address.fullAddress ||
          `${address.streetAddress || ""} ${address.city || ""} ${address.state || ""} ${address.zip || ""}`.trim()
      }
    }

    // Generate AI summary with all available data
    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
You are a professional real estate assistant. Analyze the following property skip trace data and create a comprehensive, professional summary report.

Property Address: ${fullAddress}

Primary Skip Trace Data: ${JSON.stringify(skipTraceData, null, 2)}

Additional Contact Data: ${additionalContactData ? JSON.stringify(additionalContactData, null, 2) : "None available"}

Please create a well-structured, professional report with clear sections. For any URLs or links found in the data, include them in the CONTACT DETAILS section with clear labels.

## PROPERTY OVERVIEW
- Full Address: ${fullAddress}
- Property type and characteristics
- Any property value information
- Property details and features

## OWNER INFORMATION
- Primary owner name(s) and any associated individuals
- Mailing address (if different from property address)
- Owner demographics and background information
- Property ownership history

## CONTACT DETAILS
- Phone numbers (with type - mobile, landline, work, etc.)
- Email addresses (if available)
- Social media profiles (if found)
- Public record links and additional data sources
- **IMPORTANT: Include any URLs or links from the data here with clear descriptions**

## PROPERTY CHARACTERISTICS
- Property type, size, and features
- Estimated value and market information
- Property history and transaction records
- Neighborhood and location details

## PROFESSIONAL OUTREACH STRATEGY
- Recommended initial contact approach
- Best times and methods for outreach
- Key talking points based on property and owner data
- Follow-up sequence recommendations

## MARKET INSIGHTS
- Local market conditions
- Property investment potential
- Comparable properties in area
- Market timing considerations

Format this as a clean, professional report with clear headings and organized information.
Focus on actionable information for real estate professionals.
If specific information isn't available, clearly state "Not Available" rather than making assumptions.
For any URLs or web links found in the data, present them clearly in the CONTACT DETAILS section.
`,
    })

    // Send email with results
    try {
      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-whos-who-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            address: fullAddress,
            summary: summary,
            rawData: skipTraceData,
            additionalData: additionalContactData,
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
      data: {
        summary,
        rawData: skipTraceData,
        additionalData: additionalContactData,
        address: fullAddress,
      },
    }
  } catch (error) {
    console.error("Skip trace error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to retrieve property information",
    }
  }
}
