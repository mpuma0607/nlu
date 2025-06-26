"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Mail, Loader2 } from "lucide-react"
import { sendEmail } from "@/lib/email"

const formSchema = z.object({
  propertyAddress: z.string().min(2, {
    message: "Property address must be at least 2 characters.",
  }),
  listingPrice: z.string().min(2, {
    message: "Listing price must be at least 2 characters.",
  }),
  bedrooms: z.string().min(1, {
    message: "Bedrooms must be at least 1 character.",
  }),
  bathrooms: z.string().min(1, {
    message: "Bathrooms must be at least 1 character.",
  }),
  squareFootage: z.string().min(1, {
    message: "Square footage must be at least 1 character.",
  }),
  additionalDetails: z.string().optional(),
})

interface ListingFormProps {
  setResult: (result: any) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export function ListingForm({ setResult, setLoading, setError }: ListingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [result, setResultState] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyAddress: "",
      listingPrice: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      additionalDetails: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setError(null)
    setResultState(null)

    try {
      const response = await fetch("/api/ai-hub/listit-ai", {
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
      setResultState(data)
      setResult(data)
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const sendEmailFunction = async () => {
    setEmailLoading(true)
    try {
      if (result?.description) {
        await sendEmail({
          subject: "Listit AI Result",
          body: result?.description,
        })
        toast({
          title: "Email Sent",
          description: "Check your inbox for the result.",
        })
      } else {
        throw new Error("No result to send")
      }
    } catch (error: any) {
      toast({
        title: "Email Failed",
        description: error.message || "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="propertyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormDescription>This is the address of the property you want to list.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Price</FormLabel>
              <FormControl>
                <Input placeholder="500000" {...field} />
              </FormControl>
              <FormDescription>The price you want to list the property for.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input placeholder="3" {...field} />
                </FormControl>
                <FormDescription>Number of bedrooms in the property.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input placeholder="2" {...field} />
                </FormControl>
                <FormDescription>Number of bathrooms in the property.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="squareFootage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Square Footage</FormLabel>
              <FormControl>
                <Input placeholder="1500" {...field} />
              </FormControl>
              <FormDescription>Total square footage of the property.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional details about the property." {...field} />
              </FormControl>
              <FormDescription>Any additional details about the property.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
      </form>
      {result?.description && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Result</h2>
          <p className="whitespace-pre-line">{result.description}</p>
        </div>
      )}
      {result?.description && (
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={sendEmailFunction}
            disabled={emailLoading}
            className="flex items-center justify-center gap-2"
          >
            {emailLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            <span className="whitespace-nowrap">Email</span>
          </Button>
        </div>
      )}
    </Form>
  )
}
