"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { Copy, Download, Loader2, Mail, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"

const formSchema = z.object({
  goalText: z.string().min(2, {
    message: "Goal must be at least 2 characters.",
  }),
  style: z.string().min(2, {
    message: "Style must be at least 2 characters.",
  }),
  format: z.string().min(2, {
    message: "Format must be at least 2 characters.",
  }),
})

interface GoalScreenFormProps {
  setResult: (result: any) => void
  setLoading: (loading: boolean) => void
  result: any
}

export default function GoalScreenForm({ setResult, setLoading, result }: GoalScreenFormProps) {
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useMemberSpaceUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalText: "",
      style: "Abstract",
      format: "Wallpaper",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setResult(null)
    try {
      const response = await fetch("/api/goal-screen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to generate image.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.imageUrl) {
      navigator.clipboard.writeText(result.imageUrl)
      toast({
        title: "Copied!",
        description: "Image URL copied to clipboard.",
      })
    }
  }

  const downloadImage = () => {
    if (result?.imageUrl) {
      const link = document.createElement("a")
      link.href = result.imageUrl
      link.download = "goal-wallpaper.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({
        title: "Downloading...",
        description: "Image download started.",
      })
    }
  }

  const sendEmail = async () => {
    if (result?.imageUrl) {
      setIsSendingEmail(true)
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: result.imageUrl }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        toast({
          title: "Email Sent!",
          description: "Image sent to your email address.",
        })
      } catch (error: any) {
        console.error("Error sending email:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to send email.",
          variant: "destructive",
        })
      } finally {
        setIsSendingEmail(false)
      }
    }
  }

  const saveToDashboard = async () => {
    if (result?.imageUrl && user?.email) {
      setIsSaving(true)
      try {
        const success = await saveUserCreation({
          userId: user.id || user.email,
          userEmail: user.email,
          toolType: "goalscreen-ai",
          title: generateCreationTitle("goalscreen-ai", form.getValues()),
          content: `Goal Wallpaper: ${form.getValues().goalText}`,
          formData: form.getValues(),
          metadata: {
            imageUrl: result.imageUrl,
            goalText: form.getValues().goalText,
            style: form.getValues().style,
            format: form.getValues().format,
          },
        })

        if (success) {
          toast({
            title: "Saved to Dashboard",
            description: "Your goal wallpaper has been saved to your profile dashboard.",
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
          <CardTitle>Goal Screen AI</CardTitle>
          <CardDescription>Enter your goal and desired style to generate a motivational wallpaper.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="goalText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Goal</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Run a marathon" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Abstract">Abstract</SelectItem>
                        <SelectItem value="Minimalist">Minimalist</SelectItem>
                        <SelectItem value="Nature">Nature</SelectItem>
                        <SelectItem value="Geometric">Geometric</SelectItem>
                        <SelectItem value="Inspirational">Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Wallpaper">Wallpaper</SelectItem>
                        <SelectItem value="Poster">Poster</SelectItem>
                        <SelectItem value="Mobile Wallpaper">Mobile Wallpaper</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Generate</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && result.imageUrl && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Goal Wallpaper</CardTitle>
            <CardDescription>Here is your generated wallpaper. Download or share it!</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={result.imageUrl || "/placeholder.svg"} alt="Goal Wallpaper" className="rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
              <Button variant="outline" onClick={copyToClipboard} className="flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" /> <span className="whitespace-nowrap">Copy</span>
              </Button>
              <Button variant="outline" onClick={downloadImage} className="flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> <span className="whitespace-nowrap">Download</span>
              </Button>
              <Button
                variant="outline"
                onClick={sendEmail}
                disabled={isSendingEmail}
                className="flex items-center justify-center gap-2"
              >
                {isSendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
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
