import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Static mock response with no processing
  return NextResponse.json({
    analysis:
      "**📅 Key Dates & Deadlines**\n- Contract effective date: March 15, 2024\n- Inspection period deadline: March 25, 2024\n- Closing date: April 30, 2024\n\n**💰 Financial Summary**\n- Purchase price: $485,000\n- Earnest money deposit: $9,700\n\n**📝 Important Notes**\n- This is a mock analysis for testing",
    agentName: "Test Agent",
    propertyAddress: "123 Test Street, Test City, ST 12345",
    email: "test@example.com",
    contractText: "Sample contract text",
  })
}
