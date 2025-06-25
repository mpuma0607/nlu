import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WhosWhoV2Form } from "./whos-who-v2-form"

export default function WhosWhoAIV2Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Who's Who AI 2.0</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced people search with comprehensive contact information, property details, and market analysis
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🏠 Address Search</CardTitle>
              <CardDescription>Find property owners and residents by address</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Current & previous residents</li>
                <li>• Property ownership history</li>
                <li>• Instant CMA generation</li>
                <li>• Neighborhood insights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">👤 Name Search</CardTitle>
              <CardDescription>Comprehensive person lookup by full name</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Contact information</li>
                <li>• Address history</li>
                <li>• Associated relatives</li>
                <li>• Social media profiles</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📞 Phone Search</CardTitle>
              <CardDescription>Reverse phone lookup with detailed results</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Owner identification</li>
                <li>• Carrier information</li>
                <li>• Location details</li>
                <li>• Spam/scam detection</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Advanced People Search</CardTitle>
            <CardDescription>
              Search by address, name, or phone number to get comprehensive contact and property information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WhosWhoV2Form />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
