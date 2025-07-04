"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Copy, Mail, Save } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  contactName: z.string().min(2, {
    message: "Contact Name must be at least 2 characters.",
  }),
  contactInfo: z.string().email({
    message: "Invalid email address.",
  }),
  notes: z.string().optional(),
})

interface WhosWhoFormProps {
  onResult: (result: string) => void
  loading: boolean
}

export function WhosWhoForm({ onResult, loading }: WhosWhoFormProps) {
  const [result, setResult] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: "",
      contactInfo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setResult(
      `Analysis for ${values.contactName} with email ${values.contactInfo}: This person is likely a great fit for your company!`,
    )
    onResult(
      `Analysis for ${values.contactName} with email ${values.contactInfo}: This person is likely a great fit for your company!`,
    )
  }

  const { contactName, contactInfo, notes } = form.watch()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>This is the name of the person you are analyzing.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Info</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormDescription>This is the contact information for the person you are analyzing.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Add any notes about this person here." className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Any additional information that might be helpful.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
        {result && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(result)
              toast({
                title: "Copied to clipboard",
                description: "The result has been copied to your clipboard.",
              })
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Result
          </Button>
        )}
        {result && (
          <Button type="button" variant="secondary">
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Save functionality - you can implement this to save to localStorage or database
            const saveData = {
              contactName,
              contactInfo,
              notes,
              result,
              timestamp: new Date().toISOString(),
            }
            localStorage.setItem(`whos-who-${Date.now()}`, JSON.stringify(saveData))
            toast({
              title: "Saved Successfully",
              description: "Your Who's Who analysis has been saved.",
            })
          }}
          disabled={!result}
          className="w-full"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Analysis
        </Button>
      </form>
      {result && (
        <div className="mt-4">
          <Badge>Result</Badge>
          <p className="mt-2">{result}</p>
        </div>
      )}
    </Form>
  )
}
