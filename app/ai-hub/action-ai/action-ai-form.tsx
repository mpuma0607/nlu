"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Target, CheckCircle, AlertCircle, Download, Copy, Sparkles } from "lucide-react"
import { generateActionPlan } from "@/components/actions"

export function ActionAIForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    prospectType: "",
    customProspectType: "",
    language: "English",
    specificGoals: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ plan: string; html: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const { user, isLoggedIn } = useMemberSpaceUser()

  // Auto-populate form when user data is available
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.firstName || user.name || "",
        email: prev.email || user.email || "",
      }))
    }
  }, [isLoggedIn, user])

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
      const response = await generateActionPlan(formData)
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate action plan")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (result?.plan) {
      await navigator.clipboard.writeText(result.plan)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (result?.html) {
      const blob = new Blob([result.html], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${formData.name}-action-plan-${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const isFormValid = formData.name && formData.email && formData.prospectType && formData.language

  const prospectTypes = [
    "First-time homebuyers",
    "Luxury home buyers",
    "Investment property buyers",
    "Commercial property buyers",
    "Home sellers",
    "Expired listings",
    "FSBO (For Sale By Owner)",
    "Rental property owners",
    "Distressed property owners",
    "New construction buyers",
    "Downsizing seniors",
    "Military/VA buyers",
    "Other",
  ]

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Dutch",
  ]

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {isLoggedIn && user?.firstName && formData.name === user.firstName && (
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <CheckCircle className="h-3 w-3" />
                Auto-filled from your profile
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {isLoggedIn && user?.email && formData.email === user.email && (
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <CheckCircle className="h-3 w-3" />
                Auto-filled from your profile
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prospectType">Target Prospect Type</Label>
            <Select value={formData.prospectType} onValueChange={(value) => handleSelectChange("prospectType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select prospect type" />
              </SelectTrigger>
              <SelectContent>
                {prospectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {formData.prospectType === "Other" && (
          <div className="space-y-2">
            <Label htmlFor="customProspectType">Custom Prospect Type</Label>
            <Input
              id="customProspectType"
              name="customProspectType"
              type="text"
              placeholder="Describe your target prospects"
              value={formData.customProspectType}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="specificGoals">Specific Goals or Context (Optional)</Label>
          <Textarea
            id="specificGoals"
            name="specificGoals"
            placeholder="Any specific goals, challenges, or additional context for your action plan..."
            value={formData.specificGoals}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Action Plan...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Action Plan
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
                Action Plan Generated Successfully
              </CardTitle>
              <CardDescription className="text-green-700">
                Your personalized daily action plan is ready. You can copy, download, or email it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Plan
                    </>
                  )}
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download HTML
                </Button>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Target className="mr-1 h-3 w-3" />
                  {formData.prospectType === "Other" ? formData.customProspectType : formData.prospectType}
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {formData.language}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Daily Action Plan</CardTitle>
              <CardDescription>
                Generated for {formData.name} • {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div
                  className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: result.html }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
