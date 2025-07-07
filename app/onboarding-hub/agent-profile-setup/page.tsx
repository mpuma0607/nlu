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
import {
  CheckCircle,
  Circle,
  Users,
  Wifi,
  Mail,
  Calendar,
  Phone,
  User,
  CreditCard,
  Building,
  Globe,
  GraduationCap,
  Key,
  Wrench,
  Calculator,
  Shield,
  AlertTriangle,
  List,
  FilePenLineIcon as Signature,
  Download,
  MailOpen,
} from "lucide-react"
import { useTenant } from "@/contexts/tenant-context"

const steps = [
  {
    id: 1,
    title: "Meet Your Leadership Team & Who To Contact For What",
    description: "Get to know your leadership team and understand the chain of command",
    icon: Users,
    content: {
      overview: "Understanding your leadership structure is crucial for success at Century 21 Beggins.",
      steps: [
        "Review the leadership organizational chart below",
        "Schedule meet-and-greet with your direct manager",
        "Learn about each department head's responsibilities",
        "Save important contact information in your phone",
        "Understand escalation procedures for different situations",
      ],
      tips: "Keep a contact sheet handy for your first few weeks!",
      hasPDF: true,
      pdfUrl: "/pdfs/who-to-contact.pdf", // You'll need to add this PDF to your public folder
    },
  },
  {
    id: 2,
    title: "Get Connected - Wifi, Office Access, Printers",
    description: "Set up your physical office access and connectivity (BE3 Agents may skip)",
    icon: Wifi,
    content: {
      overview: "Get connected to all office systems and equipment you'll need daily.",
      steps: [
        "Obtain your office key card and test access",
        "Connect to the office WiFi network",
        "Set up printer access on your devices",
        "Test copier/scanner functionality",
        "Learn office security procedures and codes",
      ],
      tips: "BE3 agents working remotely can skip the physical office setup steps.",
    },
  },
  {
    id: 3,
    title: "G-Suite & Email Set Up",
    description: "Configure your professional email and Google Workspace access",
    icon: Mail,
    content: {
      overview: "Your G-Suite account is your gateway to all Century 21 Beggins digital tools.",
      steps: [
        "Receive your @c21beggins.com email credentials",
        "Set up email on all your devices (phone, tablet, computer)",
        "Configure email signature with your contact information",
        "Set up Gmail filters and labels for organization",
        "Access Google Drive and shared folders",
      ],
      tips: "Use a professional headshot in your email signature to build recognition!",
    },
  },
  {
    id: 4,
    title: "How To Set Up Company Calendar",
    description: "Integrate with the company calendar system for scheduling",
    icon: Calendar,
    content: {
      overview: "Stay synchronized with company events and team schedules.",
      steps: [
        "Access the shared Century 21 Beggins calendar",
        "Add company calendar to your personal calendar app",
        "Set up calendar notifications and reminders",
        "Learn how to book conference rooms",
        "Understand calendar sharing permissions",
      ],
      tips: "Color-code different types of appointments for better organization!",
    },
  },
  {
    id: 5,
    title: "How To Add Voicemail Greeting",
    description: "Set up a professional voicemail message",
    icon: Phone,
    content: {
      overview: "Your voicemail greeting is often the first impression clients have of you.",
      steps: [
        "Access your phone system voicemail settings",
        "Record a professional greeting message",
        "Include your name, company, and callback promise",
        "Test the greeting by calling yourself",
        "Set up voicemail-to-email notifications",
      ],
      tips: "Keep your greeting under 20 seconds and speak clearly!",
    },
  },
  {
    id: 6,
    title: "How To Write Your Agent Bio",
    description: "Create a compelling professional biography",
    icon: User,
    content: {
      overview: "Your agent bio tells your story and builds trust with potential clients.",
      steps: [
        "Gather information about your background and experience",
        "Write a compelling opening statement",
        "Include your specialties and areas of expertise",
        "Add personal touches that make you relatable",
        "Review and edit for clarity and professionalism",
      ],
      tips: "Include a professional headshot and mention local community involvement!",
    },
  },
  {
    id: 7,
    title: "Printed & Digital Business Cards",
    description: "Order business cards and set up digital versions",
    icon: CreditCard,
    content: {
      overview: "Business cards remain essential networking tools in real estate.",
      steps: [
        "Submit your information for business card design",
        "Review and approve the design proof",
        "Place order for printed business cards",
        "Set up digital business card for easy sharing",
        "Learn best practices for business card distribution",
      ],
      tips: "Always carry business cards and consider QR codes for easy contact sharing!",
    },
  },
  {
    id: 8,
    title: "Ring Central Phone Set Up",
    description: "Configure your business phone system",
    icon: Phone,
    content: {
      overview: "Ring Central provides your professional phone number and calling features.",
      steps: [
        "Download and install Ring Central app",
        "Set up your business phone number",
        "Configure call forwarding and routing",
        "Set up conference calling capabilities",
        "Test all phone features and integrations",
      ],
      tips: "Use the mobile app to maintain professionalism even when away from your desk!",
    },
  },
  {
    id: 9,
    title: "Dotloop Set Up",
    description: "Configure your transaction management system",
    icon: Building,
    content: {
      overview: "Dotloop streamlines your transaction management and document workflow.",
      steps: [
        "Create your Dotloop account with company credentials",
        "Set up your profile and preferences",
        "Learn the basic workflow for creating loops",
        "Practice uploading and organizing documents",
        "Connect with your transaction coordinator",
      ],
      tips: "Organize your templates and checklists early to save time later!",
    },
  },
  {
    id: 10,
    title: "MLS Set Up",
    description: "Get access to the Multiple Listing Service",
    icon: Building,
    content: {
      overview: "MLS access is essential for property searches and listing management.",
      steps: [
        "Complete MLS application and background check",
        "Attend required MLS orientation session",
        "Set up your MLS login credentials",
        "Learn basic search and listing functions",
        "Download MLS mobile app for field access",
      ],
      tips: "Bookmark frequently used MLS searches to save time!",
    },
  },
  {
    id: 11,
    title: "How To Use 21online.com",
    description: "Navigate the Century 21 online platform",
    icon: Globe,
    content: {
      overview: "21online.com is your hub for Century 21 resources and tools.",
      steps: [
        "Create your 21online.com account",
        "Explore available marketing materials",
        "Learn how to customize marketing pieces",
        "Access training resources and webinars",
        "Set up your agent profile on the platform",
      ],
      tips: "Check 21online regularly for new marketing materials and company updates!",
    },
  },
  {
    id: 12,
    title: "How To Set Up Moxi",
    description: "Configure your CRM and lead management system",
    icon: Building,
    content: {
      overview: "Moxi is your comprehensive CRM for managing leads and client relationships.",
      steps: [
        "Access your Moxi account with provided credentials",
        "Complete your agent profile setup",
        "Import existing contacts and leads",
        "Set up automated follow-up campaigns",
        "Learn basic reporting and analytics features",
      ],
      tips: "Consistent data entry in Moxi will pay dividends in lead management!",
    },
  },
  {
    id: 13,
    title: "How To Set Up Real Satisfied Reviews",
    description: "Implement client review and feedback system",
    icon: Building,
    content: {
      overview: "Real Satisfied helps you gather and manage client reviews and referrals.",
      steps: [
        "Set up your Real Satisfied account",
        "Customize your review request templates",
        "Learn how to send review requests to clients",
        "Set up automated review campaigns",
        "Monitor and respond to reviews",
      ],
      tips: "Send review requests within 24-48 hours of closing for best response rates!",
    },
  },
  {
    id: 14,
    title: "Zillow Showcase",
    description: "Optimize your Zillow agent profile",
    icon: Building,
    content: {
      overview: "Your Zillow profile is often where potential clients first discover you.",
      steps: [
        "Claim and verify your Zillow agent profile",
        "Upload professional photos and bio",
        "Add your recent sales and client reviews",
        "Set up Zillow Premier Agent if applicable",
        "Learn how to respond to Zillow leads",
      ],
      tips: "Keep your Zillow profile updated with recent sales and client testimonials!",
    },
  },
  {
    id: 15,
    title: "Setting Up Your Online Presence",
    description: "Establish profiles on Zillow, Realtor.com, GMB, and YouTube",
    icon: Globe,
    content: {
      overview: "A strong online presence across multiple platforms increases your visibility.",
      steps: [
        "Optimize your Zillow agent profile",
        "Set up your Realtor.com professional profile",
        "Create/claim your Google My Business listing",
        "Start your YouTube channel for video marketing",
        "Ensure consistent branding across all platforms",
      ],
      tips: "Use the same professional headshot and bio across all platforms for consistency!",
    },
  },
  {
    id: 16,
    title: "Where To Find Us Online",
    description: "Learn about Century 21 Beggins' online presence",
    icon: Globe,
    content: {
      overview: "Understanding your company's online presence helps you leverage it for your business.",
      steps: [
        "Explore the main Century 21 Beggins website",
        "Follow company social media accounts",
        "Learn how to share company content",
        "Understand co-branding guidelines",
        "Access company marketing materials",
      ],
      tips: "Share company content regularly to show you're part of a professional team!",
    },
  },
  {
    id: 17,
    title: "Join C21's Global Network",
    description: "Connect with the broader Century 21 community",
    icon: Globe,
    content: {
      overview: "Century 21's global network provides resources and referral opportunities.",
      steps: [
        "Create your Century 21 global network profile",
        "Join relevant Century 21 Facebook groups",
        "Access Century 21 University training resources",
        "Learn about referral programs and opportunities",
        "Connect with other Century 21 agents",
      ],
      tips: "The Century 21 network is a powerful resource for referrals and knowledge sharing!",
    },
  },
  {
    id: 18,
    title: "Board Of Realtors Additional Required Courses",
    description: "Complete mandatory continuing education",
    icon: GraduationCap,
    content: {
      overview: "Stay compliant with local board requirements and enhance your knowledge.",
      steps: [
        "Review your local board's continuing education requirements",
        "Enroll in required courses",
        "Schedule and complete coursework",
        "Submit completion certificates to the board",
        "Track your continuing education credits",
      ],
      tips: "Don't wait until the last minute - spread your CE requirements throughout the year!",
    },
  },
  {
    id: 19,
    title: "E-Key Set Up",
    description: "Get access to electronic lockbox system",
    icon: Key,
    content: {
      overview: "E-Key provides secure access to listed properties for showings.",
      steps: [
        "Apply for E-Key through your local MLS",
        "Complete required background check",
        "Download the E-Key mobile app",
        "Activate your E-Key device",
        "Learn proper E-Key usage protocols",
      ],
      tips: "Always follow proper showing procedures and log your property visits!",
    },
  },
  {
    id: 20,
    title: "Intro to Utility Helpers",
    description: "Learn about utility connection services for clients",
    icon: Wrench,
    content: {
      overview: "Utility Helpers streamlines utility connections for your clients.",
      steps: [
        "Set up your Utility Helpers account",
        "Learn how the service works",
        "Understand how to refer clients",
        "Learn about available utilities and services",
        "Practice using the referral system",
      ],
      tips: "This service adds value for your clients and can generate additional income!",
    },
  },
  {
    id: 21,
    title: "Closing Cost Estimator App",
    description: "Use tools to estimate closing costs for clients",
    icon: Calculator,
    content: {
      overview: "Accurate closing cost estimates help clients prepare financially.",
      steps: [
        "Download the closing cost estimator app",
        "Learn how to input property and loan information",
        "Practice creating estimates for different scenarios",
        "Understand how to explain costs to clients",
        "Learn when to refer to lenders for precise figures",
      ],
      tips: "Always explain that estimates are approximate and final costs may vary!",
    },
  },
  {
    id: 22,
    title: "Agent Legal Hotline",
    description: "Access legal support and guidance",
    icon: Shield,
    content: {
      overview: "The legal hotline provides guidance on complex real estate situations.",
      steps: [
        "Get your legal hotline access information",
        "Learn what types of questions are appropriate",
        "Understand the hotline's hours and availability",
        "Practice using the service with sample scenarios",
        "Know when to escalate to your broker",
      ],
      tips: "Don't hesitate to call when you're unsure - it's better to ask than assume!",
    },
  },
  {
    id: 23,
    title: "Agent Safety Protocols",
    description: "Learn safety procedures for showing properties",
    icon: AlertTriangle,
    content: {
      overview: "Your safety is paramount when working with clients and showing properties.",
      steps: [
        "Review company safety policies and procedures",
        "Learn about safe showing practices",
        "Understand client verification procedures",
        "Know emergency contact procedures",
        "Practice safety scenarios and responses",
      ],
      tips: "Trust your instincts - if something feels wrong, prioritize your safety!",
    },
  },
  {
    id: 24,
    title: "Forewarn, Been Verified, and Title Toolbox",
    description: "Set up client screening and title research tools",
    icon: Shield,
    content: {
      overview: "These tools help you screen clients and research property information safely.",
      steps: [
        "Set up your Forewarn account for client screening",
        "Learn how to use Been Verified for background checks",
        "Access Title Toolbox for property research",
        "Practice using each tool with sample data",
        "Understand privacy and legal considerations",
      ],
      tips: "Use these tools consistently to protect yourself and provide better service!",
    },
  },
  {
    id: 25,
    title: "Do Not Call List",
    description: "Understand compliance with telemarketing regulations",
    icon: List,
    content: {
      overview: "Compliance with Do Not Call regulations is legally required.",
      steps: [
        "Learn about Do Not Call List requirements",
        "Understand exemptions for real estate professionals",
        "Set up systems to check numbers before calling",
        "Learn proper procedures for cold calling",
        "Understand penalties for non-compliance",
      ],
      tips: "When in doubt, don't call - focus on referrals and warm leads instead!",
    },
  },
  {
    id: 26,
    title: "Adding Calendly To Email Signature",
    description: "Streamline appointment scheduling with clients",
    icon: Signature,
    content: {
      overview: "Calendly makes it easy for clients to schedule appointments with you.",
      steps: [
        "Set up your Calendly account and availability",
        "Create different meeting types (consultation, showing, etc.)",
        "Generate your Calendly scheduling link",
        "Add the link to your email signature",
        "Test the scheduling process",
      ],
      tips: "Set buffer time between appointments and block out personal time!",
    },
  },
  {
    id: 27,
    title: "Export Your Contacts",
    description: "Transfer existing contacts to your new systems",
    icon: Download,
    content: {
      overview: "Your existing contacts are valuable - make sure they're properly imported.",
      steps: [
        "Export contacts from your previous phone/email system",
        "Clean and organize contact data",
        "Import contacts into your CRM system",
        "Verify contact information accuracy",
        "Set up contact categories and tags",
      ],
      tips: "Take time to clean your contact list - quality is better than quantity!",
    },
  },
  {
    id: 28,
    title: "How To Set Up Out Of Office E-mail Greeting",
    description: "Configure professional auto-reply messages",
    icon: MailOpen,
    content: {
      overview: "Professional out-of-office messages maintain client communication expectations.",
      steps: [
        "Access your email auto-reply settings",
        "Write a professional out-of-office message",
        "Include alternative contact information",
        "Set appropriate date ranges",
        "Test the auto-reply functionality",
      ],
      tips: "Always provide an alternative contact for urgent matters!",
    },
  },
]

export default function AgentProfileSetupPage() {
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
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Profile & Set Up</h1>
            <p className="text-gray-600">Complete your comprehensive onboarding checklist</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progress Overview</h2>
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
              className={`transition-all duration-200 ${isCompleted ? "bg-green-50 border-green-200" : "hover:shadow-md"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <button onClick={() => toggleStep(step.id)} className="transition-colors duration-200">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                      <span className="text-xs text-gray-500 text-center leading-tight">
                        Mark Step
                        <br />
                        Complete
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-blue-600" />
                        <CardTitle className={`text-lg ${isCompleted ? "text-green-800" : "text-gray-900"}`}>
                          {step.title}
                        </CardTitle>
                      </div>
                      <CardDescription className={isCompleted ? "text-green-700" : "text-gray-600"}>
                        {step.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Start This Step
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
                      <DialogHeader className="flex-shrink-0">
                        <DialogTitle className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-blue-600" />
                          {step.title}
                        </DialogTitle>
                        <DialogDescription>{step.content.overview}</DialogDescription>
                      </DialogHeader>

                      {/* PDF Viewer for Step 1 */}
                      {step.id === 1 && step.content.hasPDF ? (
                        <div className="flex-1 min-h-0">
                          <iframe
                            src={step.content.pdfUrl}
                            className="w-full h-full border-0 rounded"
                            title="Who To Contact PDF"
                          />
                        </div>
                      ) : (
                        /* Regular content for other steps */
                        <div className="flex-1 overflow-y-auto space-y-6">
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

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-1">💡 Pro Tip:</h4>
                            <p className="text-sm text-blue-800">{step.content.tips}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {completionPercentage === 100 && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">Congratulations! 🎉</h3>
          <p className="text-green-700 mb-4">
            You've completed all 28 steps of your agent profile setup. You're ready to start your successful career at
            Century 21 Beggins!
          </p>
          <p className="text-sm text-green-600">
            <strong>Next Step:</strong> Attend Tools and Tech Overview
          </p>
        </div>
      )}
    </div>
  )
}
