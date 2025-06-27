"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Copy, Download, Mail, Mic, MicOff } from "lucide-react"
import { generateIdeaHubContent } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { autoSaveCreation, generateCreationTitle } from "@/lib/auto-save-creation"

interface FormData {
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
}

interface GeneratedContent {
  text: string
  imageUrl: string
  imageBuffer: Buffer | null
}

export default function IdeaHubForm() {
  const { toast } = useToast()
  const { user } = useMemberSpaceUser()
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  const [formData, setFormData] = useState<FormData>({
    primaryTopic: "",
    alternateTopic: "",
    language: "English",
    name: user?.name || "",
    email: user?.email || "",
    contentType: "Social post",
  })

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
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
            alternateTopic: prev.alternateTopic + (prev.alternateTopic ? " " : "") + transcript,
          }))
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
          toast({
            title: "Voice Recognition Error",
            description: "Could not process voice input. Please try again.",
            variant: "destructive",
          })
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [toast])

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.primaryTopic && !formData.alternateTopic) {
      toast({
        title: "Missing Information",
        description: "Please select a topic or provide a custom topic.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await generateIdeaHubContent(formData)
      setGeneratedContent(result)

      // Auto-save the creation
      if (user?.id && user?.email) {
        await autoSaveCreation({
          userId: user.id,
          userEmail: user.email,
          toolType: "ideahub-ai",
          title: generateCreationTitle("ideahub-ai", formData),
          content: result.text,
          formData,
          metadata: {
            imageUrl: result.imageUrl,
            contentType: formData.contentType,
            language: formData.language,
          },
        })
      }

      toast({
        title: "Content Generated!",
        description: "Your content has been created successfully.",
      })
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadImage = () => {
    if (generatedContent?.imageUrl) {
      const link = document.createElement("a")
      link.href = generatedContent.imageUrl
      link.download = "ideahub-content-image.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const sendEmail = async () => {
    if (!generatedContent) return

    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          content: generatedContent.text,
          imageUrl: generatedContent.imageUrl,
          contentType: formData.contentType,
        }),
      })

      if (response.ok) {
        toast({
          title: "Email Sent!",
          description: "Your content has been sent to your email.",
        })
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "Could not send email. Please try again.",
        variant: "destructive",
      })
    }
  }

  const topicOptions = [
    "Market Update",
    "Home Buying Tips",
    "Home Selling Tips",
    "Investment Properties",
    "First-Time Buyers",
    "Luxury Homes",
    "Market Trends",
    "Neighborhood Spotlight",
    "Home Staging",
    "Real Estate News",
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Content Generator</CardTitle>
            <CardDescription>
              Generate professional real estate content for social media, emails, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primaryTopic">Select Topic</Label>
                <Select
                  value={formData.primaryTopic}
                  onValueChange={(value) => handleInputChange("primaryTopic", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a topic..." />
                  </SelectTrigger>
                  <SelectContent>
                    {topicOptions.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternateTopic">Custom Topic or Additional Details</Label>
                <div className="relative">
                  <Textarea
                    id="alternateTopic"
                    placeholder="Describe your custom topic or add specific details..."
                    value={formData.alternateTopic}
                    onChange={(e) => handleInputChange("alternateTopic", e.target.value)}
                    className="min-h-[100px] pr-12"
                  />
                  {speechSupported && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`absolute top-2 right-2 h-8 w-8 p-0 ${isListening ? "text-red-500" : "text-gray-500"}`}
                      onClick={isListening ? stopListening : startListening}
                      disabled={isLoading}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                {isListening && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="animate-pulse">●</span>
                    Listening...
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select value={formData.contentType} onValueChange={(value) => handleInputChange("contentType", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Social post">Social Media Post</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Text message">Text Message</SelectItem>
                    <SelectItem value="Blog article">Blog Article</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
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
          </CardContent>
        </Card>

        {/* Results Section */}
        {generatedContent && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContent.text)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Text
                </Button>
                <Button variant="outline" size="sm" onClick={downloadImage}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>
                <Button variant="outline" size="sm" onClick={sendEmail}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Content:</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{generatedContent.text}</p>
                </div>
              </div>

              {generatedContent.imageUrl && (
                <div>
                  <h4 className="font-semibold mb-2">Generated Image:</h4>
                  <img
                    src={generatedContent.imageUrl || "/placeholder.svg"}
                    alt="Generated content image"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
