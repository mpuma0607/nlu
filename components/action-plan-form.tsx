"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Mail, Copy, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useActionAI } from "@/hooks/use-action-ai"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { useEmail } from "@/hooks/use-email"
import { usePDF } from "@/hooks/use-pdf"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { Save } from "lucide-react"

interface ActionPlanFormProps {
  defaultValues?: {
    prospectingFocus: string
    agentName: string
    agentSpecialty: string
    targetClient: string
    uniqueSellingPoint: string
  }
}

interface FormData {
  prospectingFocus: string
  agentName: string
  agentSpecialty: string
  targetClient: string
  uniqueSellingPoint: string
}

export function ActionPlanForm({ defaultValues }: ActionPlanFormProps) {
  const [formData, setFormData] = useState<FormData>({
    prospectingFocus: defaultValues?.prospectingFocus || "",
    agentName: defaultValues?.agentName || "",
    agentSpecialty: defaultValues?.agentSpecialty || "",
    targetClient: defaultValues?.targetClient || "",
    uniqueSellingPoint: defaultValues?.uniqueSellingPoint || "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user, isLoggedIn } = useMemberSpaceUser()
  const { toast } = useToast()
  const { generateActionPlan, result } = useActionAI()
  const { copyToClipboard, hasCopied } = useCopyToClipboard()
  const { downloadPDF } = usePDF()
  const { sendEmail } = useEmail()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      await generateActionPlan(formData)
    } catch (error) {
      console.error("Error generating action plan:", error)
      toast({
        title: "Error",
        description: "Failed to generate action plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const saveToProfile = async () => {
    if (!result || !isLoggedIn) return

    setIsSaving(true)
    try {
      const title = generateCreationTitle("action-plan", {
        prospectingFocus: formData.prospectingFocus,
        agentName: formData.agentName,
      })

      await saveUserCreation({
        userId: user?.id || "anonymous",
        contentType: "action-plan",
        title,
        content: result.actionPlan,
        metadata: {
          formData,
          generatedAt: new Date().toISOString(),
          toolUsed: "Action AI",
        },
      })

      alert("Action plan saved to your profile!")
    } catch (error) {
      console.error("Error saving action plan:", error)
      alert("Failed to save action plan. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Action Plan Generator</CardTitle>
          <CardDescription>Fill out the form below to generate a personalized action plan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prospectingFocus">Prospecting Focus</Label>
              <Input
                id="prospectingFocus"
                name="prospectingFocus"
                value={formData.prospectingFocus}
                onChange={handleChange}
                placeholder="e.g., Expired Listings"
              />
            </div>
            <div>
              <Label htmlFor="agentName">Your Name</Label>
              <Input
                id="agentName"
                name="agentName"
                value={formData.agentName}
                onChange={handleChange}
                placeholder="e.g., John Doe"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agentSpecialty">Your Specialty</Label>
              <Input
                id="agentSpecialty"
                name="agentSpecialty"
                value={formData.agentSpecialty}
                onChange={handleChange}
                placeholder="e.g., Luxury Homes"
              />
            </div>
            <div>
              <Label htmlFor="targetClient">Target Client</Label>
              <Input
                id="targetClient"
                name="targetClient"
                value={formData.targetClient}
                onChange={handleChange}
                placeholder="e.g., First-Time Home Buyers"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="uniqueSellingPoint">Unique Selling Point</Label>
            <Textarea
              id="uniqueSellingPoint"
              name="uniqueSellingPoint"
              value={formData.uniqueSellingPoint}
              onChange={handleChange}
              placeholder="e.g., Expert negotiator with 15 years of experience."
            />
          </div>
          <Button disabled={isGenerating} onClick={handleSubmit}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Action Plan"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && result.actionPlan && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Action Plan</CardTitle>
            <CardDescription>Here is your personalized action plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea readOnly value={result.actionPlan} className="resize-none" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Button variant="outline" onClick={copyToClipboard} className="flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" /> Copy
              </Button>
              <Button
                variant="outline"
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center justify-center gap-2"
              >
                {isGeneratingPDF ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Download
              </Button>
              <Button
                variant="outline"
                onClick={sendEmail}
                disabled={isSendingEmail}
                className="flex items-center justify-center gap-2"
              >
                {isSendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Email
              </Button>
              <Button
                variant="outline"
                onClick={saveToProfile}
                disabled={isSaving || !isLoggedIn}
                className="flex items-center justify-center gap-2"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {!isLoggedIn ? "Login to Save" : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
