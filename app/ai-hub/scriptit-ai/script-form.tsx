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
import { generateScript } from "./actions"
import { Loader2, Copy, Download, Mail, Mic, MicOff } from "lucide-react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { autoSaveCreation } from "@/lib/auto-save-creation"

const scriptTargetOptions = [
  "Current Client",
  "Past Clients",
  "Sphere of Influence (SOI)",
  "For Sale By Owner (FSBO)",
  "Expired Listings",
  "First-Time Home Buyers",
  "Luxury Home Buyers",
  "Investors",
  "Renters",
  "New Residents/Move-ins",
  "Empty Nesters",
  "Young Professionals",
  "Families with Children",
  "Military/Veterans",
  "Seniors",
  "Divorce/Life Changes",
  "Pre-foreclosure",
  "Absentee Owners",
  "High Net Worth Individuals",
  "Small Business Owners",
  "Realtors (for referrals)",
  "Mortgage Brokers",
  "Title Companies",
  "Home Inspectors",
  "Contractors",
  "Interior Designers",
  "Property Managers",
  "Insurance Agents",
  "Financial Advisors",
  "CPAs/Tax Professionals",
  "Attorneys",
  "Local Business Owners",
  "Chamber of Commerce Members",
  "Networking Groups",
  "Social Media Followers",
  "Website Visitors",
  "Open House Attendees",
  "Seminar Attendees",
  "Community Event Participants",
  "Homeowners in Specific Neighborhoods",
  "Recent Home Sellers",
  "Recent Home Buyers",
  "People Considering Selling",
  "People Considering Buying",
  "Relocating Employees",
  "Corporate Relocation Departments",
  "HR Departments",
  "Property Developers",
  "Wholesalers",
  "Fix and Flip Investors",
  "Landlords",
  "Property Management Companies",
]

const scriptTypeOptions = ["Email", "Phone Call", "Text Message", "Video Script", "Door Knocking"]

const scriptTypeCategoryOptions = [
  "Prospecting Script",
  "Follow Up Script",
  "Networking Script",
  "Difficult conversation",
]

const difficultConversationTypes = [
  "Price Reduction Request",
  "Listing Not Selling",
  "Buyer Wants to Cancel Contract",
  "Seller Unrealistic on Price",
  "Home Inspection Issues",
  "Low Appraisal Conversation",
  "Client Ghosting or Going Silent",
  "Discussing Commission Concerns",
  "Competing Agent or Friend in the Business",
  "Multiple Offers – Managing Expectations",
  "Client Not Ready to Commit",
  "Financing Fell Through",
  "Delays in Closing",
  "Expired Listing Follow-Up",
  "Termination of Representation",
  "Telling a Buyer They're Over Bidding",
  "Seller Won't Make Repairs",
  "Difficult Tenant in the Property",
  "Client Pushing for Off-Market Deals",
  "When the Market Has Shifted",
  "Unrealistic Home Search Criteria",
  "Client Making Emotional Decisions",
  "Talking About Why You're the Best Agent",
  "Explaining Market Conditions They Don't Want to Hear",
]

const tonalityOptions = [
  {
    value: "Professional & Authoritative",
    description: "Tone: Confident, knowledgeable, clear",
  },
  {
    value: "Friendly & Approachable",
    description: "Tone: Warm, conversational, down-to-earth",
  },
  {
    value: "Witty & Playful",
    description: "Tone: Lighthearted, tongue-in-cheek, surprising twists",
  },
  {
    value: "Inspirational & Motivational",
    description: "Tone: Uplifting, aspirational, empowering",
  },
  {
    value: "Educational & Informative",
    description: "Tone: Clear, explanatory, step-by-step",
  },
  {
    value: "Conversational & Story-Driven",
    description: "Tone: Narrative, personal anecdotes, dialogue style",
  },
  {
    value: "Urgent & Action-Oriented",
    description: 'Tone: Direct, brisk, focused on "now"',
  },
  {
    value: "Empathetic & Supportive",
    description: "Tone: Compassionate, understanding, reassuring",
  },
  {
    value: "Visionary & Futuristic",
    description: "Tone: Forward-looking, trend-spotting, big-picture",
  },
  {
    value: "Bold & Disruptive",
    description: "Tone: Challenging conventions, strong opinions, confident declarations",
  },
]

type FormState = {
  scriptTypeCategory: string
  difficultConversationType: string
  scriptTarget: string
  scriptType: string
  tonality: string
  additionalDetails: string
  name: string
  email: string
}

type ScriptResult = {
  script: string
}

export default function ScriptForm() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const { user } = useMemberSpaceUser()

  const [formData, setFormData] = useState<FormState>({
    scriptTypeCategory: "",
    difficultConversationType: "",
    scriptTarget: "",
    scriptType: "",
    tonality: "Professional & Authoritative",
    additionalDetails: "",
    name: "",
    email: "",
  })
  const [result, setResult] = useState<ScriptResult | null>(null)

  // Auto-fill user data from MemberSpace
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }))
    }
  }, [user])

  // Auto-scroll to results when they're generated
  useEffect(() => {
    if (result && step === 3 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [result, step])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setFormData((prev) => ({
          ...prev,
          additionalDetails: prev.additionalDetails + " " + transcript,
        }))
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

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
      const generatedScript = await generateScript(formData)
      setResult(generatedScript)
      setStep(4)

      // Auto-save the creation
      if (user?.id) {
        await autoSaveCreation({
          userId: user.id,
          toolName: "ScriptIT AI",
          content: generatedScript.script,
          metadata: {
            scriptTypeCategory: formData.scriptTypeCategory,
            difficultConversationType: formData.difficultConversationType,
            scriptTarget: formData.scriptTarget,
            scriptType: formData.scriptType,
            tonality: formData.tonality,
            additionalDetails: formData.additionalDetails,
          },
        })
      }
    } catch (error) {
      console.error("Error generating script:", error)
      alert("Failed to generate script. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.script) {
      navigator.clipboard.writeText(result.script)
      alert("Script copied to clipboard!")
    }
  }

  const downloadScript = () => {
    if (result?.script) {
      const element = document.createElement("a")
      const file = new Blob([result.script], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = "script.txt"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  const sendEmail = async () => {
    if (result?.script) {
      setIsSendingEmail(true)
      try {
        const response = await fetch("/api/send-script-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.email,
            name: formData.name,
            script: result.script,
            scriptDetails: {
              scriptTypeCategory: formData.scriptTypeCategory,
              difficultConversationType: formData.difficultConversationType,
              scriptTarget: formData.scriptTarget,
              scriptType: formData.scriptType,
              tonality: formData.tonality,
            },
          }),
        })

        const data = await response.json()

        if (data.success) {
          alert("Email sent successfully! Check your inbox.")
        } else {
          throw new Error(data.error || "Failed to send email")
        }
      } catch (error) {
        console.error("Error sending email:", error)
        alert(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setIsSendingEmail(false)
      }
    }
  }

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="scriptTypeCategory">Type of Script *</Label>
        <Select
          value={formData.scriptTypeCategory}
          onValueChange={(value) => handleSelectChange("scriptTypeCategory", value)}
        >
          <SelectTrigger id="scriptTypeCategory">
            <SelectValue placeholder="Select script type category" />
          </SelectTrigger>
          <SelectContent>
            {scriptTypeCategoryOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.scriptTypeCategory === "Difficult conversation" && (
        <div className="space-y-2">
          <Label htmlFor="difficultConversationType">Difficult Conversation Type *</Label>
          <Select
            value={formData.difficultConversationType}
            onValueChange={(value) => handleSelectChange("difficultConversationType", value)}
          >
            <SelectTrigger id="difficultConversationType">
              <SelectValue placeholder="Select conversation type" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {difficultConversationTypes.map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="scriptTarget">Script Target *</Label>
        <Select value={formData.scriptTarget} onValueChange={(value) => handleSelectChange("scriptTarget", value)}>
          <SelectTrigger id="scriptTarget">
            <SelectValue placeholder="Select your target audience" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {scriptTargetOptions.map((target, index) => (
              <SelectItem key={index} value={target}>
                {target}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tonality">Tonality</Label>
        <Select value={formData.tonality} onValueChange={(value) => handleSelectChange("tonality", value)}>
          <SelectTrigger id="tonality">
            <SelectValue placeholder="Select tonality" />
          </SelectTrigger>
          <SelectContent>
            {tonalityOptions.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                <div>
                  <div className="font-medium">{option.value}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={
          !formData.scriptTypeCategory ||
          !formData.scriptTarget ||
          (formData.scriptTypeCategory === "Difficult conversation" && !formData.difficultConversationType)
        }
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Next: Script Details
      </Button>
    </div>
  )

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="scriptType">Script Type *</Label>
        <Select value={formData.scriptType} onValueChange={(value) => handleSelectChange("scriptType", value)}>
          <SelectTrigger id="scriptType">
            <SelectValue placeholder="Select script format" />
          </SelectTrigger>
          <SelectContent>
            {scriptTypeOptions.map((type, index) => (
              <SelectItem key={index} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
        <div className="relative">
          <Textarea
            id="additionalDetails"
            name="additionalDetails"
            placeholder="Any specific details, context, or requirements for your script..."
            value={formData.additionalDetails}
            onChange={handleInputChange}
            className="min-h-[120px] pr-12"
          />
          {typeof window !== "undefined" && "webkitSpeechRecognition" in window && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4 text-gray-500" />}
            </Button>
          )}
        </div>
        {isListening && <p className="text-sm text-blue-600">Listening... Speak now</p>}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={!formData.scriptType}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Next: Contact Information
        </Button>
      </div>
    </div>
  )

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Your Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isGenerating || !formData.name || !formData.email}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Script...
            </>
          ) : (
            "Generate Script"
          )}
        </Button>
      </div>
    </div>
  )

  const renderStepFour = () => (
    <div ref={resultsRef} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-black">Your Script is Ready!</h3>
        <p className="text-gray-600">Here's your professionally generated script</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="text">Text Only</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">{result?.script}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="text">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <Textarea value={result?.script || ""} readOnly className="min-h-[400px] resize-none" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          <Copy className="h-4 w-4" /> Copy
        </Button>
        <Button
          variant="outline"
          onClick={downloadScript}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          <Download className="h-4 w-4" /> Download
        </Button>
        <Button
          variant="outline"
          onClick={sendEmail}
          disabled={isSendingEmail}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          {isSendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          Email
        </Button>
      </div>

      <Button
        onClick={() => {
          setStep(1)
          setResult(null)
          setFormData({
            scriptTypeCategory: "",
            difficultConversationType: "",
            scriptTarget: "",
            scriptType: "",
            tonality: "Professional & Authoritative",
            additionalDetails: "",
            name: user?.name || "",
            email: user?.email || "",
          })
        }}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Create New Script
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
            4
          </div>
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
