"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Copy, Download, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateIdeaHubContent } from "./actions"
import { autoSaveCreation } from "@/lib/auto-save-creation"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { useTracking } from "@/hooks/use-tracking"

interface FormState {
  contentType: string
  targetAudience: string
  customTopic: string
  tone: string
  platform: string
}

export default function IdeaHubForm() {
  const [formData, setFormData] = useState<FormState>({
    contentType: "",
    targetAudience: "",
    customTopic: "",
    tone: "",
    platform: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)

  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()
  const { user } = useMemberSpaceUser()
  const { trackEvent } = useTracking()

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    setSpeechSupported(!!SpeechRecognition)

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setFormData((prev) => ({
          ...prev,
          customTopic: prev.customTopic + (prev.customTopic ? " " : "") + transcript,
        }))
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        toast({
          title: "Voice input error",
          description: "Please try again or type your content.",
          variant: "destructive",
        })
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [toast])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.contentType || !formData.targetAudience || !formData.tone || !formData.platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      await trackEvent("ideahub_generation_started", {
        contentType: formData.contentType,
        targetAudience: formData.targetAudience,
        tone: formData.tone,
        platform: formData.platform,
      })

      const result = await generateIdeaHubContent(formData)

      if (result.success && result.content) {
        setGeneratedContent(result.content)

        // Auto-save the creation
        if (user?.id) {
          await autoSaveCreation({
            userId: user.id,
            toolName: "IdeaHub AI",
            content: result.content,
            metadata: formData,
          })
        }

        await trackEvent("ideahub_generation_completed", {
          contentType: formData.contentType,
          success: true,
        })

        toast({
          title: "Content Generated!",
          description: "Your content ideas have been created successfully.",
        })
      } else {
        throw new Error(result.error || "Failed to generate content")
      }
    } catch (error) {
      console.error("Error generating content:", error)
      await trackEvent("ideahub_generation_failed", {
        contentType: formData.contentType,
        error: error instanceof Error ? error.message : "Unknown error",
      })
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      })
    }
  }

  const downloadAsPDF = async () => {
    try {
      const response = await fetch("/api/generate-creation-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "IdeaHub Content",
          content: generatedContent,
          metadata: formData,
        }),
      })

      if (!response.ok) throw new Error("PDF generation failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "ideahub-content.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Downloaded!",
        description: "Your content has been saved as PDF.",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error creating the PDF.",
        variant: "destructive",
      })
    }
  }

  const sendEmail = async () => {
    if (!user?.email) {
      toast({
        title: "Email Required",
        description: "Please ensure you're logged in to send emails.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)
    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          content: generatedContent,
          formData,
        }),
      })

      if (!response.ok) throw new Error("Email sending failed")

      toast({
        title: "Email Sent!",
        description: "Your content has been sent to your email.",
      })
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "There was an error sending the email.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>IdeaHub AI - Content Generator</CardTitle>
          <CardDescription>Generate engaging content ideas for your real estate marketing</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type *</Label>
                <Select value={formData.contentType} onValueChange={(value) => handleInputChange("contentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-media-post">Social Media Post</SelectItem>
                    <SelectItem value="blog-article">Blog Article</SelectItem>
                    <SelectItem value="email-newsletter">Email Newsletter</SelectItem>
                    <SelectItem value="video-script">Video Script</SelectItem>
                    <SelectItem value="infographic-content">Infographic Content</SelectItem>
                    <SelectItem value="podcast-outline">Podcast Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Select
                  value={formData.targetAudience}
                  onValueChange={(value) => handleInputChange("targetAudience", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time-buyers">First-Time Buyers</SelectItem>
                    <SelectItem value="luxury-buyers">Luxury Buyers</SelectItem>
                    <SelectItem value="investors">Real Estate Investors</SelectItem>
                    <SelectItem value="sellers">Home Sellers</SelectItem>
                    <SelectItem value="renters">Renters</SelectItem>
                    <SelectItem value="general-public">General Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone *</Label>
                <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="inspiring">Inspiring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Platform *</Label>
                <Select value={formData.platform} onValueChange={(value) => handleInputChange("platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="blog">Blog/Website</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customTopic">Custom Topic or Additional Details</Label>
              <div className="relative">
                <Textarea
                  id="customTopic"
                  placeholder="Describe your specific topic, current market trends, or any additional details you'd like to include..."
                  value={formData.customTopic}
                  onChange={(e) => handleInputChange("customTopic", e.target.value)}
                  className="min-h-[100px] pr-12"
                />
                {speechSupported && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`absolute top-2 right-2 h-8 w-8 p-0 ${isListening ? "text-red-500" : "text-gray-500"}`}
                    onClick={isListening ? stopListening : startListening}
                    disabled={isGenerating}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}
              </div>
              {isListening && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <Mic className="h-3 w-3" />
                  Listening... Speak now
                </p>
              )}
            </div>

            <Button type="submit" disabled={isGenerating} className="w-full">
              {isGenerating ? "Generating Content..." : "Generate Content Ideas"}
            </Button>
          </form>

          {generatedContent && (
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Generated Content</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadAsPDF}>
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={sendEmail} disabled={isSending}>
                    <Mail className="h-4 w-4 mr-1" />
                    {isSending ? "Sending..." : "Email"}
                  </Button>
                </div>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{generatedContent}</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
