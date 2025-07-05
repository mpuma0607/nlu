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
import { CheckCircle, Circle, Building, Users, BarChart3, Settings, Smartphone, Zap } from "lucide-react"
import { useTenant } from "@/contexts/tenant-context"

const steps = [
  {
    id: 1,
    title: "Account Setup & Profile Creation",
    description: "Create your Moxi Works account and complete your agent profile",
    icon: Users,
    content: {
      overview: "Your Moxi Works profile is the foundation of your CRM experience and client management system.",
      steps: [
        "Access your Moxi Works invitation email from your broker",
        "Create your account using the provided credentials",
        "Upload a professional headshot and complete your bio",
        "Set your contact preferences and availability",
        "Configure your personal branding settings",
      ],
      tips: "Use the same professional photo across all platforms for brand consistency!",
    },
  },
  {
    id: 2,
    title: "Contact Import & Organization",
    description: "Import existing contacts and organize your database",
    icon: Building,
    content: {
      overview: "A well-organized contact database is crucial for effective lead management and client relationships.",
      steps: [
        "Export contacts from your previous CRM or phone",
        "Clean and format your contact data",
        "Import contacts using Moxi's bulk import feature",
        "Create contact groups and tags for organization",
        "Set up custom fields for additional client information",
      ],
      tips: "Take time to clean your data before importing - quality contacts are better than quantity!",
    },
  },
  {
    id: 3,
    title: "Lead Management & Pipeline Setup",
    description: "Configure your sales pipeline and lead tracking system",
    icon: BarChart3,
    content: {
      overview: "Effective pipeline management helps you track opportunities and never miss a follow-up.",
      steps: [
        "Set up your sales pipeline stages",
        "Configure lead sources and tracking",
        "Create automated lead assignment rules",
        "Set up lead scoring and prioritization",
        "Configure pipeline reporting and analytics",
      ],
      tips: "Customize your pipeline stages to match your actual sales process for better tracking!",
    },
  },
  {
    id: 4,
    title: "Automated Campaigns & Follow-ups",
    description: "Create automated email campaigns and follow-up sequences",
    icon: Zap,
    content: {
      overview: "Automation ensures consistent communication with leads and clients without manual effort.",
      steps: [
        "Set up welcome email sequences for new leads",
        "Create nurture campaigns for different client types",
        "Configure automated birthday and anniversary reminders",
        "Set up listing alert campaigns for buyers",
        "Create post-closing follow-up sequences",
      ],
      tips: "Personalize your automated messages to maintain a human touch even in automation!",
    },
  },
  {
    id: 5,
    title: "Mobile App Configuration",
    description: "Set up the Moxi Works mobile app for on-the-go access",
    icon: Smartphone,
    content: {
      overview: "The mobile app keeps you connected to your business wherever you are.",
      steps: [
        "Download the Moxi Works mobile app",
        "Log in with your account credentials",
        "Enable push notifications for important updates",
        "Set up mobile contact sync",
        "Configure mobile-specific preferences",
      ],
      tips: "Enable location services to automatically log property visits and client meetings!",
    },
  },
  {
    id: 6,
    title: "Integrations & Advanced Features",
    description: "Connect Moxi Works with other tools and explore advanced features",
    icon: Settings,
    content: {
      overview: "Integrations streamline your workflow by connecting all your business tools.",
      steps: [
        "Connect your email account for automatic email tracking",
        "Set up calendar integration for appointment sync",
        "Configure MLS integration for listing management",
        "Connect social media accounts for lead generation",
        "Explore reporting and analytics features",
      ],
      tips: "Start with basic integrations and gradually add more as you become comfortable with the system!",
    },
  },
]

export default function MoxiWorksSetupPage() {
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Moxi Works Set Up</h1>
            <p className="text-gray-600">Configure your CRM and lead management system</p>
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
              className={`transition-all duration-200 ${isCompleted ? "bg-purple-50 border-purple-200" : "hover:shadow-md"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <button onClick={() => toggleStep(step.id)} className="mt-1 transition-colors duration-200">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-purple-600" />
                        <CardTitle className={`text-lg ${isCompleted ? "text-purple-800" : "text-gray-900"}`}>
                          {step.title}
                        </CardTitle>
                      </div>
                      <CardDescription className={isCompleted ? "text-purple-700" : "text-gray-600"}>
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
                          <Icon className="w-5 h-5 text-purple-600" />
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
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-1">💡 Pro Tip:</h4>
                          <p className="text-sm text-purple-800">{step.content.tips}</p>
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
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-purple-800 mb-2">Moxi Works Setup Complete! 🎉</h3>
          <p className="text-purple-700 mb-4">
            Your CRM is now configured and ready to help you manage leads and grow your business effectively.
          </p>
          <p className="text-sm text-purple-600">
            Start adding your first leads and explore the automation features to maximize your productivity!
          </p>
        </div>
      )}
    </div>
  )
}
