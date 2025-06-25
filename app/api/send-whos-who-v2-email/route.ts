import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, results, cmaResults } = await request.json()

    if (!email || !results) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Who's Who AI 2.0 - People Search Report</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
            .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
            .person-card { background: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .badge { background: #e5e7eb; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin: 2px; }
            .summary { background: #dbeafe; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .cma-section { background: #dcfce7; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Who's Who AI 2.0 - People Search Report</h1>
              <p>Advanced People Search Results</p>
            </div>

            <div class="summary">
              <h2>AI Analysis Summary</h2>
              <p><strong>Search Type:</strong> ${results.searchType}</p>
              <p><strong>Search Query:</strong> ${results.searchQuery}</p>
              <p>${results.summary}</p>
            </div>

            <div class="section">
              <h2>People Found (${results.people.length})</h2>
              ${results.people
                .map(
                  (person: any) => `
                <div class="person-card">
                  <h3>${person.name} ${person.age ? `(Age ${person.age})` : ""}</h3>
                  
                  ${
                    person.addresses.length > 0
                      ? `
                    <p><strong>Addresses:</strong></p>
                    <ul>
                      ${person.addresses.map((addr: string) => `<li>${addr}</li>`).join("")}
                    </ul>
                  `
                      : ""
                  }
                  
                  ${
                    person.phones.length > 0
                      ? `
                    <p><strong>Phone Numbers:</strong></p>
                    <ul>
                      ${person.phones.map((phone: string) => `<li>${phone}</li>`).join("")}
                    </ul>
                  `
                      : ""
                  }
                  
                  ${
                    person.emails.length > 0
                      ? `
                    <p><strong>Email Addresses:</strong></p>
                    <ul>
                      ${person.emails.map((email: string) => `<li>${email}</li>`).join("")}
                    </ul>
                  `
                      : ""
                  }
                  
                  ${
                    person.relatives.length > 0
                      ? `
                    <p><strong>Relatives:</strong> ${person.relatives.join(", ")}</p>
                  `
                      : ""
                  }
                </div>
              `,
                )
                .join("")}
            </div>

            <div class="section">
              <h2>Addresses Found (${results.addresses.length})</h2>
              ${results.addresses
                .map(
                  (address: any) => `
                <div class="person-card">
                  <h3>${address.address}</h3>
                  ${address.propertyType ? `<p><strong>Property Type:</strong> ${address.propertyType}</p>` : ""}
                  ${address.yearBuilt ? `<p><strong>Year Built:</strong> ${address.yearBuilt}</p>` : ""}
                  ${address.estimatedValue ? `<p><strong>Estimated Value:</strong> ${address.estimatedValue}</p>` : ""}
                  <p><strong>Residents:</strong> ${address.residents.join(", ")}</p>
                </div>
              `,
                )
                .join("")}
            </div>

            <div class="section">
              <h2>Phone Numbers Found (${results.phones.length})</h2>
              ${results.phones
                .map(
                  (phone: any) => `
                <div class="person-card">
                  <h3>${phone.number}</h3>
                  <p><strong>Owner:</strong> ${phone.owner}</p>
                  ${phone.carrier ? `<p><strong>Carrier:</strong> ${phone.carrier}</p>` : ""}
                  ${phone.location ? `<p><strong>Location:</strong> ${phone.location}</p>` : ""}
                  ${phone.type ? `<p><strong>Type:</strong> ${phone.type}</p>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>

            ${
              cmaResults
                ? `
              <div class="cma-section">
                <h2>Comparative Market Analysis</h2>
                <p><strong>Property:</strong> ${cmaResults.address}</p>
                <p><strong>Estimated Value:</strong> ${cmaResults.estimatedValue}</p>
                <p><strong>Price Per Sq Ft:</strong> ${cmaResults.pricePerSqFt}</p>
                <p><strong>Market Trend:</strong> ${cmaResults.marketTrend}</p>
                <p>${cmaResults.summary}</p>
              </div>
            `
                : ""
            }

            <div class="section">
              <p><small>This report was generated by Who's Who AI 2.0. All information is provided for informational purposes only and should be verified independently. Please respect privacy and use this information responsibly.</small></p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "The Next Level U <noreply@thenextlevelu.com>",
      to: [email],
      subject: `Who's Who AI 2.0 - People Search Report for "${results.searchQuery}"`,
      html: htmlContent,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
