"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Save } from "lucide-react"
import { generateRealBio } from "@/lib/realbio-actions"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation } from "@/lib/user-creations"
import { toast } from "sonner"

interface FormData {
  fullName: string
  yearsInRealEstate: string
  specialties: string
  personalBackground: string
  achievements: string
  personalInterests: string
  communityInvolvement: string
  uniqueSellingPoints: string
  tone: string
  length: string
}

interface RealBioFormProps {
  onGenerate: (bio: string, formData: FormData) => void
  isGenerating: boolean
}

export function RealBioForm({ onGenerate, isGenerating }: RealBioFormProps) {
  const { user } = useMemberSpaceUser()
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    yearsInRealEstate: "",
    specialties: "",
    personalBackground: "",
    achievements: "",
    personalInterests: "",
    communityInvolvement: "",
    uniqueSellingPoints: "",
    tone: "professional",
    length: "medium",
  })

  const [isListening, setIsListening] = useState(false)
  const [currentField, setCurrentField] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Auto-populate user data
  useEffect(() => {
    if (user?.name && !formData.fullName) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name,
      }))
    }
  }, [user, formData.fullName])

  const startListening = (fieldName: string) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    // Mobile optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = "en-US"

    if (isMobile) {
      recognitionRef.current.maxAlternatives = 1
    }

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setCurrentField(fieldName)
    }

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      const currentText = (finalTranscript || interimTranscript).trim()

      if (currentText) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: currentText, // REPLACE instead of append
        }))
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
      setCurrentField(null)

      if (event.error === "not-allowed") {
        alert("Microphone access denied. Please allow microphone access and try again.")
      } else if (event.error === "no-speech") {
        alert("No speech detected. Please try again.")
      }
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
      setCurrentField(null)
    }

    try {
      recognitionRef.current.start()
    } catch (error) {
      console.error("Error starting speech recognition:", error)
      setIsListening(false)
      setCurrentField(null)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setCurrentField(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      alert("Please enter your full name.")
      return
    }

    try {
      const bio = await generateRealBio(formData)
      onGenerate(bio, formData)
    } catch (error) {
      console.error("Error generating bio:", error)
      alert("Failed to generate bio. Please try again.")
    }
  }

  const handleSave = async () => {
    if (!user?.id) {
      toast.error("Please log in to save your work")
      return
    }

    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name before saving")
      return
    }

    setIsSaving(true)
    try {
      await saveUserCreation({
        userId: user.id,
        toolName: "RealBio AI",
        creationType: "bio_form",
        content: JSON.stringify(formData),
        metadata: {
          fullName: formData.fullName,
          tone: formData.tone,
          length: formData.length,
        },
      })
      toast.success("Bio form saved successfully!")
    } catch (error) {
      console.error("Error saving bio form:", error)
      toast.error("Failed to save bio form")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Real Estate Bio Generator</CardTitle>
        <CardDescription>
          Create a professional real estate bio that showcases your expertise and personality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="flex gap-2">
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    isListening && currentField === "fullName" ? stopListening() : startListening("fullName")
                  }
                  className={isListening && currentField === "fullName" ? "bg-red-100" : ""}
                >
                  {isListening && currentField === "fullName" ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsInRealEstate">Years in Real Estate</Label>
              <div className="flex gap-2">
                <Input
                  id="yearsInRealEstate"
                  value={formData.yearsInRealEstate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, yearsInRealEstate: e.target.value }))}
                  placeholder="e.g., 5 years, Over a decade"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    isListening && currentField === "yearsInRealEstate"
                      ? stopListening()
                      : startListening("yearsInRealEstate")
                  }
                  className={isListening && currentField === "yearsInRealEstate" ? "bg-red-100" : ""}
                >
                  {isListening && currentField === "yearsInRealEstate" ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties">Specialties & Areas of Expertise</Label>
            <div className="flex gap-2">
              <Textarea
                id="specialties"
                value={formData.specialties}
                onChange={(e) => setFormData((prev) => ({ ...prev, specialties: e.target.value }))}
                placeholder="e.g., First-time homebuyers, luxury properties, investment properties, commercial real estate"
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isListening && currentField === "specialties" ? stopListening() : startListening("specialties")
                }
                className={isListening && currentField === "specialties" ? "bg-red-100" : ""}
              >
                {isListening && currentField === "specialties" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personalBackground">Personal Background</Label>
            <div className="flex gap-2">
              <Textarea
                id="personalBackground"
                value={formData.personalBackground}
                onChange={(e) => setFormData((prev) => ({ ...prev, personalBackground: e.target.value }))}
                placeholder="Share your background, what led you to real estate, your passion for helping clients"
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isListening && currentField === "personalBackground"
                    ? stopListening()
                    : startListening("personalBackground")
                }
                className={isListening && currentField === "personalBackground" ? "bg-red-100" : ""}
              >
                {isListening && currentField === "personalBackground" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Professional Achievements</Label>
            <div className="flex gap-2">
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => setFormData((prev) => ({ ...prev, achievements: e.target.value }))}
                placeholder="Awards, certifications, sales records, recognition, etc."
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isListening && currentField === "achievements" ? stopListening() : startListening("achievements")
                }
                className={isListening && currentField === "achievements" ? "bg-red-100" : ""}
              >
                {isListening && currentField === "achievements" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personalInterests">Personal Interests & Hobbies</Label>
            <div className="flex gap-2">
              <Textarea
                id="personalInterests"
                value={formData.personalInterests}
                onChange={(e) => setFormData((prev) => ({ ...prev, personalInterests: e.target.value }))}
                placeholder="What do you enjoy outside of work? Family, sports, travel, volunteering, etc."
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isListening && currentField === "personalInterests"
                    ? stopListening()
                    : startListening("personalInterests")
                }
                className={isListening && currentField === "personalInterests" ? "bg-red-100" : ""}
              >
                {isListening && currentField === "personalInterests" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="communityInvolvement">Community Involvement</Label>
            <div className="flex gap-2">
              <Textarea
                id="communityInvolvement"
                value={formData.communityInvolvement}
                onChange={(e) => setFormData((prev) => ({ ...prev, communityInvolvement: e.target.value }))}
                placeholder="Local organizations, charities, community activities you're involved in"
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isListening && currentField === "communityInvolvement"
                    ? stopListening()
                    : startListening("communityInvolvement")
                }
                className={isListening && currentField === "communityInvolvement" ? "bg-red-100" : ""}
              >
                {isListening && currentField === "communityInvolvement" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uniqueSellingPoints">What Makes You Unique?</Label>
            <div className="flex gap-2">
              <Textarea
                id="uniqueSellingPoints"
                value={formData.uniqueSellingPoints}
                onChange={(e) => setFormData((prev) => ({ ...prev, uniqueSellingPoints: e.target.value }))}
                placeholder="What sets you apart from other agents? Your unique approach, philosophy, or strengths"
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isListening && currentField === "uniqueSellingPoints"
                    ? stopListening()
                    : startListening("uniqueSellingPoints")
                }
                className={isListening && currentField === "uniqueSellingPoints" ? "bg-red-100" : ""}
              >
                {isListening && currentField === "uniqueSellingPoints" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, tone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                  <SelectItem value="confident">Confident & Authoritative</SelectItem>
                  <SelectItem value="warm">Warm & Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Bio Length</Label>
              <Select
                value={formData.length}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, length: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (100-150 words)</SelectItem>
                  <SelectItem value="medium">Medium (200-300 words)</SelectItem>
                  <SelectItem value="long">Long (400-500 words)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isGenerating} className="flex-1">
              {isGenerating ? "Generating..." : "Generate Bio"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSave}
              disabled={isSaving || !formData.fullName.trim()}
              className="flex items-center gap-2 bg-transparent"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
