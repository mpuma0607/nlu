"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search, MapPin, Phone, User, Mail, Home, Users, AlertCircle, Download, Send } from "lucide-react"
import { searchPeopleData, generateCMA, sendWhosWhoV2Email } from "./actions"

interface SearchResult {
  people: Array<{
    name: string
    age?: string
    addresses: string[]
    phones: string[]
    emails: string[]
    relatives: string[]
    associates: string[]
  }>
  addresses: Array<{
    address: string
    residents: string[]
    propertyType?: string
    yearBuilt?: string
    estimatedValue?: string
  }>
  phones: Array<{
    number: string
    owner: string
    carrier?: string
    location?: string
    type?: string
  }>
  summary: string
  searchType: string
  searchQuery: string
}

export function WhosWhoV2Form() {
  const [searchType, setSearchType] = useState<"address" | "name" | "phone">("address")
  const [searchQuery, setSearchQuery] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult | null>(null)
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
      const result = await searchPeopleData(searchQuery, searchType)
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
      const result = await sendWhosWhoV2Email(email, results, cmaResults)
      if (result.success) {
        alert("Report sent successfully!")
      } else {
        setError(result.error || "Failed to send email")
      }
    } catch (err) {
      setError("Failed to send email")
    } finally {
      setEmailLoading(false)
    }
  }

  // Safe array access with default empty arrays
  const safeResults = results || {
    people: [],
    addresses: [],
    phones: [],
    summary: "",
    searchType: "",
    searchQuery: "",
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
              <option value="address">🏠 Address</option>
              <option value="name">👤 Name</option>
              <option value="phone">📞 Phone</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="searchQuery">
              {searchType === "address" && "Property Address"}
              {searchType === "name" && "Full Name"}
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
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search People Database
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
                AI Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{safeResults.summary}</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline">Search Type: {safeResults.searchType}</Badge>
                <Badge variant="outline">Query: {safeResults.searchQuery}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Results Tabs */}
          <Tabs defaultValue="people" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="people">People ({(safeResults.people || []).length})</TabsTrigger>
              <TabsTrigger value="addresses">Addresses ({(safeResults.addresses || []).length})</TabsTrigger>
              <TabsTrigger value="phones">Phones ({(safeResults.phones || []).length})</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>

            <TabsContent value="people" className="space-y-4">
              {(safeResults.people || []).length > 0 ? (
                (safeResults.people || []).map((person, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {person.name}
                        {person.age && <Badge variant="secondary">Age {person.age}</Badge>}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(person.addresses || []).length > 0 && (
                        <div>
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4" />
                            Addresses
                          </h4>
                          <div className="space-y-1">
                            {(person.addresses || []).map((address, i) => (
                              <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <span className="text-sm">{address}</span>
                                {searchType === "address" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleGenerateCMA(address)}
                                    disabled={cmaLoading}
                                  >
                                    {cmaLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Generate CMA"}
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(person.phones || []).length > 0 && (
                        <div>
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <Phone className="h-4 w-4" />
                            Phone Numbers
                          </h4>
                          <div className="grid gap-1">
                            {(person.phones || []).map((phone, i) => (
                              <span key={i} className="text-sm bg-gray-50 p-2 rounded">
                                {phone}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(person.emails || []).length > 0 && (
                        <div>
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4" />
                            Email Addresses
                          </h4>
                          <div className="grid gap-1">
                            {(person.emails || []).map((email, i) => (
                              <span key={i} className="text-sm bg-gray-50 p-2 rounded">
                                {email}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(person.relatives || []).length > 0 && (
                        <div>
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4" />
                            Relatives
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {(person.relatives || []).map((relative, i) => (
                              <Badge key={i} variant="outline">
                                {relative}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No people found in search results
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="addresses" className="space-y-4">
              {(safeResults.addresses || []).length > 0 ? (
                (safeResults.addresses || []).map((address, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        {address.address}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        {address.propertyType && (
                          <div>
                            <Label>Property Type</Label>
                            <p className="text-sm bg-gray-50 p-2 rounded">{address.propertyType}</p>
                          </div>
                        )}
                        {address.yearBuilt && (
                          <div>
                            <Label>Year Built</Label>
                            <p className="text-sm bg-gray-50 p-2 rounded">{address.yearBuilt}</p>
                          </div>
                        )}
                        {address.estimatedValue && (
                          <div>
                            <Label>Estimated Value</Label>
                            <p className="text-sm bg-gray-50 p-2 rounded font-semibold text-green-600">
                              {address.estimatedValue}
                            </p>
                          </div>
                        )}
                      </div>

                      {(address.residents || []).length > 0 && (
                        <div>
                          <Label>Current/Previous Residents</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(address.residents || []).map((resident, i) => (
                              <Badge key={i} variant="secondary">
                                {resident}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={() => handleGenerateCMA(address.address)}
                        disabled={cmaLoading}
                        className="w-full"
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
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No addresses found in search results
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="phones" className="space-y-4">
              {(safeResults.phones || []).length > 0 ? (
                (safeResults.phones || []).map((phone, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        {phone.number}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Owner</Label>
                          <p className="text-sm bg-gray-50 p-2 rounded">{phone.owner}</p>
                        </div>
                        {phone.carrier && (
                          <div>
                            <Label>Carrier</Label>
                            <p className="text-sm bg-gray-50 p-2 rounded">{phone.carrier}</p>
                          </div>
                        )}
                        {phone.location && (
                          <div>
                            <Label>Location</Label>
                            <p className="text-sm bg-gray-50 p-2 rounded">{phone.location}</p>
                          </div>
                        )}
                        {phone.type && (
                          <div>
                            <Label>Type</Label>
                            <Badge variant={phone.type === "Mobile" ? "default" : "secondary"}>{phone.type}</Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No phone numbers found in search results
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="connections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relationship Network</CardTitle>
                  <CardDescription>Connections between people, addresses, and phone numbers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(safeResults.people || []).map((person, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold">{person.name}</h4>
                        {(person.associates || []).length > 0 && (
                          <div className="mt-2">
                            <Label className="text-xs">Associates:</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(person.associates || []).map((associate, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {associate}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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
              <CardTitle>Email Report</CardTitle>
              <CardDescription>Send a comprehensive report to your email</CardDescription>
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
                    Sending Report...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Comprehensive Report
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
