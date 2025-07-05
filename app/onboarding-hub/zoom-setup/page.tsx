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
import { Video, CheckCircle, Clock, Star, ArrowRight, Play } from "lucide-react"

export default function ZoomSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const setupSteps = [
    {
      id: 1,
      title: "Account Setup & Installation",
      description: "Create your Zoom account and install the application",
      duration: "8 minutes",
      content: {
        overview:
          "Get started with Zoom by creating your professional account and installing the necessary applications.",
        steps: [
          "Visit zoom.us and sign up for a professional account",
          "Verify your email address and complete account setup",
          "Download Zoom desktop application for your computer",
          "Install Zoom mobile app on your smartphone and tablet",
          "Log into all applications with your account credentials",
          "Complete the initial setup wizard and preferences",
        ],
        tips: [
          "Use your professional email address for the account",
          "Choose a professional username that includes your name",
          "Enable automatic updates for the best experience",
          "Test your installation by joining a test meeting",
        ],
      },
    },
    {
      id: 2,
      title: "Profile & Professional Setup",
      description: "Configure your professional profile and settings",
      duration: "10 minutes",
      content: {
        overview: "Set up your professional profile to make a great impression with clients and colleagues.",
        steps: [
          "Upload a professional headshot as your profile picture",
          "Set your display name to your professional name",
          "Add your title and company information",
          "Configure your time zone and location settings",
          "Set up your professional email signature",
          "Configure privacy and security settings",
        ],
        tips: [
          "Use the same professional photo across all platforms",
          "Keep your display name consistent with business cards",
          "Set privacy settings to protect client confidentiality",
          "Regularly update your profile information",
        ],
      },
    },
    {
      id: 3,
      title: "Meeting Settings & Preferences",
      description: "Configure your default meeting settings and preferences",
      duration: "12 minutes",
      content: {
        overview: "Set up your meeting preferences to ensure professional and efficient client interactions.",
        steps: [
          "Configure default meeting settings (mute on entry, waiting room, etc.)",
          "Set up meeting security options and passwords",
          "Configure recording preferences and storage options",
          "Set up screen sharing permissions and controls",
          "Configure chat and annotation settings",
          "Set up meeting templates for different types of appointments",
        ],
        tips: [
          "Always use waiting rooms for client meetings",
          "Enable meeting passwords for added security",
          "Test recording features before important meetings",
          "Create templates for listing presentations and buyer consultations",
        ],
      },
    },
    {
      id: 4,
      title: "Calendar Integration",
      description: "Connect Zoom with your calendar system",
      duration: "8 minutes",
      content: {
        overview: "Integrate Zoom with your calendar to streamline scheduling and automatically add meeting links.",
        steps: [
          "Connect Zoom to your Google Calendar or Outlook",
          "Configure automatic meeting link generation",
          "Set up meeting reminders and notifications",
          "Test calendar integration with a sample meeting",
          "Configure meeting invitation templates",
          "Set up recurring meeting options for regular clients",
        ],
        tips: [
          "Test integration thoroughly before scheduling client meetings",
          "Customize meeting invitation templates with your branding",
          "Set up buffer time between meetings",
          "Use descriptive meeting titles for easy identification",
        ],
      },
    },
    {
      id: 5,
      title: "Audio & Video Setup",
      description: "Configure and test your audio and video equipment",
      duration: "15 minutes",
      content: {
        overview: "Ensure your audio and video quality is professional for client meetings and presentations.",
        steps: [
          "Test your computer's built-in camera and microphone",
          "Configure external camera and microphone if available",
          "Set up proper lighting for video calls",
          "Test audio levels and background noise reduction",
          "Configure virtual backgrounds if desired",
          "Test screen sharing and presentation features",
        ],
        tips: [
          "Invest in good lighting - it makes a huge difference",
          "Use a headset or external microphone for better audio quality",
          "Test your setup in different lighting conditions",
          "Have a backup plan for technical difficulties",
        ],
      },
    },
    {
      id: 6,
      title: "Advanced Features & Tools",
      description: "Learn advanced Zoom features for real estate professionals",
      duration: "20 minutes",
      content: {
        overview:
          "Master advanced Zoom features that can enhance your real estate presentations and client interactions.",
        steps: [
          "Learn to use breakout rooms for group consultations",
          "Set up and practice using whiteboard features",
          "Configure polling and Q&A features for presentations",
          "Learn to use annotation tools during screen sharing",
          "Set up and test virtual property tour capabilities",
          "Practice using Zoom for listing presentations and buyer consultations",
        ],
        tips: [
          "Practice advanced features before using them with clients",
          "Create templates for common presentation scenarios",
          "Keep backup materials ready in case of technical issues",
          "Record practice sessions to improve your presentation skills",
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
          <div className="p-2 bg-orange-100 rounded-lg">
            <Video className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Zoom Set Up</h1>
            <p className="text-gray-600">Configure Zoom for client meetings</p>
          </div>
        </div>
        <Badge variant="secondary" className="mb-4">
          📹 Video Conferencing
        </Badge>
        <p className="text-lg text-gray-700 max-w-3xl">
          Set up Zoom to conduct professional virtual meetings, property tours, and client consultations with
          confidence.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Setup Progress
          </CardTitle>
          <CardDescription>Track your Zoom setup completion</CardDescription>
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
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">{completedSteps.length}</div>
              <div className="text-sm text-gray-500">of {setupSteps.length} steps</div>
            </div>
          </div>
          {completionPercentage === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">Congratulations! You've completed your Zoom setup.</span>
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
                          <Video className="h-5 w-5 text-orange-600" />
                          {step.title}
                        </DialogTitle>
                        <DialogDescription>{step.content.overview}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-orange-600" />
                            Step-by-Step Instructions
                          </h4>
                          <ol className="space-y-2">
                            {step.content.steps.map((stepItem, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
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
