"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle } from "lucide-react"

export default function DotloopSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const setupSteps = [
    {
      id: 1,
      title: "Account Creation & Access",
      description: "Set up your Dotloop account and initial access",
      duration: "5 minutes",
      content: {
        overview: "Get started with your Dotloop account setup and learn how to access the transaction management platform.",
        steps: [
          "Visit dotloop.com and click 'Sign Up'",
          "Enter your professional information and license details",
          "Verify your email address",
          "Complete the account verification process",
          "Download the Dotloop mobile app",
          "Log in and familiarize yourself with the dashboard"
        ],
        tips: [
          "Use your professional email address for the account",
          "Keep your license information up to date",
          "Enable notifications for important transaction updates",
          "Bookmark the Dotloop login page for easy access"
        ]
      }
    },
    {
      id: 2,
      title: "Profile & Signature Setup",
      description: "Configure your profile and electronic signature",
      duration: "8 minutes",
      content: {
        overview: "Set up your professional profile and electronic signature for seamless document signing.",
        steps: [
          "Navigate to your profile settings",
          "Upload your professional headshot and contact information",
          "Create your electronic signature",
          "Set up your default signature appearance",
          "Configure signature authentication preferences",
          "Test your signature on a sample document"
        ],
        tips: [
          "Make your signature clear and professional",
          "Use consistent signature styling across documents",
          "Keep your profile information current",
          "Practice using the signature tool before live transactions"
        ]
      }
    },
    {
      id: 3,
      title: "Template Library Setup",
      description: "Set up your document templates and forms library",
      duration: "15 minutes",
      content: {
        overview: "Configure your template library with commonly used forms and documents for efficient transaction management.",
        steps: [
          "Access the template library in your account",
          "Add state-specific purchase agreements and forms",
          "Set up listing agreement templates",
          "Configure disclosure document templates",
          "Add inspection and appraisal forms",
          "Create custom templates for your specific needs"
        ],
        tips: [
          "Organize templates by transaction type",
          "Keep templates updated with current legal requirements",
          "Create folders for different property types",
          "Regularly review and update your template library"
        ]
      }
    },
    {
      id: 4,
      title: "Workflow & Automation",
      description: "Set up automated workflows and task management",
      duration: "12 minutes",
      content: {
        overview: "Configure automated workflows to streamline your transaction process and ensure nothing falls through the cracks.",
        steps: [
          "Set up transaction workflow templates",
          "Configure automated task assignments",
          "Set up deadline reminders and notifications",
          "Create milestone tracking for transactions",
          "Configure client communication automation",
          "Set up document completion tracking"
        ],
        tips: [
          "Customize workflows for different transaction types",
          "Set realistic deadlines with buffer time",
          "Test workflows with sample transactions",
          "Regularly review and optimize your processes"
        ]
      }
    },
    {
      id: 5,
      title: "Team & Collaboration Setup",
      description: "Configure team access and collaboration features",
      duration: "10 minutes",
      content: {
        overview: "Set up team collaboration features to work effectively with other agents, brokers, and service providers.",
        steps: [
          "Add team members and set permission levels",
          "Configure collaboration settings with other agents",
          "Set up lender and title company connections",
          "Configure client access and permissions",
          "Set up document sharing preferences",
          "Create communication protocols for team members"
        ],
        tips: [
          "Clearly define roles and permissions for team members",
          "Establish communication protocols early",
          "Regularly review team access and permissions",
          "Train team members on Dotloop best practices"
        ]
      }
    },
    {
      id: 6,
      title: "Integration & Sync Setup",
      description: "Connect Dotloop with your other business tools",
      duration: "8 minutes",
      content: {
        overview: "Integrate Dotloop with your CRM, calendar, and other business tools for seamless workflow management.",
        steps: [
          "Connect Dotloop to your CRM system",
          "Set up calendar integration for important dates",
          "Configure email integration and notifications",
          "Set up mobile app synchronization",
          "Connect with MLS and listing platforms",
          "Configure backup and data export settings"
        ],
        tips: [
          "Test all integrations thoroughly before going live",
          "Set up regular data backups",
          "Keep integration settings updated",
          "Monitor sync status regularly to avoid data loss"
        ]
      }
    }
  ]

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
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
          📄 Transaction Management
        </Badge>
        <p className="text-lg text-gray-700 max-w-3xl">
          Configure Dotloop to streamline your transaction management, document handling, and client collaboration processes.
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
              <div\
