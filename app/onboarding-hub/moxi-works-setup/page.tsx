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
import { Settings, CheckCircle, Clock, Star, ArrowRight, Play } from "lucide-react"

export default function MoxiWorksSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const setupSteps = [
    {
      id: 1,
      title: "Account Setup & Profile Creation",
      description: "Set up your Moxi Works account and complete your agent profile",
      duration: "15 minutes",
      content: {
        overview: "Create your Moxi Works account and set up your professional profile with all necessary information.",
        steps: [
          "Log into Moxi Works with your provided credentials",
          "Complete your agent profile with contact information",
          "Upload a professional headshot photo",
          "Add your license information and certifications",
          "Set up your bio and professional background",
          "Configure your notification preferences",
        ],
        tips: [
          "Use a high-quality professional photo",
          "Keep your bio updated with recent achievements",
          "Set up notifications to stay on top of leads and tasks",
          "Complete all profile fields for better lead matching",
        ],
      },
    },
    {
      id: 2,
      title: "Lead Management & CRM Setup",
      description: "Configure your lead management system and CRM preferences",
      duration: "25 minutes",
      content: {
        overview:
          "Set up your lead management system to capture, organize, and follow up with potential clients effectively.",
        steps: [
          "Import existing contacts and leads into the system",
          "Set up lead categories and tags for organization",
          "Configure lead scoring and prioritization rules",
          "Set up automated lead assignment and routing",
          "Create custom fields for important client information",
          "Configure lead source tracking and attribution",
        ],
        tips: [
          "Clean up your contact data before importing",
          "Use consistent tagging and categorization",
          "Set up lead scoring based on your business priorities",
          "Regularly review and update your lead management rules",
        ],
      },
    },
    {
      id: 3,
      title: "Marketing Tools & Campaign Setup",
      description: "Set up marketing automation and campaign tools",
      duration: "20 minutes",
      content: {
        overview: "Configure marketing tools to automate your client communications and marketing campaigns.",
        steps: [
          "Set up email marketing templates and campaigns",
          "Configure automated drip campaigns for different lead types",
          "Set up social media posting and scheduling tools",
          "Create listing marketing templates and flyers",
          "Configure market reports and CMA tools",
          "Set up client communication templates",
        ],
        tips: [
          "Personalize your email templates while maintaining professionalism",
          "Set up different campaigns for buyers vs. sellers",
          "Use market data to create valuable content for clients",
          "Test your campaigns before launching them",
        ],
      },
    },
    {
      id: 4,
      title: "Transaction Management Integration",
      description: "Connect transaction management tools and workflows",
      duration: "18 minutes",
      content: {
        overview: "Integrate transaction management tools to streamline your deal pipeline and client communications.",
        steps: [
          "Connect your transaction management system",
          "Set up deal pipeline stages and workflows",
          "Configure document management and storage",
          "Set up client portal access and permissions",
          "Configure closing timeline and milestone tracking",
          "Set up post-closing follow-up automation",
        ],
        tips: [
          "Customize pipeline stages to match your process",
          "Set up automated reminders for important deadlines",
          "Keep clients informed with automated status updates",
          "Use document templates to save time on paperwork",
        ],
      },
    },
    {
      id: 5,
      title: "Mobile App Configuration",
      description: "Set up and configure the Moxi Works mobile application",
      duration: "12 minutes",
      content: {
        overview:
          "Configure the Moxi Works mobile app for on-the-go access to your business tools and client information.",
        steps: [
          "Download and install the Moxi Works mobile app",
          "Log in and sync your account settings",
          "Set up push notifications for leads and tasks",
          "Configure mobile CRM access and contact sync",
          "Set up mobile marketing tools and social posting",
          "Test all mobile features and functionality",
        ],
        tips: [
          "Enable push notifications for time-sensitive leads",
          "Keep the app updated for the latest features",
          "Use mobile tools to respond quickly to client inquiries",
          "Practice using mobile features before you need them urgently",
        ],
      },
    },
    {
      id: 6,
      title: "Reporting & Analytics Setup",
      description: "Configure reporting dashboards and analytics tracking",
      duration: "15 minutes",
      content: {
        overview:
          "Set up reporting and analytics to track your business performance and identify growth opportunities.",
        steps: [
          "Set up your business dashboard with key metrics",
          "Configure lead source and conversion tracking",
          "Set up sales pipeline and revenue reporting",
          "Configure marketing campaign performance tracking",
          "Set up automated reports and email delivery",
          "Create custom reports for your specific business needs",
        ],
        tips: [
          "Focus on metrics that directly impact your business goals",
          "Set up regular report delivery to stay informed",
          "Use data to identify your most effective lead sources",
          "Review reports regularly and adjust strategies accordingly",
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
          <div className="p-2 bg-green-100 rounded-lg">
            <Settings className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Moxi Works Set Up</h1>
            <p className="text-gray-600">Configure your Moxi Works platform</p>
          </div>
        </div>
        <Badge variant="secondary" className="mb-4">
          🎯 CRM & Marketing Platform
        </Badge>
        <p className="text-lg text-gray-700 max-w-3xl">
          Set up your Moxi Works platform to manage leads, automate marketing, and streamline your real estate business
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
          <CardDescription>Track your Moxi Works setup completion</CardDescription>
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
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{completedSteps.length}</div>
              <div className="text-sm text-gray-500">of {setupSteps.length} steps</div>
            </div>
          </div>
          {completionPercentage === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Excellent! Your Moxi Works platform is fully configured and ready to use.
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
                          <Settings className="h-5 w-5 text-green-600" />
                          {step.title}
                        </DialogTitle>
                        <DialogDescription>{step.content.overview}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-green-600" />
                            Step-by-Step Instructions
                          </h4>
                          <ol className="space-y-2">
                            {step.content.steps.map((stepItem, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
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
