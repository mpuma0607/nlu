"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Brain, Target, TrendingUp, GraduationCap, Wrench, Users, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function PortalPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const hubs = [
    {
      title: "AI Hub",
      icon: Brain,
      toolCount: 13,
      description: "AI-powered tools for content creation, analysis, and automation",
      color: "bg-purple-500",
      tools: [
        { title: "IdeaHub AI", description: "Generate content ideas and copy" },
        { title: "ScriptIt AI", description: "Create professional scripts" },
        { title: "RealBio", description: "Professional bio generator" },
        { title: "ListIT", description: "Property listing descriptions" },
        { title: "QuickCMA AI", description: "Market analysis tool" },
        { title: "RolePlay AI", description: "Practice conversations" },
        { title: "PropBot AI", description: "Property search assistant" },
        { title: "Who's Who AI", description: "Property owner research" },
        { title: "GoalScreen AI", description: "Goal wallpaper creator" },
        { title: "Action AI", description: "Daily action plans" },
        { title: "RealCoach AI", description: "Business coaching" },
        { title: "BizPlan AI", description: "Business plan generator" },
        { title: "RealDeal AI", description: "Contract analysis" },
      ],
    },
    {
      title: "Prospecting Hub",
      icon: Target,
      toolCount: 10,
      description: "Tools and resources for lead generation and client prospecting",
      color: "bg-green-500",
      tools: [
        { title: "Expired Listings", description: "Find expired listing opportunities" },
        { title: "FSBO", description: "For Sale By Owner leads" },
        { title: "Absentee Owners", description: "Target absentee property owners" },
        { title: "Probate", description: "Probate property opportunities" },
        { title: "SOI", description: "Sphere of influence cultivation" },
        { title: "First Time Home Buyers", description: "First-time buyer programs" },
        { title: "Real Estate Investors", description: "Investment property leads" },
        { title: "Divorce", description: "Divorce-related property sales" },
        { title: "Pre-Foreclosure", description: "Pre-foreclosure opportunities" },
        { title: "New Construction", description: "New construction leads" },
      ],
    },
    {
      title: "Marketing Hub",
      icon: TrendingUp,
      toolCount: 3,
      description: "Marketing materials, templates, and brand assets",
      color: "bg-blue-500",
      tools: [
        { title: "Branded Social Content", description: "Social media templates" },
        { title: "Brokerage Logos", description: "Logo and brand assets" },
        { title: "Real Estate Hot Takes", description: "Industry news and trends" },
      ],
    },
    {
      title: "Training Hub",
      icon: GraduationCap,
      toolCount: 5,
      description: "Comprehensive training and educational resources",
      color: "bg-indigo-500",
      tools: [
        { title: "Moxi Works Training", description: "Complete platform training" },
        { title: "Script Mastery", description: "Master your sales scripts" },
        { title: "Buyer Process (6P's)", description: "6-step buyer consultation" },
        { title: "Listing Process (7P's)", description: "7-step listing process" },
        { title: "DISC/VAK Connection", description: "Personality-based communication" },
      ],
    },
    {
      title: "Services Hub",
      icon: Wrench,
      toolCount: 2,
      description: "Professional services and consulting",
      color: "bg-orange-500",
      tools: [
        { title: "Moxi Design Services", description: "Professional design and marketing" },
        { title: "Brokerage Consulting", description: "Business growth consulting" },
      ],
    },
    {
      title: "Networking Hub",
      icon: Users,
      toolCount: 2,
      description: "Connect with agents and industry professionals",
      color: "bg-teal-500",
      tools: [
        { title: "Community Groups & Chats", description: "Connect with professionals" },
        { title: "Agent Directory", description: "Find and connect with agents" },
      ],
    },
    {
      title: "Gear Hub",
      icon: ShoppingBag,
      toolCount: 1,
      description: "Exclusive merchandise and professional tools",
      color: "bg-gray-700",
      tools: [{ title: "Next Level Merchandise", description: "Branded gear and tools" }],
    },
  ]

  const filteredHubs = hubs
    .map((hub) => ({
      ...hub,
      tools: hub.tools.filter(
        (tool) =>
          searchQuery === "" ||
          tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((hub) => hub.tools.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your comprehensive toolkit for real estate success
            </h1>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tools and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hubs Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredHubs.map((hub) => (
            <Card key={hub.title} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Hub Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${hub.color} rounded-lg flex items-center justify-center`}>
                    <hub.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{hub.title}</h2>
                    <p className="text-sm text-gray-500">{hub.toolCount} tools</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{hub.description}</p>

                {/* Tools List */}
                <div className="space-y-3">
                  {hub.tools.slice(0, 4).map((tool) => (
                    <Link
                      key={tool.title}
                      href={`/${hub.title.toLowerCase().replace(" ", "-")}/${tool.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                    >
                      <div className="font-medium text-gray-900">{tool.title}</div>
                      <div className="text-sm text-gray-500">{tool.description}</div>
                    </Link>
                  ))}

                  {hub.tools.length > 4 && (
                    <Link
                      href={`/${hub.title.toLowerCase().replace(" ", "-")}`}
                      className="block p-3 text-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      View all {hub.toolCount} tools
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
