"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Copy,
  Download,
  CheckCircle,
  BarChart3,
  Home,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  Square,
  Bed,
  Bath,
  Clock,
  Target,
  AlertCircle,
  FileText,
} from "lucide-react"

interface CMAResultData {
  analysisText: string
  sections: Record<string, string[]>
  address: string
  comparableData: {
    totalComparables: number
    comparables: Array<{
      id: string
      address: string
      price: number
      sqft: number
      beds: number
      baths: number
      yearBuilt: number
      daysOnMarket: number
      status: string
      distance: string
    }>
    summary: {
      averagePrice: number
      averageSqft: number
      priceRange: { min: number; max: number }
    }
  }
  rawData?: {
    error?: string
    usingRealData: boolean
  }
}

interface QuickCMAResultsProps {
  data: CMAResultData
}

export function QuickCMAResults({ data }: QuickCMAResultsProps) {
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.analysisText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const htmlContent = generateHTMLReport()
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `CMA-Report-${data.address.replace(/[^a-zA-Z0-9]/g, "-")}-${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateHTMLReport = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMA Report - ${data.address}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 40px; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #3498db; }
        .header h1 { color: #2c3e50; margin-bottom: 10px; font-size: 2.5em; }
        .header p { color: #7f8c8d; font-size: 1.2em; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0; }
        .summary-card { background: #ecf0f1; padding: 20px; border-radius: 8px; text-align: center; }
        .summary-card h3 { color: #2c3e50; margin-bottom: 10px; }
        .summary-card .value { font-size: 1.8em; font-weight: bold; color: #3498db; }
        .section { margin: 30px 0; }
        .section h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .section h3 { color: #34495e; margin-top: 25px; }
        .comparables-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .comparables-table th, .comparables-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .comparables-table th { background: #3498db; color: white; }
        .comparables-table tr:nth-child(even) { background: #f8f9fa; }
        .footer { margin-top: 50px; text-align: center; color: #7f8c8d; font-size: 0.9em; padding-top: 20px; border-top: 1px solid #ddd; }
        .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; }
        .status-sold { background: #d4edda; color: #155724; }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-active { background: #cce5ff; color: #004085; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Comparative Market Analysis</h1>
            <p><strong>Subject Property:</strong> ${data.address}</p>
            <p><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total Comparables:</strong> ${data.comparableData.totalComparables}</p>
        </div>
        
        <div class="summary-grid">
            <div class="summary-card">
                <h3>Average Price</h3>
                <div class="value">$${data.comparableData.summary.averagePrice.toLocaleString()}</div>
            </div>
            <div class="summary-card">
                <h3>Average Sq Ft</h3>
                <div class="value">${data.comparableData.summary.averageSqft.toLocaleString()}</div>
            </div>
            <div class="summary-card">
                <h3>Price Range</h3>
                <div class="value">$${data.comparableData.summary.priceRange.min.toLocaleString()} - $${data.comparableData.summary.priceRange.max.toLocaleString()}</div>
            </div>
            <div class="summary-card">
                <h3>Price per Sq Ft</h3>
                <div class="value">$${Math.round(data.comparableData.summary.averagePrice / data.comparableData.summary.averageSqft)}</div>
            </div>
        </div>

        <div class="section">
            <h2>Comparable Properties</h2>
            <table class="comparables-table">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Sq Ft</th>
                        <th>Beds/Baths</th>
                        <th>Year Built</th>
                        <th>DOM</th>
                        <th>Status</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.comparableData.comparables
                      .map(
                        (comp) => `
                        <tr>
                            <td>${comp.address}</td>
                            <td>$${comp.price.toLocaleString()}</td>
                            <td>${comp.sqft.toLocaleString()}</td>
                            <td>${comp.beds}/${comp.baths}</td>
                            <td>${comp.yearBuilt}</td>
                            <td>${comp.daysOnMarket}</td>
                            <td><span class="status-badge status-${comp.status.toLowerCase()}">${comp.status}</span></td>
                            <td>${comp.distance} mi</td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
        </div>

        ${Object.entries(data.sections)
          .map(
            ([title, content]) => `
            <div class="section">
                <h2>${title}</h2>
                ${content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
            </div>
        `,
          )
          .join("")}

        <div class="footer">
            <p>This report was generated by The Next Level U Portal - QuickCMA</p>
            <p>© ${new Date().getFullYear()} - Professional Real Estate Analysis</p>
            <p><em>This analysis is based on available market data and should be used for informational purposes only.</em></p>
        </div>
    </div>
</body>
</html>
`
  }

  const getSectionIcon = (title: string) => {
    if (title.includes("EXECUTIVE") || title.includes("SUMMARY")) return <Target className="h-5 w-5" />
    if (title.includes("MARKET") && title.includes("ANALYSIS")) return <BarChart3 className="h-5 w-5" />
    if (title.includes("COMPARABLE") || title.includes("BREAKDOWN")) return <Home className="h-5 w-5" />
    if (title.includes("PRICING")) return <DollarSign className="h-5 w-5" />
    if (title.includes("NEIGHBORHOOD")) return <MapPin className="h-5 w-5" />
    if (title.includes("MARKETING")) return <TrendingUp className="h-5 w-5" />
    if (title.includes("FORECAST")) return <Calendar className="h-5 w-5" />
    return <FileText className="h-5 w-5" />
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sold":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <BarChart3 className="h-6 w-6" />
            CMA Report Generated
          </CardTitle>
          <CardDescription className="text-green-700">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {data.address}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              {data.comparableData.totalComparables} Comparables
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>
            {data.rawData?.usingRealData && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Real Market Data
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Report
                </>
              )}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Price</p>
                <p className="text-2xl font-bold text-green-600">
                  ${data.comparableData.summary.averagePrice.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Sq Ft</p>
                <p className="text-2xl font-bold text-blue-600">
                  {data.comparableData.summary.averageSqft.toLocaleString()}
                </p>
              </div>
              <Square className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Price Range</p>
                <p className="text-lg font-bold text-purple-600">
                  ${Math.round(data.comparableData.summary.priceRange.min / 1000)}K - $
                  {Math.round(data.comparableData.summary.priceRange.max / 1000)}K
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Price per Sq Ft</p>
                <p className="text-2xl font-bold text-orange-600">
                  ${Math.round(data.comparableData.summary.averagePrice / data.comparableData.summary.averageSqft)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparable Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Comparable Properties
          </CardTitle>
          <CardDescription>Recent sales and active listings in the area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">Address</th>
                  <th className="text-left p-3 font-medium text-gray-600">Price</th>
                  <th className="text-left p-3 font-medium text-gray-600">Sq Ft</th>
                  <th className="text-left p-3 font-medium text-gray-600">Beds/Baths</th>
                  <th className="text-left p-3 font-medium text-gray-600">Year</th>
                  <th className="text-left p-3 font-medium text-gray-600">DOM</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 font-medium text-gray-600">Distance</th>
                </tr>
              </thead>
              <tbody>
                {data.comparableData.comparables.map((comp, index) => (
                  <tr key={comp.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-3 text-sm">{comp.address}</td>
                    <td className="p-3 text-sm font-medium">${comp.price.toLocaleString()}</td>
                    <td className="p-3 text-sm">{comp.sqft.toLocaleString()}</td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3 w-3" />
                        {comp.beds}
                        <Bath className="h-3 w-3 ml-2" />
                        {comp.baths}
                      </div>
                    </td>
                    <td className="p-3 text-sm">{comp.yearBuilt}</td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {comp.daysOnMarket}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(comp.status)}>{comp.status}</Badge>
                    </td>
                    <td className="p-3 text-sm">{comp.distance} mi</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Sections */}
      <div className="space-y-4">
        {Object.entries(data.sections).map(([title, content]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setActiveSection(activeSection === title ? null : title)}
              >
                {getSectionIcon(title)}
                {title}
              </CardTitle>
            </CardHeader>
            {(activeSection === title || activeSection === null) && (
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {content.map((paragraph, index) => (
                    <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Data Source Disclaimer */}
      {data.rawData && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <div className="space-y-2">
              <p className="font-medium">Data Source Information:</p>
              <p className="text-sm">
                {data.rawData.usingRealData
                  ? "This analysis includes real market data from MLS and public records."
                  : "This analysis uses simulated market data for demonstration purposes. For production use, integrate with real MLS data sources."}
              </p>
              <p className="text-xs text-amber-700">
                This CMA is for informational purposes only and should not be used as a formal appraisal or guarantee of
                property value.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
