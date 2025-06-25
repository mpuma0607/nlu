"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  Search,
  Mail,
  CheckCircle,
  AlertCircle,
  Phone,
  MapPin,
  Home,
  User,
  Users,
  Building,
  TrendingUp,
  Shield,
  Globe,
  MessageSquare,
} from "lucide-react"
import { searchTruePeopleSearch } from "./actions"
import { analyzeComparables } from "@/components/actions"
import { QuickCMAResults } from "@/components/quickcma-results"

interface SearchResult {
  summary: string
  searchType: "address" | "name" | "phone"
  searchQuery: string
  results: {
    people: PersonResult[]
    addresses: AddressResult[]
    phones: PhoneResult[]
    relatives: RelativeResult[]
    associates: AssociateResult[]
  }
  rawData: any
}

interface PersonResult {
  name: string
  age?: number
  addresses: string[]
  phones: string[]
  relatives: string[]
  associates: string[]
}

interface AddressResult {
  address: string
  residents: string[]
  previousResidents: string[]
  propertyType?: string
  yearBuilt?: number
}

interface PhoneResult {
  phone: string
  owner: string
  carrier?: string
  location?: string
  type?: string
}

interface RelativeResult {
  name: string
  relationship?: string
  age?: number
  addresses: string[]
}

interface AssociateResult {
  name: string
  connection?: string
  addresses: string[]
}

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

export function WhosWhoV2Form() {
  const [searchType, setSearchType] = useState<"address" | "name" | "phone">("address")
  const [formData, setFormData] = useState({
    address: "",
    name: "",
    phone: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // CMA-related state
  const [cmaResult, setCmaResult] = useState<CMAResult | null>(null)
  const [isCmaLoading, setIsCmaLoading] = useState(false)
  const [cmaError, setCmaError] = useState<string | null>(null)

  const resultsRef = useRef<HTMLDivElement>(null)
  const cmaRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Auto-scroll to results when they appear
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [result])

  // Auto-scroll to CMA results when they appear
  useEffect(() => {
    if (cmaResult && cmaRef.current) {
      cmaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [cmaResult])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)
    setCmaResult(null)

    try {
      let searchQuery = ""
      switch (searchType) {
        case "address":
          searchQuery = formData.address
          break
        case "name":
          searchQuery = formData.name
          break
        case "phone":
          searchQuery = formData.phone
          break
      }

      if (!searchQuery.trim()) {
        throw new Error("Please enter a search query")
      }

      const response = await searchTruePeopleSearch({
        searchType,
        query: searchQuery,
        email: formData.email,
      })

      if (response.success && response.data) {
        setResult(response.data)
      } else {
        setError(response.error || "Failed to retrieve search results")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCMA = async () => {
    if (!result || result.searchType !== "address") return

    setIsCmaLoading(true)
    setCmaError(null)
    setCmaResult(null)

    try {
      const address = result.searchQuery
      console.log("Creating CMA for address:", address)

      const cmaResponse = await analyzeComparables(address)

      if (cmaResponse.error) {
        setCmaError(cmaResponse.message || "Failed to generate CMA")
      } else {
        setCmaResult(cmaResponse)
      }
    } catch (err) {
      console.error("CMA generation error:", err)
      setCmaError("An unexpected error occurred while generating the CMA. Please try again.")
    } finally {
      setIsCmaLoading(false)
    }
  }

  const isFormValid = () => {
    switch (searchType) {
      case "address":
        return formData.address.trim() && formData.email.trim()
      case "name":
        return formData.name.trim() && formData.email.trim()
      case "phone":
        return formData.phone.trim() && formData.email.trim()
      default:
        return false
    }
  }

  const renderPersonCard = (person: PersonResult, index: number) => (
    <Card key={index} className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <User className="h-5 w-5" />
          {person.name}
          {person.age && <Badge variant="secondary">{person.age} years old</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {person.addresses.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </h4>
            <ul className="space-y-1">
              {person.addresses.map((address, i) => (
                <li key={i} className="text-sm text-gray-600 bg-white p-2 rounded border">
                  {address}
                </li>
              ))}
            </ul>
          </div>
        )}

        {person.phones.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Numbers
            </h4>
            <ul className="space-y-1">
              {person.phones.map((phone, i) => (
                <li key={i} className="text-sm text-gray-600 bg-white p-2 rounded border">
                  {phone}
                </li>
              ))}
            </ul>
          </div>
        )}

        {person.relatives.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Relatives
            </h4>
            <div className="flex flex-wrap gap-1">
              {person.relatives.map((relative, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {relative}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderAddressCard = (address: AddressResult, index: number) => (
    <Card key={index} className="border-green-200 bg-green-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Building className="h-5 w-5" />
          {address.address}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {address.residents.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Current Residents</h4>
            <div className="flex flex-wrap gap-1">
              {address.residents.map((resident, i) => (
                <Badge key={i} variant="default" className="bg-green-600">
                  {resident}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {address.previousResidents.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Previous Residents</h4>
            <div className="flex flex-wrap gap-1">
              {address.previousResidents.map((resident, i) => (
                <Badge key={i} variant="outline">
                  {resident}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {(address.propertyType || address.yearBuilt) && (
          <div className="flex gap-4 text-sm text-gray-600">
            {address.propertyType && (
              <span>
                <strong>Type:</strong> {address.propertyType}
              </span>
            )}
            {address.yearBuilt && (
              <span>
                <strong>Built:</strong> {address.yearBuilt}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Type Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Search Type</Label>
          <Tabs value={searchType} onValueChange={(value) => setSearchType(value as typeof searchType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="address" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Address
              </TabsTrigger>
              <TabsTrigger value="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="address" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main Street, Miami, FL 33101"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">
                  Enter the full address including city and state for best results
                </p>
              </div>
            </TabsContent>

            <TabsContent value="name" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">
                  Enter the person's first and last name for comprehensive results
                </p>
              </div>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">Enter the 10-digit phone number with or without formatting</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Your Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <p className="text-sm text-gray-500">The detailed search report will be sent to this email address</p>
        </div>

        <Button type="submit" className="w-full" disabled={!isFormValid() || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching Records...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search {searchType === "address" ? "Address" : searchType === "name" ? "Person" : "Phone Number"}
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
        <div ref={resultsRef} className="space-y-6">
          {/* Header Card with CMA Button */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Search className="h-6 w-6" />
                Search Results Complete
              </CardTitle>
              <CardDescription className="text-blue-700">
                <div className="flex items-center gap-2">
                  {result.searchType === "address" && <MapPin className="h-4 w-4" />}
                  {result.searchType === "name" && <User className="h-4 w-4" />}
                  {result.searchType === "phone" && <Phone className="h-4 w-4" />}
                  {result.searchQuery}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Search Complete
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Mail className="h-3 w-3 mr-1" />
                  Email Sent
                </Badge>
                {result.results.people.length > 0 && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    <Users className="h-3 w-3 mr-1" />
                    {result.results.people.length} People Found
                  </Badge>
                )}
              </div>

              {/* CMA Button for Address Searches */}
              {result.searchType === "address" && (
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleCreateCMA}
                    disabled={isCmaLoading}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isCmaLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating CMA...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4" />
                        Create CMA For This Property
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CMA Error */}
          {cmaError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{cmaError}</AlertDescription>
            </Alert>
          )}

          {/* AI Summary */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <MessageSquare className="h-5 w-5" />
                AI Summary & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-gray-700">{result.summary}</div>
              </div>
            </CardContent>
          </Card>

          {/* Results Tabs */}
          <Tabs defaultValue="people" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="people" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                People ({result.results.people.length})
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Addresses ({result.results.addresses.length})
              </TabsTrigger>
              <TabsTrigger value="phones" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phones ({result.results.phones.length})
              </TabsTrigger>
              <TabsTrigger value="connections" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Connections ({result.results.relatives.length + result.results.associates.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="people" className="space-y-4 mt-6">
              {result.results.people.length > 0 ? (
                <div className="grid gap-4">
                  {result.results.people.map((person, index) => renderPersonCard(person, index))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No people found in search results
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="addresses" className="space-y-4 mt-6">
              {result.results.addresses.length > 0 ? (
                <div className="grid gap-4">
                  {result.results.addresses.map((address, index) => renderAddressCard(address, index))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No addresses found in search results
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="phones" className="space-y-4 mt-6">
              {result.results.phones.length > 0 ? (
                <div className="grid gap-4">
                  {result.results.phones.map((phone, index) => (
                    <Card key={index} className="border-orange-200 bg-orange-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-orange-900">
                          <Phone className="h-5 w-5" />
                          {phone.phone}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p>
                            <strong>Owner:</strong> {phone.owner}
                          </p>
                          {phone.carrier && (
                            <p>
                              <strong>Carrier:</strong> {phone.carrier}
                            </p>
                          )}
                          {phone.location && (
                            <p>
                              <strong>Location:</strong> {phone.location}
                            </p>
                          )}
                          {phone.type && (
                            <p>
                              <strong>Type:</strong> {phone.type}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No phone numbers found in search results
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="connections" className="space-y-4 mt-6">
              {result.results.relatives.length > 0 || result.results.associates.length > 0 ? (
                <div className="space-y-6">
                  {result.results.relatives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Relatives
                      </h3>
                      <div className="grid gap-4">
                        {result.results.relatives.map((relative, index) => (
                          <Card key={index} className="border-pink-200 bg-pink-50">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{relative.name}</h4>
                                {relative.age && <Badge variant="secondary">{relative.age} years old</Badge>}
                              </div>
                              {relative.relationship && (
                                <p className="text-sm text-gray-600 mb-2">
                                  <strong>Relationship:</strong> {relative.relationship}
                                </p>
                              )}
                              {relative.addresses.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">Addresses:</p>
                                  <ul className="text-sm text-gray-600">
                                    {relative.addresses.map((addr, i) => (
                                      <li key={i}>• {addr}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.results.associates.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Associates
                      </h3>
                      <div className="grid gap-4">
                        {result.results.associates.map((associate, index) => (
                          <Card key={index} className="border-indigo-200 bg-indigo-50">
                            <CardContent className="pt-4">
                              <h4 className="font-medium mb-2">{associate.name}</h4>
                              {associate.connection && (
                                <p className="text-sm text-gray-600 mb-2">
                                  <strong>Connection:</strong> {associate.connection}
                                </p>
                              )}
                              {associate.addresses.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-1">Addresses:</p>
                                  <ul className="text-sm text-gray-600">
                                    {associate.addresses.map((addr, i) => (
                                      <li key={i}>• {addr}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    No relatives or associates found in search results
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Legal Disclaimer */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">*** Legal Disclaimer ***</p>
                  <p className="leading-relaxed">
                    The provided data is sourced from publicly available information and should be used for
                    informational purposes only. All Federal, State and Local laws regarding the DNC (Do Not Call) list
                    and TCPA (Telephone Consumer Protection Act) laws should be followed at all times. Users are
                    responsible for ensuring compliance with all applicable regulations when contacting individuals
                    based on this information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CMA Results Section */}
      {cmaResult && (
        <div ref={cmaRef} className="space-y-6">
          <div className="border-t-4 border-green-500 pt-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Comparative Market Analysis
            </h2>
            <QuickCMAResults data={cmaResult} />
          </div>
        </div>
      )}
    </div>
  )
}
