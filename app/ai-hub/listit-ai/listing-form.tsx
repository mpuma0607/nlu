"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateListingDescription, generateListingHTML } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"

type FormState = {
  propertyAddress: string
  listingPrice: string
  bedrooms: string
  bathrooms: string
  squareFootage: string
  propertyDescription: string
  agentName: string
  agentEmail: string
}

type ListingResult = {
  description: string
}

export default function ListingForm() {
  const { toast } = useToast()
  const resultsRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isListeningDescription, setIsListeningDescription] = useState(false)
  const [formData, setFormData] = useState<FormState>({
    propertyAddress: "",
    listingPrice: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    propertyDescription: "",
    agentName: "",
    agentEmail: "",
  })
  const [result, setResult] = useState<ListingResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { user, isLoggedIn } = useMemberSpaceUser()

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

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      // Mobile-optimized settings (copied exactly from PropBot)
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
        setIsListeningDescription(true)
        console.log("Voice recognition started for property description")
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
          // REPLACE the content, don't append (this fixes the repetition issue)
          setFormData((prev) => ({
            ...prev,
            propertyDescription: currentText.trim(),
          }))
        }

        console.log("Voice result:", { final: finalTranscript, interim: interimTranscript })
      }

      recognition.onerror = (event: any) => {
        console.error("Voice recognition error:", event.error)
        setIsListeningDescription(false)

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
            errorMessage += "Please try typing your description instead."
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
        setIsListeningDescription(false)
        console.log("Voice recognition ended")

        if (finalTranscript.trim()) {
          setFormData((prev) => ({
            ...prev,
            propertyDescription: finalTranscript.trim(),
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
      // Format the price if it doesn't already have a $ sign
      if (!formData.listingPrice.includes("$")) {
        // Try to parse the price as a number
        const priceNum = Number.parseFloat(formData.listingPrice.replace(/,/g, ""))
        if (!isNaN(priceNum)) {
          // Format with $ and commas
          formData.listingPrice = `$${priceNum.toLocaleString()}`
        } else {
          // If not a valid number, just add $ prefix
          formData.listingPrice = `$${formData.listingPrice}`
        }
      }

      // Also ensure commas in the price even if $ is already there
      if (formData.listingPrice.includes("$") && !formData.listingPrice.includes(",")) {
        const priceWithoutSymbol = formData.listingPrice.replace("$", "")
        const priceNum = Number.parseFloat(priceWithoutSymbol)
        if (!isNaN(priceNum)) {
          formData.listingPrice = `$${priceNum.toLocaleString()}`
        }
      }

      console.log("Generating listing description with data:", formData)
      const generatedListing = await generateListingDescription(formData)
      console.log("Generated listing:", generatedListing)
      setResult(generatedListing)
      setStep(3) // Go to step 3 (results)
      toast({
        title: "Listing Description Generated Successfully",
        description: "Your professional listing description is ready!",
      })
    } catch (error) {
      console.error("Error generating listing description:", error)
      toast({
        title: "Error Generating Description",
        description: "Failed to generate listing description. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.description) {
      navigator.clipboard.writeText(result.description)
      toast({
        title: "Copied to Clipboard",
        description: "Your listing description has been copied to clipboard.",
      })
    }
  }

  const downloadPDF = async () => {
    if (result?.description) {
      setIsGeneratingPDF(true)
      try {
        // Call API route to generate and download PDF (same pattern as RealBio)
        const response = await fetch("/api/generate-listing-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
            description: result.description,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate PDF")
        }

        // Get the PDF blob
        const blob = await response.blob()

        // Create download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.propertyAddress.replace(/\s+/g, "_")}_Listing_Description.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: "PDF Downloaded",
          description: "Your listing description PDF has been downloaded successfully.",
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
    if (result?.description) {
      setIsSendingEmail(true)
      try {
        // Generate HTML for email
        const listingHTML = await generateListingHTML(formData, result.description)

        // Send email via API route
        const response = await fetch("/api/send-listing-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.agentEmail,
            name: formData.agentName,
            description: result.description,
            propertyAddress: formData.propertyAddress,
            listingPrice: formData.listingPrice,
            listingHTML: listingHTML,
          }),
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: "Email Sent Successfully",
            description: "Check your inbox for your professional listing description!",
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
    if (!result?.description || !isLoggedIn) {
      toast({
        title: "Save Failed",
        description: !isLoggedIn ? "Please log in to save your creations." : "No content to save.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const title = generateCreationTitle("listit-ai", formData)

      const success = await saveUserCreation({
        userId: user?.id || "anonymous",
        userEmail: user?.email || "",
        toolType: "listit-ai",
        title,
        content: result.description,
        formData,
        metadata: {
          propertyAddress: formData.propertyAddress,
          listingPrice: formData.listingPrice,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          squareFootage: formData.squareFootage,
          propertyDescription: formData.propertyDescription,
          agentName: formData.agentName,
          agentEmail: formData.agentEmail,
        },
      })

      if (success) {
        toast({
          title: "Saved Successfully",
          description: "Your listing description has been saved to your profile.",
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
        <h3 className="text-lg font-semibold text-black">Property Information</h3>
        <p className="text-gray-600">Enter the basic details about the property</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyAddress">Property Address *</Label>
        <Input
          id="propertyAddress"
          name="propertyAddress"
          placeholder="Enter the full property address"
          value={formData.propertyAddress}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="listingPrice">Listing Price *</Label>
        <Input
          id="listingPrice"
          name="listingPrice"
          placeholder="e.g. $450,000"
          value={formData.listingPrice}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms *</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            placeholder="e.g. 3"
            value={formData.bedrooms}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms *</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            placeholder="e.g. 2.5"
            value={formData.bathrooms}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="squareFootage">Square Footage *</Label>
          <Input
            id="squareFootage"
            name="squareFootage"
            placeholder="e.g. 2,100"
            value={formData.squareFootage}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={
          !formData.propertyAddress ||
          !formData.listingPrice ||
          !formData.bedrooms ||
          !formData.bathrooms ||
          !formData.squareFootage
        }
        className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
      >
        Next: Property Description
      </Button>
    </div>
  )

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-black">Property Description</h3>
        <p className="text-gray-600">Describe the property features, amenities, and highlights</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyDescription">Property Description *</Label>
        <div className="relative">
          <Textarea
            id="propertyDescription"
            name="propertyDescription"
            placeholder="Describe the property features, amenities, and what makes it special. For example: This house has a newly renovated kitchen with granite countertops, spacious backyard with covered patio, open floor plan with hardwood floors, master suite with walk-in closet, and is located in a prime area near schools and shopping..."
            value={formData.propertyDescription}
            onChange={handleInputChange}
            className="min-h-[150\
