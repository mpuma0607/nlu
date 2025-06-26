"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Loader2 } from "lucide-react"

interface IdeaFormData {
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
}

interface IdeaResult {
  text: string
  imageUrl?: string
}

const topicOptions = [
  "Real Estate",
  "Finance",
  "Travel",
  "Food",
  "Fashion",
  "Technology",
  "Health",
  "Education",
  "Sports",
  "Entertainment",
]

export default function IdeaHubForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<IdeaFormData>({
    primaryTopic: "",
    alternateTopic: "",
    language: "English",
    name: "",
    email: "",
    contentType: "Social Media Post",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<IdeaResult | null>(null)

  const handleInputChange = (field: keyof IdeaFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/ideahub-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)

      toast({
        title: "Success!",
        description: "Content idea generated successfully.",
      })
    } catch (error: any) {
      console.error("Error generating idea:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to generate content idea.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    }
  }

  const downloadContent = () => {
    if (result?.text) {
      const blob = new Blob([result.text], { type: "text/plain" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "content-idea.txt"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast({
        title: "Downloaded!",
        description: "Content downloaded as text file.",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>IdeaHub AI</CardTitle>
          <CardDescription>
            Generate creative content ideas for your social media and marketing campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryTopic">Primary Topic</Label>
                  <Select onValueChange={(value) => handleInputChange("primaryTopic", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
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
                  <Label htmlFor="alternateTopic">Alternate Topic</Label>
                  <Input
                    id="alternateTopic"
                    placeholder="Enter an alternate topic"
                    value={formData.alternateTopic}
                    onChange={(e) => handleInputChange("alternateTopic", e.target.value)}
                  />
                </div>
                <Button type="button" onClick={() => setStep(2)} className="w-full">
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select onValueChange={(value) => handleInputChange("contentType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Social Media Post">Social Media Post</SelectItem>
                      <SelectItem value="Blog Article">Blog Article</SelectItem>
                      <SelectItem value="Email Newsletter">Email Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" onClick={() => setStep(3)} className="w-full">
                  Next
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Content Idea"
                  )}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Content Idea</CardTitle>
            <CardDescription>Your AI-generated content idea is ready!</CardDescription>
          </CardHeader>
          <CardContent>
            {result.imageUrl && (
              <div className="mb-4">
                <img
                  src={result.imageUrl || "/placeholder.svg"}
                  alt="Generated content visual"
                  className="rounded-lg max-w-full h-auto"
                />
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="whitespace-pre-wrap">{result.text}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" onClick={downloadContent}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
