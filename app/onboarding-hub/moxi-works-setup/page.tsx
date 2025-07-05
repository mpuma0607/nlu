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
      title: "Account Setup & Login",
      description: "Set up your Moxi Works account and initial login",
      duration: "5 minutes",
      content: {
        overview:
          "Get started with your Moxi Works account setup and learn the basics of logging in and navigating the platform.",
        steps: [
          "Receive your Moxi Works login credentials from your broker",
          "Visit the Moxi Works login page",
          "Enter your username and password",
          "Complete the initial setup wizard",
          "Verify your email address",
          "Set up two-factor authentication for security",
        ],
        tips: [
          "Save your login credentials in a secure password manager",
          "Use a strong, unique password",
          "Keep your login information confidential",
          "Contact IT support if you have login issues",
        ],
      },
    },
    {
      id: 2,
      title: "Profile Configuration",
      description: "Complete your agent profile within Moxi Works",
      duration: "10 minutes",
      content: {
        overview:
          "Set up your complete agent profile with all necessary information for client interactions and marketing.",
        steps: [
          "Navigate to your profile settings",
          "Upload your professional headshot",
          "Enter your contact information and license details",
          "Add your bio and professional background",
          "Set up your email signature",
          "Configure your marketing preferences",
        ],
        tips: [
          "Use the same headshot across all platforms for consistency",
          "Keep your bio professional but personable",
          "Double-check all contact information for accuracy",
          "Update your profile regularly as your business grows",
        ],
      },
    },
    {
      id: 3,
      title: "CRM & Contact Management",
      description: "Set up your contact management and CRM features",
      duration: "15 minutes",
      content: {
        overview: "Configure your CRM system to effectively manage leads, clients, and business relationships.",
        steps: [
          "Import existing contacts from your previous system",
          "Set up contact categories and tags",
          "Configure lead assignment and routing",
          "Set up automated follow-up campaigns",
          "Create custom fields for important client information",
          "Configure contact sync with your mobile device",
        ],
        tips: [
          "Clean up duplicate contacts before importing",
          "Use consistent tagging and categorization",
          "Set up regular database maintenance routines",
          "Train on CRM best practices for maximum efficiency",
        ],
      },
    },
    {
      id: 4,
      title: "Marketing Tools Setup",
      description: "Configure marketing automation and tools",
      duration: "12 minutes",
      content: {
        overview: "Set up your marketing tools and automation to streamline your marketing efforts and lead nurturing.",
        steps: [
          "Set up your branded email templates",
          "Configure social media posting tools",
          "Set up listing marketing automation",
          "Create buyer and seller nurture campaigns",
          "Configure market reports and CMAs",
          "Set up referral tracking and management",
        ],
        tips: [
          "Customize templates with your branding",
          "Test all automated campaigns before activation",
          "Monitor campaign performance regularly",
          "Keep marketing content fresh and relevant",
        ],
      },
    },
    {
      id: 5,
      title: "Transaction Management",
      description: "Set up transaction tracking and management tools",
      duration: "10 minutes",
      content: {
        overview: "Configure your transaction management system to track deals from contract to closing.",
        steps: [
          "Set up transaction pipeline stages",
          "Configure task templates for different transaction types",
          "Set up automated reminders and deadlines",
          "Configure document management and storage",
          "Set up commission tracking",
          "Configure closing coordination tools",
        ],
        tips: [
          "Create checklists for each transaction stage",
          "Set up automated reminders for important deadlines",
          "Keep all transaction documents organized",
          "Regularly backup important transaction data",
        ],
      },
    },
    {
      id: 6,
      title: "Reporting & Analytics",
      description: "Set up reporting dashboards and analytics tracking",
      duration: "8 minutes",
      content: {
        overview:
          "Configure your reporting and analytics to track your business performance and identify growth opportunities.",
        steps: [
          "Set up your main dashboard with key metrics",
          "Configure lead source tracking",
          "Set up conversion rate monitoring",
          "Configure income and commission tracking",
          "Set up goal tracking and progress monitoring",
          "Configure automated performance reports",
        ],
        tips: [
          "Focus on metrics that drive business decisions",
          "Set up regular report reviews",
          "Use data to identify areas for improvement",
          "Share relevant metrics with your team or broker",
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
          🔧 Platform Setup
        </Badge>
        <p className="text-lg text-gray-700 max-w-3xl">
          Set up your Moxi Works platform to maximize your productivity and streamline your real estate business
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
                Congratulations! You've completed your Moxi Works setup.
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
