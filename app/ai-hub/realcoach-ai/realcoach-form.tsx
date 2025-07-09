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
import { Loader2, Target, CheckCircle, AlertCircle, Copy, Sparkles, Mail, User } from "lucide-react"
import { generateCoachingAdvice } from "./actions"

export function RealCoachForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    currentChallenges: "",
    goals: "",
    marketArea: "",
    businessType: "",
    specificQuestions: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

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
    setEmailSent(false)

    try {
      const response = await generateCoachingAdvice(formData)
      if (response.success) {
        setResult(response.advice)
        setEmailSent(true)
      } else {
        setError(response.error || "Failed to generate coaching advice")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate coaching advice")
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

  const isFormValid =
    formData.name && formData.email && formData.experience && formData.currentChallenges && formData.goals

  const experienceLevels = [
    "New Agent (0-1 years)",
    "Developing Agent (1-3 years)",
    "Experienced Agent (3-7 years)",
    "Veteran Agent (7-15 years)",
    "Top Producer (15+ years)",
    "Team Leader/Broker",
  ]

  const businessTypes = [
    "Individual Agent",
    "Team Member",
    "Team Leader",
    "Broker/Owner",
    "New Construction Sales",
    "Commercial Agent",
    "Property Manager",
    "Real Estate Investor",
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
            <Label htmlFor="experience">Experience Level</Label>
            <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select value={formData.businessType} onValueChange={(value) => handleSelectChange("businessType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marketArea">Market Area</Label>
          <Input
            id="marketArea"
            name="marketArea"
            type="text"
            placeholder="e.g., Miami-Dade County, FL or Downtown Seattle, WA"
            value={formData.marketArea}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentChallenges">Current Challenges</Label>
          <Textarea
            id="currentChallenges"
            name="currentChallenges"
            placeholder="Describe your biggest challenges right now (e.g., lead generation, closing deals, time management, market competition...)"
            value={formData.currentChallenges}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goals">Goals & Objectives</Label>
          <Textarea
            id="goals"
            name="goals"
            placeholder="What are your short-term and long-term goals? (e.g., close 20 deals this year, build a team, increase income to $200K...)"
            value={formData.goals}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specificQuestions">Specific Questions (Optional)</Label>
          <Textarea
            id="specificQuestions"
            name="specificQuestions"
            placeholder="Any specific questions you'd like coaching on? (e.g., How to handle price objections, Best CRM systems, Social media strategies...)"
            value={formData.specificQuestions}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Coaching Session...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get Coaching Advice
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

      {emailSent && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Coaching session sent successfully to {formData.email}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <User className="h-5 w-5" />
                Your Personalized Coaching Session
              </CardTitle>
              <CardDescription className="text-blue-700">
                Coaching advice generated for {formData.name} • {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Coaching Complete
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Mail className="h-3 w-3 mr-1" />
                  Email Sent
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Target className="h-3 w-3 mr-1" />
                  {formData.experience}
                </Badge>
              </div>
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Coaching Advice
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Coaching Session</CardTitle>
              <CardDescription>Personalized advice based on your experience level and goals</CardDescription>
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
