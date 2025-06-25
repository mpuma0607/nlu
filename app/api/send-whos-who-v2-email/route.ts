import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, searchType, query, summary, results, rawData } = body

    if (!email || !searchType || !query) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Who's Who AI 2.0 - Search Results</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #4338ca, #3b82f6); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .section { margin-bottom: 30px; padding: 20px; border-left: 4px solid #3b82f6; background: #f8fafc; }
            .person-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
            .address-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
            .phone-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
            .badge { display: inline-block; background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 2px; }
            .disclaimer { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-top: 30px; }
            h1, h2, h3 { color: #1e40af; }
            .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Who's Who AI 2.0 - Search Results</h1>
            <p>Advanced People Search Results</p>
            <p><strong>Search Type:</strong> ${searchType.charAt(0).toUpperCase() + searchType.slice(1)} | <strong>Query:</strong> ${query}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="content">
            <div class="summary">
              <h2>🤖 AI Summary & Analysis</h2>
              <div style="white-space: pre-wrap;">${summary}</div>
            </div>

            ${
              results.people.length > 0
                ? `
            <div class="section">
              <h2>👥 People Found (${results.people.length})</h2>
              ${results.people
                .map(
                  (person: any) => `
                <div class="person-card">
                  <h3>${person.name} ${person.age ? `<span class="badge">${person.age} years old</span>` : ""}</h3>
                  ${
                    person.addresses.length > 0
                      ? `
                    <p><strong>Addresses:</strong></p>
                    <ul>${person.addresses.map((addr: string) => `<li>${addr}</li>`).join("")}</ul>
                  `
                      : ""
                  }
                  ${
                    person.phones.length > 0
                      ? `
                    <p><strong>Phone Numbers:</strong></p>
                    <ul>${person.phones.map((phone: string) => `<li>${phone}</li>`).join("")}</ul>
                  `
                      : ""
                  }
                  ${
                    person.relatives.length > 0
                      ? `
                    <p><strong>Relatives:</strong> ${person.relatives.map((rel: string) => `<span class="badge">${rel}</span>`).join("")}</p>
                  `
                      : ""
                  }
                </div>
              `,
                )
                .join("")}
            </div>
            `
                : ""
            }

            ${
              results.addresses.length > 0
                ? `
            <div class="section">
              <h2>🏠 Addresses Found (${results.addresses.length})</h2>
              ${results.addresses
                .map(
                  (address: any) => `
                <div class="address-card">
                  <h3>${address.address}</h3>
                  ${
                    address.residents.length > 0
                      ? `
                    <p><strong>Current Residents:</strong> ${address.residents.map((res: string) => `<span class="badge">${res}</span>`).join("")}</p>
                  `
                      : ""
                  }
                  ${
                    address.previousResidents.length > 0
                      ? `
                    <p><strong>Previous Residents:</strong> ${address.previousResidents.map((res: string) => `<span class="badge">${res}</span>`).join("")}</p>
                  `
                      : ""
                  }
                  ${address.propertyType ? `<p><strong>Property Type:</strong> ${address.propertyType}</p>` : ""}
                  ${address.yearBuilt ? `<p><strong>Year Built:</strong> ${address.yearBuilt}</p>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
            `
                : ""
            }

            ${
              results.phones.length > 0
                ? `
            <div class="section">
              <h2>📞 Phone Numbers Found (${results.phones.length})</h2>
              ${results.phones
                .map(
                  (phone: any) => `
                <div class="phone-card">
                  <h3>${phone.phone}</h3>
                  <p><strong>Owner:</strong> ${phone.owner}</p>
                  ${phone.carrier ? `<p><strong>Carrier:</strong> ${phone.carrier}</p>` : ""}
                  ${phone.location ? `<p><strong>Location:</strong> ${phone.location}</p>` : ""}
                  ${phone.type ? `<p><strong>Type:</strong> ${phone.type}</p>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
            `
                : ""
            }

            ${
              results.relatives.length > 0 || results.associates.length > 0
                ? `
            <div class="section">
              <h2>🔗 Connections Found</h2>
              ${
                results.relatives.length > 0
                  ? `
                <h3>Relatives (${results.relatives.length})</h3>
                ${results.relatives
                  .map(
                    (rel: any) => `
                  <div class="person-card">
                    <p><strong>${rel.name}</strong> ${rel.age ? `<span class="badge">${rel.age} years old</span>` : ""}</p>
                    ${rel.relationship ? `<p>Relationship: ${rel.relationship}</p>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              `
                  : ""
              }
              ${
                results.associates.length > 0
                  ? `
                <h3>Associates (${results.associates.length})</h3>
                ${results.associates
                  .map(
                    (assoc: any) => `
                  <div class="person-card">
                    <p><strong>${assoc.name}</strong></p>
                    ${assoc.connection ? `<p>Connection: ${assoc.connection}</p>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              `
                  : ""
              }
            </div>
            `
                : ""
            }

            <div class="disclaimer">
              <h3>⚖️ Legal Disclaimer</h3>
              <p>The provided data is sourced from publicly available information and should be used for informational purposes only. All Federal, State and Local laws regarding the DNC (Do Not Call) list and TCPA (Telephone Consumer Protection Act) laws should be followed at all times. Users are responsible for ensuring compliance with all applicable regulations when contacting individuals based on this information.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "Who's Who AI 2.0 <noreply@thenextlevelu.com>",
      to: [email],
      subject: `Who's Who AI 2.0 Results - ${searchType.charAt(0).toUpperCase() + searchType.slice(1)} Search: ${query}`,
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
