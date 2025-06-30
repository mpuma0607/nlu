"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Download, Mail, Save } from "lucide-react"
import { generateIdeaHubContent } from "./actions"
import { CopyButton } from "@/components/copy-button"
import { autoSaveCreation } from "@/lib/auto-save-creation"

interface FormState {
  topic: string
  contentType: string
  tonality: string
  additionalInfo: string
}

const contentTypes = [
  { value: "social-media-post", label: "Social Media Post" },
  { value: "blog-article", label: "Blog Article" },
  { value: "email-newsletter", label: "Email Newsletter" },
  { value: "market-update", label: "Market Update" },
  { value: "listing-description", label: "Listing Description" },
  { value: "buyer-guide", label: "Buyer Guide" },
  { value: "seller-tips", label: "Seller Tips" },
  { value: "market-analysis", label: "Market Analysis" },
  { value: "investment-insights", label: "Investment Insights" },
  { value: "first-time-buyer", label: "First-Time Buyer Content" },
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
  const [formData, setFormData] = useState<FormState>({
    topic: "",
    contentType: "",
    tonality: "professional-authoritative",
    additionalInfo: "",
  })
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState("")
  const [isEmailSending, setIsEmailSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.topic || !formData.contentType || !formData.tonality) return

    setIsLoading(true)
    try {
      const content = await generateIdeaHubContent(formData)
      setResult(content)

      // Auto-save the creation
      await autoSaveCreation({
        toolName: "IdeaHub AI",
        content: content,
        metadata: {
          topic: formData.topic,
          contentType: formData.contentType,
          tonality: formData.tonality,
          additionalInfo: formData.additionalInfo,
        },
      })
    } catch (error) {
      console.error("Error generating content:", error)
      setResult("Sorry, there was an error generating your content. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([result], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `ideahub-content-${formData.topic.replace(/\s+/g, "-").toLowerCase()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleEmailSend = async () => {
    if (!email || !result) return

    setIsEmailSending(true)
    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          content: result,
          topic: formData.topic,
          contentType: formData.contentType,
          tonality: formData.tonality,
        }),
      })

      if (response.ok) {
        alert("Content sent successfully!")
        setShowEmailForm(false)
        setEmail("")
      } else {
        alert("Failed to send email. Please try again.")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Failed to send email. Please try again.")
    } finally {
      setIsEmailSending(false)
    }
  }

  const selectedTonality = tonalityOptions.find((option) => option.value === formData.tonality)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">IdeaHub AI Content Generator</CardTitle>
          <CardDescription className="text-center">
            Generate engaging real estate content for social media, blogs, newsletters, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Spring home buying tips"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type *</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => setFormData({ ...formData, contentType: value })}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="tonality">Tonality *</Label>
              <Select
                value={formData.tonality}
                onValueChange={(value) => setFormData({ ...formData, tonality: value })}
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
                        <span className="text-xs text-gray-500">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTonality && (
                <p className="text-sm text-gray-600">
                  <strong>{selectedTonality.label}:</strong> {selectedTonality.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any specific details, target audience, or requirements..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                rows={3}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Content...
                </>
              ) : (
                "Generate Content"
              )}
            </Button>
          </form>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Generated Content
                  <div className="flex gap-2">
                    <CopyButton text={result} />
                    <Button onClick={handleDownload} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={() => setShowEmailForm(true)} variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      onClick={async () => {
                        await autoSaveCreation({
                          toolName: "IdeaHub AI",
                          content: result,
                          metadata: {
                            topic: formData.topic,
                            contentType: formData.contentType,
                            tonality: formData.tonality,
                            additionalInfo: formData.additionalInfo,
                          },
                        })
                        alert("Content saved to your dashboard!")
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border">{result}</div>
              </CardContent>
            </Card>
          )}

          {showEmailForm && (
            <Card>
              <CardHeader>
                <CardTitle>Email Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleEmailSend} disabled={isEmailSending}>
                    {isEmailSending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Email"
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setShowEmailForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
