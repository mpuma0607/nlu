import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const analysis = formData.get("analysis") as string
    const agentName = formData.get("agentName") as string
    const propertyAddress = formData.get("propertyAddress") as string
    const email = formData.get("email") as string

    if (!analysis || !agentName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Contract Analysis</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Contract Analysis for ${agentName}</h1>
        <p><strong>Property:</strong> ${propertyAddress || "Not specified"}</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
          <pre style="white-space: pre-wrap;">${analysis}</pre>
        </div>
        <p>Best regards,<br>RealDeal AI</p>
      </body>
      </html>
    `

    const info = await transporter.sendMail({
      from: `"RealDeal AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Contract Analysis - ${propertyAddress || "Property"}`,
      html: emailHtml,
    })

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
