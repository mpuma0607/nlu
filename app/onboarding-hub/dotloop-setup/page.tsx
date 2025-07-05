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
import { FileText, CheckCircle, Clock, Star, ArrowRight, Play } from "lucide-react"

export default function DotloopSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const setupSteps = [
    {
      id: 1,
      title: "Account Creation & Profile Setup",
      description: "Create your Dotloop account and set up your agent profile",
      duration: "12 minutes",
      content: {
        overview: "Set up your Dotloop account with your professional information and configure basic settings.",
        steps: [
          "Create your Dotloop account using company credentials",
          "Complete your agent profile with contact information",
          "Upload your professional headshot and license information",
          "Set up your digital signature and initials",
          "Configure your notification preferences",
          "Connect your email account for seamless integration",
        ],
        tips: [
          "Use a professional email address for your account",
          "Set up your digital signature to match your handwritten signature",
          "Enable email notifications for important transaction updates",
          "Keep your profile information current and professional",
        ],
      },
    },
    {
      id: 2,
      title: "Document Templates & Forms Library",
      description: "Set up your document templates and forms library",
      duration: "20 minutes",
      content: {
        overview: "Configure your document templates and forms library for efficient transaction management.",
        steps: [
          "Access your state-specific forms library",
          "Set up commonly used contract templates",
          "Configure listing agreement templates",
          "Set up disclosure and addendum templates",
          "Create custom document templates for your business",
          "Organize templates into folders for easy access",
        ],
        tips: [
          "Keep templates updated with the latest legal requirements",
          "Create separate folders for different transaction types",
          "Use consistent naming conventions for easy searching",
          "Regularly review and update your template library",
        ],
      },
    },
    {
      id: 3,
      title: "Loop Creation & Management",
      description: "Learn to create and manage transaction loops",
      duration: "18 minutes",
      content: {
        overview: "Master the process of creating and managing transaction loops for your real estate deals.",
        steps: [
          "Learn how to create a new loop for each transaction",
          "Set up loop participants and assign roles",
          "Configure loop settings and permissions",
          "Learn how to add and organize documents within loops",
          "Set up task assignments and deadlines",
          "Configure loop notifications and updates",
        ],
        tips: [
          "Create loops early in the transaction process",
          "Add all relevant parties to the loop from the beginning",
          "Use clear naming conventions for your loops",
          "Set up automated reminders for important deadlines",
        ],
      },
    },
    {
      id: 4,
      title: "Team Collaboration & Permissions",
      description: "Set up team collaboration and user permissions",
      duration: "15 minutes",
      content: {
        overview: "Configure team collaboration features and set appropriate permissions for different users.",
        steps: [
          "Add team members and assign appropriate roles",
          "Set up permission levels for different user types",
          "Configure team templates and shared resources",
          "Set up team notification preferences",
          "Learn how to transfer loops between team members",
          "Configure team reporting and oversight features",
        ],
        tips: [
          "Assign permissions based on job responsibilities",
          "Regularly review and update team member access",
          "Use team templates to maintain consistency",
          "Set up clear communication protocols within the platform",
        ],
      },
    },
    {
      id: 5,
      title: "Integration & Workflow Automation",
      description: "Set up integrations with other tools and automate workflows",
      duration: "22 minutes",
      content: {
        overview: "Connect Dotloop with your other business tools and set up automated workflows.",
        steps: [
          "Connect Dotloop with your CRM system",
          "Set up MLS integration for property information",
          "Configure email integration and synchronization",
          "Set up calendar integration for important dates",
          "Configure automated workflow triggers",
          "Set up reporting and analytics integrations",
        ],
        tips: [
          "Test all integrations thoroughly before going live",
          "Set up automated workflows for repetitive tasks",
          "Keep integration settings updated as your tools change",
          "Use automation to reduce manual data entry",
        ],
      },
    },
    {
      id: 6,
      title: "Mobile App Setup & Training",
      description: "Configure the mobile app and learn mobile features",
      duration: "10 minutes",
      content: {
        overview: "Set up the Dotloop mobile app for on-the-go transaction management.",
        steps: [
          "Download and install the Dotloop mobile app",
          "Log in and sync your account settings",
          "Learn how to access and review documents on mobile",
          "Practice signing documents using the mobile app",
          "Set up mobile notifications and alerts",
          "Learn how to share documents and updates from mobile",
        ],
        tips: [
          "Keep the app updated for the latest features",
          "Practice using mobile features before you need them urgently",
          "Use mobile app for quick document reviews and signatures",
          "Enable push notifications for time-sensitive updates",
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
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dotloop Set Up</h1>
            <p className="text-gray-600">Set up your Dotloop transaction management</p>
          </div>
        </div>
        <Badge variant="secondary" className="mb-4">
          📋 Transaction Management
        </Badge>
        <p className="text-lg text-gray-700 max-w-3xl">
          Configure Dotloop to streamline your transaction management, document handling, and client collaboration
          processes.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Setup Progress
          </CardTitle>
          <CardDescription>Track your Dotloop setup completion</CardDescription>
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
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{completedSteps.length}</div>
              <div className="text-sm text-gray-500">of {setupSteps.length} steps</div>
            </div>
          </div>
          {completionPercentage === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Perfect! Your Dotloop transaction management system is ready to streamline your deals.
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
                          <FileText className="h-5 w-5 text-purple-600" />
                          {step.title}
                        </DialogTitle>
                        <DialogDescription>{step.content.overview}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-purple-600" />
                            Step-by-Step Instructions
                          </h4>
                          <ol className="space-y-2">
                            {step.content.steps.map((stepItem, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
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
