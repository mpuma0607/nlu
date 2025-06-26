"use client"

import type React from "react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface RealBioFormProps {
  onGenerate: (bio: string) => void
}

const RealBioForm: React.FC<RealBioFormProps> = ({ onGenerate }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [generatedBio, setGeneratedBio] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate an API call
    setTimeout(() => {
      const simulatedBio = `Here is a bio for ${name}: ${description}. This is a simulated bio.`
      setGeneratedBio(simulatedBio)
      onGenerate(simulatedBio)
      setIsLoading(false)
    }, 1500)
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
          <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
        </CardContent>
      )}
    </Card>
  )
}

export default RealBioForm
