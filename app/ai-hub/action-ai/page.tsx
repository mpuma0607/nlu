import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActionAIForm } from "./action-ai-form"

export default function ActionAIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Action AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate personalized daily action plans with professional scripts for real estate prospecting
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🎯 Personalized Plans</CardTitle>
              <CardDescription>Tailored action plans based on your specific goals and prospect type</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Custom prospecting strategies</li>
                <li>• Specific daily tasks</li>
                <li>• Recommended contact numbers</li>
                <li>• Goal-oriented approach</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📝 Professional Scripts</CardTitle>
              <CardDescription>VAK-optimized scripts for text, email, and phone outreach</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Visual, Auditory, Kinesthetic language</li>
                <li>• Text message templates</li>
                <li>• Email sequences</li>
                <li>• Phone call scripts</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Your Daily Action Plan</CardTitle>
            <CardDescription>
              Create a comprehensive action plan with scripts tailored to your prospecting goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActionAIForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
