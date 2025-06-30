"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  Calendar,
  BookOpen,
  Briefcase,
  Network,
  Wrench,
} from "lucide-react"
import Link from "next/link"

const hubs = [
  {
    id: "ai-hub",
    title: "AI Hub",
    description: "AI-powered tools for content creation, analysis, and automation",
    icon: Brain,
    color: "bg-purple-500",
    tools: [
      { name: "IdeaHub AI", path: "/ai-hub/ideahub-ai", description: "Generate content ideas and copy" },
      { name: "ScriptIt AI", path: "/ai-hub/scriptit-ai", description: "Create professional scripts" },
      { name: "RealBio", path: "/ai-hub/realbio", description: "Generate professional bios" },
      { name: "RealCoach AI", path: "/ai-hub/realcoach-ai", description: "AI coaching and advice" },
      { name: "RealDeal AI", path: "/ai-hub/realdeal-ai", description: "Contract analysis and insights" },
      { name: "Action AI", path: "/ai-hub/action-ai", description: "Action plan generation" },
      { name: "BizPlan AI", path: "/ai-hub/bizplan-ai", description: "Business plan creation" },
      { name: "Roleplay AI", path: "/ai-hub/roleplay-ai", description: "Practice scenarios" },
      { name: "ListIt AI", path: "/ai-hub/listit-ai", description: "Listing descriptions" },
      { name: "PropBot AI", path: "/ai-hub/propbot-ai", description: "Property analysis" },
      { name: "QuickCMA AI", path: "/ai-hub/quickcma-ai", description: "Comparative market analysis" },
      { name: "GoalScreen AI", path: "/ai-hub/goalscreen-ai", description: "Goal setting and tracking" },
      { name: "WhosWho AI", path: "/ai-hub/whos-who-ai", description: "Contact management" },
    ],
  },
  {
    id: "prospecting-hub",
    title: "Prospecting Hub",
    description: "Tools and resources for lead generation and client prospecting",
    icon: Target,
    color: "bg-green-500",
    tools: [
      {
        name: "Expired Listings",
        path: "/prospecting-hub/expired-listings",
        description: "Find expired listing opportunities",
      },
      { name: "FSBO", path: "/prospecting-hub/fsbo", description: "For Sale By Owner leads" },
      { name: "Absentee Owners", path: "/prospecting-hub/absentee-owners", description: "Absentee owner properties" },
      {
        name: "Pre-Foreclosure",
        path: "/prospecting-hub/pre-foreclosure",
        description: "Pre-foreclosure opportunities",
      },
      { name: "Probate", path: "/prospecting-hub/probate", description: "Probate property leads" },
      { name: "Divorce", path: "/prospecting-hub/divorce", description: "Divorce-related opportunities" },
      {
        name: "Divorce Real Estate",
        path: "/prospecting-hub/divorce-real-estate",
        description: "Specialized divorce services",
      },
      { name: "Investors", path: "/prospecting-hub/investors", description: "Real estate investor leads" },
      {
        name: "First-Time Buyers",
        path: "/prospecting-hub/first-time-buyers",
        description: "First-time buyer resources",
      },
      { name: "SOI", path: "/prospecting-hub/soi", description: "Sphere of influence management" },
    ],
  },
  {
    id: "marketing-hub",
    title: "Marketing Hub",
    description: "Marketing materials, templates, and brand assets",
    icon: TrendingUp,
    color: "bg-blue-500",
    tools: [
      {
        name: "Branded Social Content",
        path: "/marketing-hub/branded-social-content",
        description: "Social media templates",
      },
      { name: "Brokerage Logos", path: "/marketing-hub/brokerage-logos", description: "Logo and brand assets" },
      { name: "Hot Takes", path: "/marketing-hub/hot-takes", description: "Trending content ideas" },
    ],
  },
  {
    id: "training-hub",
    title: "Training Hub",
    description: "Educational content, courses, and skill development",
    icon: BookOpen,
    color: "bg-orange-500",
    tools: [
      { name: "Onboarding", path: "/training-hub/onboarding", description: "New agent onboarding" },
      { name: "Script Mastery", path: "/training-hub/script-mastery", description: "Master your scripts" },
      { name: "Listing Process", path: "/training-hub/listing-process", description: "Listing procedures" },
      { name: "Buyer Process", path: "/training-hub/buyer-process", description: "Buyer representation" },
      { name: "DISC/VAK", path: "/training-hub/disc-vak", description: "Personality assessments" },
      { name: "Moxi Works", path: "/training-hub/moxi-works", description: "Platform training" },
    ],
  },
  {
    id: "services-hub",
    title: "Services Hub",
    description: "Professional services and support offerings",
    icon: Briefcase,
    color: "bg-indigo-500",
    tools: [
      { name: "Brokerage Consulting", path: "/services-hub/brokerage-consulting", description: "Business consulting" },
      { name: "Moxi Design", path: "/services-hub/moxi-design", description: "Design services" },
    ],
  },
  {
    id: "networking-hub",
    title: "Networking Hub",
    description: "Connect with other professionals and build relationships",
    icon: Network,
    color: "bg-pink-500",
    tools: [
      { name: "Agent Directory", path: "/networking-hub/agent-directory", description: "Find and connect with agents" },
    ],
  },
  {
    id: "gear-hub",
    title: "Gear Hub",
    description: "Tools, equipment, and technology recommendations",
    icon: Wrench,
    color: "bg-gray-500",
    tools: [],
  },
]

export default function PortalPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHubs = hubs
    .map((hub) => ({
      ...hub,
      tools: hub.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter(
      (hub) =>
        hub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hub.tools.length > 0,
    )

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Agent Portal</h1>
        <p className="text-xl text-gray-600 mb-6">Your comprehensive toolkit for real estate success</p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tools and resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHubs.map((hub) => {
          const IconComponent = hub.icon
          return (
            <Card key={hub.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${hub.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{hub.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {hub.tools.length} tools
                    </Badge>
                  </div>
                </div>
                <CardDescription className="mt-2">{hub.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hub.tools.slice(0, 5).map((tool) => (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{tool.description}</div>
                    </Link>
                  ))}
                  {hub.tools.length > 5 && (
                    <Link
                      href={`/${hub.id}`}
                      className="block p-3 rounded-lg border border-dashed hover:bg-gray-50 transition-colors text-center"
                    >
                      <div className="text-sm text-gray-500">+{hub.tools.length - 5} more tools</div>
                    </Link>
                  )}
                  {hub.tools.length === 0 && (
                    <div className="p-3 rounded-lg border border-dashed text-center">
                      <div className="text-sm text-gray-500">Coming soon</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredHubs.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500">Try adjusting your search terms or browse all available tools above.</p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/creations-dashboard" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">View My Creations</div>
              <div className="text-xs text-gray-500">Access saved content</div>
            </Link>
            <Link href="/profile" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">Profile Settings</div>
              <div className="text-xs text-gray-500">Manage your account</div>
            </Link>
            <Link href="/support" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">Get Support</div>
              <div className="text-xs text-gray-500">Contact our team</div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Popular Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/ai-hub/ideahub-ai" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">IdeaHub AI</div>
              <div className="text-xs text-gray-500">Generate content ideas</div>
            </Link>
            <Link href="/ai-hub/scriptit-ai" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">ScriptIt AI</div>
              <div className="text-xs text-gray-500">Create professional scripts</div>
            </Link>
            <Link href="/ai-hub/listit-ai" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">ListIt AI</div>
              <div className="text-xs text-gray-500">Generate listings</div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/training-hub/onboarding" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">New Agent Onboarding</div>
              <div className="text-xs text-gray-500">Start your journey</div>
            </Link>
            <Link href="/ai-hub" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">Explore AI Tools</div>
              <div className="text-xs text-gray-500">Discover AI capabilities</div>
            </Link>
            <Link href="/prospecting-hub" className="block p-2 rounded hover:bg-gray-50">
              <div className="font-medium text-sm">Start Prospecting</div>
              <div className="text-xs text-gray-500">Find your first leads</div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
