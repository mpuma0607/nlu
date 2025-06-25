import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("=== Debug endpoint called ===")

  try {
    // Basic response first
    const response = {
      status: "working",
      timestamp: new Date().toISOString(),
      message: "Debug endpoint is functional",
    }

    console.log("Sending basic response:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in debug endpoint:", error)

    // Return the most basic error response possible
    return new Response(
      JSON.stringify({
        error: "Debug endpoint error",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

// Add a simple POST handler too
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({
      method: "POST",
      status: "working",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "POST error",
        message: String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
