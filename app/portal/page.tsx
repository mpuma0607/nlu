"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Users,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Wrench,
  MessageSquare,
  FileText,
  Home,
  Search,
  Target,
  Lightbulb,
  PenTool,
  BarChart3,
  UserCheck,
  Building,
  DollarSign,
  MapPin,
  Megaphone,
  Palette,
  Globe,
  Shield,
  Clock,
  Star,
  Rocket,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useTenant } from "@/contexts/tenant-context"

const hubCategories = [
  {
    id: "ai-hub",
    title: "AI Hub",
    description: "AI-powered tools for real estate professionals",
    icon: Brain,
    color: "bg-purple-500",
    tools: [
      { name: "Action AI", description: "Generate action plans", href: "/ai-hub/action-ai", icon: Target },
      { name: "BizPlan AI", description: "Create business plans", href: "/ai-hub/bizplan-ai", icon: Briefcase },
      { name: "GoalScreen AI", description: "Goal setting wallpapers", href: "/ai-hub/goalscreen-ai", icon: Star },
      { name: "IdeaHub AI", description: "Content idea generation", href: "/ai-hub/ideahub-ai", icon: Lightbulb },
      { name: "ListIt AI", description: "Listing descriptions", href: "/ai-hub/listit-ai", icon: Home },
      { name: "PropBot AI", description: "Property analysis", href: "/ai-hub/propbot-ai", icon: Building },
      { name: "QuickCMA AI", description: "Market analysis", href: "/ai-hub/quickcma-ai", icon: BarChart3 },
      { name: "RealBio", description: "Professional bios", href: "/ai-hub/realbio", icon: UserCheck },
      { name: "RealCoach AI", description: "Coaching insights", href: "/ai-hub/realcoach-ai", icon: GraduationCap },
      { name: "RealDeal AI", description: "Deal analysis", href: "/ai-hub/realdeal-ai", icon: DollarSign },
      { name: "RolePlay AI", description: "Practice scenarios", href: "/ai-hub/roleplay-ai", icon: Users },
      { name: "ScriptIt AI", description: "Sales scripts", href: "/ai-hub/scriptit-ai", icon: PenTool },
      { name: "WhosWho AI", description: "Contact insights", href: "/ai-hub/whos-who-ai", icon: Search },
    ],
  },
  {
    id: "prospecting-hub",
    title: "Prospecting Hub",
    description: "Lead generation and prospecting tools",
    icon: Target,
    color: "bg-green-500",
    tools: [
      {
        name: "Absentee Owners",
        description: "Find absentee property owners",
        href: "/prospecting-hub/absentee-owners",
        icon: MapPin,
      },
      {
        name: "Divorce Real Estate",
        description: "Divorce-related leads",
        href: "/prospecting-hub/divorce-real-estate",
        icon: Users,
      },
      {
        name: "Expired Listings",
        description: "Recently expired listings",
        href: "/prospecting-hub/expired-listings",
        icon: Clock,
      },
      {
        name: "First-Time Buyers",
        description: "First-time buyer leads",
        href: "/prospecting-hub/first-time-buyers",
        icon: Home,
      },
      { name: "FSBO", description: "For Sale By Owner leads", href: "/prospecting-hub/fsbo", icon: Building },
      {
        name: "Investors",
        description: "Real estate investor leads",
        href: "/prospecting-hub/investors",
        icon: DollarSign,
      },
      {
        name: "Pre-Foreclosure",
        description: "Pre-foreclosure properties",
        href: "/prospecting-hub/pre-foreclosure",
        icon: Shield,
      },
      { name: "Probate", description: "Probate property leads", href: "/prospecting-hub/probate", icon: FileText },
      { name: "SOI", description: "Sphere of influence tools", href: "/prospecting-hub/soi", icon: Users },
    ],
  },
  {
    id: "marketing-hub",
    title: "Marketing Hub",
    description: "Marketing materials and brand assets",
    icon: Megaphone,
    color: "bg-blue-500",
    tools: [
      {
        name: "Branded Social Content",
        description: "Social media templates",
        href: "/marketing-hub/branded-social-content",
        icon: Globe,
      },
      {
        name: "Brokerage Logos",
        description: "Logo and brand assets",
        href: "/marketing-hub/brokerage-logos",
        icon: Palette,
      },
      { name: "Hot Takes", description: "Trending content ideas", href: "/marketing-hub/hot-takes", icon: TrendingUp },
    ],
  },
  {
    id: "training-hub",
    title: "Training Hub",
    description: "Educational resources and training materials",
    icon: GraduationCap,
    color: "bg-orange-500",
    tools: [
      {
        name: "Buyer Process",
        description: "Buyer representation training",
        href: "/training-hub/buyer-process",
        icon: Home,
      },
      { name: "DISC/VAK", description: "Personality assessment tools", href: "/training-hub/disc-vak", icon: Users },
      {
        name: "Listing Process",
        description: "Listing presentation training",
        href: "/training-hub/listing-process",
        icon: FileText,
      },
      { name: "Moxi Works", description: "Platform training", href: "/training-hub/moxi-works", icon: Wrench },
      { name: "Onboarding", description: "New agent onboarding", href: "/training-hub/onboarding", icon: Rocket },
      {
        name: "Script Mastery",
        description: "Sales script training",
        href: "/training-hub/script-mastery",
        icon: MessageSquare,
      },
    ],
  },
  {
    id: "services-hub",
    title: "Services Hub",
    description: "Professional services and consulting",
    icon: Briefcase,
    color: "bg-indigo-500",
    tools: [
      {
        name: "Brokerage Consulting",
        description: "Business consulting services",
        href: "/services-hub/brokerage-consulting",
        icon: Briefcase,
      },
      {
        name: "Moxi Design",
        description: "Design and branding services",
        href: "/services-hub/moxi-design",
        icon: Palette,
      },
    ],
  },
  {
    id: "networking-hub",
    title: "Networking Hub",
    description: "Connect with other professionals",
    icon: Users,
    color: "bg-pink-500",
    tools: [
      {
        name: "Agent Directory",
        description: "Find and connect with agents",
        href: "/networking-hub/agent-directory",
        icon: Users,
      },
    ],
  },
  {
    id: "gear-hub",
    title: "Gear Hub",
    description: "Tools and equipment for real estate professionals",
    icon: Wrench,
    color: "bg-gray-500",
    tools: [],
  },
]

export default function PortalPage() {
  const { tenant } = useTenant()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredHubs = hubCategories.filter((hub) => {
    const matchesSearch =
      hub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hub.tools.some(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    const matchesCategory = !selectedCategory || hub.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to {tenant?.name || "The Next Level U"} Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive platform for real estate success. Access AI-powered tools, prospecting resources,
            training materials, and professional services all in one place.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tools and resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {hubCategories.map((hub) => (
              <option key={hub.id} value={hub.id}>
                {hub.title}
              </option>
            ))}
          </select>
        </div>

        {/* Hub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHubs.map((hub) => {
            const IconComponent = hub.icon
            return (
              <Card key={hub.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${hub.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{hub.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {hub.tools.length} tools
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">{hub.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {hub.tools.length > 0 ? (
                    <div className="space-y-2">
                      {hub.tools.slice(0, 4).map((tool) => {
                        const ToolIcon = tool.icon
                        return (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group/tool"
                          >
                            <ToolIcon className="h-4 w-4 text-gray-500 group-hover/tool:text-blue-600" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover/tool:text-blue-600">
                                {tool.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{tool.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover/tool:text-blue-600" />
                          </Link>
                        )
                      })}
                      {hub.tools.length > 4 && (
                        <Link
                          href={`/${hub.id}`}
                          className="block text-center py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View all {hub.tools.length} tools →
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Coming Soon</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/ai-hub/action-ai"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Target className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900">Create Action Plan</span>
            </Link>
            <Link
              href="/ai-hub/listit-ai"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Home className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900">Write Listing</span>
            </Link>
            <Link
              href="/ai-hub/quickcma-ai"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <BarChart3 className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900">Market Analysis</span>
            </Link>
            <Link
              href="/prospecting-hub"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <Search className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900">Find Leads</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            Powered by {tenant?.name || "The Next Level U"} •
            <Link href="/support" className="text-blue-600 hover:text-blue-800 ml-1">
              Need Help?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
