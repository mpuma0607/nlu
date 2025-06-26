"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateAgentBio } from "../lib/realbio-actions"
import { Loader2, Copy, Mail, User, Download, FileText, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation } from "@/lib/auto-save-creation"

type BioFormState = {
  name: string
  brokerage: string
  timeInIndustry: string
  origin: string
  areasServed: string
  hobbies: string
  email: string
}

type BioResult = {
  bio: string
}

const timeInIndustryOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "11-15 years",
  "16-20 years",
  "Over 20 years",
]

export default function RealBioForm() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<BioFormState>({
    name: "",
    brokerage: "",
    timeInIndustry: "",
    origin: "",
    areasServed: "",
    hobbies: "",
    email: "",
  })
  const [result, setResult] = useState<BioResult | null>(null)
  const { user, isLoading: userLoading } = useMemberSpaceUser()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const generatedBio = await generateAgentBio(formData)
      setResult(generatedBio)
      setStep(3)
      toast({
        title: "Bio Generated Successfully",
        description: "Your professional agent bio is ready!",
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
        const response = await fetch("/api/realbio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "download-pdf",
            formData,
            bio: result.bio,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to generate PDF")
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.name.replace(/\s+/g, "_")}_Agent_Bio.pdf`
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
        const response = await fetch("/api/realbio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "send-email",
            formData,
            bio: result.bio,
          }),
        })

        const data = await response.json()
        console.log("Email response:", data) // Add this for debugging

        if (!response.ok) {
          throw new Error(data.error || "Failed to send email")
        }

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
    if (!result?.bio || !user) return

    setIsSaving(true)
    try {
      const title = `Bio for ${formData.name || "User"} - ${new Date().toLocaleDateString()}`

      await saveUserCreation({
        userId: user.id,
        contentType: "realbio",
        title,
        content: result.bio,
        metadata: {
          name: formData.name,
          brokerage: formData.brokerage,
          timeInIndustry: formData.timeInIndustry,
          origin: formData.origin,
          areasServed: formData.areasServed,
          hobbies: formData.hobbies,
          generatedAt: new Date().toISOString(),
        },
      })

      toast({
        title: "Saved to Profile!",
        description: "Your bio has been saved to your content dashboard.",
      })
    } catch (error) {
      console.error("Error saving bio:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save bio to your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brokerage">Brokerage Name *</Label>
          <Input
            id="brokerage"
            name="brokerage"
            placeholder="Enter your brokerage name"
            value={formData.brokerage}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeInIndustry">Time in Industry *</Label>
        <Select value={formData.timeInIndustry} onValueChange={(value) => handleSelectChange("timeInIndustry", value)}>
          <SelectTrigger id="timeInIndustry">
            <SelectValue placeholder="Select how long you've been in real estate" />
          </SelectTrigger>
          <SelectContent>
            {timeInIndustryOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="origin">Your Origin Story *</Label>
        <Textarea
          id="origin"
          name="origin"
          placeholder="Tell us about your background - what led you to real estate? What's your story? (e.g., former teacher, military background, local native, etc.)"
          value={formData.origin}
          onChange={handleInputChange}
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="areasServed">Areas You Serve *</Label>
        <Textarea
          id="areasServed"
          name="areasServed"
          placeholder="List the cities, neighborhoods, or regions you serve (e.g., Downtown Miami, Coral Gables, Aventura, etc.)"
          value={formData.areasServed}
          onChange={handleInputChange}
          className="min-h-[80px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hobbies">Personal Interests & Hobbies *</Label>
        <Textarea
          id="hobbies"
          name="hobbies"
          placeholder="Share your hobbies, interests, and what you enjoy outside of real estate (e.g., hiking, cooking, volunteering, sports, travel, etc.)"
          value={formData.hobbies}
          onChange={handleInputChange}
          className="min-h-[80px]"
          required
        />
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={
          !formData.name ||
          !formData.brokerage ||
          !formData.timeInIndustry ||
          !formData.origin ||
          !formData.areasServed ||
          !formData.hobbies
        }
        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
      >
        Next
      </Button>
    </div>
  )

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Your Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email to receive your bio"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Preview of entered information */}
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
            <User className="h-4 w-4" />
            Bio Preview Information
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Name:</span> {formData.name}
            </p>
            <p>
              <span className="font-medium">Brokerage:</span> {formData.brokerage}
            </p>
            <p>
              <span className="font-medium">Experience:</span> {formData.timeInIndustry}
            </p>
            <p>
              <span className="font-medium">Areas Served:</span> {formData.areasServed}
            </p>
            <p>
              <span className="font-medium">Background:</span> {formData.origin.substring(0, 100)}
              {formData.origin.length > 100 && "..."}
            </p>
            <p>
              <span className="font-medium">Interests:</span> {formData.hobbies.substring(0, 100)}
              {formData.hobbies.length > 100 && "..."}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isGenerating || !formData.email}
          className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
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

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-black">Your Professional Bio is Ready!</h3>
        <p className="text-gray-600">Here's your compelling, professionally crafted agent bio</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-black mb-4">Your Agent Bio:</h4>
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{result?.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Button variant="outline" onClick={copyToClipboard} className="flex items-center justify-center gap-2">
          <Copy className="h-4 w-4" /> <span className="whitespace-nowrap">Copy</span>
        </Button>
        <Button
          variant="outline"
          onClick={downloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center justify-center gap-2"
        >
          {isGeneratingPDF ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span className="whitespace-nowrap">Download</span>
        </Button>
        <Button
          variant="outline"
          onClick={sendEmail}
          disabled={isSendingEmail}
          className="flex items-center justify-center gap-2"
        >
          {isSendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          <span className="whitespace-nowrap">Email</span>
        </Button>
        <Button
          variant="outline"
          onClick={saveToProfile}
          disabled={!user || isSaving}
          className="flex items-center justify-center gap-2"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span className="whitespace-nowrap">{user ? "Save" : "Login to Save"}</span>
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />💡 How to Use Your Bio:
        </h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Add it to your website's "About" page</li>
          <li>• Use it in your social media profiles</li>
          <li>• Include it in marketing materials and brochures</li>
          <li>• Add it to your email signature</li>
          <li>• Use it for speaking engagements and networking events</li>
          <li>• Print the PDF for professional presentations</li>
        </ul>
      </div>

      <Button
        onClick={() => {
          setStep(1)
          setResult(null)
          setFormData({
            name: "",
            brokerage: "",
            timeInIndustry: "",
            origin: "",
            areasServed: "",
            hobbies: "",
            email: "",
          })
        }}
        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
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
              step >= 1 ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? "bg-yellow-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? "bg-yellow-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </form>
    </div>
  )
}
