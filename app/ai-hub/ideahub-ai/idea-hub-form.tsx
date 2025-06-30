"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, Mic, MicOff, Download, Mail, Save, Check, Loader2 } from "lucide-react"
import { generateContent } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { CopyButton } from "@/components/copy-button"
import { autoSaveCreation } from "@/lib/auto-save-creation"
import type { SpeechRecognition } from "web-speech-api"

interface FormData {
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
}

export default function IdeaHubForm() {
  const [formData, setFormData] = useState<FormData>({
    primaryTopic: "",
    alternateTopic: "",
    language: "English",
    name: "",
    email: "",
    contentType: "",
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [generatedImage, setGeneratedImage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const { toast } = useToast()

  const primaryTopics = [
    "First-time home buying tips",
    "Selling your home in today's market",
    "Real estate investment strategies",
    "Home staging secrets",
    "Market trends and predictions",
    "Mortgage and financing options",
    "Neighborhood spotlight",
    "Home maintenance tips",
    "Luxury real estate insights",
    "Commercial real estate opportunities",
  ]

  const contentTypes = ["Social post", "Text message", "Email", "Blog article"]

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
      const result = await generateContent(formData)
      setGeneratedContent(result.text)
      setGeneratedImage(result.imageUrl)

      // Auto-save the creation
      await autoSaveCreation({
        tool: "IdeaHub AI",
        content: result.text,
        metadata: {
          primaryTopic: formData.primaryTopic,
          alternateTopic: formData.alternateTopic,
          language: formData.language,
          name: formData.name,
          email: formData.email,
          contentType: formData.contentType,
        },
      })

      toast({
        title: "Content Generated!",
        description: "Your content and image have been generated successfully.",
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
          primaryTopic: formData.primaryTopic,
          alternateTopic: formData.alternateTopic,
          language: formData.language,
          name: formData.name,
          email: formData.email,
          contentType: formData.contentType,
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
              <Label htmlFor="primaryTopic">Choose a Topic</Label>
              <Select value={formData.primaryTopic} onValueChange={(value) => handleInputChange("primaryTopic", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {primaryTopics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="alternateTopic">Or Enter Your Own Topic</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    isListening && activeField === "alternateTopic" ? stopListening() : startListening("alternateTopic")
                  }
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "alternateTopic" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                id="alternateTopic"
                value={formData.alternateTopic}
                onChange={(e) => handleInputChange("alternateTopic", e.target.value)}
                placeholder="Enter your custom topic"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="contentType">Content Type</Label>
              <Select value={formData.contentType} onValueChange={(value) => handleInputChange("contentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
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
                <Label htmlFor="name">Your Name</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => (isListening && activeField === "name" ? stopListening() : startListening("name"))}
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "name" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="email">Your Email</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => (isListening && activeField === "email" ? stopListening() : startListening("email"))}
                  className="h-8 w-8 p-0"
                >
                  {isListening && activeField === "email" ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Review Your Selections</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Topic:</strong> {formData.primaryTopic || formData.alternateTopic}
                </p>
                <p>
                  <strong>Content Type:</strong> {formData.contentType}
                </p>
                <p>
                  <strong>Language:</strong> {formData.language}
                </p>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
              </div>
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
        return (formData.primaryTopic || formData.alternateTopic) && formData.contentType && formData.language
      case 2:
        return formData.name && formData.email
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                {currentStep === 1 ? "Content Setup" : currentStep === 2 ? "Personal Info" : "Review & Generate"}
              </Badge>
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Choose your topic, content type, and language"}
              {currentStep === 2 && "Enter your personal information"}
              {currentStep === 3 && "Review your selections and generate content"}
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
            <CardDescription>Your AI-generated content and image will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedContent || generatedImage ? (
              <div className="space-y-4">
                {generatedImage && (
                  <div>
                    <h4 className="font-semibold mb-2">Generated Image</h4>
                    <img
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated content"
                      className="w-full rounded-lg"
                    />
                  </div>
                )}

                {generatedContent && (
                  <div>
                    <h4 className="font-semibold mb-2">Generated Text</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="whitespace-pre-wrap text-sm">{generatedContent}</div>
                    </div>
                  </div>
                )}

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
