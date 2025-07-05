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
      description: "Set up your office connectivity and access to shared resources (BE3 Agents may skip)",
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
      title: "Dotloop Set Up",
      description: "Configure your transaction management system",
      duration: "22 minutes",
      content: {
        overview: "Set up Dotloop for managing real estate transactions, documents, and client communications.",
        steps: [
          "Create your Dotloop account with company credentials",
          "Complete your agent profile and contact information",
          "Set up document templates and forms library",
          "Configure notification preferences",
          "Learn basic loop creation and management",
          "Connect with team members and set permissions",
        ],
        tips: [
          "Organize your templates for quick access",
          "Set up mobile app for on-the-go access",
          "Practice creating a test loop before your first transaction",
          "Keep your forms library updated with latest versions",
        ],
      },
    },
    {
      id: 10,
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
      id: 11,
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
      id: 12,
      title: "How To Set Up Moxi",
      description: "Configure your Moxi Works CRM and business platform",
      duration: "30 minutes",
      content: {
        overview: "Set up Moxi Works as your primary CRM and business management platform for real estate operations.",
        steps: [
          "Log into Moxi Works with your provided credentials",
          "Complete your agent profile and contact information",
          "Import existing contacts and leads",
          "Set up lead routing and assignment preferences",
          "Configure automated follow-up campaigns",
          "Connect integrations with other tools and platforms",
        ],
        tips: [
          "Clean up your contact data before importing",
          "Set up proper lead scoring and categorization",
          "Use automation to stay consistent with follow-ups",
          "Take advantage of the mobile app for on-the-go access",
        ],
      },
    },
    {
      id: 13,
      title: "How To Set Up Real Satisfied Reviews",
      description: "Configure your client review and satisfaction system",
      duration: "12 minutes",
      content: {
        overview: "Set up Real Satisfied to collect client reviews and manage your online reputation effectively.",
        steps: [
          "Create your Real Satisfied account",
          "Set up your review request templates",
          "Configure automated review request timing",
          "Connect your social media and review platforms",
          "Set up review monitoring and notifications",
          "Learn how to respond to reviews professionally",
        ],
        tips: [
          "Time your review requests strategically after positive interactions",
          "Personalize your review request messages",
          "Respond to all reviews, both positive and negative",
          "Use reviews as testimonials in your marketing materials",
        ],
      },
    },
    {
      id: 14,
      title: "Zillow Showcase",
      description: "Set up and optimize your Zillow agent showcase",
      duration: "18 minutes",
      content: {
        overview: "Create and optimize your Zillow agent profile to attract leads and showcase your expertise.",
        steps: [
          "Claim or create your Zillow agent profile",
          "Upload professional photos and complete your bio",
          "Add your contact information and specialties",
          "Set up your service areas and price ranges",
          "Configure lead preferences and notifications",
          "Add client reviews and testimonials",
        ],
        tips: [
          "Use high-quality professional photos",
          "Include specific neighborhoods and property types you specialize in",
          "Respond quickly to Zillow leads for better conversion",
          "Keep your profile updated with recent sales and achievements",
        ],
      },
    },
    {
      id: 15,
      title: "Setting Up Your Online Presence",
      description: "Establish your presence on Zillow, Realtor.com, GMB, and YouTube Channel",
      duration: "45 minutes",
      content: {
        overview:
          "Create and optimize your online presence across major real estate platforms and social media channels.",
        steps: [
          "Set up your Zillow agent profile with photos and bio",
          "Create your Realtor.com agent profile",
          "Set up Google My Business listing with photos and reviews",
          "Create your YouTube channel for real estate content",
          "Optimize all profiles with consistent branding and messaging",
          "Add client reviews and testimonials where possible",
        ],
        tips: [
          "Use consistent branding across all platforms",
          "Include professional photos and compelling descriptions",
          "Encourage satisfied clients to leave reviews",
          "Keep all profiles updated with current information and recent sales",
        ],
      },
    },
    {
      id: 16,
      title: "Where To Find Us Online",
      description: "Learn about all Century 21 Beggins online platforms and resources",
      duration: "10 minutes",
      content: {
        overview: "Discover all the online platforms where Century 21 Beggins has a presence and how to leverage them.",
        steps: [
          "Review the company website and your agent page",
          "Learn about company social media accounts and how to share content",
          "Understand co-branding guidelines for online presence",
          "Access company blog and content resources",
          "Learn about company online advertising and how you benefit",
          "Understand how to request updates to company online presence",
        ],
        tips: [
          "Share company content to boost your own online presence",
          "Follow co-branding guidelines to maintain professional image",
          "Contribute content ideas for company blog and social media",
          "Tag the company in your social media posts when appropriate",
        ],
      },
    },
    {
      id: 17,
      title: "Join C21's Global Network",
      description: "Connect with the Century 21 global network and resources",
      duration: "15 minutes",
      content: {
        overview: "Join the Century 21 global network to access resources, training, and networking opportunities.",
        steps: [
          "Create your Century 21 University account",
          "Join the Century 21 agent Facebook groups",
          "Access the Century 21 mobile app and resources",
          "Set up your Century 21 email signature and branding",
          "Learn about referral opportunities within the network",
          "Understand global marketing campaigns and how to participate",
        ],
        tips: [
          "Actively participate in network discussions and training",
          "Build relationships with agents in other markets for referrals",
          "Take advantage of all available training and certification programs",
          "Stay updated on global brand initiatives and campaigns",
        ],
      },
    },
    {
      id: 18,
      title: "Board Of Realtors Additional Required Courses",
      description: "Complete required continuing education and board courses",
      duration: "Variable",
      content: {
        overview: "Complete all required courses from your local Board of Realtors and maintain your license.",
        steps: [
          "Review your continuing education requirements",
          "Identify required courses and deadlines",
          "Register for and complete required courses",
          "Submit completion certificates to the board",
          "Set up reminders for future continuing education deadlines",
          "Keep records of all completed courses and certifications",
        ],
        tips: [
          "Don't wait until the last minute to complete required courses",
          "Choose courses that will benefit your business and clients",
          "Keep detailed records of all continuing education",
          "Consider taking additional courses to enhance your expertise",
        ],
      },
    },
    {
      id: 19,
      title: "E-Key Set Up",
      description: "Set up your electronic lockbox access system",
      duration: "12 minutes",
      content: {
        overview: "Set up your E-Key system for secure access to properties with electronic lockboxes.",
        steps: [
          "Download the E-Key mobile app",
          "Register with your MLS credentials",
          "Complete the E-Key training and certification",
          "Test your E-Key access at the office",
          "Learn proper E-Key usage protocols and security",
          "Set up E-Key notifications and preferences",
        ],
        tips: [
          "Always follow proper security protocols when using E-Key",
          "Keep your phone charged when showing properties",
          "Report any E-Key issues immediately",
          "Respect property access times and showing instructions",
        ],
      },
    },
    {
      id: 20,
      title: "Intro to Utility Helpers",
      description: "Learn about utility connection and transfer services",
      duration: "8 minutes",
      content: {
        overview: "Understand utility helper services to assist clients with utility connections and transfers.",
        steps: [
          "Learn about available utility helper services",
          "Understand how to access utility connection resources",
          "Set up accounts with utility helper platforms",
          "Learn how to assist clients with utility transfers",
          "Understand utility deposit and connection processes",
          "Create a utility checklist for clients",
        ],
        tips: [
          "Provide utility information early in the buying process",
          "Keep a list of local utility companies and contact information",
          "Help clients understand utility deposit requirements",
          "Consider this an additional service that adds value for clients",
        ],
      },
    },
    {
      id: 21,
      title: "Closing Cost Estimator App",
      description: "Set up and learn to use closing cost estimation tools",
      duration: "10 minutes",
      content: {
        overview: "Learn to use closing cost estimator apps to help clients understand transaction costs.",
        steps: [
          "Download and set up closing cost estimator apps",
          "Learn how to input property and loan information",
          "Understand different types of closing costs",
          "Practice creating estimates for different scenarios",
          "Learn how to explain estimates to clients",
          "Set up templates for common transaction types",
        ],
        tips: [
          "Always explain that estimates are approximate",
          "Update your knowledge of local closing costs regularly",
          "Use estimates as educational tools for clients",
          "Have backup methods for calculating costs",
        ],
      },
    },
    {
      id: 22,
      title: "Agent Legal Hotline",
      description: "Set up access to legal support and resources",
      duration: "5 minutes",
      content: {
        overview: "Set up access to legal hotline services for professional guidance on real estate matters.",
        steps: [
          "Get your legal hotline access credentials",
          "Save hotline contact information in your phone",
          "Learn what types of questions are appropriate for the hotline",
          "Understand hotline hours and response times",
          "Review legal resources and documentation available",
          "Learn escalation procedures for complex legal issues",
        ],
        tips: [
          "Don't hesitate to call when you have legal questions",
          "Document any legal advice you receive",
          "Know the difference between legal guidance and legal representation",
          "Keep legal hotline information easily accessible",
        ],
      },
    },
    {
      id: 23,
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
    {
      id: 24,
      title: "Forewarn, Been Verified, and Title Toolbox",
      description: "Set up client screening and verification tools",
      duration: "15 minutes",
      content: {
        overview: "Set up and learn to use client screening tools for safety and verification purposes.",
        steps: [
          "Set up your Forewarn account for client screening",
          "Learn how to use Been Verified for background checks",
          "Access Title Toolbox for property and ownership information",
          "Understand when and how to use each tool appropriately",
          "Learn privacy and legal considerations for client screening",
          "Set up mobile access for on-the-go verification",
        ],
        tips: [
          "Use these tools responsibly and within legal guidelines",
          "Screen clients before meeting them at properties",
          "Keep screening information confidential",
          "Don't rely solely on screening tools - trust your instincts too",
        ],
      },
    },
    {
      id: 25,
      title: "Do Not Call List",
      description: "Understand and comply with Do Not Call regulations",
      duration: "12 minutes",
      content: {
        overview: "Learn about Do Not Call regulations and how to maintain compliance in your prospecting efforts.",
        steps: [
          "Understand federal and state Do Not Call regulations",
          "Learn how to scrub your calling lists against Do Not Call registries",
          "Set up systems to maintain Do Not Call compliance",
          "Understand exceptions and established business relationships",
          "Learn proper record-keeping for compliance",
          "Set up regular Do Not Call list updates",
        ],
        tips: [
          "Always scrub your lists before making prospecting calls",
          "Keep detailed records of your compliance efforts",
          "Understand that Do Not Call rules apply to text messages too",
          "When in doubt, don't call - find alternative contact methods",
        ],
      },
    },
    {
      id: 26,
      title: "Adding Calendly To Email Signature",
      description: "Set up online scheduling in your email signature",
      duration: "8 minutes",
      content: {
        overview: "Add Calendly or similar scheduling tools to your email signature for easy appointment booking.",
        steps: [
          "Set up your Calendly account with availability",
          "Create different meeting types (consultations, showings, etc.)",
          "Generate your Calendly scheduling link",
          "Add the scheduling link to your email signature",
          "Test the scheduling process from a client's perspective",
          "Set up notifications and reminders for scheduled appointments",
        ],
        tips: [
          "Make your availability realistic and keep it updated",
          "Use different meeting types for different purposes",
          "Include clear descriptions of what each meeting type includes",
          "Always confirm appointments scheduled through Calendly",
        ],
      },
    },
    {
      id: 27,
      title: "Export Your Contacts",
      description: "Learn how to export and backup your contact database",
      duration: "10 minutes",
      content: {
        overview: "Learn how to export your contacts from various systems for backup and migration purposes.",
        steps: [
          "Learn how to export contacts from your phone",
          "Export contacts from your email system",
          "Export contacts from your CRM system",
          "Understand different export formats (CSV, vCard, etc.)",
          "Set up regular contact backup procedures",
          "Learn how to clean and organize exported contact data",
        ],
        tips: [
          "Export contacts regularly as a backup measure",
          "Clean up duplicate and outdated contacts before exporting",
          "Keep exported contact files secure and confidential",
          "Test your export process to ensure data integrity",
        ],
      },
    },
    {
      id: 28,
      title: "How To Set Up Out Of Office E-mail Greeting",
      description: "Configure professional out-of-office email responses",
      duration: "6 minutes",
      content: {
        overview: "Set up professional out-of-office email responses for when you're unavailable.",
        steps: [
          "Access your email system's out-of-office settings",
          "Write a professional out-of-office message",
          "Include your return date and alternative contact information",
          "Set up different messages for internal and external contacts",
          "Test your out-of-office message before activating",
          "Learn how to activate and deactivate out-of-office responses",
        ],
        tips: [
          "Keep your message professional but friendly",
          "Always include when you'll return and respond to emails",
          "Provide alternative contact information for urgent matters",
          "Remember to turn off your out-of-office message when you return",
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
