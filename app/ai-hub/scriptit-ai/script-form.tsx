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
import { Loader2, Copy, Download, Mail, FileText, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ScriptFormState = {
  agentName: string
  brokerageName: string
  scriptType: string
  topic: string
  customTopic: string
  additionalDetails: string
  agentEmail: string
}

type ScriptResult = {
  script: string
}

const scriptTypeOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone Call" },
  { value: "text", label: "Text Message" },
  { value: "video", label: "Video Script" },
  { value: "doorknocking", label: "Door Knocking" },
]

const topicOptions = [
  { value: "expired-listing", label: "Expired Listing" },
  { value: "first-time-homebuyer", label: "First Time Homebuyer" },
  { value: "past-client", label: "Past Client" },
  { value: "neighbor", label: "Neighbor" },
  { value: "fsbo", label: "FSBO (For Sale By Owner)" },
  { value: "homeowner-high-equity", label: "Homeowner with High Equity" },
  { value: "foreclosure", label: "Foreclosure" },
  { value: "rental", label: "Rental" },
  { value: "divorce", label: "Divorce" },
  { value: "just-sold", label: "Just Sold" },
  { value: "other", label: "Other (Custom Topic)" },
]

export default function ScriptForm() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [formData, setFormData] = useState<ScriptFormState>({
    agentName: "",
    brokerageName: "",
    scriptType: "",
    topic: "",
    customTopic: "",
    additionalDetails: "",
    agentEmail: "",
  })
  const [result, setResult] = useState<ScriptResult | null>(null)

  const resultsRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to results when they're generated
  useEffect(() => {
    if (step === 4 && result && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [step, result])

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
      console.log("Generating script with data:", formData)
      const generatedScript = await generateScript(formData)
      console.log("Generated script:", generatedScript)
      setResult(generatedScript)
      setStep(4) // Go to step 4 (results)
      toast({
        title: "Script Generated Successfully",
        description: "Your professional script is ready!",
      })
    } catch (error) {
      console.error("Error generating script:", error)
      toast({
        title: "Error Generating Script",
        description: "Failed to generate script. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.script) {
      navigator.clipboard.writeText(result.script)
      toast({
        title: "Copied to Clipboard",
        description: "Your script has been copied to clipboard.",
      })
    }
  }

  const downloadPDF = async () => {
    if (result?.script) {
      setIsGeneratingPDF(true)
      try {
        const response = await fetch("/api/generate-script-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
            script: result.script,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate PDF")
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.agentName.replace(/\s+/g, "_")}_${formData.scriptType}_Script.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: "PDF Downloaded",
          description: "Your script PDF has been downloaded successfully.",
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
    if (result?.script) {
      setIsSendingEmail(true)
      try {
        const response = await fetch("/api/send-script-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.agentEmail,
            name: formData.agentName,
            script: result.script,
            formData,
          }),
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: "Email Sent Successfully",
            description: "Check your inbox for your professional script!",
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

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-black">Agent Information</h3>
        <p className="text-gray-600">Tell us about yourself and your brokerage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="agentName">Your Name *</Label>
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
          <Label htmlFor="brokerageName">Brokerage Name *</Label>
          <Input
            id="brokerageName"
            name="brokerageName"
            placeholder="Enter your brokerage name"
            value={formData.brokerageName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={!formData.agentName || !formData.brokerageName}
        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
      >
        Next: Script Details
      </Button>
    </div>
  )

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-black">Script Configuration</h3>
        <p className="text-gray-600">Choose the type and topic for your script</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scriptType">Script Type *</Label>
        <Select value={formData.scriptType} onValueChange={(value) => handleSelectChange("scriptType", value)}>
          <SelectTrigger id="scriptType">
            <SelectValue placeholder="Select the type of script you need" />
          </SelectTrigger>
          <SelectContent>
            {scriptTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">Script Topic *</Label>
        <Select value={formData.topic} onValueChange={(value) => handleSelectChange("topic", value)}>
          <SelectTrigger id="topic">
            <SelectValue placeholder="Select the topic for your script" />
          </SelectTrigger>
          <SelectContent>
            {topicOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.topic === "other" && (
        <div className="space-y-2">
          <Label htmlFor="customTopic">Custom Topic *</Label>
          <Input
            id="customTopic"
            name="customTopic"
            placeholder="Enter your custom topic"
            value={formData.customTopic}
            onChange={handleInputChange}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
        <Textarea
          id="additionalDetails"
          name="additionalDetails"
          placeholder="Any specific details, context, or requirements for your script..."
          value={formData.additionalDetails}
          onChange={handleInputChange}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={!formData.scriptType || !formData.topic || (formData.topic === "other" && !formData.customTopic)}
          className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
        >
          Next: Contact Information
        </Button>
      </div>
    </div>
  )

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-black">Contact Information</h3>
        <p className="text-gray-600">Enter your email to receive the script</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agentEmail">Your Email Address *</Label>
        <Input
          id="agentEmail"
          name="agentEmail"
          type="email"
          placeholder="Enter your email address"
          value={formData.agentEmail}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Script Summary */}
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Script Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <span className="font-medium">Agent:</span> {formData.agentName}
              </p>
              <p>
                <span className="font-medium">Brokerage:</span> {formData.brokerageName}
              </p>
              <p>
                <span className="font-medium">Script Type:</span>{" "}
                {scriptTypeOptions.find((opt) => opt.value === formData.scriptType)?.label}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Topic:</span>{" "}
                {formData.topic === "other"
                  ? formData.customTopic
                  : topicOptions.find((opt) => opt.value === formData.topic)?.label}
              </p>
              {formData.additionalDetails && (
                <p>
                  <span className="font-medium">Details:</span> {formData.additionalDetails.substring(0, 100)}
                  {formData.additionalDetails.length > 100 && "..."}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isGenerating || !formData.agentEmail}
          className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Script...
            </>
          ) : (
            "Generate My Script"
          )}
        </Button>
      </div>
    </div>
  )

  const renderStepFour = () => (
    <div className="space-y-6" ref={resultsRef}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-black">Your Script is Ready!</h3>
        <p className="text-gray-600">
          Here's your professionally crafted{" "}
          {scriptTypeOptions.find((opt) => opt.value === formData.scriptType)?.label.toLowerCase()} script with DISC &
          VAK integration
        </p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="text">Text Only</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-black">
                  {scriptTypeOptions.find((opt) => opt.value === formData.scriptType)?.label} Script
                </h3>
                <p className="text-lg font-semibold text-orange-600">
                  Topic:{" "}
                  {formData.topic === "other"
                    ? formData.customTopic
                    : topicOptions.find((opt) => opt.value === formData.topic)?.label}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    DISC Integrated
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    VAK Enhanced
                  </span>
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                  {result?.script}
                </div>
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
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />💡 How to Use Your Script:
        </h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Practice the script until it feels natural</li>
          <li>• Customize it with specific details for each prospect</li>
          <li>• The script integrates DISC and VAK principles automatically</li>
          <li>• Focus on the call-to-action at the end</li>
          <li>• Track your results and refine as needed</li>
          <li>• Print the PDF for easy reference during calls</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
        <h5 className="font-medium text-orange-900 mb-2">🎯 DISC & VAK Integration:</h5>
        <p className="text-sm text-orange-800">
          This script incorporates language patterns that appeal to all DISC personality types (Dominant, Influential,
          Steady, Compliant) and includes VAK sensory language (Visual, Auditory, Kinesthetic) for maximum effectiveness
          with any prospect.
        </p>
      </div>

      <Button
        onClick={() => {
          setStep(1)
          setResult(null)
          setFormData({
            agentName: "",
            brokerageName: "",
            scriptType: "",
            topic: "",
            customTopic: "",
            additionalDetails: "",
            agentEmail: "",
          })
        }}
        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
      >
        Create Another Script
      </Button>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? "bg-orange-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? "bg-orange-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            3
          </div>
          <div className={`h-1 w-16 ${step >= 4 ? "bg-orange-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 4 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            ✓
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {step === 1 && "Agent Information"}
            {step === 2 && "Script Configuration"}
            {step === 3 && "Contact Information"}
            {step === 4 && "Generated Script"}
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
