"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Mail, Loader2, Check, Home, DollarSign, Ruler, TrendingUp, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface QuickCMAResultsProps {
  data: {
    analysisText: string
    sections: Record<string, string[]>
    address: string
    comparableData: {
      totalComparables: number
      comparables: any[]
      summary: {
        averagePrice: number
        averageSqft: number
        priceRange: { min: number; max: number }
      }
    }
  }
}

export function QuickCMAResults({ data }: QuickCMAResultsProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [email, setEmail] = useState("")

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()

      // Add header background
      doc.setFillColor(37, 99, 235)
      doc.rect(0, 0, 210, 40, "F")

      // Add title
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(24)
      doc.text("QuickCMA Report", 20, 25)

      // Add subtitle
      doc.setFontSize(12)
      doc.text(`Comparative Market Analysis for ${data.address}`, 20, 32)

      // Reset text color for body
      doc.setTextColor(0, 0, 0)

      let yPosition = 60

      // Add analysis sections
      Object.entries(data.sections).forEach(([header, bullets]) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 30
        }

        doc.setFont("helvetica", "bold")
        doc.setFontSize(12)
        doc.text(header, 20, yPosition)
        yPosition += 10

        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)

        bullets.forEach((bullet) => {
          if (yPosition > 270) {
            doc.addPage()
            yPosition = 30
          }

          const splitText = doc.splitTextToSize(`• ${bullet}`, 170)
          doc.text(splitText, 25, yPosition)
          yPosition += splitText.length * 5 + 3
        })

        yPosition += 8
      })

      const cleanAddress = data.address.split(",")[0].replace(/[^a-zA-Z0-9]/g, "-")
      doc.save(`${cleanAddress}-CMA-Report.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!email) {
      setEmailError("Please enter your email address")
      return
    }

    setIsSendingEmail(true)
    setEmailError(null)

    try {
      const response = await fetch("/api/send-cma-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          address: data.address,
          analysisText: data.analysisText,
          comparableData: data.comparableData,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Failed to send email")
      }

      setEmailSent(true)
      setEmail("")
      toast({
        title: "Email Sent Successfully",
        description: "Check your inbox for your CMA report!",
      })
    } catch (error) {
      console.error("Email error:", error)
      setEmailError(error instanceof Error ? error.message : "Failed to send email")
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          variant="outline"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center gap-2"
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download CMA Report
            </>
          )}
        </Button>

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleSendEmail} disabled={isSendingEmail || emailSent} className="flex items-center gap-2">
            {isSendingEmail ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : emailSent ? (
              <>
                <Check className="h-4 w-4" />
                Sent
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Email Report
              </>
            )}
          </Button>
        </div>
      </div>

      {emailError && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {emailError}
        </div>
      )}

      {emailSent && (
        <div className="p-4 bg-green-50 text-green-800 rounded-md flex items-center gap-2">
          <Check className="h-4 w-4" />
          CMA report successfully sent to your email
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Home className="h-8 w-8" />
          QuickCMA Report
        </h1>
        <p className="text-blue-100 text-lg">{data.address}</p>
        <div className="flex items-center gap-4 mt-3">
          <Badge variant="secondary" className="bg-blue-500 text-white">
            {data.comparableData.totalComparables} Comparables Found
          </Badge>
          <p className="text-blue-200 text-sm">Generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Average Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ${data.comparableData.summary.averagePrice.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Range: ${data.comparableData.summary.priceRange.min.toLocaleString()} - $
              {data.comparableData.summary.priceRange.max.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Ruler className="h-5 w-5 text-blue-600" />
              Average Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {data.comparableData.summary.averageSqft.toLocaleString()} sq ft
            </p>
            <p className="text-sm text-gray-600 mt-1">
              ${Math.round(data.comparableData.summary.averagePrice / data.comparableData.summary.averageSqft || 0)}
              /sq ft
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Market Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{data.comparableData.totalComparables}</p>
            <p className="text-sm text-gray-600 mt-1">Active Comparables</p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-6">
        {Object.entries(data.sections).map(([header, bullets]) => (
          <Card key={header} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-800">{header}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1 flex-shrink-0">•</span>
                    <span className="text-gray-700 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
