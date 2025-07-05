"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Target, CheckCircle, Clock, Award } from "lucide-react"
import { useTenantConfig } from "@/contexts/tenant-context"

export default function OnboardingHubPage() {
  const tenantConfig = useTenantConfig()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Onboarding Hub</h1>
            <p className="text-gray-600">Your comprehensive guide to getting started</p>
          </div>
        </div>
        <Badge variant="secondary" className="mb-4">
          🚀 Start Your Journey
        </Badge>
        <p className="text-lg text-gray-700 max-w-3xl">
          Welcome to your onboarding journey! This hub contains everything you need to get started and succeed in your
          real estate career.
        </p>
      </div>

      {/* Onboarding Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Getting Started */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl">Getting Started</CardTitle>
            </div>
            <CardDescription>Essential first steps to begin your real estate journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Welcome orientation
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Platform overview
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Initial setup guide
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Modules */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Training Modules</CardTitle>
            </div>
            <CardDescription>Structured learning path for new agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-500" />
                Foundation courses
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-500" />
                Skills development
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-500" />
                Advanced techniques
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mentorship */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-xl">Mentorship</CardTitle>
            </div>
            <CardDescription>Connect with experienced professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-purple-500" />
                Mentor matching
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-purple-500" />
                One-on-one guidance
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-purple-500" />
                Progress tracking
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certification */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-xl">Certification</CardTitle>
            </div>
            <CardDescription>Earn credentials and recognition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-yellow-500" />
                Completion certificates
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-yellow-500" />
                Skill badges
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-yellow-500" />
                Achievement tracking
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-xl">Resources</CardTitle>
            </div>
            <CardDescription>Tools and materials for success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                Document templates
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                Reference guides
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                Best practices
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-red-600" />
              <CardTitle className="text-xl">Support</CardTitle>
            </div>
            <CardDescription>Get help when you need it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-red-500" />
                Help desk
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-red-500" />
                Community forums
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-red-500" />
                FAQ resources
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your onboarding journey is designed to set you up for success. Take it step by step and don't hesitate to
              reach out for support.
            </p>
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Start Your Onboarding</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
