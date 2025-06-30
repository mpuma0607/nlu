"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  Brain,
  MessageSquare,
  FileText,
  Users,
  TrendingUp,
  Target,
  Briefcase,
  GraduationCap,
  Wrench,
  Star,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface Tool {
  id: string
  name: string
  description: string
  category: string
  href: string
  icon: any
  isNew?: boolean
  isPopular?: boolean
  isPremium?: boolean
}

const tools: Tool[] = [
  // AI Hub Tools
  {
    id: "ideahub-ai",
    name: "IdeaHub AI",
    description: "Generate engaging content ideas and copy for social media, blogs, and marketing materials",
    category: "AI Hub",
    href: "/ai-hub/ideahub-ai",
    icon: Brain,
    isPopular: true,
  },
  {
    id: "scriptit-ai",
    name: "ScriptIt AI",
    description: "Create professional scripts for calls, presentations, and client interactions",
    category: "AI Hub",
    href: "/ai-hub/scriptit-ai",
    icon: MessageSquare,
    isNew: true,
  },
  {
    id: "listit-ai",
    name: "ListIt AI",
    description: "Generate compelling listing descriptions that sell properties faster",
    category: "AI Hub",
    href: "/ai-hub/listit-ai",
    icon: FileText,
    isPopular: true,
  },
  {
    id: "realbio",
    name: "RealBio AI",
    description: "Create professional bios and agent profiles that build trust and credibility",
    category: "AI Hub",
    href: "/ai-hub/realbio",
    icon: Users,
  },
  {
    id: "realcoach-ai",
    name: "RealCoach AI",
    description: "Get personalized coaching and action plans to grow your real estate business",
    category: "AI Hub",
    href: "/ai-hub/realcoach-ai",
    icon: TrendingUp,
    isPremium: true,
  },
  {
    id: "realdeal-ai",
    name: "RealDeal AI",
    description: "Analyze contracts and deals with AI-powered insights and recommendations",
    category: "AI Hub",
    href: "/ai-hub/realdeal-ai",
    icon: Target,
    isPremium: true,
  },
  {
    id: "action-ai",
    name: "Action AI",
    description: "Generate personalized action plans and goal-setting strategies",
    category: "AI Hub",
    href: "/ai-hub/action-ai",
    icon: Zap,
  },
  {
    id: "bizplan-ai",
    name: "BizPlan AI",
    description: "Create comprehensive business plans and growth strategies",
    category: "AI Hub",
    href: "/ai-hub/bizplan-ai",
    icon: Briefcase,
  },
  {
    id: "goalscreen-ai",
    name: "GoalScreen AI",
    description: "Generate motivational wallpapers and goal visualization screens",
    category: "AI Hub",
    href: "/ai-hub/goalscreen-ai",
    icon: Target,
  },
  {
    id: "roleplay-ai",
    name: "RolePlay AI",
    description: "Practice difficult conversations and scenarios with AI roleplay",
    category: "AI Hub",
    href: "/ai-hub/roleplay-ai",
    icon: Users,
    isNew: true,
  },
  {
    id: "whos-who-ai",
    name: "WhosWho AI",
    description: "Research and analyze people, companies, and market players",
    category: "AI Hub",
    href: "/ai-hub/whos-who-ai",
    icon: Search,
  },
  {
    id: "propbot-ai",
    name: "PropBot AI",
    description: "Get instant property insights, comparables, and market analysis",
    category: "AI Hub",
    href: "/ai-hub/propbot-ai",
    icon: TrendingUp,
    isNew: true,
  },
  {
    id: "quickcma-ai",
    name: "QuickCMA AI",
    description: "Generate professional CMAs and market analysis reports instantly",
    category: "AI Hub",
    href: "/ai-hub/quickcma-ai",
    icon: FileText,
    isPopular: true,
  },

  // Prospecting Hub Tools
  {
    id: "expired-listings",
    name: "Expired Listings",
    description: "Find and connect with expired listing opportunities in your market",
    category: "Prospecting Hub",
    href: "/prospecting-hub/expired-listings",
    icon: Clock,
  },
  {
    id: "fsbo",
    name: "FSBO Leads",
    description: "Discover for-sale-by-owner properties and convert them to listings",
    category: "Prospecting Hub",
    href: "/prospecting-hub/fsbo",
    icon: Users,
  },
  {
    id: "absentee-owners",
    name: "Absentee Owners",
    description: "Target out-of-state property owners for investment opportunities",
    category: "Prospecting Hub",
    href: "/prospecting-hub/absentee-owners",
    icon: Target,
  },
  {
    id: "pre-foreclosure",
    name: "Pre-Foreclosure",
    description: "Help distressed homeowners while building your business",
    category: "Prospecting Hub",
    href: "/prospecting-hub/pre-foreclosure",
    icon: TrendingUp,
  },
  {
    id: "probate",
    name: "Probate Leads",
    description: "Assist families with inherited property transactions",
    category: "Prospecting Hub",
    href: "/prospecting-hub/probate",
    icon: FileText,
  },
  {
    id: "divorce",
    name: "Divorce Real Estate",
    description: "Specialize in divorce-related property transactions",
    category: "Prospecting Hub",
    href: "/prospecting-hub/divorce-real-estate",
    icon: Users,
  },
  {
    id: "investors",
    name: "Investor Network",
    description: "Connect with real estate investors and build lasting relationships",
    category: "Prospecting Hub",
    href: "/prospecting-hub/investors",
    icon: TrendingUp,
  },
  {
    id: "first-time-buyers",
    name: "First-Time Buyers",
    description: "Target and nurture first-time homebuyer prospects",
    category: "Prospecting Hub",
    href: "/prospecting-hub/first-time-buyers",
    icon: Users,
  },
  {
    id: "soi",
    name: "Sphere of Influence",
    description: "Manage and grow your personal network for referrals",
    category: "Prospecting Hub",
    href: "/prospecting-hub/soi",
    icon: Users,
  },

  // Training Hub Tools
  {
    id: "script-mastery",
    name: "Script Mastery",
    description: "Master proven scripts for every real estate situation",
    category: "Training Hub",
    href: "/training-hub/script-mastery",
    icon: MessageSquare,
  },
  {
    id: "listing-process",
    name: "Listing Process",
    description: "Step-by-step training on the complete listing process",
    category: "Training Hub",
    href: "/training-hub/listing-process",
    icon: FileText,
  },
  {
    id: "buyer-process",
    name: "Buyer Process",
    description: "Comprehensive training on working with buyers effectively",
    category: "Training Hub",
    href: "/training-hub/buyer-process",
    icon: Users,
  },
  {
    id: "disc-vak",
    name: "DISC & VAK Training",
    description: "Learn personality types and communication styles for better client relationships",
    category: "Training Hub",
    href: "/training-hub/disc-vak",
    icon: Brain,
  },
  {
    id: "moxi-works",
    name: "Moxi Works Training",
    description: "Master your CRM and transaction management system",
    category: "Training Hub",
    href: "/training-hub/moxi-works",
    icon: Wrench,
  },
  {
    id: "onboarding",
    name: "Agent Onboarding",
    description: "Complete onboarding program for new agents",
    category: "Training Hub",
    href: "/training-hub/onboarding",
    icon: GraduationCap,
  },

  // Marketing Hub Tools
  {
    id: "branded-social-content",
    name: "Branded Social Content",
    description: "Access professionally designed social media templates and content",
    category: "Marketing Hub",
    href: "/marketing-hub/branded-social-content",
    icon: MessageSquare,
  },
  {
    id: "brokerage-logos",
    name: "Brokerage Logos",
    description: "Download official brokerage logos and branding materials",
    category: "Marketing Hub",
    href: "/marketing-hub/brokerage-logos",
    icon: Star,
  },
  {
    id: "hot-takes",
    name: "Hot Takes",
    description: "Get trending topics and conversation starters for social media",
    category: "Marketing Hub",
    href: "/marketing-hub/hot-takes",
    icon: TrendingUp,
  },

  // Services Hub Tools
  {
    id: "brokerage-consulting",
    name: "Brokerage Consulting",
    description: "Get expert consulting for brokerage growth and operations",
    category: "Services Hub",
    href: "/services-hub/brokerage-consulting",
    icon: Briefcase,
    isPremium: true,
  },
  {
    id: "moxi-design",
    name: "Moxi Design Services",
    description: "Professional design services for marketing materials and branding",
    category: "Services Hub",
    href: "/services-hub/moxi-design",
    icon: Star,
    isPremium: true,
  },

  // Networking Hub Tools
  {
    id: "agent-directory",
    name: "Agent Directory",
    description: "Connect with other agents in your network and beyond",
    category: "Networking Hub",
    href: "/networking-hub/agent-directory",
    icon: Users,
  },

  // Gear Hub Tools
  {
    id: "gear-hub",
    name: "Gear & Tools",
    description: "Discover recommended tools, apps, and equipment for real estate professionals",
    category: "Gear Hub",
    href: "/gear-hub",
    icon: Wrench,
  },
]

const categories = [
  "All",
  "AI Hub",
  "Prospecting Hub",
  "Training Hub",
  "Marketing Hub",
  "Services Hub",
  "Networking Hub",
  "Gear Hub",
]

export default function Portal() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredTools, setFilteredTools] = useState(tools)

  useEffect(() => {
    let filtered = tools

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredTools(filtered)
  }, [searchTerm, selectedCategory])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI Hub":
        return Brain
      case "Prospecting Hub":
        return Target
      case "Training Hub":
        return GraduationCap
      case "Marketing Hub":
        return MessageSquare
      case "Services Hub":
        return Briefcase
      case "Networking Hub":
        return Users
      case "Gear Hub":
        return Wrench
      default:
        return Brain
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI Hub":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Prospecting Hub":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Training Hub":
        return "bg-green-100 text-green-800 border-green-200"
      case "Marketing Hub":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Services Hub":
        return "bg-red-100 text-red-800 border-red-200"
      case "Networking Hub":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Gear Hub":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Agent Portal</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your comprehensive toolkit for real estate success. Access AI-powered tools, training resources, prospecting
          systems, and everything you need to grow your business.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              {category !== "All" && (
                <>
                  {(() => {
                    const Icon = getCategoryIcon(category)
                    return <Icon className="h-4 w-4" />
                  })()}
                </>
              )}
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.id} href={tool.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                        <Icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {tool.isNew && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs">
                          New
                        </Badge>
                      )}
                      {tool.isPopular && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                          Popular
                        </Badge>
                      )}
                      {tool.isPremium && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm mb-3 line-clamp-3">{tool.description}</CardDescription>
                  <Badge variant="outline" className={`text-xs ${getCategoryColor(tool.category)}`}>
                    {tool.category}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tools found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 text-center text-sm text-gray-500">
        Showing {filteredTools.length} of {tools.length} tools
        {selectedCategory !== "All" && ` in ${selectedCategory}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>
    </div>
  )
}
