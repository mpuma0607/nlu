"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FileText, CheckCircle, AlertCircle, Copy, Sparkles } from "lucide-react"
import { generateContent } from "@/components/actions"

export function ContentAIForm() {
  const [formData, setFormData] = useState({
    contentType: "",
    topic: "",
    tone: "",
    length: "",
    audience: "",
    additionalContext: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await generateContent(formData)
      if (response.success) {
        setResult(response.content)
      } else {
        setError(response.error || "Failed to generate content")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isFormValid = formData.contentType && formData.topic && formData.tone && formData.length && formData.audience

  const contentTypes = [
    "Social Media Post",
    "Email Template",
    "Blog Post",
    "Property Description",
    "Market Update",
    "Newsletter",
    "Press Release",
    "Client Letter",
    "Marketing Flyer",
    "Website Copy",
  ]

  const tones = [
    "Professional",
    "Friendly",
    "Conversational",
    "Authoritative",
    "Enthusiastic",
    "Informative",
    "Persuasive",
    "Casual",
    "Formal",
    "Inspiring",
  ]

  const lengths = [
    "Short (1-2 paragraphs)",
    "Medium (3-5 paragraphs)",
    "Long (6+ paragraphs)",
    "Brief (1-2 sentences)",
    "Extended (Multiple sections)",
  ]

  const audiences = [
    "First-time homebuyers",
    "Luxury buyers",
    "Investors",
    "Sellers",
    "General public",
    "Real estate professionals",
    "Past clients",
    "Potential clients",
    "Social media followers",
    "Email subscribers",
  ]

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={formData.contentType} onValueChange={(value) => handleSelectChange("contentType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={formData.tone} onValueChange={(value) => handleSelectChange("tone", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <Select value={formData.length} onValueChange={(value) => handleSelectChange("length", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent>
                {lengths.map((length) => (
                  <SelectItem key={length} value={length}>
                    {length}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Select value={formData.audience} onValueChange={(value) => handleSelectChange("audience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((audience) => (
                  <SelectItem key={audience} value={audience}>
                    {audience}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Topic/Subject</Label>
          <Input
            id="topic"
            name="topic"
            type="text"
            placeholder="e.g., Spring market trends, New listing in downtown, Home buying tips"
            value={formData.topic}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
          <Textarea
            id="additionalContext"
            name="additionalContext"
            placeholder="Any specific details, key points, or requirements for the content..."
            value={formData.additionalContext}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
          {isLoading ? (
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

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Content Generated Successfully
              </CardTitle>
              <CardDescription className="text-green-700">
                Your {formData.contentType.toLowerCase()} content is ready to use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generated Content
              </CardTitle>
              <CardDescription>
                {formData.contentType} • {formData.tone} tone • For {formData.audience}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                  {result}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
