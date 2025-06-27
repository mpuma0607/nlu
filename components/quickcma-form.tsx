"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { QuickCMAResults } from "./quickcma-results"
import { MapPin, TrendingUp, DollarSign } from "lucide-react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { toast } from "sonner"
import { Save } from "lucide-react"

interface FormData {
  address: string
  propertyType: string
  bedrooms: string
  bathrooms: string
  sqft: string
  yearBuilt: string
  lotSize: string
  additionalFeatures: string
  marketConditions: string
  timeframe: string
  priceRange: string
  radius: string
}

export function QuickCMAForm() {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    propertyType: "Single Family",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    yearBuilt: "",
    lotSize: "",
    additionalFeatures: "",
    marketConditions: "Balanced",
    timeframe: "Current",
    priceRange: "",
    radius: "0.5",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { user, isLoggedIn } = useMemberSpaceUser()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.address.trim()) {
      toast.error("Please enter a property address")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/quickcma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate CMA")
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to generate CMA. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const saveToProfile = async () => {
    if (!isLoggedIn || !user) {
      toast.error("Please log in to save to your profile")
      return
    }

    if (!results) {
      toast.error("No CMA results to save")
      return
    }

    setIsSaving(true)

    try {
      const title = generateCreationTitle("quickcma-ai", formData)
      const content = `Comparative Market Analysis for ${formData.address}\n\nMarket Summary:\n- Average Price: $${results.comparableData?.summary?.averagePrice?.toLocaleString() || "N/A"}\n- Average Square Footage: ${results.comparableData?.summary?.averageSqft?.toLocaleString() || "N/A"} sq ft\n- Total Comparables: ${results.comparableData?.totalComparables || 0}\n- Price Range: $${results.comparableData?.summary?.priceRange?.min?.toLocaleString() || "N/A"} - $${results.comparableData?.summary?.priceRange?.max?.toLocaleString() || "N/A"}`

      const success = await saveUserCreation({
        userId: user.id,
        userEmail: user.email || "",
        toolType: "quickcma-ai",
        title,
        content,
        formData,
        metadata: {
          address: formData.address,
          comparableData: results.comparableData,
          analysisText: results.analysisText,
          sections: results.sections,
          generatedAt: new Date().toISOString(),
        },
      })

      if (success) {
        toast.success("CMA report saved to your profile!")
      } else {
        toast.error("Failed to save CMA report")
      }
    } catch (error) {
      console.error("Save error:", error)
      toast.error("Failed to save CMA report")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">QuickCMA AI</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Generate comprehensive Comparative Market Analysis reports instantly with AI-powered property valuation and
          market insights.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <MapPin className="h-4 w-4 mr-1" />
            Location-Based Analysis
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <DollarSign className="h-4 w-4 mr-1" />
            Market Valuation
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <TrendingUp className="h-4 w-4 mr-1" />
            Trend Analysis
          </Badge>
        </div>
      </div>

      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl text-blue-800">Property Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-base font-semibold">
                  Property Address *
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Main St, City, State ZIP"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="propertyType" className="text-base font-semibold">
                  Property Type
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Family">Single Family Home</SelectItem>
                    <SelectItem value="Condo">Condominium</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                    <SelectItem value="Land">Vacant Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bedrooms" className="text-base font-semibold">
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                  placeholder="3"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="bathrooms" className="text-base font-semibold">
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                  placeholder="2.5"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="sqft" className="text-base font-semibold">
                  Square Footage
                </Label>
                <Input
                  id="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => handleInputChange("sqft", e.target.value)}
                  placeholder="2000"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="yearBuilt" className="text-base font-semibold">
                  Year Built
                </Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                  placeholder="1995"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="lotSize" className="text-base font-semibold">
                  Lot Size (acres)
                </Label>
                <Input
                  id="lotSize"
                  type="number"
                  step="0.01"
                  value={formData.lotSize}
                  onChange={(e) => handleInputChange("lotSize", e.target.value)}
                  placeholder="0.25"
                  className="mt-2"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="additionalFeatures" className="text-base font-semibold">
                  Additional Features
                </Label>
                <Textarea
                  id="additionalFeatures"
                  value={formData.additionalFeatures}
                  onChange={(e) => handleInputChange("additionalFeatures", e.target.value)}
                  placeholder="Pool, garage, updated kitchen, hardwood floors, etc."
                  className="mt-2"
                  rows={3}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Analysis Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="marketConditions" className="text-base font-semibold">
                    Market Conditions
                  </Label>
                  <Select
                    value={formData.marketConditions}
                    onValueChange={(value) => handleInputChange("marketConditions", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hot">Hot Market</SelectItem>
                      <SelectItem value="Balanced">Balanced Market</SelectItem>
                      <SelectItem value="Cool">Cool Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeframe" className="text-base font-semibold">
                    Analysis Timeframe
                  </Label>
                  <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Current">Current Market</SelectItem>
                      <SelectItem value="3-Month">Last 3 Months</SelectItem>
                      <SelectItem value="6-Month">Last 6 Months</SelectItem>
                      <SelectItem value="1-Year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="radius" className="text-base font-semibold">
                    Search Radius (miles)
                  </Label>
                  <Select value={formData.radius} onValueChange={(value) => handleInputChange("radius", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.25">0.25 miles</SelectItem>
                      <SelectItem value="0.5">0.5 miles</SelectItem>
                      <SelectItem value="1">1 mile</SelectItem>
                      <SelectItem value="2">2 miles</SelectItem>
                      <SelectItem value="5">5 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-3">
                {isLoading ? (
                  <>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NLU%20site%20icons%20%2847%29-MsI3IOXyfpXO9n0VxbJ3qOErJcv5pO.png"
                      alt="Next Level U"
                      className="h-5 w-5 animate-spin mr-2"
                    />
                    Generating CMA Report...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Generate CMA Report
                  </>
                )}
              </Button>

              {results && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={saveToProfile}
                  disabled={isSaving || !isLoggedIn}
                  className="flex items-center gap-2 bg-transparent"
                >
                  {isSaving ? (
                    <>
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NLU%20site%20icons%20%2847%29-MsI3IOXyfpXO9n0VxbJ3qOErJcv5pO.png"
                        alt="Next Level U"
                        className="h-4 w-4 animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {isLoggedIn ? "Save to Profile" : "Login to Save"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {results && <QuickCMAResults data={results} />}
    </div>
  )
}
