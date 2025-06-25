"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { debugSearchPeopleData, debugSendEmail } from "./actions"

export default function WhosWhoDebugPage() {
  const [searchType, setSearchType] = useState<"address" | "name" | "phone">("name")
  const [query, setQuery] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setResults(null)

    try {
      console.log("Starting debug search...")
      const result = await debugSearchPeopleData(query.trim(), searchType)
      console.log("Debug search completed:", result)
      setResults(result)
    } catch (error) {
      console.error("Debug search error:", error)
      setResults({
        success: false,
        error: error instanceof Error ? error.message : String(error),
        debug: { clientError: true },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!email.trim() || !results) return

    try {
      await debugSendEmail(email.trim(), results)
      alert("Debug email sent successfully!")
    } catch (error) {
      alert("Failed to send debug email")
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Who's Who AI - DEBUG VERSION</h1>
        <p className="text-muted-foreground">
          🔧 This is a debug version for testing the hybrid scraping approach in live environment
        </p>
        <Badge variant="outline" className="mt-2">
          Debug Mode - Safe Testing
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Search</CardTitle>
            <CardDescription>Test the hybrid scraping functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="searchType">Search Type</Label>
                <Select value={searchType} onValueChange={(value: any) => setSearchType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="address">Address</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="query">Search Query</Label>
                <Input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    searchType === "name"
                      ? "John Smith"
                      : searchType === "address"
                        ? "123 Main St, City, State"
                        : "(555) 123-4567"
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (for results)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <Button onClick={handleSearch} disabled={isLoading || !query.trim()} className="w-full">
              {isLoading ? "🔍 Debugging Search..." : "🔧 Run Debug Search"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Debug Results
                <Badge variant={results.success ? "default" : "destructive"}>
                  {results.success ? "✅ Success" : "❌ Failed"}
                </Badge>
                {results.method && <Badge variant="outline">Method: {results.method}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.success && results.data && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">People Found: {results.data.people?.length || 0}</h3>
                    {results.data.people?.map((person: any, index: number) => (
                      <div key={index} className="border rounded p-3 mb-2">
                        <div className="font-medium">{person.name}</div>
                        {person.age && <div className="text-sm text-muted-foreground">Age: {person.age}</div>}
                        {person.addresses?.length > 0 && (
                          <div className="text-sm">Addresses: {person.addresses.join(", ")}</div>
                        )}
                        {person.phones?.length > 0 && <div className="text-sm">Phones: {person.phones.join(", ")}</div>}
                        {person.relatives?.length > 0 && (
                          <div className="text-sm">Relatives: {person.relatives.join(", ")}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {email && (
                    <Button onClick={handleSendEmail} variant="outline">
                      📧 Send Debug Email
                    </Button>
                  )}
                </div>
              )}

              {results.error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <div className="font-medium text-red-800">Error:</div>
                  <div className="text-red-700">{results.error}</div>
                </div>
              )}

              {/* Debug Information */}
              <div className="bg-gray-50 border rounded p-3">
                <h3 className="font-semibold mb-2">Debug Information</h3>
                <Textarea value={JSON.stringify(results.debug, null, 2)} readOnly className="h-40 font-mono text-xs" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
