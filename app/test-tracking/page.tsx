"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function TestTrackingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")
  const { toast } = useToast()

  // Simple tracking function for testing
  const trackUsage = async (toolName: string, action: string) => {
    try {
      await fetch("/api/track-usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: "test@example.com",
          toolName,
          actionType: action,
          deviceType: "desktop",
          userAgent: navigator.userAgent,
          metadata: { test: true },
        }),
      })
    } catch (error) {
      console.error("Tracking error:", error)
    }
  }

  const handleGenerateContent = async () => {
    setIsLoading(true)
    await trackUsage("test-tool", "generate")

    // Simulate content generation
    setTimeout(() => {
      setResult("This is your generated content! The tracking system recorded this action.")
      setIsLoading(false)
      toast({
        title: "Content Generated!",
        description: "Your content has been generated and tracked.",
      })
    }, 2000)
  }

  const handleDownload = async () => {
    await trackUsage("test-tool", "download")
    toast({
      title: "Download Tracked!",
      description: "Download action has been recorded.",
    })
  }

  const handleCopy = async () => {
    await trackUsage("test-tool", "copy")
    navigator.clipboard.writeText(result)
    toast({
      title: "Copied & Tracked!",
      description: "Copy action has been recorded.",
    })
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Tracking System Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This page demonstrates the tracking system working. Each action below will be recorded in your Neon
            database.
          </p>

          <Button onClick={handleGenerateContent} disabled={isLoading} className="w-full">
            {isLoading ? "Generating..." : "Generate Test Content"}
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p>{result}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="outline">
                  📥 Download (Tracked)
                </Button>
                <Button onClick={handleCopy} variant="outline">
                  📋 Copy (Tracked)
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Admin Dashboard</h3>
            <p className="text-blue-700 text-sm">
              Check your usage stats at: <br />
              <code className="bg-white px-2 py-1 rounded">/api/admin/usage-stats?email=mikepuma@c21be.com</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
