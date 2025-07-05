"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, Circle, FileText, Users, Workflow, Settings, Smartphone } from "lucide-react"
import { useTenant } from "@/contexts/tenant-context"

const steps = [
  {
    id: 1,
    title: "Account Creation & Profile Setup",
    description: "Create your Dotloop account and set up your professional profile",
    icon: Users,
    content: {
      overview:
        "Your Dotloop profile is essential for managing real estate transactions efficiently and professionally.",
      steps: [
        "Access your Dotloop invitation from your brokerage",
        "Create your account with provided credentials",
        "Complete your agent profile with contact information",
        "Upload your professional headshot and signature",
        "Set up your notification preferences",
      ],
      tips: "Use a clear, professional signature as it will appear on all your transaction documents!",
    },
  },
  {
    id: 2,
    title: "Document Templates & Forms Setup",
    description: "Configure your document templates and standard forms",
    icon: FileText,
    content: {
      overview: "Having the right templates ready saves time and ensures consistency across all transactions.",
      steps: [
        "Access your state-specific forms library",
        "Set up commonly used contract templates",
        "Configure disclosure document templates",
        "Create custom checklists for different transaction types",
        "Set up automated document routing rules",
      ],
      tips: "Organize your templates by transaction type (buyer, seller, rental) for quick access!",
    },
  },
  {
    id: 3,
    title: "Loop Creation & Workflow Management",
    description: "Learn to create loops and manage transaction workflows",
    icon: Workflow,
    content: {
      overview: "Loops are the heart of Dotloop - they contain all documents and communications for each transaction.",
      steps: [
        "Create your first practice loop",
        "Learn to add participants (buyers, sellers, lenders)",
        "Practice uploading and organizing documents",
        "Set up task assignments and deadlines",
        "Learn to track loop progress and milestones",
      ],
      tips: "Create a loop template with your standard workflow to save time on future transactions!",
    },
  },
  {
    id: 4,
    title: "Team Collaboration & Permissions",
    description: "Set up team access and collaboration features",
    icon: Users,
    content: {
      overview: "Effective collaboration ensures all team members stay informed and transactions move smoothly.",
      steps: [
        "Add your transaction coordinator to your team",
        "Set up permission levels for different team members",
        "Configure automatic notifications for team updates",
        "Learn to share loops with external parties",
        "Set up client access and permissions",
      ],
      tips: "Give clients view-only access so they can track progress without making changes!",
    },
  },
  {
    id: 5,
    title: "Mobile App & Field Access",
    description: "Configure the Dotloop mobile app for on-the-go access",
    icon: Smartphone,
    content: {
      overview:
        "The mobile app lets you manage transactions from anywhere, perfect for busy real estate professionals.",
      steps: [
        "Download the Dotloop mobile app",
        "Log in and sync your account",
        "Practice accessing loops on mobile",
        "Learn to upload photos and documents from your phone",
        "Set up mobile notifications",
      ],
      tips: "Use the mobile app to quickly upload inspection photos and signed documents from the field!",
    },
  },
  {
    id: 6,
    title: "Integrations & Advanced Features",
    description: "Connect Dotloop with other tools and explore advanced features",
    icon: Settings,
    content: {
      overview: "Integrations streamline your workflow by connecting Dotloop with your other business tools.",
      steps: [
        "Connect your CRM for automatic contact sync",
        "Set up MLS integration for property information",
        "Configure email integration for automatic archiving",
        "Explore reporting and analytics features",
        "Set up automated backup and archiving",
      ],
      tips: "Start with CRM integration first - it will save you the most time in daily operations!",
    },
  },
]

export default function DotloopSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const { tenantConfig } = useTenant()

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const completionPercentage = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dotloop Set Up</h1>
            <p className="text-gray-600">Configure your transaction management system</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Setup Progress</h2>
            <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
              {completedSteps.length} of {steps.length} completed
            </Badge>
          </div>
          <Progress value={completionPercentage} className="mb-2" />
          <p className="text-sm text-gray-600">{completionPercentage}% complete</p>
        </div>
      </div>

      <div className="grid gap-4">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id)
          const Icon = step.icon

          return (
            <Card
              key={step.id}
              className={`transition-all duration-200 ${isCompleted ? "bg-indigo-50 border-indigo-200" : "hover:shadow-md"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <button onClick={() => toggleStep(step.id)} className="mt-1 transition-colors duration-200">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-indigo-600" />
                        <CardTitle className={`text-lg ${isCompleted ? "text-indigo-800" : "text-gray-900"}`}>
                          {step.title}
                        </CardTitle>
                      </div>
                      <CardDescription className={isCompleted ? "text-indigo-700" : "text-gray-600"}>
                        {step.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-indigo-600" />
                          {step.title}
                        </DialogTitle>
                        <DialogDescription>{step.content.overview}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Steps to Complete:</h4>
                          <ol className="list-decimal list-inside space-y-1">
                            {step.content.steps.map((stepItem, index) => (
                              <li key={index} className="text-sm text-gray-700">
                                {stepItem}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-indigo-900 mb-1">💡 Pro Tip:</h4>
                          <p className="text-sm text-indigo-800">{step.content.tips}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {completionPercentage === 100 && (
        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Dotloop Setup Complete! 🎉</h3>
          <p className="text-indigo-700 mb-4">
            Your transaction management system is now ready to streamline your deals and keep everything organized.
          </p>
          <p className="text-sm text-indigo-600">
            Start creating your first loop and experience the power of organized transaction management!
          </p>
        </div>
      )}
    </div>
  )
}
