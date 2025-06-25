"use server"

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
  console.log("=== Starting People Search ===")
  console.log("Query:", query)
  console.log("Search Type:", searchType)

  try {
    // For now, let's return mock data to test the flow
    const mockResults = {
      people: [
        {
          name: "John Smith",
          age: 45,
          addresses: ["123 Main St, Anytown, FL 12345"],
          phones: ["(555) 123-4567"],
          relatives: ["Jane Smith", "Bob Smith"],
          associates: [],
        },
      ],
      addresses: [],
      phones: [],
      relatives: [
        {
          name: "Jane Smith",
          relationship: "Spouse",
          age: 42,
          addresses: ["123 Main St, Anytown, FL 12345"],
        },
      ],
      associates: [],
    }

    const summary = `Mock search completed for ${searchType}: "${query}". Found 1 person with contact information and 1 relative. This is test data to verify the system is working properly.`

    const result: SearchResult = {
      summary,
      searchType,
      searchQuery: query,
      results: mockResults,
      rawData: {
        scrapingMethod: "mock-data",
        timestamp: new Date().toISOString(),
      },
    }

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error("Search error:", error)
    return {
      success: false,
      error: `Search failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// CMA generation function
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

    // For now, just return success without actually sending
    console.log("Email would be sent with results:", {
      email,
      resultsCount: results?.results?.people?.length || 0,
      hasCMA: !!cmaResults,
    })

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
