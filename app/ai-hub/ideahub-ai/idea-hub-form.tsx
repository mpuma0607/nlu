"use client"

import type React from "react"
import SpeechRecognition from "speech-recognition"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateContent } from "./actions"
import { Loader2, Copy, Download, Mail, Mic, MicOff } from "lucide-react"
import Image from "next/image"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"

const topicOptions = [
  "The benefits of working with a real estate agent",
  "How to prepare your home for sale",
  "The process of buying a new home",
  "The importance of home inspections",
  "Tips for first-time home buyers",
  "How to stage your home for maximum appeal",
  "The benefits of owning a vacation home",
  "How to find the perfect neighborhood for your family",
  "The pros and cons of renting vs. buying",
  "How to negotiate a better deal on a home",
  "How to finance a new home",
  "How to find the best mortgage rates",
  "How to maintain and improve your credit score",
  "How to invest in real estate",
  "How to flip a house for profit",
  "How to find the best real estate deals",
  "How to make money in real estate",
  "How to create a budget for buying a new home",
  "How to handle closing costs",
  "How to find the right property management company",
  "How to choose the right home insurance",
  "How to create a home maintenance schedule",
  "How to find the best home warranty plan",
  "How to create a home security plan",
  "How to create a home automation system",
  "How to design a sustainable home",
  "How to find the best architect or designer for your home",
  "How to find the best contractor for your home renovation",
  "How to create a home office space",
  "How to create a home gym",
  "How to create a home theater",
  "How to create an outdoor living space",
  "How to create a home garden",
  "How to create a home pool or spa",
  "How to create a home wine cellar or tasting room",
  "How to create a home library or study",
  "How to create a home spa or massage room",
  "How to create a home sauna or steam room",
  "How to create a home game room or arcade",
  "How to create a home bar or lounge",
  "How to create a home pet grooming room",
  "How to create a home yoga or meditation room",
  "How to create a home greenhouse or sunroom",
  "How to create a home artist studio",
  "How to create a home dance studio",
  "How to create a home music studio",
  "How to create a home photography studio",
  "How to create a home craft or sewing room",
  "A beginner's guide to real estate investing",
  "A step-by-step guide to buying your first home",
  "A guide to understanding the mortgage process",
  "A guide to home inspections and what to look for",
  "A guide to understanding property taxes",
  "A guide to the different types of mortgages",
  "A guide to the home buying process for veterans",
  "A guide to understanding home insurance",
  "A guide to home staging for sellers",
  "A guide to understanding property values and appraisals",
  "A guide to understanding closing costs",
  "A guide to understanding zoning laws and building codes",
  "A guide to understanding the real estate market",
  "A guide to understanding real estate contracts",
  "A guide to understanding home warranties",
  "A guide to understanding home security systems",
  "A guide to understanding home automation systems",
  "A guide to understanding the benefits of owning a vacation home",
  "A guide to understanding property management",
  "A guide to understanding the benefits of renting vs. buying",
  "A guide to understanding real estate trends",
  "How to buy and sell luxury properties",
  "How to buy and sell homes for first-time home buyers",
  "How to buy and sell properties for investors",
  "How to buy and sell new construction properties",
  "How to buy and sell foreclosures",
  "How to buy and sell short sales",
  "How to buy and sell rental properties",
  "How to buy and sell vacation homes",
  "How to buy and sell waterfront properties",
  "How to buy and sell beach properties",
  "How to buy and sell ski properties",
  "How to buy and sell properties on golf courses",
  "How to buy and sell farm and ranch properties",
  "How to buy and sell commercial properties",
  "Why use a real estate agent instead of going FSBO?",
  "What does 'under contract' really mean?",
  "The steps to buying your first home",
  "The importance of getting pre-approved",
  "How to win in a multiple offer situation",
  "What is earnest money and how does it work?",
  "The difference between being pre-qualified and pre-approved",
  "How interest rates affect your home buying power",
  "Understanding closing costs",
  "What is a contingency?",
  "What does a home appraisal do?",
  "What's included in a home inspection?",
  "Timeline for selling a home from listing to close",
  "What's the difference between a buyer's agent and listing agent?",
  "How to stage your home to sell faster",
  "Top home improvements that add value",
  "When is the best time of year to buy or sell?",
  "How to pick the right offer as a seller",
  "The truth about Zillow 'Zestimates'",
  "What happens at closing?",
  "5 signs you're ready to buy a home",
  "3 things every first-time buyer should know",
  "Common mistakes sellers make and how to avoid them",
  "What is a CMA and why does it matter?",
  "Why pricing your home right matters more than ever",
  "How real estate commissions work",
  "Understanding title insurance",
  "What is escrow?",
  "What is a mortgage point?",
  "Home loan types explained",
  "Understanding property taxes",
  "The home buying process from A to Z",
  "What to do if your appraisal comes in low",
  "What is a short sale?",
  "What is foreclosure?",
  "What is house hacking?",
  "What to know before buying a fixer-upper",
  "What is private mortgage insurance (PMI)?",
  "What does 'as-is' mean in real estate?",
  "How to read a real estate listing",
  "How to buy a second home or vacation property",
  "What's a 1031 exchange?",
  "How much do I need for a down payment?",
  "How to choose the right neighborhood",
  "Understanding HOA rules and fees",
  "Should you waive the inspection?",
  "What is a pocket listing?",
  "How real estate appraisers determine value",
  "What is an escalation clause?",
  "How to move without losing your mind",
  "The real cost of waiting to buy",
  "How long does it take to close?",
  "The difference between list price and sale price",
  "Tips for selling a home with pets",
  "Do I need an open house to sell my home?",
  "Tips to get your offer accepted",
  "How to sell and buy at the same time",
  "What's the difference between a pocket listing and a regular listing?",
  "What's the difference between a short sale and a foreclosure?",
  "What's the difference between a fixer-upper and a new construction home?",
  "What's the difference between a home warranty and title insurance?",
  "What's the difference between a buyer's agent and a listing agent?",
  "What's the difference between a contingency and a backup offer?",
  "What's the difference between a balloon mortgage and a conventional mortgage?",
  "What's the difference between a home office and a home gym?",
  "What's the difference between a home theater and a home cinema?",
  "What's the difference between a home automation system and a smart home?",
  "What's the difference between a home security plan and a home alarm system?",
  "What's the difference between a home staging and a home makeover?",
  "What's the difference between a home appraisal and a home valuation?",
  "What's the difference between a home inspection and a home survey?",
  "What's the difference between a home loan and a mortgage?",
  "What's the difference between a home warranty plan and a home insurance policy?",
  "What's the difference between a home staging service and a home staging kit?",
  "What's the difference between a home inspection service and a home inspection report?",
  "What's the difference between a home renovation and a home remodeling?",
  "What's the difference between a home buying process and a home selling process?",
  "What's the difference between a home staging checklist and a home staging guide?",
  "What's the difference between a home inspection checklist and a home inspection form?",
  "What's the difference between a home loan application and a home mortgage application?",
  "What's the difference between a home warranty claim and a home insurance claim?",
  "What's the difference between a home staging consultation and a home staging appointment?",
  "What's the difference between a home inspection consultation and a home inspection appointment?",
  "What's the difference between a home loan closing and a home mortgage closing?",
  "What's the difference between a home warranty policy and a home insurance policy?",
  "What's the difference between a home staging service and a home staging company?",
  "What's the difference between a home inspection service and a home inspection company?",
  "What's the difference between a home loan service and a home mortgage service?",
  "What's the difference between a home warranty service and a home insurance service?",
  "What's the difference between a home staging kit and a home staging package?",
  "What's the difference between a home inspection kit and a home inspection package?",
  "What's the difference between a home loan package and a home mortgage package?",
  "What's the difference between a home warranty package and a home insurance package?",
  "What's the difference between a home staging consultation and a home staging meeting?",
  "What's the difference between a home inspection consultation and a home inspection meeting?",
  "What's the difference between a home loan closing and a home mortgage settlement?",
  "What's the difference between a home warranty policy and a home warranty coverage?",
  "What's the difference between a home staging service and a home staging agency?",
  "What's the difference between a home inspection service and a home inspection agency?",
  "What's the difference between a home loan service and a home loan agency?",
  "What's the difference between a home warranty service and a home warranty agency?",
  "What's the difference between a home staging kit and a home staging toolkit?",
  "What's the difference between a home inspection kit and a home inspection toolkit?",
  "What's the difference between a home loan package and a home loan toolkit?",
  "What's the difference between a home warranty package and a home warranty toolkit?",
  "What's the difference between a home staging consultation and a home staging session?",
  "What's the difference between a home inspection consultation and a home inspection session?",
  "What's the difference between a home loan closing and a home loan settlement?",
  "What's the difference between a home warranty policy and a home warranty coverage?",
  "What's the difference between a home staging service and a home staging agency?",
  "What's the difference between a home inspection service and a home inspection agency?",
  "What's the difference between a home loan service and a home loan agency?",
  "What's the difference between a home warranty service and a home warranty agency?",
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
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
  tonality: string
}

type ContentResult = {
  text: string
  imageUrl: string
  imageBuffer?: Buffer
}

export default function IdeaHubForm() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormState>({
    primaryTopic: "",
    alternateTopic: "",
    language: "English",
    name: "",
    email: "",
    contentType: "Social post",
    tonality: "Professional & Authoritative",
  })
  const [result, setResult] = useState<ContentResult | null>(null)

  const [isListening, setIsListening] = useState(false)
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null)
  const [activeField, setActiveField] = useState<string | null>(null)

  const { user, loading: userLoading } = useMemberSpaceUser()

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

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== "undefined" && SpeechRecognition) {
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = formData.language === "Spanish" ? "es-ES" : "en-US"

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        if (activeField) {
          setFormData((prev) => ({ ...prev, [activeField]: transcript }))
        }
        setIsListening(false)
        setActiveField(null)
      }

      recognition.onerror = () => {
        setIsListening(false)
        setActiveField(null)
      }

      recognition.onend = () => {
        setIsListening(false)
        setActiveField(null)
      }

      setRecognitionInstance(recognition)
    }
  }, [formData.language, activeField])

  // Auto-fill user data from MemberSpace
  useEffect(() => {
    if (user && !userLoading) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }))
    }
  }, [user, userLoading])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const startListening = (fieldName: string) => {
    if (recognitionInstance && !isListening) {
      setActiveField(fieldName)
      setIsListening(true)
      recognitionInstance.start()
    }
  }

  const stopListening = () => {
    if (recognitionInstance && isListening) {
      recognitionInstance.stop()
      setIsListening(false)
      setActiveField(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const generatedContent = await generateContent(formData)
      setResult(generatedContent)
      setStep(3)
    } catch (error) {
      console.error("Error generating content:", error)
      alert("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text)
      alert("Text copied to clipboard!")
    }
  }

  const downloadImage = () => {
    if (result?.imageUrl) {
      try {
        // Create a download link for the base64 image
        const link = document.createElement("a")
        link.href = result.imageUrl
        link.download = "social-media-image-branded.jpg"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error("Error downloading image:", error)
        alert("Failed to download image. Please try again.")
      }
    }
  }

  const sendEmail = async () => {
    if (result?.text && result?.imageUrl) {
      setIsSendingEmail(true)
      try {
        const response = await fetch("/api/ideahub", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "send-email",
            data: {
              to: formData.email,
              name: formData.name,
              content: result.text,
              imageUrl: result.imageUrl,
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
        <Label htmlFor="primaryTopic">Choose a Topic (Optional)</Label>
        <Select value={formData.primaryTopic} onValueChange={(value) => handleSelectChange("primaryTopic", value)}>
          <SelectTrigger id="primaryTopic">
            <SelectValue placeholder="Select a topic from our library" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {topicOptions.map((topic, index) => (
              <SelectItem key={index} value={topic}>
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
            name="alternateTopic"
            placeholder="Enter any custom topic or additional details you'd like to include"
            value={formData.alternateTopic}
            onChange={handleInputChange}
            className="min-h-[100px] pr-12"
          />
          {typeof window !== "undefined" && SpeechRecognition && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`absolute top-2 right-2 h-8 w-8 p-0 ${
                isListening && activeField === "alternateTopic" ? "text-red-500" : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => {
                if (isListening && activeField === "alternateTopic") {
                  stopListening()
                } else {
                  startListening("alternateTopic")
                }
              }}
            >
              {isListening && activeField === "alternateTopic" ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contentType">Content Type *</Label>
        <Select value={formData.contentType} onValueChange={(value) => handleSelectChange("contentType", value)}>
          <SelectTrigger id="contentType">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Social post">Social Post</SelectItem>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="Blog article">Blog Article</SelectItem>
            <SelectItem value="Text message">Text Message</SelectItem>
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

      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
          <SelectTrigger id="language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="Italian">Italian</SelectItem>
            <SelectItem value="Portuguese">Portuguese</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={!formData.primaryTopic && !formData.alternateTopic}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
      >
        Next
      </Button>
    </div>
  )

  const renderStepTwo = () => (
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
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isGenerating || !formData.name || !formData.email}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : (
            "Generate Content"
          )}
        </Button>
      </div>
    </div>
  )

  const renderStepThree = () => (
    <div ref={resultsRef} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-black">Your Content is Ready!</h3>
        <p className="text-gray-600">
          Here's your professionally generated social media content with Century 21 branding
        </p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="text">Text Only</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="space-y-4">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              {result?.imageUrl && (
                <div className="relative w-full h-[300px]">
                  <Image
                    src={result.imageUrl || "/placeholder.svg"}
                    alt="Generated content image with Century 21 branding"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="whitespace-pre-wrap text-gray-800">{result?.text}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="text">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <Textarea value={result?.text || ""} readOnly className="min-h-[300px] resize-none" />
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
          <Copy className="h-4 w-4" /> <span className="whitespace-nowrap">Copy</span>
        </Button>
        <Button
          variant="outline"
          onClick={downloadImage}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          <Download className="h-4 w-4" /> <span className="whitespace-nowrap">Download</span>
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
      </div>

      <Button
        onClick={() => {
          setStep(1)
          setResult(null)
          setFormData({
            primaryTopic: "",
            alternateTopic: "",
            language: "English",
            name: "",
            email: "",
            contentType: "Social post",
            tonality: "Professional & Authoritative",
          })
        }}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
      >
        Create New Content
      </Button>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? "bg-purple-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? "bg-purple-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
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
