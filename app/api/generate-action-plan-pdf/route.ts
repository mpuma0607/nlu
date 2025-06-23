import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const { formData, plan } = await request.json()

    // Create PDF using jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Set up fonts and colors
    pdf.setFont("helvetica")

    // Header section with Vegas Gold background
    pdf.setFillColor(182, 168, 136) // Vegas Gold color (#b6a888)
    pdf.rect(0, 0, 210, 40, "F")

    // Header text
    pdf.setTextColor(255, 255, 255) // White text
    pdf.setFontSize(24)
    pdf.text("Daily Action Plan", 105, 20, { align: "center" })
    pdf.setFontSize(12)
    pdf.text(`Generated for ${formData.name} - ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" })

    // Reset text color to black
    pdf.setTextColor(0, 0, 0)

    // Prospecting focus
    pdf.setFontSize(16)
    pdf.setFont("helvetica", "bold")
    pdf.text(
      `Prospecting Focus: ${formData.prospectType === "Other" ? formData.customProspectType : formData.prospectType}`,
      20,
      50,
      { maxWidth: 170 },
    )

    // Split the plan into sections
    const sections = [
      { title: "🔍 Prospecting Focus", color: "#b6a888" },
      { title: "📱 Text Outreach Plan", color: "#b6a888" },
      { title: "📞 Phone Call Plan", color: "#b6a888" },
      { title: "📧 Email Outreach Plan", color: "#b6a888" },
      { title: "📊 Bonus Task or Follow-Up Assignment", color: "#b6a888" },
    ]

    // Find the sections in the plan
    let currentY = 60
    const planText = plan

    for (const section of sections) {
      const sectionIndex = planText.indexOf(section.title)

      if (sectionIndex !== -1) {
        // Extract the section content
        const nextSectionIndex = sections.findIndex((s) => s.title === section.title) + 1
        const nextSection = nextSectionIndex < sections.length ? sections[nextSectionIndex].title : null

        let sectionContent
        if (nextSection) {
          const nextSectionStart = planText.indexOf(nextSection)
          sectionContent =
            nextSectionStart !== -1
              ? planText.substring(sectionIndex + section.title.length, nextSectionStart).trim()
              : planText.substring(sectionIndex + section.title.length).trim()
        } else {
          sectionContent = planText.substring(sectionIndex + section.title.length).trim()
        }

        // Add section header
        pdf.setTextColor(182, 168, 136) // Vegas Gold color
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")

        // Check if we need a new page
        if (currentY > 250) {
          pdf.addPage()
          currentY = 20
        }

        pdf.text(section.title, 20, currentY)
        currentY += 8

        // Add section content
        pdf.setTextColor(0, 0, 0)
        pdf.setFontSize(11)
        pdf.setFont("helvetica", "normal")

        const splitContent = pdf.splitTextToSize(sectionContent, 170)
        pdf.text(splitContent, 20, currentY)

        currentY += splitContent.length * 6 + 10
      }
    }

    // Footer
    pdf.setFillColor(249, 250, 251)
    pdf.rect(0, 277, 210, 20, "F")

    pdf.setFontSize(8)
    pdf.setTextColor(107, 114, 128)
    pdf.text("© 2024 The Next Level U - Empowering Real Estate Professionals", 105, 283, { align: "center" })
    pdf.text("Generated with AI-powered tools designed for real estate success", 105, 288, {
      align: "center",
    })

    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"))

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Daily_Action_Plan_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
