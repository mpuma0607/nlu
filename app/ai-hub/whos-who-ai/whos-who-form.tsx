"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { CopyButton } from "@/components/copy-button"
import { useToast } from "@/components/ui/use-toast"
import { useTracking } from "@/lib/hooks/use-tracking"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

export function WhosWhoForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [skipTraceResult, setSkipTraceResult] = useState<string | null>(null)
  const { toast } = useToast()
  const { trackToolUsage, trackContentInteraction } = useTracking()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    await trackToolUsage("whos-who-ai", "skip-trace")

    // Simulate an API call
    setTimeout(() => {
      setSkipTraceResult(
        `Skip trace result for ${values.name}:\n\nAddress: 123 Main St\nPhone: 555-1234\nEmail: ${values.name
          .toLowerCase()
          .replace(" ", ".")}@example.com`,
      )
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = async () => {
    await trackContentInteraction("whos-who-ai", "copy-content")
    if (skipTraceResult) {
      navigator.clipboard.writeText(skipTraceResult)
      toast({
        title: "Copied to clipboard!",
        description: "The skip trace result has been copied to your clipboard.",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Who's Who AI</CardTitle>
          <CardDescription>Enter a name to perform a skip trace and find contact information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
          {skipTraceResult && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Skip Trace Result:</p>
              <div className="relative">
                <pre className="rounded-md bg-muted p-4 font-mono text-sm">{skipTraceResult}</pre>
                <CopyButton onClick={copyToClipboard} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
