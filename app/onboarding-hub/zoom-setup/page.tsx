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
import { CheckCircle, Circle, Video, Calendar, Settings, Users, Smartphone, Home } from "lucide-react"
import { useTenant } from "@/contexts/tenant-context"

const steps = [
  {
    id: 1,
    title: "Account Setup & Profile Configuration",
    description: "Create your Zoom account and set up your professional profile",
    icon: Users,
    content: {
      overview: "A professional Zoom setup is essential for client meetings, virtual showings, and team collaboration.",
      steps: [
        "Sign up for Zoom Pro account (recommended for real estate)",
        "Complete your profile with professional photo and information",
        "Set up your personal meeting room with custom URL",
        "Configure your default meeting settings",
        "Set up your professional background and lighting",
      ],
      tips: "Use a professional headshot and ensure good lighting for the best first impression!",
    },
  },
  {
    id: 2,
    title: "Meeting Scheduling & Calendar Integration",
    description: "Connect Zoom with your calendar and set up scheduling",
    icon: Calendar,
    content: {
      overview: "Seamless calendar integration makes scheduling client meetings effortless and professional.",
      steps: [
        "Connect Zoom to your Google Calendar or Outlook",
        "Set up automatic Zoom links for calendar events",
        "Configure meeting templates for different appointment types",
        "Set up scheduling links for easy client booking",
        "Test the integration with a practice meeting",
      ],
      tips: "Create different meeting templates for consultations, showings, and closings!",
    },
  },
  {
    id: 3,
    title: "Virtual Showing & Property Tour Setup",
    description: "Configure Zoom for virtual property tours and showings",
    icon: Home,
    content: {
      overview:
        "Virtual showings have become essential for reaching remote buyers and providing flexible viewing options.",
      steps: [
        "Set up mobile Zoom app for property tours",
        "Practice screen sharing for listing presentations",
        "Configure high-quality video settings for property tours",
        "Set up recording capabilities for tour playback",
        "Learn to use annotation tools for highlighting features",
      ],
      tips: "Always do a test run of your virtual tour setup before the actual showing!",
    },
  },
  {
    id: 4,
    title: "Client Consultation & Meeting Features",
    description: "Master Zoom features for professional client consultations",
    icon: Video,
    content: {
      overview: "Professional client consultations require mastery of Zoom's collaboration and presentation features.",
      steps: [
        "Set up waiting rooms for professional client entry",
        "Learn to share screens for document review",
        "Configure breakout rooms for team consultations",
        "Set up recording for important client meetings",
        "Practice using whiteboard for explaining concepts",
      ],
      tips: "Always inform clients when you're recording and get their consent first!",
    },
  },
  {
    id: 5,
    title: "Mobile App & Field Usage",
    description: "Configure Zoom mobile app for on-the-go meetings",
    icon: Smartphone,
    content: {
      overview:
        "The mobile app allows you to conduct professional meetings from anywhere, perfect for busy real estate schedules.",
      steps: [
        "Download and set up Zoom mobile app",
        "Configure mobile-specific settings and preferences",
        "Practice joining and hosting meetings from mobile",
        "Set up mobile hotspot backup for reliable connection",
        "Learn mobile screen sharing and annotation features",
      ],
      tips: "Keep a mobile tripod handy for stable video during mobile property tours!",
    },
  },
  {
    id: 6,
    title: "Advanced Features & Security Settings",
    description: "Configure advanced features and security for professional use",
    icon: Settings,
    content: {
      overview: "Advanced features and proper security settings ensure professional, secure client interactions.",
      steps: [
        "Set up meeting passwords and security features",
        "Configure advanced scheduling and recurring meetings",
        "Set up cloud recording and storage management",
        "Learn to use polls and Q&A for group presentations",
        "Configure integration with your CRM system",
      ],
      tips: "Always use passwords for client meetings to maintain confidentiality and professionalism!",
    },
  },
]

export default function ZoomSetupPage() {
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
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Zoom Set Up</h1>
            <p className="text-gray-600">Configure your video conferencing for client meetings and virtual tours</p>
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
              className={`transition-all duration-200 ${isCompleted ? "bg-orange-50 border-orange-200" : "hover:shadow-md"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <button onClick={() => toggleStep(step.id)} className="mt-1 transition-colors duration-200">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-orange-600" />
                        <CardTitle className={`text-lg ${isCompleted ? "text-orange-800" : "text-gray-900"}`}>
                          {step.title}
                        </CardTitle>
                      </div>
                      <CardDescription className={isCompleted ? "text-orange-700" : "text-gray-600"}>
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
                          <Icon className="w-5 h-5 text-orange-600" />
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
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-orange-900 mb-1">💡 Pro Tip:</h4>
                          <p className="text-sm text-orange-800">{step.content.tips}</p>
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
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-orange-800 mb-2">Zoom Setup Complete! 🎉</h3>
          <p className="text-orange-700 mb-4">
            Your video conferencing system is now ready for professional client meetings and virtual property tours.
          </p>
          <p className="text-sm text-orange-600">
            Start scheduling your first virtual consultation and experience the power of professional video
            communication!
          </p>
        </div>
      )}
    </div>
  )
}
