"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, CheckCircle, Clock, Star, ArrowRight, Play } from "lucide-react"

export default function AgentProfileSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const setupSteps = [
    {
      id: 1,
      title: "Personal Information",
      description: "Complete your basic profile information",
      duration: "5 minutes",
      content: {
        overview: "Set up your personal information including contact details, bio, and professional background.",
        steps: [
          "Navigate to your profile settings",
          "Fill in your contact information (phone, email, address)",
          "Upload a professional headshot photo",
          "Write a compelling bio (150-300 words)",
          "Add your license information and certifications",
          "Set your preferred communication methods",
        ],
        tips: [
          "Use a high-quality, professional headshot",
          "Keep your bio conversational but professional",
          "Include your specialties and areas of expertise",
          "Update your contact information regularly",
        ],
      },
    },
    {
      id: 2,
      title: "Professional Branding",
      description: "Set up your professional brand and marketing materials",
      duration: "10 minutes",
      content: {
        overview: "Create consistent branding across all your marketing materials and online presence.",
        steps: [
          "Choose your brand colors and fonts",
          "Upload your logo or create one using our tools",
          "Set up your email signature template",
          "Configure your business card design",
          "Create your social media profile templates",
          "Set up your listing presentation template",
        ],
        tips: [
          "Keep branding consistent across all platforms",
          "Choose colors that reflect your personality",
          "Ensure your logo is high resolution",
          "Test your email signature on different devices",
        ],
      },
    },
    {
      id: 3,
      title: "Contact Management",
      description: "Set up your CRM and contact organization system",
      duration: "15 minutes",
      content: {
        overview: "Organize your contacts and set up systems for lead management and follow-up.",
        steps: [
          "Import existing contacts from your phone/email",
          "Create contact categories (leads, clients, referrals, etc.)",
          "Set up automated follow-up sequences",
          "Configure lead scoring and prioritization",
          "Create custom fields for important information",
          "Set up contact sync with your phone and email",
        ],
        tips: [
          "Clean up duplicate contacts before importing",
          "Use consistent naming conventions",
          "Set up regular contact database maintenance",
          "Create templates for common communications",
        ],
      },
    },
    {
      id: 4,
      title: "Calendar & Scheduling",
      description: "Configure your calendar and appointment scheduling",
      duration: "8 minutes",
      content: {
        overview: "Set up your calendar system for efficient scheduling and time management.",
        steps: [
          "Connect your calendar (Google, Outlook, etc.)",
          "Set your availability and working hours",
          "Create appointment types (showings, consultations, etc.)",
          "Set up automated reminders and confirmations",
          "Configure buffer times between appointments",
          "Create calendar sharing settings for team members",
        ],
        tips: [
          "Block time for prospecting and admin tasks",
          "Set realistic travel times between appointments",
          "Use color coding for different appointment types",
          "Always include location and contact information",
        ],
      },
    },
    {
      id: 5,
      title: "Communication Preferences",
      description: "Set up your communication channels and preferences",
      duration: "7 minutes",
      content: {
        overview: "Configure how you communicate with clients and manage your communication channels.",
        steps: [
          "Set up your business phone system",
          "Configure email templates and signatures",
          "Set up text messaging preferences",
          "Configure social media business accounts",
          "Set up video calling preferences",
          "Create communication preference profiles for different client types",
        ],
        tips: [
          "Have separate business and personal phone numbers",
          "Create templates for common responses",
          "Set up auto-responders for after hours",
          "Keep communication professional but personable",
        ],
      },
    },
    {
      id: 6,
      title: "Goal Setting & Tracking",
      description: "Set up your business goals and tracking systems",
      duration: "12 minutes",
      content: {
        overview: "Establish your business goals and set up systems to track your progress.",
        steps: [
          "Set your annual income and transaction goals",
          "Break down goals into monthly and weekly targets",
          "Set up activity tracking (calls, appointments, etc.)",
          "Configure progress reporting and dashboards",
          "Create accountability check-in schedules",
          "Set up reward systems for goal achievement",
        ],
        tips: [
          "Make goals specific, measurable, and time-bound",
          "Track leading indicators, not just results",
          "Review and adjust goals regularly",
          "Celebrate small wins along the way",
        ],
      },
    },
  ]

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const completionPercentage = Math.round((completedSteps.length / setupSteps.length) * 100)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Profile & Set Up</h1>
            <p className="text-gray-600">Complete your agent profile and initial setup</p>
          </div>
        </div>
        <Badge variant="secondary" className="mb-4">
          🚀 Essential Setup
        </Badge>
        <p className="text-lg text-gray-700 max-w-3xl">
          Set up your complete agent profile to establish your professional presence and streamline your business
          operations.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Setup Progress
          </CardTitle>
          <CardDescription>Track your profile setup completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{completedSteps.length}</div>
              <div className="text-sm text-gray-500">of {setupSteps.length} steps</div>
            </div>
          </div>
          {completionPercentage === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Congratulations! You've completed your agent profile setup.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <div className="grid gap-6">
        {setupSteps.map((step) => (
          <Card
            key={step.id}
            className={`transition-all duration-200 ${completedSteps.includes(step.id) ? "bg-green-50 border-green-200" : "hover:shadow-md"}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      completedSteps.includes(step.id) ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4" />
                      {step.duration} • {step.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        View Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-blue-600" />
                          {step.title}
                        </DialogTitle>
                        <DialogDescription>{step.content.overview}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-blue-600" />
                            Step-by-Step Instructions
                          </h4>
                          <ol className="space-y-2">
                            {step.content.steps.map((stepItem, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-700">{stepItem}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-600" />
                            Pro Tips
                          </h4>
                          <ul className="space-y-2">
                            {step.content.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => toggleStepCompletion(step.id)}
                    variant={completedSteps.includes(step.id) ? "default" : "outline"}
                    size="sm"
                  >
                    {completedSteps.includes(step.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
