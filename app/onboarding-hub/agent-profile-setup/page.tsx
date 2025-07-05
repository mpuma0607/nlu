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
      title: "Meet Your Leadership Team & Who To Contact For What",
      description: "Get to know your leadership team and understand the support structure",
      duration: "10 minutes",
      content: {
        overview:
          "Learn about your leadership team, their roles, and who to contact for different types of support and questions.",
        steps: [
          "Review the leadership team directory and contact information",
          "Understand each leader's role and areas of expertise",
          "Save important contact numbers in your phone",
          "Learn the escalation process for different types of issues",
          "Schedule introductory meetings with key team members",
          "Join relevant team communication channels",
        ],
        tips: [
          "Don't hesitate to reach out when you need help",
          "Build relationships early with your support team",
          "Keep contact information easily accessible",
          "Understand the best communication method for each leader",
        ],
      },
    },
    {
      id: 2,
      title: "Get Connected - Wifi, Office Access, Printers",
      description: "Set up your office connectivity and access to shared resources",
      duration: "15 minutes",
      content: {
        overview: "Get connected to all office systems including wifi, printers, and physical access to office spaces.",
        steps: [
          "Obtain wifi network credentials and connect your devices",
          "Get your office access card or key code",
          "Set up printer access on your computer and mobile devices",
          "Test printing from both computer and mobile",
          "Learn office hours and access protocols",
          "Get contact information for IT support",
        ],
        tips: [
          "Test all connections before you need them urgently",
          "Save wifi passwords securely",
          "Know who to contact for technical issues",
          "Respect office access policies and security protocols",
        ],
      },
    },
    {
      id: 3,
      title: "G-Suite & Email Set Up",
      description: "Configure your Google Workspace and professional email account",
      duration: "20 minutes",
      content: {
        overview:
          "Set up your professional Google Workspace account including Gmail, Calendar, Drive, and other productivity tools.",
        steps: [
          "Receive your G-Suite account credentials from IT",
          "Log into your new Gmail account and set up your profile",
          "Configure email forwarding if needed from personal accounts",
          "Set up Google Drive file organization structure",
          "Configure Google Calendar with your availability",
          "Install Google Workspace apps on your mobile devices",
        ],
        tips: [
          "Use a professional profile photo across all Google services",
          "Set up email signatures with your contact information",
          "Organize your Drive with clear folder structures",
          "Enable two-factor authentication for security",
        ],
      },
    },
    {
      id: 4,
      title: "How To Set Up Company Calendar",
      description: "Configure your company calendar system and scheduling",
      duration: "12 minutes",
      content: {
        overview:
          "Set up your company calendar system to manage appointments, meetings, and important business events.",
        steps: [
          "Access the company calendar system",
          "Set up your personal calendar within the company system",
          "Configure calendar sharing with team members",
          "Set up appointment types and availability",
          "Configure automatic reminders and notifications",
          "Sync company calendar with your personal devices",
        ],
        tips: [
          "Block time for prospecting and administrative tasks",
          "Use color coding for different types of appointments",
          "Set realistic buffer times between appointments",
          "Keep your calendar updated and accurate",
        ],
      },
    },
    {
      id: 5,
      title: "How To Add Voicemail Greeting",
      description: "Set up your professional voicemail greeting",
      duration: "8 minutes",
      content: {
        overview:
          "Create and set up a professional voicemail greeting that represents you and your business effectively.",
        steps: [
          "Access your phone system voicemail settings",
          "Write a professional voicemail script",
          "Record your voicemail greeting",
          "Review and re-record if necessary for clarity",
          "Set up voicemail-to-email notifications",
          "Test your voicemail system by calling yourself",
        ],
        tips: [
          "Keep your greeting concise and professional",
          "Include your name and company information",
          "Mention when callers can expect a return call",
          "Update your greeting if you'll be unavailable for extended periods",
        ],
      },
    },
    {
      id: 6,
      title: "How To Write Your Agent Bio",
      description: "Create a compelling professional bio for marketing materials",
      duration: "25 minutes",
      content: {
        overview:
          "Write a professional bio that showcases your expertise, personality, and value proposition to potential clients.",
        steps: [
          "Gather information about your background and experience",
          "Write a compelling opening that grabs attention",
          "Include your professional qualifications and certifications",
          "Add personal touches that make you relatable",
          "Include your specialties and areas of expertise",
          "End with a strong call-to-action",
        ],
        tips: [
          "Keep it conversational but professional",
          "Focus on benefits to clients, not just features about you",
          "Include specific achievements and results when possible",
          "Have colleagues review your bio for feedback",
        ],
      },
    },
    {
      id: 7,
      title: "Printed & Digital Business Cards",
      description: "Design and order your professional business cards",
      duration: "15 minutes",
      content: {
        overview:
          "Create professional business cards for both print and digital use to make lasting impressions with clients and contacts.",
        steps: [
          "Access the company business card design system",
          "Choose a template that matches your brand",
          "Add your contact information and photo",
          "Review design guidelines and compliance requirements",
          "Order printed business cards",
          "Set up digital business card for mobile sharing",
        ],
        tips: [
          "Use a high-quality professional headshot",
          "Include all relevant contact information",
          "Follow company branding guidelines",
          "Order extra cards - you'll use more than you think",
        ],
      },
    },
    {
      id: 8,
      title: "Ring Central Phone Set Up",
      description: "Configure your Ring Central phone system",
      duration: "18 minutes",
      content: {
        overview: "Set up your Ring Central phone system for professional communication with clients and team members.",
        steps: [
          "Download and install Ring Central app on all devices",
          "Log in with your provided credentials",
          "Set up your phone number and extension",
          "Configure call forwarding and routing preferences",
          "Set up voicemail and greeting messages",
          "Test calling and receiving calls on all devices",
        ],
        tips: [
          "Test the system thoroughly before going live",
          "Set up call forwarding to ensure you never miss important calls",
          "Use professional greetings and hold music",
          "Keep the app updated on all devices",
        ],
      },
    },
    {
      id: 9,
      title: "MLS Set Up",
      description: "Get access to and set up your MLS system",
      duration: "20 minutes",
      content: {
        overview:
          "Set up your Multiple Listing Service (MLS) access to search properties and manage listings effectively.",
        steps: [
          "Complete MLS application and background check",
          "Receive MLS login credentials",
          "Complete required MLS training modules",
          "Set up your MLS profile and preferences",
          "Learn basic search and listing functions",
          "Download MLS mobile app and configure settings",
        ],
        tips: [
          "Complete all required training before using the system",
          "Keep your MLS credentials secure and confidential",
          "Stay updated on MLS rules and regulations",
          "Practice using search functions to become proficient",
        ],
      },
    },
    {
      id: 10,
      title: "How To Use 21online.com",
      description: "Learn to navigate and use the Century 21 online platform",
      duration: "15 minutes",
      content: {
        overview:
          "Get familiar with the Century 21 online platform for accessing resources, tools, and company information.",
        steps: [
          "Access 21online.com with your credentials",
          "Complete your profile setup",
          "Explore available resources and tools",
          "Set up notifications and preferences",
          "Learn how to access marketing materials",
          "Understand how to submit support requests",
        ],
        tips: [
          "Bookmark important sections for quick access",
          "Check for updates and new resources regularly",
          "Use the search function to find specific information quickly",
          "Take advantage of all available training materials",
        ],
      },
    },
    {
      id: 11,
      title: "Setting Up Your Online Presence",
      description: "Establish your presence on Zillow, Realtor.com, GMB, and YouTube",
      duration: "45 minutes",
      content: {
        overview:
          "Create and optimize your online presence across major real estate platforms and social media channels.",
        steps: [
          "Set up your Zillow agent profile with photos and bio",
          "Create your Realtor.com agent profile",
          "Set up Google My Business listing",
          "Create your YouTube channel for real estate content",
          "Optimize all profiles with consistent branding",
          "Add client reviews and testimonials where possible",
        ],
        tips: [
          "Use consistent branding across all platforms",
          "Include professional photos and compelling descriptions",
          "Encourage satisfied clients to leave reviews",
          "Keep all profiles updated with current information",
        ],
      },
    },
    {
      id: 12,
      title: "Agent Safety Protocols",
      description: "Learn essential safety protocols for real estate agents",
      duration: "20 minutes",
      content: {
        overview:
          "Understand and implement safety protocols to protect yourself while working with clients and showing properties.",
        steps: [
          "Review company safety policies and procedures",
          "Learn about personal safety apps and tools",
          "Understand client verification procedures",
          "Set up emergency contacts and check-in protocols",
          "Learn about property showing safety measures",
          "Complete safety training certification",
        ],
        tips: [
          "Always inform someone of your whereabouts when showing properties",
          "Trust your instincts - if something feels wrong, leave",
          "Keep emergency contacts easily accessible",
          "Stay updated on safety best practices and new tools",
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
          Complete your comprehensive agent onboarding checklist to establish your professional presence and get
          connected to all essential systems and tools.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Setup Progress
          </CardTitle>
          <CardDescription>Track your agent setup completion</CardDescription>
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
                Congratulations! You've completed your agent profile setup. Next Step: Attend Tools and Tech Overview
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
