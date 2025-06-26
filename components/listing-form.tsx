"use client"

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { listingFormSchema } from "@/lib/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generateDescription } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { useSession } from "next-auth/react"
import { sendEmail as sendEmailAction } from "@/lib/actions"

type ListingFormValues = {
  title: string
  price: number
  location: string
  description: string
}

const ListingForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [generatedDescription, setGeneratedDescription] = useState("")
  const { toast } = useToast()
  const { data: session } = useSession()

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: "",
      price: 0,
      location: "",
      description: "",
    },
  })

  const handleSubmit = async (values: ListingFormValues) => {
    setIsLoading(true)

    try {
      const description = await generateDescription(values)
      setGeneratedDescription(description)
      toast({
        title: "Description generated!",
        description: "Your listing description has been generated.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error generating your description.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadPDF = async () => {
    setIsPdfLoading(true)

    try {
      const doc = new jsPDF()
      doc.text("Listing Details", 10, 10)

      autoTable(doc, {
        body: [
          { label: "Title", value: form.getValues("title") },
          { label: "Price", value: form.getValues("price") },
          { label: "Location", value: form.getValues("location") },
          { label: "Description", value: generatedDescription },
        ],
        columns: [
          { header: "Label", dataKey: "label" },
          { header: "Value", dataKey: "value" },
        ],
        startY: 20,
      })

      doc.save("listing.pdf")
      toast({
        title: "PDF downloaded!",
        description: "Your listing details have been downloaded as a PDF.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error generating the PDF.",
        variant: "destructive",
      })
    } finally {
      setIsPdfLoading(false)
    }
  }

  const sendEmail = async () => {
    setIsEmailLoading(true)

    if (!session?.user?.email) {
      toast({
        title: "No email found.",
        description: "Please sign in to send an email.",
        variant: "destructive",
      })
      setIsEmailLoading(false)
      return
    }

    try {
      await sendEmailAction({
        to: session.user.email,
        subject: "Your Listing Details",
        body: `
          <h1>Listing Details</h1>
          <p><strong>Title:</strong> ${form.getValues("title")}</p>
          <p><strong>Price:</strong> ${form.getValues("price")}</p>
          <p><strong>Location:</strong> ${form.getValues("location")}</p>
          <p><strong>Description:</strong> ${generatedDescription}</p>
        `,
      })
      toast({
        title: "Email sent!",
        description: "Your listing details have been sent to your email.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error sending the email.",
        variant: "destructive",
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedDescription)
      toast({
        title: "Description copied!",
        description: "Your listing description has been copied to the clipboard.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was an error copying the description to the clipboard.",
        variant: "destructive",
      })
    }
  }, [generatedDescription, toast])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Listing Description</CardTitle>
        <CardDescription>Enter your listing details to generate a compelling description.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cozy Apartment in Downtown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1200" {...field} />
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
                    <Input placeholder="e.g., New York, NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Includes parking, near subway, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  Generating <span className="animate-spin ml-2">🔄</span>
                </>
              ) : (
                "Generate Description"
              )}
            </Button>
          </form>
        </Form>
        {generatedDescription && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Generated Description</h2>
            <Card className="bg-muted">
              <CardContent>
                <p className="text-sm">{generatedDescription}</p>
              </CardContent>
            </Card>
            <div className="flex justify-end space-x-2 mt-4">
              <Button size="sm" onClick={copyToClipboard}>
                Copy to Clipboard
              </Button>
              <Button size="sm" onClick={downloadPDF} disabled={isPdfLoading}>
                {isPdfLoading ? (
                  <>
                    Downloading <span className="animate-spin ml-2">🔄</span>
                  </>
                ) : (
                  "Download PDF"
                )}
              </Button>
              {session?.user?.email && (
                <Button size="sm" onClick={sendEmail} disabled={isEmailLoading}>
                  {isEmailLoading ? (
                    <>
                      Sending <span className="animate-spin ml-2">🔄</span>
                    </>
                  ) : (
                    "Send Email"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-muted-foreground">
        {isLoading ? <Skeleton width={200} height={20} /> : "Powered by ListIt AI"}
      </CardFooter>
    </Card>
  )
}

export default ListingForm
