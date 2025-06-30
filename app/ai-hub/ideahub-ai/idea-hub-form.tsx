"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Lightbulb, Download, Mail } from "lucide-react"
import { generateIdeaHubContent } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { CopyButton } from "@/components/copy-button"
import { autoSaveCreation } from "@/lib/auto-save-creation"

interface FormState {
  businessName: string
  businessType: string
  targetAudience: string
  contentType: string
  tonality: string
  specificTopic: string
  keyPoints: string
  callToAction: string
}

const initialFormState: FormState = {
  businessName: "",
  businessType: "",
  targetAudience: "",
  contentType: "",
  tonality: "professional-authoritative",
  specificTopic: "",
  keyPoints: "",
  callToAction: "",
}

const contentTypes = [
  { value: "social-media-post", label: "Social Media Post" },
  { value: "blog-article", label: "Blog Article" },
  { value: "email-newsletter", label: "Email Newsletter" },
  { value: "property-description", label: "Property Description" },
  { value: "market-update", label: "Market Update" },
  { value: "client-testimonial", label: "Client Testimonial Request" },
  { value: "educational-content", label: "Educational Content" },
  { value: "promotional-content", label: "Promotional Content" },
  { value: "community-spotlight", label: "Community Spotlight" },
  { value: "tips-advice", label: "Tips & Advice" },
]

const tonalityOptions = [
  {
    value: "professional-authoritative",
    label: "Professional & Authoritative",
    description: "Confident, knowledgeable, clear",
  },
  {
    value: "friendly-approachable",
    label: "Friendly & Approachable",
    description: "Warm, conversational, down-to-earth",
  },
  {
    value: "witty-playful",
    label: "Witty & Playful",
    description: "Lighthearted, tongue-in-cheek, surprising twists",
  },
  {
    value: "inspirational-motivational",
    label: "Inspirational & Motivational",
    description: "Uplifting, aspirational, empowering",
  },
  {
    value: "educational-informative",
    label: "Educational & Informative",
    description: "Clear, explanatory, step-by-step",
  },
  {
    value: "conversational-story-driven",
    label: "Conversational & Story-Driven",
    description: "Narrative, personal anecdotes, dialogue style",
  },
  {
    value: "urgent-action-oriented",
    label: "Urgent & Action-Oriented",
    description: 'Direct, brisk, focused on "now"',
  },
  {
    value: "empathetic-supportive",
    label: "Empathetic & Supportive",
    description: "Compassionate, understanding, reassuring",
  },
  {
    value: "visionary-futuristic",
    label: "Visionary & Futuristic",
    description: "Forward-looking, trend-spotting, big-picture",
  },
  {
    value: "bold-disruptive",
    label: "Bold & Disruptive",
    description: "Challenging conventions, strong opinions, confident declarations",
  },
]

export default function IdeaHubForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.businessName || !formData.contentType || !formData.tonality) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const content = await generateIdeaHubContent(formData)
      setResult(content)

      // Auto-save the creation
      await autoSaveCreation({
        tool_name: "ideahub-ai",
        content_data: {
          businessName: formData.businessName,
          businessType: formData.businessType,
          targetAudience: formData.targetAudience,
          contentType: formData.contentType,
          tonality: formData.tonality,
          specificTopic: formData.specificTopic,
          keyPoints: formData.keyPoints,
          callToAction: formData.callToAction,
          generatedContent: content,
        },
        metadata: {
          contentType: formData.contentType,
          tonality: formData.tonality,
          businessName: formData.businessName,
        },
      })

      toast({
        title: "Content Generated!",
        description: "Your content has been created and saved to your dashboard.",
      })
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailAddress || !result) return

    setIsEmailLoading(true)
    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          content: result,
          businessName: formData.businessName,
          contentType: formData.contentType,
        }),
      })

      if (response.ok) {
        toast({
          title: "Email Sent!",
          description: "Your content has been sent to your email address.",
        })
        setShowEmailForm(false)
        setEmailAddress("")
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([result], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${formData.businessName}-${formData.contentType}-content.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">IdeaHub AI</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Generate engaging content ideas and copy for your real estate business
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Content Generator</CardTitle>
            <CardDescription>
              Fill out the form below to generate customized content for your real estate business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Your real estate business name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  placeholder="e.g., Residential sales, Commercial, Property management"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  placeholder="e.g., First-time homebuyers, Luxury clients, Investors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type *</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => handleInputChange("contentType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tonality">Tonality *</Label>
                <Select
                  value={formData.tonality}
                  onValueChange={(value) => handleInputChange("tonality", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tonality" />
                  </SelectTrigger>
                  <SelectContent>
                    {tonalityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specificTopic">Specific Topic</Label>
                <Input
                  id="specificTopic"
                  value={formData.specificTopic}
                  onChange={(e) => handleInputChange("specificTopic", e.target.value)}
                  placeholder="e.g., Spring market trends, Home staging tips"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyPoints">Key Points to Include</Label>
                <Textarea
                  id="keyPoints"
                  value={formData.keyPoints}
                  onChange={(e) => handleInputChange("keyPoints", e.target.value)}
                  placeholder="List any specific points, statistics, or information to include"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="callToAction">Call to Action</Label>
                <Input
                  id="callToAction"
                  value={formData.callToAction}
                  onChange={(e) => handleInputChange("callToAction", e.target.value)}
                  placeholder="e.g., Contact me for a consultation, Visit our website"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>Your AI-generated content will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>

                <div className="flex flex-wrap gap-2">
                  <CopyButton text={result} />
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={() => setShowEmailForm(true)} variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>

                {showEmailForm && (
                  <form onSubmit={handleEmailSubmit} className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" disabled={isEmailLoading}>
                        {isEmailLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Email"
                        )}
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => setShowEmailForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Lightbulb className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Fill out the form and click "Generate Content" to see your AI-generated content here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
