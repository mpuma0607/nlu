"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Loader2, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useProStore } from "@/stores/pro"
import { useCompletion } from "ai/react"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { Skeleton } from "@/components/ui/skeleton"
import { useSubscription } from "@/hooks/use-subscription"
import { useConfettiStore } from "@/stores/confetti"
import { useAICredits } from "@/hooks/use-ai-credits"
import { useOrigin } from "@/hooks/use-origin"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { saveAs } from "file-saver"

import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { Save } from "lucide-react"

const formSchema = z.object({
  agentName: z.string().min(2, {
    message: "Agent Name must be at least 2 characters.",
  }),
  incomeGoal: z.string().min(1, {
    message: "Income Goal must be at least 1 character.",
  }),
  yearsOfExperience: z.string().min(1, {
    message: "Years of Experience must be at least 1 character.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  niche: z.string().min(2, {
    message: "Niche must be at least 2 characters.",
  }),
  uniqueSellingProposition: z.string().min(2, {
    message: "Unique Selling Proposition must be at least 2 characters.",
  }),
  targetMarket: z.string().min(2, {
    message: "Target Market must be at least 2 characters.",
  }),
  servicesOffered: z.string().min(2, {
    message: "Services Offered must be at least 2 characters.",
  }),
  marketingChannels: z.string().min(2, {
    message: "Marketing Channels must be at least 2 characters.",
  }),
  financialProjections: z.string().min(2, {
    message: "Financial Projections must be at least 2 characters.",
  }),
  competitiveAnalysis: z.string().min(2, {
    message: "Competitive Analysis must be at least 2 characters.",
  }),
  managementTeam: z.string().min(2, {
    message: "Management Team must be at least 2 characters.",
  }),
  fundingRequest: z.string().min(2, {
    message: "Funding Request must be at least 2 characters.",
  }),
  exitStrategy: z.string().min(2, {
    message: "Exit Strategy must be at least 2 characters.",
  }),
})

interface BusinessPlanFormProps {
  apiEndpoint: string
  title: string
  description: string
  example: string
}

export function BizPlanForm({ apiEndpoint, title, description, example }: BusinessPlanFormProps) {
  const router = useRouter()
  const origin = useOrigin()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [email, setEmail] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { user, isLoggedIn } = useMemberSpaceUser()

  const confetti = useConfettiStore()
  const { aiCredits, incrementAICredits, decrementAICredits } = useAICredits()
  const { toast } = useToast()
  const proStore = useProStore()
  const { isPro } = useSubscription()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: "",
      incomeGoal: "",
      yearsOfExperience: "",
      location: "",
      niche: "",
      uniqueSellingProposition: "",
      targetMarket: "",
      servicesOffered: "",
      marketingChannels: "",
      financialProjections: "",
      competitiveAnalysis: "",
      managementTeam: "",
      fundingRequest: "",
      exitStrategy: "",
    },
  })

  const prompt = `You are an expert business plan writer. You are creating a business plan for a real estate agent. The agent's name is ${form.getValues("agentName")}. Their income goal is ${form.getValues("incomeGoal")}. They have ${form.getValues("yearsOfExperience")} years of experience. They are located in ${form.getValues("location")}. Their niche is ${form.getValues("niche")}. Their unique selling proposition is ${form.getValues("uniqueSellingProposition")}. Their target market is ${form.getValues("targetMarket")}. Their services offered are ${form.getValues("servicesOffered")}. Their marketing channels are ${form.getValues("marketingChannels")}. Their financial projections are ${form.getValues("financialProjections")}. Their competitive analysis is ${form.getValues("competitiveAnalysis")}. Their management team is ${form.getValues("managementTeam")}. Their funding request is ${form.getValues("fundingRequest")}. Their exit strategy is ${form.getValues("exitStrategy")}.`

  const { result, isLoading, setInput, handleSubmit, handleInputChange, setCompletion } = useCompletion({
    api: apiEndpoint,
    body: {
      prompt,
    },
    onFinish: (output) => {
      if (!output) {
        return
      }

      if (!isPro) {
        confetti.onOpen()
        incrementAICredits()
      }
    },
    onError: (error: any) => {
      // Consider logging the error to a service like Sentry
      console.error("Completion error:", error)
      toast({
        title: "Something went wrong!",
        description: "Please try again. If the error persists, contact support.",
        variant: "destructive",
      })
    },
  })

  const debouncedPrompt = useDebounce(prompt, 500)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result?.businessPlan || "")
    toast({
      title: "Copied to clipboard!",
    })
  }

  const downloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Business Plan",
          content: result?.businessPlan,
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const blob = await res.blob()
      saveAs(blob, "business-plan.pdf")
      toast({
        title: "Downloaded PDF!",
      })
    } catch (error) {
      console.error("Error generating or downloading PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const sendEmail = async () => {
    if (!result?.businessPlan) {
      toast({
        title: "Error",
        description: "No business plan generated yet.",
        variant: "destructive",
      })
      return
    }

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    setIsSendingEmail(true)
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Your Business Plan",
          text: result?.businessPlan,
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      toast({
        title: "Email sent!",
      })
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  const saveToProfile = async () => {
    if (!result || !isLoggedIn) return

    setIsSaving(true)
    try {
      const title = generateCreationTitle("business-plan", {
        agentName: formData.agentName,
        incomeGoal: formData.incomeGoal,
      })

      await saveUserCreation({
        userId: user?.id || "anonymous",
        contentType: "business-plan",
        title,
        content: result.businessPlan,
        metadata: {
          formData,
          generatedAt: new Date().toISOString(),
          toolUsed: "BizPlan AI",
        },
      })

      alert("Business plan saved to your profile!")
    } catch (error) {
      console.error("Error saving business plan:", error)
      alert("Failed to save business plan. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!isPro && aiCredits <= 0) {
      return proStore.onOpen()
    }

    if (!isPro) {
      decrementAICredits()
    }

    handleSubmit({
      prompt,
    })
  }

  const formData = form.getValues()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Enter the details for the business plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="agentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="incomeGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="$100,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="niche"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niche</FormLabel>
                    <FormControl>
                      <Input placeholder="Luxury Homes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uniqueSellingProposition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Selling Proposition</FormLabel>
                    <FormControl>
                      <Input placeholder="Expert negotiator" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetMarket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Market</FormLabel>
                    <FormControl>
                      <Input placeholder="First-time homebuyers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servicesOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Offered</FormLabel>
                    <FormControl>
                      <Input placeholder="Buyer and seller representation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketingChannels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marketing Channels</FormLabel>
                    <FormControl>
                      <Input placeholder="Social media, email marketing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="financialProjections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Projections</FormLabel>
                    <FormControl>
                      <Input placeholder="Projected revenue growth of 20% annually" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competitiveAnalysis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitive Analysis</FormLabel>
                    <FormControl>
                      <Input placeholder="Analysis of local real estate market" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="managementTeam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Management Team</FormLabel>
                    <FormControl>
                      <Input placeholder="Experienced real estate professionals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fundingRequest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Request</FormLabel>
                    <FormControl>
                      <Input placeholder="$50,000 for marketing and expansion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exitStrategy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exit Strategy</FormLabel>
                    <FormControl>
                      <Input placeholder="Acquisition by a larger real estate firm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    Generating <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {result?.businessPlan && (
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>Here is the generated business plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={result?.businessPlan} readOnly className="resize-none" />
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
            <div className="flex items-center space-x-2">
              <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button
                variant="outline"
                onClick={sendEmail}
                disabled={isSendingEmail}
                className="flex items-center justify-center gap-2"
              >
                {isSendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Email
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {!result && debouncedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>Thinking...</CardTitle>
            <CardDescription>We are generating the business plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
