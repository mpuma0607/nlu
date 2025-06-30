"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save, Download, Mail } from "lucide-react"
import { generateIdeaHubContent } from "./actions"
import { CopyButton } from "@/components/copy-button"
import { autoSaveCreation } from "@/lib/auto-save-creation"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { useToast } from "@/hooks/use-toast"

interface FormState {
  topic: string
  contentType: string
  tonality: string
  additionalContext: string
}

const contentTypes = [
  { value: "social-post", label: "Social Media Post" },
  { value: "blog-post", label: "Blog Post" },
  { value: "email-newsletter", label: "Email Newsletter" },
  { value: "listing-description", label: "Listing Description" },
  { value: "market-update", label: "Market Update" },
  { value: "client-testimonial", label: "Client Testimonial Template" },
  { value: "open-house-promo", label: "Open House Promotion" },
  { value: "buyer-guide", label: "Buyer's Guide Content" },
  { value: "seller-tips", label: "Seller Tips" },
  { value: "neighborhood-spotlight", label: "Neighborhood Spotlight" },
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
    additionalContext: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useMemberSpaceUser()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.topic.trim() || !formData.contentType || !formData.tonality) {
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

  const handleSave = async () => {
    if (!result || !user?.id) {
      toast({
        title: "Cannot Save",
        description: "No content to save or user not logged in.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      await autoSaveCreation({
        userId: user.id,
        toolName: "IdeaHub AI",
        content: result,
        metadata: {
          topic: formData.topic,
          contentType: formData.contentType,
          tonality: formData.tonality,
          additionalContext: formData.additionalContext,
        },
      })

      toast({
        title: "Saved Successfully",
        description: "Your content has been saved to your creations.",
      })
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = () => {
    if (!result) return

    const blob = new Blob([result], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ideahub-content-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleEmail = async () => {
    if (!result) return

    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: result,
          topic: formData.topic,
          contentType: formData.contentType,
          tonality: formData.tonality,
        }),
      })

      if (response.ok) {
        toast({
          title: "Email Sent",
          description: "Your content has been sent to your email.",
        })
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Email Failed",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>IdeaHub AI - Content Generator</CardTitle>
          <CardDescription>
            Generate engaging real estate content for social media, blogs, newsletters, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., First-time homebuyer tips"
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
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
              <Textarea
                id="additionalContext"
                placeholder="Any specific details, target audience, or requirements..."
                value={formData.additionalContext}
                onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Content</h3>
                <div className="flex gap-2">
                  <CopyButton text={result} />
                  <Button onClick={handleSave} disabled={isSaving} size="sm" variant="outline">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleDownload} size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleEmail} size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
