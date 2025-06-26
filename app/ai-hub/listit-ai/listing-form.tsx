"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Loader2, Mail, Save } from "lucide-react"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"

interface ListingFormData {
  propertyAddress: string
  listingPrice: string
  bedrooms: string
  bathrooms: string
  squareFootage: string
  feature1: string
  feature2: string
  feature3: string
  feature4: string
  feature5: string
  agentName: string
  agentEmail: string
}

export default function ListingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ListingFormData>({
    propertyAddress: "",
    listingPrice: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
    feature5: "",
    agentName: "",
    agentEmail: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ description: string; title: string } | null>(null)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useMemberSpaceUser()

  const handleInputChange = (field: keyof ListingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

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
      setResult(data)

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
    if (result?.description) {
      navigator.clipboard.writeText(result.description)
      toast({
        title: "Copied!",
        description: "Listing description copied to clipboard.",
      })
    }
  }

  const downloadPDF = async () => {
    if (result?.description) {
      try {
        const response = await fetch("/api/generate-listing-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: result.description,
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
    if (result?.description) {
      setIsEmailLoading(true)
      try {
        const response = await fetch("/api/send-listing-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: result.description,
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
    if (result?.description && user?.email) {
      setIsSaving(true)
      try {
        const success = await saveUserCreation({
          userId: user.id || user.email,
          userEmail: user.email,
          toolType: "listit-ai",
          title: generateCreationTitle("listit-ai", formData),
          content: result.description,
          formData: formData,
          metadata: {
            propertyAddress: formData.propertyAddress,
            listingPrice: formData.listingPrice,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            squareFootage: formData.squareFootage,
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
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Input
                      id="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                      placeholder="123 Main St, City, State"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listingPrice">Listing Price</Label>
                    <Input
                      id="listingPrice"
                      value={formData.listingPrice}
                      onChange={(e) => handleInputChange("listingPrice", e.target.value)}
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
                </div>
                <Button type="button" onClick={nextStep}>
                  Next: Features
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="feature1">Feature 1</Label>
                    <Input
                      id="feature1"
                      value={formData.feature1}
                      onChange={(e) => handleInputChange("feature1", e.target.value)}
                      placeholder="e.g., Updated Kitchen"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature2">Feature 2</Label>
                    <Input
                      id="feature2"
                      value={formData.feature2}
                      onChange={(e) => handleInputChange("feature2", e.target.value)}
                      placeholder="e.g., Hardwood Floors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature3">Feature 3</Label>
                    <Input
                      id="feature3"
                      value={formData.feature3}
                      onChange={(e) => handleInputChange("feature3", e.target.value)}
                      placeholder="e.g., Large Backyard"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature4">Feature 4</Label>
                    <Input
                      id="feature4"
                      value={formData.feature4}
                      onChange={(e) => handleInputChange("feature4", e.target.value)}
                      placeholder="e.g., Swimming Pool"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature5">Feature 5</Label>
                    <Input
                      id="feature5"
                      value={formData.feature5}
                      onChange={(e) => handleInputChange("feature5", e.target.value)}
                      placeholder="e.g., Close to Parks"
                    />
                  </div>
                </div>
                <Button type="button" onClick={prevStep} className="mr-2">
                  Previous: Details
                </Button>
                <Button type="button" onClick={nextStep}>
                  Next: Agent Info
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentName">Your Name</Label>
                    <Input
                      id="agentName"
                      value={formData.agentName}
                      onChange={(e) => handleInputChange("agentName", e.target.value)}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agentEmail">Your Email</Label>
                    <Input
                      id="agentEmail"
                      type="email"
                      value={formData.agentEmail}
                      onChange={(e) => handleInputChange("agentEmail", e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <Button type="button" onClick={prevStep} className="mr-2">
                  Previous: Features
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Listing Description"
                  )}
                </Button>
              </>
            )}
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{result.title || "Generated Listing Description"}</CardTitle>
            <CardDescription>Your AI-generated property listing description is ready!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="whitespace-pre-wrap">{result.description}</p>
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
