"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function searchPeopleData(query: string, searchType: "address" | "name" | "phone") {
  try {
    // For demo purposes, we'll return mock data
    // In production, this would scrape TruePeopleSearch.com

    const mockData = {
      people: [
        {
          name: "John Smith",
          age: "45",
          addresses: ["123 Main St, Anytown, ST 12345", "456 Oak Ave, Somewhere, ST 67890"],
          phones: ["(555) 123-4567", "(555) 987-6543"],
          emails: ["john.smith@email.com"],
          relatives: ["Jane Smith", "Michael Smith", "Sarah Johnson"],
          associates: ["Robert Wilson", "Lisa Brown"],
        },
        {
          name: "Jane Smith",
          age: "42",
          addresses: ["123 Main St, Anytown, ST 12345"],
          phones: ["(555) 234-5678"],
          emails: ["jane.smith@email.com"],
          relatives: ["John Smith", "Michael Smith"],
          associates: ["Mary Davis", "Jennifer Wilson"],
        },
      ],
      addresses: [
        {
          address: "123 Main St, Anytown, ST 12345",
          residents: ["John Smith", "Jane Smith", "Michael Smith"],
          propertyType: "Single Family Home",
          yearBuilt: "1995",
          estimatedValue: "$425,000",
        },
      ],
      phones: [
        {
          number: "(555) 123-4567",
          owner: "John Smith",
          carrier: "Verizon Wireless",
          location: "Anytown, ST",
          type: "Mobile",
        },
        {
          number: "(555) 234-5678",
          owner: "Jane Smith",
          carrier: "AT&T",
          location: "Anytown, ST",
          type: "Mobile",
        },
      ],
    }

    // Generate AI summary
    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on this people search data for "${query}" (search type: ${searchType}), provide a professional summary of the key findings. Include insights about the people found, their connections, and any notable patterns. Keep it concise but informative.

Data: ${JSON.stringify(mockData, null, 2)}`,
    })

    return {
      success: true,
      data: {
        ...mockData,
        summary,
        searchType,
        searchQuery: query,
      },
    }
  } catch (error) {
    console.error("Search error:", error)
    return {
      success: false,
      error: "Failed to search people database",
    }
  }
}

export async function generateCMA(address: string) {
  try {
    // Mock CMA data - in production this would use real estate APIs
    const mockCMA = {
      address,
      estimatedValue: "$425,000",
      pricePerSqFt: "$185",
      marketTrend: "Stable",
      summary: `Based on recent comparable sales in the area, this property at ${address} is estimated to be worth approximately $425,000. The local market shows stable pricing with moderate appreciation over the past 12 months.`,
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
