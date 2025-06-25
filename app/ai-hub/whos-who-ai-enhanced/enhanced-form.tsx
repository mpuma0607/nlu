"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  Search,
  User,
  Home,
  Users,
  AlertCircle,
  Download,
  Send,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { enhancedPropertySearch, generateCMA, sendEnhancedEmail } from "./actions"

export function EnhancedWhosWhoForm() {
  const [searchType, setSearchType] = useState<"address" | "name" | "phone">("address")
  const [searchQuery, setSearchQuery] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState("")
  const [cmaLoading, setCmaLoading] = useState(false)
  const [cmaResults, setCmaResults] = useState<any>(null)
  const [emailLoading, setEmailLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError("")
    setResults(null)

    try {
      const result = await enhancedPropertySearch(searchQuery, searchType)
      if (result.success && result.data) {
        setResults(result.data)
      } else {
        setError(result.error || "Search failed")
      }
    } catch (err) {
      setError("An error occurred during search")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateCMA = async (address: string) => {
    setCmaLoading(true)
    try {
      const result = await generateCMA(address)
      if (result.success && result.data) {
        setCmaResults(result.data)
      } else {
        setError(result.error || "CMA generation failed")
      }
    } catch (err) {
      setError("Failed to generate CMA")
    } finally {
      setCmaLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!email || !results) return

    setEmailLoading(true)
    try {
      const result = await sendEnhancedEmail(email, results, cmaResults)
      if (result.success) {
        alert("Enhanced report sent successfully!")
      } else {
        setError(result.error || "Failed to send email")
      }
    } catch (err) {
      setError("Failed to send email")
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="searchType">Search Type</Label>
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as "address" | "name" | "phone")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="address">🏠 Property Address</option>
              <option value="name">👤 Owner Name</option>
              <option value="phone">📞 Phone Number</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="searchQuery">
              {searchType === "address" && "Property Address"}
              {searchType === "name" && "Property Owner Name"}
              {searchType === "phone" && "Phone Number"}
            </Label>
            <Input
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchType === "address"
                  ? "123 Main St, City, State"
                  : searchType === "name"
                    ? "John Smith"
                    : "(555) 123-4567"
              }
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching Property + Auto-Retrieving Contact Data...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Enhanced Property + People Search
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

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* AI Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Enhanced Search Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{results.summary}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <Badge variant="outline">Search: {results.searchQuery}</Badge>
                <Badge variant="outline">Type: {results.searchType}</Badge>
                <Badge variant="outline">
                  Auto-Contact Success: {results.enrichedOwners.filter((o: any) => o.hasContactData).length}/
                  {results.enrichedOwners.length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Property Information */}
          {results.zillowData?.property && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Address</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{results.zillowData.property.address}</p>
                  </div>
                  {results.zillowData.property.value && (
                    <div>
                      <Label>Estimated Value</Label>
                      <p className="text-sm bg-gray-50 p-2 rounded font-semibold text-green-600">
                        {results.zillowData.property.value}
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => handleGenerateCMA(results.zillowData.property.address)}
                  disabled={cmaLoading}
                  className="mt-4"
                >
                  {cmaLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  Generate CMA Report
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Owner Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Property Owners with Contact Data ({results.enrichedOwners.length})
              </CardTitle>
              <CardDescription>Automatically retrieved contact information where available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.enrichedOwners.map((owner: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{owner.name}</h3>
                    <div className="flex items-center gap-2">
                      {owner.hasContactData ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Contact Data Retrieved
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <XCircle className="w-3 h-3 mr-1" />
                          Manual Lookup Required
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Auto-Retrieved Contact Data */}
                  {owner.truePeopleSearchData && (
                    <div className="space-y-3">
                      {owner.truePeopleSearchData.phones?.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">📞 Phone Numbers</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {owner.truePeopleSearchData.phones.map((phone: string, i: number) => (
                              <Badge key={i} variant="outline" className="bg-green-50">
                                {phone}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {owner.truePeopleSearchData.emails?.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">📧 Email Addresses</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {owner.truePeopleSearchData.emails.map((email: string, i: number) => (
                              <Badge key={i} variant="outline" className="bg-blue-50">
                                {email}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {owner.truePeopleSearchData.relatives?.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">👨‍👩‍👧‍👦 Relatives</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {owner.truePeopleSearchData.relatives.map((relative: string, i: number) => (
                              <Badge key={i} variant="outline" className="bg-purple-50">
                                {relative}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {owner.truePeopleSearchData.age && (
                        <div>
                          <Label className="text-sm font-medium">🎂 Age</Label>
                          <Badge variant="outline" className="ml-2">
                            {owner.truePeopleSearchData.age} years old
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Fallback Link */}
                  {!owner.hasContactData && (
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800 mb-2">
                        Contact data could not be automatically retrieved. Use the link below for manual lookup:
                      </p>
                      <a
                        href={owner.truePeopleSearchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Search {owner.name} on TruePeopleSearch
                      </a>
                    </div>
                  )}

                  {/* Zillow Data */}
                  <div className="mt-3 pt-3 border-t">
                    <Label className="text-sm font-medium">🏠 Property Information</Label>
                    <div className="text-sm text-gray-600 mt-1">
                      {owner.zillowData.address && <p>Address: {owner.zillowData.address}</p>}
                      {owner.zillowData.ownershipType && <p>Ownership: {owner.zillowData.ownershipType}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CMA Results */}
          {cmaResults && (
            <Card>
              <CardHeader>
                <CardTitle>Comparative Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700">{cmaResults.summary}</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Estimated Value</p>
                      <p className="text-xl font-bold text-green-600">{cmaResults.estimatedValue}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Price Per Sq Ft</p>
                      <p className="text-xl font-bold">{cmaResults.pricePerSqFt}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Market Trend</p>
                      <p className="text-xl font-bold text-blue-600">{cmaResults.marketTrend}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Report */}
          <Card>
            <CardHeader>
              <CardTitle>Email Enhanced Report</CardTitle>
              <CardDescription>Send a comprehensive report with all property and contact data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <Button onClick={handleSendEmail} disabled={emailLoading || !email} className="w-full">
                {emailLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Enhanced Report...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Enhanced Property + Contact Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
