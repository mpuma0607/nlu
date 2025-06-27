"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Calculator, MapPin, Clock } from "lucide-react"
import { analyzeComparables } from "./actions"
import { QuickCMAResults } from "./quickcma-results"
import Image from "next/image"

interface QuickCMAFormProps {
  onAnalysisComplete?: (data: any) => void
}

export default function QuickCMAForm({ onAnalysisComplete }: QuickCMAFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMessage, setLoadingMessage] = useState("")
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Immediately set loading state
    setIsLoading(true)
    setError(null)
    setAnalysisData(null)
    setLoadingMessage("Starting CMA analysis...")

    console.log("=== LOADING STATE SET ===")
    console.log("isLoading:", true)

    try {
      const formData = new FormData(e.currentTarget)
      const street = formData.get("street") as string
      const city = formData.get("city") as string
      const state = formData.get("state") as string
      const zip = formData.get("zip") as string

      if (!street || !city || !state || !zip) {
        throw new Error("Please fill in all address fields")
      }

      // Create full address string
      const fullAddress = `${street} ${city} ${state} ${zip}`
      setLoadingMessage(`Analyzing comparable properties for ${fullAddress}...`)

      console.log("=== QuickCMA Form Debug ===")
      console.log("Full Address:", fullAddress)
      console.log("Form Data:", { street, city, state, zip })

      // Add a small delay to ensure loading state shows
      await new Promise((resolve) => setTimeout(resolve, 500))

      setLoadingMessage("Fetching comparable properties from Zillow...")

      const result = await analyzeComparables(fullAddress)

      console.log("Analysis result:", result)

      // Check if the result contains an error
      if (result.error) {
        throw new Error(result.message || "Failed to analyze comparables")
      }

      console.log("Analysis successful:", {
        hasResult: !!result,
        totalComparables: result?.comparableData?.totalComparables,
        hasAnalysisText: !!result?.analysisText,
      })

      setLoadingMessage("Generating AI analysis...")

      // Another small delay for the final step
      await new Promise((resolve) => setTimeout(resolve, 300))

      setAnalysisData(result)
      onAnalysisComplete?.(result)

      // Auto-scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    } catch (err) {
      console.error("QuickCMA Form Error:", err)
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
      setLoadingMessage("")
      console.log("=== LOADING STATE CLEARED ===")
    }
  }

  // Debug: Log loading state changes
  console.log("Current loading state:", isLoading)

  return (
    <div className="space-y-6 relative">
      {/* LOADING OVERLAY - ALWAYS VISIBLE WHEN isLoading IS TRUE */}
      {isLoading && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl border-2 border-blue-200">
              <div className="relative mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NLU%20site%20icons%20%2847%29-MsI3IOXyfpXO9n0VxbJ3qOErJcv5pO.png"
                  alt="Next Level U Logo"
                  width={120}
                  height={120}
                  className="animate-spin mx-auto"
                  style={{ animationDuration: "2s" }}
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-blue-800">CMA Generating</h3>
              </div>
              <p className="text-blue-600 mb-4 font-medium">Please wait while we analyze the market...</p>
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700">{loadingMessage}</p>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">This typically takes 30-60 seconds</p>
            </div>
          </div>
        </>
      )}

      <Card className={isLoading ? "opacity-50" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            QuickCMA AI - Comparative Market Analysis
          </CardTitle>
          <CardDescription>
            Generate comprehensive CMA reports with comparable homes data and AI-powered market analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Street Address
                </Label>
                <Input id="street" name="street" placeholder="123 Main Street" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="Tampa" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" placeholder="FL" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" name="zip" placeholder="33543" required disabled={isLoading} />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating CMA Report...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-5 w-5" />
                  Generate CMA Report
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 font-medium">{error}</p>
              <div className="mt-2 text-xs text-red-600">
                <p>Debug steps:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Check if the address format is correct</li>
                  <li>Try a different address</li>
                  <li>Check browser console for detailed logs</li>
                </ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisData && !analysisData.error && (
        <div ref={resultsRef}>
          <QuickCMAResults data={analysisData} />
        </div>
      )}
    </div>
  )
}
