"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Copy, Download, Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { generateListingDescription } from "@/lib/listing-description-actions"
import { useActionState } from "react"
import { toast } from "@/hooks/use-toast"
import ListingForm from "@/components/listing-form"

const initialState = {
  success: false,
  error: false,
  message: "",
  description: "",
}

export default function ListITPage() {
  const [state, formAction, isPending] = useActionState(generateListingDescription, initialState)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      })
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const downloadAsText = (content: string, filename: string) => {
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const sendEmail = async (content: string, subject: string) => {
    try {
      const response = await fetch("/api/generate-listing-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          subject,
        }),
      })

      if (response.ok) {
        toast({
          title: "Email sent!",
          description: "The listing description has been sent to your email",
        })
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "Please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Home className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ListIT AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate compelling property listing descriptions that highlight key features and attract potential buyers
            with AI-powered professional language.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Property Details</CardTitle>
              <CardDescription className="text-purple-100">
                Enter your property information to generate a professional listing description
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ListingForm action={formAction} isPending={isPending} />
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                Generated Description
                {state.success && <CheckCircle className="h-6 w-6 text-green-300" />}
                {state.error && <AlertCircle className="h-6 w-6 text-red-300" />}
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Your AI-generated listing description will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isPending && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Generating your listing description...</p>
                  </div>
                </div>
              )}

              {state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-red-800 mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-semibold">Error</span>
                  </div>
                  <p className="text-red-700">{state.message}</p>
                </div>
              )}

              {state.success && state.description && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Success!</span>
                    </div>
                    <p className="text-green-700">Your listing description has been generated successfully.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Listing Description</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(state.description, "description")}
                            className="flex items-center gap-2"
                          >
                            {copiedStates.description ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            {copiedStates.description ? "Copied!" : "Copy"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadAsText(state.description, "listing-description.txt")}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendEmail(state.description, "Your Generated Listing Description")}
                            className="flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4" />
                            Email
                          </Button>
                        </div>
                      </div>
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{state.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isPending && !state.success && !state.error && (
                <div className="text-center py-12">
                  <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Fill out the form to generate your listing description</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Use ListIT AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600 text-sm">
                Generate listing descriptions that sound professional and engaging, highlighting your property's best
                features.
              </p>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Time Saving</h3>
              <p className="text-gray-600 text-sm">
                Create compelling descriptions in seconds instead of spending hours writing and rewriting.
              </p>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Copy className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600 text-sm">
                Simply input your property details and get a polished description ready for MLS, websites, and marketing
                materials.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
