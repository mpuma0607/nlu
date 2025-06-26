"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Loader2, Mail, Save } from "lucide-react"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"

interface IdeaFormData {
  topic: string
  audience: string
  platform: string
  tone: string
  contentType: string
  additionalContext: string
}

interface IdeaResult {
  content: string
  imageUrl?: string
  hashtags?: string[]
}

export default function IdeaHubForm() {
  const [formData, setFormData] = useState<IdeaFormData>({
    topic: "",
    audience: "",
    platform: "",
    tone: "",
    contentType: "",
    additionalContext: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<IdeaResult | null>(null)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useMemberSpaceUser()

  const handleInputChange = (field: keyof IdeaFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/ideahub-v2", {
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
    if (result?.content) {
      navigator.clipboard.writeText(result.content)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    }
  }

  const downloadContent = () => {
    if (result?.content) {
      const blob = new Blob([result.content], { type: "text/plain" })
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

  const sendEmail = async () => {
    if (result) {
      setIsEmailLoading(true)
      try {
        const response = await fetch("/api/ideahub-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: result.content,
            imageUrl: result.imageUrl,
            formData: formData,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        toast({
          title: "Email Sent!",
          description: "Content idea sent to your email.",
        })
      } catch (error: any) {
        console.error("Error sending email:", error)
        toast({
          title: "Error",
          description: "Failed to send email.",
          variant: "destructive",
        })
      } finally {
        setIsEmailLoading(false)
      }
    }
  }

  const saveToDashboard = async () => {
    if (result && user?.email) {
      setIsSaving(true)
      try {
        const success = await saveUserCreation({
          userId: user.id || user.email,
          userEmail: user.email,
          toolType: "ideahub-ai",
          title: generateCreationTitle("ideahub-ai", formData),
          content: result.content,
          formData: formData,
          metadata: {
            imageUrl: result.imageUrl,
            hashtags: result.hashtags,
            topic: formData.topic,
            platform: formData.platform,
            audience: formData.audience,
            tone: formData.tone,
          },
        })

        if (success) {
          toast({
            title: "Saved to Dashboard",
            description: "Your content idea has been saved to your profile dashboard.",
          })
        } else {
          throw new Error("Failed to save")
        }
      } catch (error) {
        console.error("Error saving to dashboard:", error)
        toast({
          title: "Save Failed",
          description: "Failed to save to dashboard. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic/Theme</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                  placeholder="Real estate tips, home buying, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select onValueChange={(value) => handleInputChange("audience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time-buyers">First-time Buyers</SelectItem>
                    <SelectItem value="sellers">Home Sellers</SelectItem>
                    <SelectItem value="investors">Real Estate Investors</SelectItem>
                    <SelectItem value="general">General Audience</SelectItem>
                    <SelectItem value="luxury">Luxury Market</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select onValueChange={(value) => handleInputChange("platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select onValueChange={(value) => handleInputChange("tone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select onValueChange={(value) => handleInputChange("contentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Social Media Post</SelectItem>
                    <SelectItem value="story">Story/Reel</SelectItem>
                    <SelectItem value="carousel">Carousel Post</SelectItem>
                    <SelectItem value="video">Video Script</SelectItem>
                    <SelectItem value="blog">Blog Article</SelectItem>
                    <SelectItem value="email">Email Newsletter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalContext">Additional Context</Label>
              <Textarea
                id="additionalContext"
                value={formData.additionalContext}
                onChange={(e) => handleInputChange("additionalContext", e.target.value)}
                placeholder="Any specific details, current trends, or requirements..."
                className="min-h-[100px]"
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
              <p className="whitespace-pre-wrap">{result.content}</p>
            </div>
            {result.hashtags && result.hashtags.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Suggested Hashtags:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.hashtags.map((hashtag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Button variant="outline" onClick={copyToClipboard} className="flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" />
                <span className="whitespace-nowrap">Copy</span>
              </Button>
              <Button variant="outline" onClick={downloadContent} className="flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                <span className="whitespace-nowrap">Download</span>
              </Button>
              <Button
                variant="outline"
                onClick={sendEmail}
                disabled={isEmailLoading}
                className="flex items-center justify-center gap-2"
              >
                {isEmailLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                <span className="whitespace-nowrap">Email</span>
              </Button>
              <Button
                variant="outline"
                onClick={saveToDashboard}
                disabled={isSaving || !user?.email}
                className="flex items-center justify-center gap-2"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span className="whitespace-nowrap">Save</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
