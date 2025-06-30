"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, Mic, MicOff, Download, Mail, Save, Check, Loader2 } from "lucide-react"
import { generateIdeaContent } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { CopyButton } from "@/components/copy-button"
import { autoSaveCreation } from "@/lib/auto-save-creation"
import type { SpeechRecognition } from "web-speech-api"

interface FormData {
  contentType: string
  tonality: string
  language: string
  topic: string
  targetAudience: string
  keyPoints: string
  callToAction: string
  additionalContext: string
}

export default function IdeaHubForm() {
  const [formData, setFormData] = useState<FormData>({
    contentType: "",
    tonality: "",
    language: "English",
    topic: "",
    targetAudience: "",
    keyPoints: "",
    callToAction: "",
    additionalContext: "",
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const { toast } = useToast()

  const contentTypes = [
    {
      value: "social-media-post",
      label: "Social Media Post",
      description: "Engaging posts for Facebook, Instagram, LinkedIn",
    },
    { value: "blog-article", label: "Blog Article", description: "In-depth articles for your website or blog" },
    { value: "email-newsletter", label: "Email Newsletter", description: "Content for email marketing campaigns" },
    { value: "video-script", label: "Video Script", description: "Scripts for video content and presentations" },
    {
      value: "property-description",
      label: "Property Description",
      description: "Compelling property listings and descriptions",
    },
    { value: "market-update", label: "Market Update", description: "Real estate market analysis and updates" },
    {
      value: "client-testimonial",
      label: "Client Testimonial",
      description: "Template for collecting client testimonials",
    },
    {
      value: "open-house-promotion",
      label: "Open House Promotion",
      description: "Marketing content for open house events",
    },
    { value: "buyer-guide", label: "Buyer Guide", description: "Educational content for home buyers" },
    { value: "seller-guide", label: "Seller Guide", description: "Educational content for home sellers" },
  ]

  const tonalityOptions = [
    {
      value: "professional-authoritative",
      label: "Professional & Authoritative",
      description: "Expert, credible, trustworthy tone",
    },
    {
      value: "friendly-approachable",
      label: "Friendly & Approachable",
      description: "Warm, welcoming, personable tone",
    },
    { value: "witty-playful", label: "Witty & Playful", description: "Humorous, clever, entertaining tone" },
    {
      value: "inspirational-motivational",
      label: "Inspirational & Motivational",
      description: "Uplifting, encouraging, empowering tone",
    },
    {
      value: "educational-informative",
      label: "Educational & Informative",
      description: "Clear, instructional, helpful tone",
    },
    {
      value: "conversational-story-driven",
      label: "Conversational & Story-Driven",
      description: "Personal, narrative, relatable tone",
    },
    {
      value: "urgent-action-oriented",
      label: "Urgent & Action-Oriented",
      description: "Direct, compelling, time-sensitive tone",
    },
    {
      value: "empathetic-supportive",
      label: "Empathetic & Supportive",
      description: "Understanding, caring, compassionate tone",
    },
    {
      value: "visionary-futuristic",
      label: "Visionary & Futuristic",
      description: "Forward-thinking, innovative, progressive tone",
    },
    {
      value: "bold-disruptive",
      label: "Bold & Disruptive",
      description: "Confident, challenging, attention-grabbing tone",
    },
  ]

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Dutch",
    "Russian",
    "Chinese",
    "Japanese",
  ]

  const startListening = (fieldName: string) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      })
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
      setActiveField(fieldName)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setFormData((prev) => ({
        ...prev,
        [fieldName]: prev[fieldName as keyof FormData] + (prev[fieldName as keyof FormData] ? " " : "") + transcript,
      }))
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      toast({
        title: "Speech Recognition Error",
        description: "There was an error with speech recognition. Please try again.",
        variant: "destructive",
      })
    }

    recognition.onend = () => {
      setIsListening(false)
      setActiveField(null)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setIsSaved(false)
    try {
      const result = await generateIdeaContent(formData)
      if (result.success) {
        setGeneratedContent(result.content || "")
        toast({
          title: "Content Generated!",
          description: "Your content has been generated successfully.",
        })
      } else {
        throw new Error(result.error || "Failed to generate content")
      }
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

  const handleSave = async () => {
    if (!generatedContent.trim()) {
      toast({
        title: "Nothing to Save",
        description: "Please generate content first before saving.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      await autoSaveCreation({
        tool: "IdeaHub AI",
        content: generatedContent,
        metadata: {
          contentType: formData.contentType,
          tonality: formData.tonality,
          language: formData.language,
          topic: formData.topic,
          targetAudience: formData.targetAudience,
          keyPoints: formData.keyPoints,
          callToAction: formData.callToAction,
          additionalContext: formData.additionalContext,
        },
      })

      setIsSaved(true)
      toast({
        title: "Content Saved!",
        description: "Your content has been saved to your creations dashboard.",
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
    if (!generatedContent.trim()) {
      toast({
        title: "Nothing to Download",
        description: "Please generate content first before downloading.",
        variant: "destructive",
      })
      return
    }

    const element = document.createElement("a")
    const file = new Blob([generatedContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `ideahub-content-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Download Started",
      description: "Your content is being downloaded.",
    })
  }

  const handleEmail = async () => {
    if (!generatedContent.trim()) {
      toast({
        title: "Nothing to Email",
        description: "Please generate content first before emailing.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: generatedContent,
          formData: formData,
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
      console.error("Error sending email:", error)
      toast({
        title: "Email Failed",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contentType">Content Type *</Label>
              <Select value={formData.contentType} onValueChange={(value) => handleInputChange("contentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tonality">Tonality *</Label>
              <Select value={formData.tonality} onValueChange={(value) => handleInputChange("tonality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tonality" />
                </SelectTrigger>
                <SelectContent>
                  {tonalityOptions.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      <div>
                        <div className="font-medium">{tone.label}</div>
                        <div className="text-sm text-gray-500">{tone.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Language *</Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="topic">Topic/Subject *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => (isListening && activeField === "topic" ? stopListening() : startListening("topic"))}
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "topic" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => handleInputChange("topic", e.target.value)}
                placeholder="e.g., First-time home buying tips, Market trends in 2024"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    isListening && activeField === "targetAudience" ? stopListening() : startListening("targetAudience")
                  }
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "targetAudience" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                placeholder="e.g., First-time home buyers, Real estate investors, Luxury home sellers"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="keyPoints">Key Points to Include</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    isListening && activeField === "keyPoints" ? stopListening() : startListening("keyPoints")
                  }
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "keyPoints" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Textarea
                id="keyPoints"
                value={formData.keyPoints}
                onChange={(e) => handleInputChange("keyPoints", e.target.value)}
                placeholder="List the main points you want to cover (one per line)"
                rows={4}
                className="w-full"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="callToAction">Call to Action</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    isListening && activeField === "callToAction" ? stopListening() : startListening("callToAction")
                  }
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "callToAction" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                id="callToAction"
                value={formData.callToAction}
                onChange={(e) => handleInputChange("callToAction", e.target.value)}
                placeholder="e.g., Contact me for a free consultation, Schedule your showing today"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="additionalContext">Additional Context</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    isListening && activeField === "additionalContext"
                      ? stopListening()
                      : startListening("additionalContext")
                  }
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "additionalContext" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Textarea
                id="additionalContext"
                value={formData.additionalContext}
                onChange={(e) => handleInputChange("additionalContext", e.target.value)}
                placeholder="Any additional information, specific requirements, or context you'd like to include"
                rows={4}
                className="w-full"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.contentType && formData.tonality && formData.language
      case 2:
        return formData.topic && formData.targetAudience
      case 3:
        return true // Step 3 fields are optional
      default:
        return false
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">IdeaHub AI</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate engaging content ideas and copy for your real estate marketing. From social media posts to blog
          articles, create compelling content that resonates with your audience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Step {currentStep} of 3
              <Badge variant="outline">
                {currentStep === 1 ? "Basics" : currentStep === 2 ? "Content Details" : "Finishing Touches"}
              </Badge>
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Choose your content type, tonality, and language"}
              {currentStep === 2 && "Define your topic, audience, and key points"}
              {currentStep === 3 && "Add call-to-action and additional context"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleGenerate}
                  disabled={!isStepValid() || isGenerating}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>Your AI-generated content will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="whitespace-pre-wrap text-sm">{generatedContent}</div>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    variant="outline"
                    size="sm"
                    className={isSaved ? "bg-green-50 border-green-200 text-green-700" : ""}
                  >
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : isSaved ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {isSaving ? "Saving..." : isSaved ? "Saved" : "Save"}
                  </Button>

                  <CopyButton text={generatedContent} />

                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>

                  <Button onClick={handleEmail} variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Complete the form and click "Generate Content" to see your results here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
