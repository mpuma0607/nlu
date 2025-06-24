import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Lightbulb } from "lucide-react"
import IdeaHubV2Form from "./idea-hub-v2-form"

export default function IdeaHubV2BetaPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">
            IdeaHub AI V2 <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">BETA</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Enhanced AI-powered content creation with professional real estate photography. Generate engaging social
            media posts with high-quality stock images and Century 21 branding.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-black">Creative Ideas</CardTitle>
              <CardDescription>Generate unlimited content ideas for your marketing campaigns</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-green-500 mx-auto mb-4"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="m7 11-2-2-2 2" />
                <path d="M11 13h6" />
                <path d="m17 11 2-2 2 2" />
              </svg>
              <CardTitle className="text-black">Professional Photos</CardTitle>
              <CardDescription>High-quality real estate stock photography with your branding</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-purple-500 mx-auto mb-4"
              >
                <rect width="18" height="10" x="3" y="11" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" x2="16" y1="16" y2="16" />
              </svg>
              <CardTitle className="text-black">Share Anywhere</CardTitle>
              <CardDescription>Easily share your content across social platforms</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Tool Interface */}
        <Card className="max-w-4xl mx-auto border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-black text-center">Content Creation Tool V2</CardTitle>
            <CardDescription className="text-center">
              Generate professional social media content with enhanced imagery powered by AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IdeaHubV2Form />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
