"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Loader2, Mail, Save } from "lucide-react"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"

interface ListingFormData {
  address: string
  price: string
  bedrooms: string
  bathrooms: string
  squareFootage: string
  propertyType: string
  yearBuilt: string
  lotSize: string
  features: string
  neighborhood: string
  schools: string
  additionalInfo: string
}

export default function ListingForm() {
  const [formData, setFormData] = useState<ListingFormData>({
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    propertyType: "",
    yearBuilt: "",
    lotSize: "",
    features: "",
    neighborhood: "",
    schools: "",
    additionalInfo: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useMemberSpaceUser()

  const handleInputChange = (field: keyof ListingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult("")

    try {
      const response = await fetch("/api/generate-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data.description)

      toast({
        title: "Success!",
        description: "Listing description generated successfully.",
      })
    } catch (error: any) {
      console.error("Error generating listing:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to generate listing description.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      toast({
        title: "Copied!",
        description: "Listing description copied to clipboard.",
      })
    }
  }

  const downloadPDF = async () => {
    if (result) {
      try {
        const response = await fetch("/api/generate-listing-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: result,
            propertyDetails: formData,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "listing-description.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: "Downloaded!",
          description: "PDF downloaded successfully.",
        })
      } catch (error: any) {
        console.error("Error downloading PDF:", error)
        toast({
          title: "Error",
          description: "Failed to download PDF.",
          variant: "destructive",
        })
      }
    }
  }

  const sendEmail = async () => {
    if (result) {
      setIsEmailLoading(true)
      try {
        const response = await fetch("/api/send-listing-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: result,
            propertyDetails: formData,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        toast({
          title: "Email Sent!",
          description: "Listing description sent to your email.",
        })
      } catch (error: any) {
        console.error("Error sending email:", error)
        toast({
          title: "Error",
          description: "Failed to send email.",
          variant: "destructive",
        })
      } finally {
        setIsEmailLoading(false)
      }
    }
  }

  const saveToDashboard = async () => {
    if (result && user?.email) {
      setIsSaving(true)
      try {
        const success = await saveUserCreation({
          userId: user.id || user.email,
          userEmail: user.email,
          toolType: "listit-ai",
          title: generateCreationTitle("listit-ai", formData),
          content: result,
          formData: formData,
          metadata: {
            address: formData.address,
            price: formData.price,
            propertyType: formData.propertyType,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
          },
        })

        if (success) {
          toast({
            title: "Saved to Dashboard",
            description: "Your listing description has been saved to your profile dashboard.",
          })
        } else {
          throw new Error("Failed to save")
        }
      } catch (error) {
        console.error("Error saving to dashboard:", error)
        toast({
          title: "Save Failed",
          description: "Failed to save to dashboard. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>ListIT AI</CardTitle>
          <CardDescription>Generate compelling property listing descriptions using AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Main St, City, State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="$500,000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select onValueChange={(value) => handleInputChange("bedrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select onValueChange={(value) => handleInputChange("bathrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="squareFootage">Square Footage</Label>
                <Input
                  id="squareFootage"
                  value={formData.squareFootage}
                  onChange={(e) => handleInputChange("squareFootage", e.target.value)}
                  placeholder="2,000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Family">Single Family</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearBuilt">Year Built</Label>
                <Input
                  id="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lotSize">Lot Size</Label>
                <Input
                  id="lotSize"
                  value={formData.lotSize}
                  onChange={(e) => handleInputChange("lotSize", e.target.value)}
                  placeholder="0.25 acres"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Key Features</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => handleInputChange("features", e.target.value)}
                placeholder="Updated kitchen, hardwood floors, large backyard..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Neighborhood Info</Label>
              <Textarea
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                placeholder="Quiet residential area, close to parks and shopping..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schools">Schools</Label>
              <Input
                id="schools"
                value={formData.schools}
                onChange={(e) => handleInputChange("schools", e.target.value)}
                placeholder="Lincoln Elementary, Washington Middle, Roosevelt High"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Any other details you'd like to highlight..."
                className="min-h-[80px]"
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Listing Description"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Listing Description</CardTitle>
            <CardDescription>Your AI-generated property listing description is ready!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="whitespace-pre-wrap">{result}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Button variant="outline" onClick={copyToClipboard} className="flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" />
                <span className="whitespace-nowrap">Copy</span>
              </Button>
              <Button variant="outline" onClick={downloadPDF} className="flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                <span className="whitespace-nowrap">Download</span>
              </Button>
              <Button
                variant="outline"
                onClick={sendEmail}
                disabled={isEmailLoading}
                className="flex items-center justify-center gap-2"
              >
                {isEmailLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                <span className="whitespace-nowrap">Email</span>
              </Button>
              <Button
                variant="outline"
                onClick={saveToDashboard}
                disabled={isSaving || !user?.email}
                className="flex items-center justify-center gap-2"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span className="whitespace-nowrap">Save</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
