"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Copy, Download, Mail, X } from "lucide-react"
import { generateIdeaHubContent } from "./actions"
import { useMemberSpaceUser } from "@/hooks/useMemberSpaceUser"
import { useTenantConfig } from "@/hooks/useTenantConfig"
import { useToast } from "@/hooks/use-toast"
import { autoSaveCreation } from "@/lib/auto-save-creation"

interface IdeaHubFormProps {
  onContentGenerated?: (content: any) => void
}

export default function IdeaHubForm({ onContentGenerated }: IdeaHubFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    contentType: "",
    topic: "",
    tone: "",
    targetAudience: "",
    keyPoints: "",
    includeHashtags: false,
    includeCallToAction: false,
    customInstructions: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  const { user, loading: userLoading } = useMemberSpaceUser()
  const tenantConfig = useTenantConfig()
  const { toast } = useToast()

  // Auto-fill user data when available
  useState(() => {
    if (user && !formData.firstName) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      }))
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const result = await generateIdeaHubContent(formData)

      if (result.success && result.content) {
        setGeneratedContent(result.content)
        onContentGenerated?.(result.content)

        // Auto-save the creation
        await autoSaveCreation({
          type: "ideahub",
          title: `${formData.contentType} - ${formData.topic}`,
          content: result.content,
          metadata: {
            contentType: formData.contentType,
            topic: formData.topic,
            tone: formData.tone,
            targetAudience: formData.targetAudience,
          },
          userEmail: formData.email,
        })

        toast({
          title: "Content Generated!",
          description: "Your social media content has been created successfully.",
        })
      } else {
        throw new Error(result.error || "Failed to generate content")
      }
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    })
  }

  const downloadContent = () => {
    if (!generatedContent) return

    const content = `${generatedContent.title}\n\n${generatedContent.content}\n\n${generatedContent.hashtags || ""}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ideahub-${formData.contentType}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const sendEmail = async () => {
    if (!generatedContent || !formData.email) return

    setEmailSending(true)
    try {
      const response = await fetch("/api/ideahub-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          content: generatedContent,
          contentType: formData.contentType,
          topic: formData.topic,
        }),
      })

      if (response.ok) {
        toast({
          title: "Email Sent!",
          description: "Your content has been sent to your email.",
        })
        setShowEmailDialog(false)
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "There was an error sending the email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setEmailSending(false)
    }
  }

  if (userLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading user data...</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            {tenantConfig.branding.name} - IdeaHub AI
          </CardTitle>
          <CardDescription>
            Generate engaging social media content tailored to your real estate business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="businessName">Business/Brokerage Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                placeholder="e.g., Century 21 Beggins"
              />
            </div>

            {/* Content Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contentType">Content Type *</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, contentType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-post">Social Media Post</SelectItem>
                    <SelectItem value="blog-post">Blog Post</SelectItem>
                    <SelectItem value="email-newsletter">Email Newsletter</SelectItem>
                    <SelectItem value="property-spotlight">Property Spotlight</SelectItem>
                    <SelectItem value="market-update">Market Update</SelectItem>
                    <SelectItem value="tips-advice">Tips & Advice</SelectItem>
                    <SelectItem value="testimonial">Client Testimonial</SelectItem>
                    <SelectItem value="community-highlight">Community Highlight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tone">Tone *</Label>
                <Select
                  value={formData.tone}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, tone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="inspiring">Inspiring</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="topic">Topic/Subject *</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData((prev) => ({ ...prev, topic: e.target.value }))}
                placeholder="e.g., First-time homebuyer tips, Spring market trends"
                required
              />
            </div>

            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="e.g., First-time homebuyers, Luxury home sellers"
              />
            </div>

            <div>
              <Label htmlFor="keyPoints">Key Points to Include</Label>
              <Textarea
                id="keyPoints"
                value={formData.keyPoints}
                onChange={(e) => setFormData((prev) => ({ ...prev, keyPoints: e.target.value }))}
                placeholder="List the main points you want to cover..."
                rows={3}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeHashtags"
                  checked={formData.includeHashtags}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, includeHashtags: checked as boolean }))
                  }
                />
                <Label htmlFor="includeHashtags">Include relevant hashtags</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeCallToAction"
                  checked={formData.includeCallToAction}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, includeCallToAction: checked as boolean }))
                  }
                />
                <Label htmlFor="includeCallToAction">Include call-to-action</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="customInstructions">Custom Instructions</Label>
              <Textarea
                id="customInstructions"
                value={formData.customInstructions}
                onChange={(e) => setFormData((prev) => ({ ...prev, customInstructions: e.target.value }))}
                placeholder="Any specific requirements or style preferences..."
                rows={2}
              />
            </div>

            <Button
              type="submit"
              disabled={
                isGenerating ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.contentType ||
                !formData.tone ||
                !formData.topic
              }
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Generated Content Display */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Content</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContent.content)}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadContent}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowEmailDialog(true)}>
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent.title && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Title:</h3>
                <p className="text-gray-700">{generatedContent.title}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-lg mb-2">Content:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{generatedContent.content}</p>
              </div>
            </div>

            {generatedContent.hashtags && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Hashtags:</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.hashtags.split(" ").map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.callToAction && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Call to Action:</h3>
                <p className="text-gray-700 font-medium">{generatedContent.callToAction}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Email Dialog */}
      {showEmailDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Send Content via Email</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowEmailDialog(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Send this content to: <strong>{formData.email}</strong>
              </p>
              <div className="flex gap-2">
                <Button onClick={sendEmail} disabled={emailSending} className="flex-1">
                  {emailSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
