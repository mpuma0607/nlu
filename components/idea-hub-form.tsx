"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { generateContent, sendContentEmail } from "@/lib/content-generation-actions"
import { Download, Mail, Copy, Share2, Loader2 } from "lucide-react"

const REAL_ESTATE_TOPICS = [
  "Market Update",
  "Home Buying Tips",
  "Home Selling Tips",
  "Investment Properties",
  "First-Time Homebuyers",
  "Luxury Real Estate",
  "Commercial Real Estate",
  "Property Management",
  "Real Estate Trends",
  "Neighborhood Spotlight",
  "Home Staging",
  "Real Estate Technology",
  "Mortgage and Financing",
  "Property Valuation",
  "Real Estate Law",
  "Relocation Services",
  "New Construction",
  "Foreclosures and Short Sales",
  "Real Estate Photography",
  "Open House Events",
]

const CONTENT_TYPES = ["Social post", "Text message", "Email", "Blog article"]

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
]

export default function IdeaHubForm() {
  const [formData, setFormData] = useState({
    primaryTopic: "",
    alternateTopic: "",
    language: "English",
    name: "",
    email: "",
    contentType: "Social post",
  })

  const [result, setResult] = useState<{
    text: string
    imageUrl: string
  } | null>(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTopicSelect = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryTopic: topic,
      alternateTopic: "",
    }))
  }

  const generateContentHandler = async () => {
    if (!formData.primaryTopic && !formData.alternateTopic) {
      toast({
        title: "Topic Required",
        description: "Please select a topic or enter a custom topic.",
        variant: "destructive",
      })
      return
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Contact Information Required",
        description: "Please enter your name and email address.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await generateContent(formData)
      setResult({
        text: response.text,
        imageUrl: response.imageUrl,
      })

      toast({
        title: "Content Generated Successfully!",
        description: "Your AI-generated content and image are ready.",
      })
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const sendEmail = async () => {
    if (!result) return

    setIsEmailLoading(true)
    try {
      await sendContentEmail({
        to: formData.email,
        name: formData.name,
        content: result.text,
        imageUrl: result.imageUrl,
      })

      toast({
        title: "Email Sent Successfully",
        description: "Check your inbox for your social media content and branded image!",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Email Sending Failed",
        description: error instanceof Error ? error.message : "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!result) return

    try {
      await navigator.clipboard.writeText(result.text)
      toast({
        title: "Copied to Clipboard",
        description: "Content has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadImage = () => {
    if (!result?.imageUrl) return

    const link = document.createElement("a")
    link.href = result.imageUrl
    link.download = "social-media-image-branded.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Topic Selection */}
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold mb-4 block">Select a Topic</Label>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 border rounded-lg">
              {REAL_ESTATE_TOPICS.map((topic) => (
                <Badge
                  key={topic}
                  variant={formData.primaryTopic === topic ? "default" : "outline"}
                  className="cursor-pointer justify-center p-2 text-center hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="alternateTopic" className="text-base font-medium">
              Or Enter Custom Topic
            </Label>
            <Textarea
              id="alternateTopic"
              placeholder="Enter your custom topic here..."
              value={formData.alternateTopic}
              onChange={(e) => handleInputChange("alternateTopic", e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-2 block">Content Type</Label>
            <Select value={formData.contentType} onValueChange={(value) => handleInputChange("contentType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">Language</Label>
            <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" className="text-base font-medium">
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-base font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <Button onClick={generateContentHandler} disabled={isGenerating} size="lg" className="px-8 py-3 text-lg">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Content...
            </>
          ) : (
            "Generate Content"
          )}
        </Button>
      </div>

      {/* Results Section */}
      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Your Generated Content
            </CardTitle>
            <CardDescription>Your AI-generated {formData.contentType.toLowerCase()} is ready to use!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Generated Text */}
            <div>
              <Label className="text-base font-medium mb-2 block">Generated Text</Label>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{result.text}</p>
              </div>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="mt-2">
                <Copy className="h-4 w-4 mr-2" />
                Copy Text
              </Button>
            </div>

            <Separator />

            {/* Generated Image */}
            <div>
              <Label className="text-base font-medium mb-2 block">Generated Image</Label>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={result.imageUrl || "/placeholder.svg"}
                  alt="Generated social media content"
                  className="w-full h-auto"
                />
              </div>
              <Button variant="outline" size="sm" onClick={downloadImage} className="mt-2">
                <Download className="h-4 w-4 mr-2" />
                Download Image
              </Button>
            </div>

            <Separator />

            {/* Email Section */}
            <div className="text-center">
              <Button onClick={sendEmail} disabled={isEmailLoading} size="lg" className="px-6">
                {isEmailLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Email...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Content & Image
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                We'll send both the text content and branded image to your email
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
