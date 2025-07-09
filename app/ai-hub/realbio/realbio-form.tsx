"\"use client"

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
import { Loader2, FileText, CheckCircle, AlertCircle, Copy, Sparkles } from "lucide-react"

export function RealBioForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    specialty: "",
    yearsInBusiness: "",
    achievements: "",
    communityInvolvement: "",
    personalInterests: "",
    style: "Professional",
    length: "Medium",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setResult(`
      ${formData.style} ${formData.length} bio for ${formData.name}:
      ${formData.name} is a real estate agent with ${formData.yearsInBusiness} years of experience.
    `)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate bio")
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
    formData.name && formData.email && formData.experience && formData.specialty && formData.yearsInBusiness

  const experienceLevels = ["New Agent", "Experienced Agent", "Top Producer"]

  const bioStyles = ["Professional", "Creative", "Humorous"]

  const bioLengths = ["Short", "Medium", "Long"]

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
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              name="specialty"
              type="text"
              placeholder="e.g., Luxury Homes, First-Time Buyers"
              value={formData.specialty}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="yearsInBusiness">Years in Business</Label>
            <Input
              id="yearsInBusiness"
              name="yearsInBusiness"
              type="number"
              placeholder="e.g., 5"
              value={formData.yearsInBusiness}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select value={formData.style} onValueChange={(value) => handleSelectChange("style", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {bioStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
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
                {bioLengths.map((length) => (
                  <SelectItem key={length} value={length}>
                    {length}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements</Label>
            <Textarea
              id="achievements"
              name="achievements"
              placeholder="e.g., Top Producer Award, Million Dollar Club"
              value={formData.achievements}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="communityInvolvement">Community Involvement</Label>
          <Textarea
            id="communityInvolvement"
            name="communityInvolvement"
            placeholder="e.g., Volunteer at local shelter, Sponsor youth sports team"
            value={formData.communityInvolvement}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="personalInterests">Personal Interests</Label>
          <Textarea
            id="personalInterests"
            name="personalInterests"
            placeholder="e.g., Hiking, Cooking, Travel"
            value={formData.personalInterests}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Bio...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Bio
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
                Bio Generated Successfully
              </CardTitle>
              <CardDescription className="text-green-700">Your professional bio is ready to use.</CardDescription>
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
                    Copy Bio
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generated Bio
              </CardTitle>
              <CardDescription>
                {formData.style} • {formData.length}
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
