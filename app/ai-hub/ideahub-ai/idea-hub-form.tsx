"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Lightbulb, Download, Mail } from "lucide-react"
import { generateIdeaHubContent } from "./actions"
import { useActionState } from "react"
import { CopyButton } from "@/components/copy-button"
import { autoSaveCreation } from "@/lib/auto-save-creation"
import { useTracking } from "@/hooks/use-tracking"

interface FormState {
  success?: boolean
  error?: string
  content?: string
  topic?: string
  contentType?: string
  tonality?: string
  targetAudience?: string
  keyPoints?: string
}

const initialState: FormState = {}

const contentTypes = [
  {
    value: "social-media-post",
    label: "Social Media Post",
    description: "Engaging posts for Facebook, Instagram, LinkedIn",
  },
  { value: "blog-article", label: "Blog Article", description: "In-depth articles for your website or blog" },
  { value: "email-newsletter", label: "Email Newsletter", description: "Content for email marketing campaigns" },
  { value: "video-script", label: "Video Script", description: "Scripts for YouTube, TikTok, or promotional videos" },
  { value: "podcast-outline", label: "Podcast Outline", description: "Structured outlines for podcast episodes" },
  {
    value: "infographic-content",
    label: "Infographic Content",
    description: "Text and data points for visual infographics",
  },
  { value: "press-release", label: "Press Release", description: "Professional announcements and news releases" },
  { value: "case-study", label: "Case Study", description: "Success stories and client testimonials" },
  { value: "market-report", label: "Market Report", description: "Local market analysis and trends" },
  { value: "buyer-guide", label: "Buyer Guide", description: "Educational content for home buyers" },
  { value: "seller-tips", label: "Seller Tips", description: "Advice and tips for home sellers" },
  { value: "investment-analysis", label: "Investment Analysis", description: "Real estate investment insights" },
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
  const [state, formAction, isPending] = useActionState(generateIdeaHubContent, initialState)
  const [formData, setFormData] = useState({
    topic: "",
    contentType: "",
    tonality: "",
    targetAudience: "",
    keyPoints: "",
  })
  const { trackEvent } = useTracking()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (formDataObj: FormData) => {
    trackEvent("ideahub_generate_start", {
      content_type: formDataObj.get("contentType") as string,
      tonality: formDataObj.get("tonality") as string,
      topic: formDataObj.get("topic") as string,
    })

    formAction(formDataObj)
  }

  const handleSave = async () => {
    if (state.content && state.topic) {
      try {
        await autoSaveCreation({
          tool: "ideahub-ai",
          title: `${state.contentType} - ${state.topic}`,
          content: state.content,
          metadata: {
            topic: state.topic,
            contentType: state.contentType,
            tonality: state.tonality,
            targetAudience: state.targetAudience,
            keyPoints: state.keyPoints,
          },
        })

        trackEvent("ideahub_save_success", {
          content_type: state.contentType,
          tonality: state.tonality,
        })
      } catch (error) {
        console.error("Failed to save creation:", error)
      }
    }
  }

  const handleEmailSend = async () => {
    if (!state.content) return

    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: state.content,
          topic: state.topic,
          contentType: state.contentType,
          tonality: state.tonality,
        }),
      })

      if (response.ok) {
        trackEvent("ideahub_email_success", {
          content_type: state.contentType,
          tonality: state.tonality,
        })
      }
    } catch (error) {
      console.error("Failed to send email:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">IdeaHub AI</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Generate engaging content ideas and copy for your real estate marketing
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Content Generator</CardTitle>
            <CardDescription>Describe your content needs and let AI create engaging copy for you</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Subject *</Label>
                <Input
                  id="topic"
                  name="topic"
                  placeholder="e.g., First-time homebuyer tips, Spring market trends..."
                  value={formData.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type *</Label>
                <Select
                  name="contentType"
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
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tonality">Tonality *</Label>
                <Select
                  name="tonality"
                  value={formData.tonality}
                  onValueChange={(value) => handleInputChange("tonality", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tonality" />
                  </SelectTrigger>
                  <SelectContent>
                    {tonalityOptions.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        <div>
                          <div className="font-medium">{tone.label}</div>
                          <div className="text-sm text-muted-foreground">{tone.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  name="targetAudience"
                  placeholder="e.g., First-time buyers, Luxury clients, Investors..."
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyPoints">Key Points to Include</Label>
                <Textarea
                  id="keyPoints"
                  name="keyPoints"
                  placeholder="List any specific points, statistics, or messages you want to include..."
                  value={formData.keyPoints}
                  onChange={(e) => handleInputChange("keyPoints", e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
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
            {state.error && (
              <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700 mb-4">{state.error}</div>
            )}

            {state.content ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50 min-h-[300px]">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{state.content}</div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <CopyButton text={state.content} />
                  <Button onClick={handleSave} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button onClick={handleEmailSend} variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
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
