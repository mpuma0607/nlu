"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation } from "@/lib/auto-save-creation"
import { generateCreationTitle } from "@/lib/user-creations"
import { Save, Loader2 } from "lucide-react"

interface RealBioFormProps {
  onGenerate: (bio: string) => void
}

const RealBioForm: React.FC<RealBioFormProps> = ({ onGenerate }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [generatedBio, setGeneratedBio] = useState<string | null>(null)
  const { user, isLoading: userLoading } = useMemberSpaceUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/realbio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate bio")
      }

      const data = await response.json()
      setGeneratedBio(data.bio)
      onGenerate(data.bio)

      toast({
        title: "Bio Generated!",
        description: "Your professional bio has been created successfully.",
      })
    } catch (error) {
      console.error("Error generating bio:", error)
      toast({
        title: "Error",
        description: "Failed to generate bio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (generatedBio) {
      navigator.clipboard.writeText(generatedBio)
      toast({
        title: "Copied to clipboard!",
        description: "The generated bio has been copied to your clipboard.",
      })
    }
  }

  const saveToProfile = async () => {
    if (!generatedBio || !user) return

    setIsSaving(true)
    try {
      const title = generateCreationTitle("realbio", { name })

      await saveUserCreation({
        userId: user.id,
        contentType: "realbio",
        title,
        content: generatedBio,
        metadata: {
          name,
          description,
          generatedAt: new Date().toISOString(),
        },
      })

      toast({
        title: "Saved to Profile!",
        description: "Your bio has been saved to your content dashboard.",
      })
    } catch (error) {
      console.error("Error saving bio:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save bio to your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real Bio AI</CardTitle>
        <CardDescription>Enter your information to generate a bio.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description about yourself"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Generating..." : "Generate Bio"}
        </Button>
      </CardFooter>
      {generatedBio && (
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="generated-bio">Generated Bio</Label>
            <Textarea id="generated-bio" value={generatedBio} readOnly />
          </div>
          <div className="flex gap-2">
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
            <Button onClick={saveToProfile} disabled={!user || isSaving} variant="outline">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {user ? "Save to Profile" : "Login to Save"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default RealBioForm
