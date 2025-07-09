import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RealCoachForm } from "./realcoach-form"

export default function RealCoachAIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">RealCoach AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized real estate coaching and business development strategies powered by AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🎯 Business Strategy</CardTitle>
              <CardDescription>Personalized coaching for your real estate business goals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Lead generation strategies</li>
                <li>• Market positioning advice</li>
                <li>• Business growth planning</li>
                <li>• Performance optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📈 Skill Development</CardTitle>
              <CardDescription>Targeted training recommendations and action plans</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Negotiation techniques</li>
                <li>• Client communication</li>
                <li>• Marketing strategies</li>
                <li>• Technology adoption</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Your Coaching Session</CardTitle>
            <CardDescription>
              Describe your current situation and goals to receive personalized coaching advice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RealCoachForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
