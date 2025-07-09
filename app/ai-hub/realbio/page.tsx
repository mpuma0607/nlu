import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RealBioForm } from "./realbio-form"

export default function RealBioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">RealBio</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create compelling professional biographies for your real estate marketing and online presence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">👤 Professional Profiles</CardTitle>
              <CardDescription>Compelling bios for websites, social media, and marketing materials</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Website about pages</li>
                <li>• Social media profiles</li>
                <li>• Marketing brochures</li>
                <li>• Team introductions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">✨ Multiple Formats</CardTitle>
              <CardDescription>Different lengths and styles for various platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Short elevator pitch</li>
                <li>• Medium bio for listings</li>
                <li>• Long detailed biography</li>
                <li>• Social media versions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Professional Bio</CardTitle>
            <CardDescription>
              Tell us about yourself and we'll create compelling biographies for your real estate business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RealBioForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
