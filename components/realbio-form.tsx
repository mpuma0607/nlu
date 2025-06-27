"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateAgentBio, generateAgentBioHTML } from "../lib/realbio-actions"
import { Loader2, Copy, Download, Mail, Save, Check, Mic, MicOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"

type FormState = {
  agentName: string
  agentEmail: string
  yearsExperience: string
  specialties: string
  originStory: string
  areasServed: string
  hobbiesInterests: string
  personalTouch: string
  callToAction: string
  tone: string
}

type BioResult = {
  bio: string
}

export default function RealBioForm() {
  const { toast } = useToast()
  const resultsRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isListeningOrigin, setIsListeningOrigin] = useState(false)
  const [isListeningAreas, setIsListeningAreas] = useState(false)
  const [isListeningHobbies, setIsListeningHobbies] = useState(false)
  const { user, isLoggedIn } = useMemberSpaceUser()

  const [formData, setFormData] = useState<FormState>({
    agentName: "",
    agentEmail: "",
    yearsExperience: "",
    specialties: "",
    originStory: "",
    areasServed: "",
    hobbiesInterests: "",
    personalTouch: "",
    callToAction: "",
    tone: "Professional and approachable",
  })
  const [result, setResult] = useState<BioResult | null>(null)

  // Auto-scroll to results when they're generated
  useEffect(() => {
    if (result && step === 4 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [result, step])

  // Auto-populate user data when logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        agentName: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || prev.agentName,
        agentEmail: user.email || prev.agentEmail,
      }))
    }
  }, [isLoggedIn, user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const startListening = (fieldName: "originStory" | "areasServed" | "hobbiesInterests") => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      // Mobile-optimized settings (copied from PropBot)
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"
      recognition.maxAlternatives = 3

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        recognition.continuous = false
        recognition.interimResults = true
        recognition.speechTimeoutLength = 10000
        recognition.speechInputPossiblyComplete = 8000
      }

      let finalTranscript = ""
      let interimTranscript = ""

      recognition.onstart = () => {
        if (fieldName === "originStory") setIsListeningOrigin(true)
        if (fieldName === "areasServed") setIsListeningAreas(true)
        if (fieldName === "hobbiesInterests") setIsListeningHobbies(true)
        console.log(`Voice recognition started for ${fieldName}`)
      }

      recognition.onresult = (event: any) => {
        finalTranscript = ""
        interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        const currentText = finalTranscript || interimTranscript
        if (currentText.trim()) {
          setFormData((prev) => ({
            ...prev,
            [fieldName]: currentText.trim(),
          }))
        }

        console.log("Voice result:", { final: finalTranscript, interim: interimTranscript })
      }

      recognition.onerror = (event: any) => {
        console.error("Voice recognition error:", event.error)
        setIsListeningOrigin(false)
        setIsListeningAreas(false)
        setIsListeningHobbies(false)

        let errorMessage = "Voice recognition failed. "
        switch (event.error) {
          case "no-speech":
            errorMessage += "No speech detected. Please try again."
            break
          case "audio-capture":
            errorMessage += "Microphone not accessible. Please check permissions."
            break
          case "not-allowed":
            errorMessage += "Microphone permission denied. Please enable microphone access."
            break
          case "network":
            errorMessage += "Network error. Please check your connection."
            break
          default:
            errorMessage += "Please try typing instead."
        }

        if (event.error !== "aborted") {
          toast({
            title: "Voice Recognition Error",
            description: errorMessage,
            variant: "destructive",
          })
        }
      }

      recognition.onend = () => {
        setIsListeningOrigin(false)
        setIsListeningAreas(false)
        setIsListeningHobbies(false)
        console.log("Voice recognition ended")

        if (finalTranscript.trim()) {
          setFormData((prev) => ({
            ...prev,
            [fieldName]: finalTranscript.trim(),
          }))
        }
      }

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        navigator.mediaDevices
          ?.getUserMedia({ audio: true })
          .then(() => {
            recognition.start()
          })
          .catch((err) => {
            console.error("Microphone permission error:", err)
            toast({
              title: "Microphone Access Required",
              description: "Please allow microphone access to use voice input.",
              variant: "destructive",
            })
          })
      } else {
        recognition.start()
      }
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Voice recognition is not supported in your browser. Please try Chrome or Safari.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      console.log("Generating agent bio with data:", formData)
      const generatedBio = await generateAgentBio(formData)
      console.log("Generated bio:", generatedBio)
      setResult(generatedBio)
      setStep(4) // Go to step 4 (results)
      toast({
        title: "Bio Generated Successfully",
        description: "Your professional bio is ready!",
      })
    } catch (error) {
      console.error("Error generating bio:", error)
      toast({
        title: "Error Generating Bio",
        description: "Failed to generate bio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.bio) {
      navigator.clipboard.writeText(result.bio)
      toast({
        title: "Copied to Clipboard",
        description: "Your bio has been copied to clipboard.",
      })
    }
  }

  const downloadPDF = async () => {
    if (result?.bio) {
      setIsGeneratingPDF(true)
      try {
        const response = await fetch("/api/generate-realcoach-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
            bio: result.bio,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate PDF")
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.agentName.replace(/\s+/g, "_")}_Bio.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: "PDF Downloaded",
          description: "Your bio PDF has been downloaded successfully.",
        })
      } catch (error) {
        console.error("Error generating PDF:", error)
        toast({
          title: "PDF Generation Failed",
          description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsGeneratingPDF(false)
      }
    }
  }

  const sendEmail = async () => {
    if (result?.bio) {
      setIsSendingEmail(true)
      try {
        const bioHTML = await generateAgentBioHTML(formData, result.bio)

        const response = await fetch("/api/send-bio-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.agentEmail,
            name: formData.agentName,
            bio: result.bio,
            bioHTML: bioHTML,
          }),
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: "Email Sent Successfully",
            description: "Check your inbox for your professional bio!",
          })
        } else {
          throw new Error(data.error || "Failed to send email")
        }
      } catch (error) {
        console.error("Error sending email:", error)
        toast({
          title: "Email Sending Failed",
          description: error instanceof Error ? error.message : "Failed to send email. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSendingEmail(false)
      }
    }
  }

  const saveToProfile = async () => {
    if (!result?.bio || !isLoggedIn) {
      toast({
        title: "Save Failed",
        description: !isLoggedIn ? "Please log in to save your creations." : "No content to save.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const title = generateCreationTitle("realbio", formData)

      const success = await saveUserCreation({
        userId: user?.id || "anonymous",
        userEmail: user?.email || "",
        toolType: "realbio",
        title,
        content: result.bio,
        formData,
        metadata: {
          agentName: formData.agentName,
          yearsExperience: formData.yearsExperience,
          specialties: formData.specialties,
          tone: formData.tone,
        },
      })

      if (success) {
        toast({
          title: "Saved Successfully",
          description: "Your bio has been saved to your profile.",
        })
      } else {
        throw new Error("Save operation failed")
      }
    } catch (error) {
      console.error("Error saving to profile:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save to your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-black">Basic Information</h3>
        <p className="text-gray-600">Tell us about yourself and your real estate experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="agentName" className="flex items-center gap-2">
            Your Name *
            {isLoggedIn && user && (user.name || user.firstName) && (
              <span className="flex items-center gap-1 text-green-600 text-xs">
                <Check className="h-3 w-3" />
                Auto-filled
              </span>
            )}
          </Label>
          <Input
            id="agentName"
            name="agentName"
            placeholder="Enter your full name"
            value={formData.agentName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="agentEmail" className="flex items-center gap-2">
            Your Email *
            {isLoggedIn && user?.email && (
              <span className="flex items-center gap-1 text-green-600 text-xs">
                <Check className="h-3 w-3" />
                Auto-filled
              </span>
            )}
          </Label>
          <Input
            id="agentEmail"
            name="agentEmail"
            type="email"
            placeholder="Enter your email"
            value={formData.agentEmail}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsExperience">Years of Experience *</Label>
        <Select
          value={formData.yearsExperience}
          onValueChange={(value) => handleSelectChange("yearsExperience", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New to real estate">New to real estate</SelectItem>
            <SelectItem value="1-2 years">1-2 years</SelectItem>
            <SelectItem value="3-5 years">3-5 years</SelectItem>
            <SelectItem value="6-10 years">6-10 years</SelectItem>
            <SelectItem value="11-15 years">11-15 years</SelectItem>
            <SelectItem value="16-20 years">16-20 years</SelectItem>
            <SelectItem value="20+ years">20+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialties">Your Specialties *</Label>
        <Input
          id="specialties"
          name="specialties"
          placeholder="e.g. First-time buyers, luxury homes, investment properties"
          value={formData.specialties}
          onChange={handleInputChange}
          required
        />
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={!formData.agentName || !formData.agentEmail || !formData.yearsExperience || !formData.specialties}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Next: Your Story
      </Button>
    </div>
  )

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-black">Your Story</h3>
        <p className="text-gray-600">Share what makes you unique as a real estate professional</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="originStory">Your Origin Story</Label>
        <div className="relative">
          <Textarea
            id="originStory"
            name="originStory"
            placeholder="How did you get started in real estate? What inspired you to become an agent?"
            value={formData.originStory}
            onChange={handleInputChange}
            className="min-h-[100px] pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => startListening("originStory")}
            disabled={isListeningOrigin}
          >
            {isListeningOrigin ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        {isListeningOrigin && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
            Listening... Tell your story
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="areasServed">Areas You Serve</Label>
        <div className="relative">
          <Textarea
            id="areasServed"
            name="areasServed"
            placeholder="What cities, neighborhoods, or regions do you serve?"
            value={formData.areasServed}
            onChange={handleInputChange}
            className="min-h-[80px] pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => startListening("areasServed")}
            disabled={isListeningAreas}
          >
            {isListeningAreas ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        {isListeningAreas && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
            Listening... Name your service areas
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hobbiesInterests">Hobbies & Interests</Label>
        <div className="relative">
          <Textarea
            id="hobbiesInterests"
            name="hobbiesInterests"
            placeholder="What do you enjoy doing outside of real estate? This helps clients connect with you personally."
            value={formData.hobbiesInterests}
            onChange={handleInputChange}
            className="min-h-[80px] pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => startListening("hobbiesInterests")}
            disabled={isListeningHobbies}
          >
            {isListeningHobbies ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        {isListeningHobbies && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
            Listening... Share your interests
          </div>
        )}
      </div>

      {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && (
        <div className="text-xs text-muted-foreground mt-2 p-2 bg-blue-50 rounded">
          <strong>Mobile Voice Tips:</strong> Speak clearly, hold phone close to mouth, ensure good internet connection
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => setStep(3)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Next: Final Details
        </Button>
      </div>
    </div>
  )

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-black">Final Details</h3>
        <p className="text-gray-600">Add the finishing touches to your bio</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="personalTouch">Personal Touch (Optional)</Label>
        <Textarea
          id="personalTouch"
          name="personalTouch"
          placeholder="Any additional personal information you'd like to include (family, community involvement, etc.)"
          value={formData.personalTouch}
          onChange={handleInputChange}
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="callToAction">Call to Action (Optional)</Label>
        <Textarea
          id="callToAction"
          name="callToAction"
          placeholder="How should potential clients contact you? What's your main message to them?"
          value={formData.callToAction}
          onChange={handleInputChange}
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone">Bio Tone</Label>
        <Select value={formData.tone} onValueChange={(value) => handleSelectChange("tone", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional and approachable">Professional and approachable</SelectItem>
            <SelectItem value="Warm and friendly">Warm and friendly</SelectItem>
            <SelectItem value="Confident and authoritative">Confident and authoritative</SelectItem>
            <SelectItem value="Personal and conversational">Personal and conversational</SelectItem>
            <SelectItem value="Luxury and sophisticated">Luxury and sophisticated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Bio...
            </>
          ) : (
            "Generate My Bio"
          )}
        </Button>
      </div>
    </div>
  )

  const renderStepFour = () => (
    <div ref={resultsRef} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-black">Your Professional Bio is Ready!</h3>
        <p className="text-gray-600">Here's your personalized real estate agent bio</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="text">Text Only</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{result?.bio}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="text">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <Textarea value={result?.bio || ""} readOnly className="min-h-[300px] resize-none" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          <Copy className="h-4 w-4" /> <span className="whitespace-nowrap">Copy</span>
        </Button>
        <Button
          variant="outline"
          onClick={downloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          {isGeneratingPDF ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span className="whitespace-nowrap">Download</span>
        </Button>
        <Button
          variant="outline"
          onClick={sendEmail}
          disabled={isSendingEmail}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          {isSendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          <span className="whitespace-nowrap">Email</span>
        </Button>
        <Button
          variant="outline"
          onClick={saveToProfile}
          disabled={isSaving || !result?.bio || !isLoggedIn}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span className="whitespace-nowrap">{!isLoggedIn ? "Login to Save" : "Save"}</span>
        </Button>
      </div>

      <Button
        onClick={() => {
          const newFormData = {
            agentName: isLoggedIn && user ? user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() : "",
            agentEmail: isLoggedIn && user ? user.email : "",
            yearsExperience: "",
            specialties: "",
            originStory: "",
            areasServed: "",
            hobbiesInterests: "",
            personalTouch: "",
            callToAction: "",
            tone: "Professional and approachable",
          }
          setFormData(newFormData)
          setStep(1)
          setResult(null)
        }}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Create Another Bio
      </Button>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            3
          </div>
          <div className={`h-1 w-16 ${step >= 4 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 4 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            ✓
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {step === 1 && "Basic Information"}
            {step === 2 && "Your Story"}
            {step === 3 && "Final Details"}
            {step === 4 && "Generated Bio"}
          </p>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
        {step === 4 && renderStepFour()}
      </form>
    </div>
  )
}
