"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Video, FileText, CheckCircle, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function OnboardingHubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Onboarding Hub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to your comprehensive onboarding experience. Get started with the tools, training, and resources you
          need to succeed.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Modules Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4-6</div>
            <div className="text-sm text-gray-600">Hours to Complete</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Agents Trained</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.9</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Getting Started */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Getting Started
            </CardTitle>
            <CardDescription>Begin your journey with these essential onboarding modules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Welcome & Company Overview</h3>
                <Badge variant="secondary">Required</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Learn about our company culture, values, and what makes us different
              </p>
              <Button size="sm" asChild>
                <Link href="/onboarding-hub/welcome">Start Module</Link>
              </Button>
            </div>

            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Technology Setup</h3>
                <Badge variant="secondary">Required</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">Set up your essential tools and technology stack</p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/onboarding-hub/technology">Start Module</Link>
              </Button>
            </div>

            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Compliance & Legal</h3>
                <Badge variant="secondary">Required</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">Understanding legal requirements and compliance standards</p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/onboarding-hub/compliance">Start Module</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Your Progress
            </CardTitle>
            <CardDescription>Track your onboarding completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>Welcome & Overview</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>Technology Setup</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span>Compliance Training</span>
                </div>
              </div>

              <Button className="w-full mt-4" asChild>
                <Link href="/onboarding-hub/welcome">Continue Learning</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Resources */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-600" />
                Video Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Access our comprehensive video training library</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/onboarding-hub/videos">Browse Videos</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Download important forms, guides, and reference materials</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/onboarding-hub/documents">View Documents</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Support Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Connect with your onboarding team for personalized support</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/support">Get Help</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
