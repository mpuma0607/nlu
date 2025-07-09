"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, BarChart3, AlertCircle, MapPin } from "lucide-react"
import { analyzeComparables } from "@/components/actions"
import { QuickCMAResults } from "@/components/quickcma-results"

interface CMAResult {
  analysisText: string
  sections: Record<string, string[]>
  address: string
  comparableData: {
    totalComparables: number
    comparables: any[]
    summary: {
      averagePrice: number
      averageSqft: number
      priceRange: { min: number; max: number }
    }
  }
  rawData?: {
    error?: string
    usingRealData: boolean
  }
}

export function QuickCMAForm() {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CMAResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { user, isLoggedIn } = useMemberSpaceUser()
  const resultsRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to results when they appear
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [result])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log("Submitting CMA request for:", address)
      const response = await analyzeComparables(address)

      if (response.error) {
        setError(response.message || "Failed to generate CMA")
      } else {
        setResult(response)
      }
    } catch (err) {
      console.error("CMA generation error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = address.trim().length > 0

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Property Address
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="123 Main Street, Miami, FL 33101"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500">
            Enter the full property address including city and state for best results
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Market Data...
            </>
          ) : (
            <>
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate CMA Report
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div ref={resultsRef}>
          <QuickCMAResults data={result} />
        </div>
      )}
    </div>
  )
}
