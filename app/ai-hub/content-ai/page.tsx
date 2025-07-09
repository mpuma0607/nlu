import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContentAIForm } from "./content-ai-form"

export default function ContentAIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create engaging real estate content for social media, marketing, and client communication
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📱 Social Media</CardTitle>
              <CardDescription>Engaging posts for Facebook, Instagram, LinkedIn, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Property showcase posts</li>
                <li>• Market update content</li>
                <li>• Educational content</li>
                <li>• Client testimonials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📧 Email Marketing</CardTitle>
              <CardDescription>Professional email templates and newsletters</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Client follow-up emails</li>
                <li>• Market reports</li>
                <li>• Property alerts</li>
                <li>• Newsletter content</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Content</CardTitle>
            <CardDescription>
              Create professional real estate content tailored to your audience and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContentAIForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
