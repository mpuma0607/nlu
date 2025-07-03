"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  TrendingUp,
  Users,
  GraduationCap,
  Briefcase,
  Network,
  Settings,
  User,
  Sparkles,
  Target,
  MessageSquare,
  FileText,
  BarChart3,
  Mic,
  Search,
  UserSearch,
  Calendar,
  PlaneTakeoff,
  UserCheck,
  Calculator,
  Zap,
  Building,
  Phone,
  Database,
} from "lucide-react"
import { useTenantConfig } from "@/contexts/tenant-context"
import { useTranslation } from "@/contexts/translation-context"
import TranslatedText from "@/components/translated-text"

const hubData = [
  {
    id: "ai-hub",
    title: "AI Hub",
    description: "Powerful AI tools for real estate professionals",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    href: "/ai-hub",
    tools: [
      { name: "IdeaHub AI", icon: Sparkles, description: "Social Media Content Generation" },
      { name: "RealBio", icon: User, description: "Professional Agent Bio Creation" },
      { name: "ListIT", icon: FileText, description: "Property Listing Descriptions" },
      { name: "ScriptIT", icon: MessageSquare, description: "Custom Real Estate Scripts" },
      { name: "QuickCMA AI", icon: BarChart3, description: "Comparative Market Analysis Tool" },
      { name: "RolePlay AI", icon: Mic, description: "Voice Conversation Practice" },
      { name: "PropBot AI", icon: Search, description: "Intelligent Property Search & Analysis" },
      { name: "Who's Who AI", icon: UserSearch, description: "Property Owner Skip Tracing" },
      { name: "GoalScreen AI", icon: Target, description: "Daily Contact Goal Wallpaper Creator" },
      { name: "Action AI", icon: Calendar, description: "Daily Prospecting Action Plans" },
      { name: "RealCoach AI", icon: UserCheck, description: "Personalized Business Coaching" },
      { name: "BizPlan AI", icon: PlaneTakeoff, description: "90-Day Business Plan Generator" },
      { name: "RealDeal AI", icon: Calculator, description: "Contract Analysis & Summarization" },
    ],
  },
  {
    id: "marketing-hub",
    title: "Marketing Hub",
    description: "Professional marketing tools and templates",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    href: "/marketing-hub",
    tools: [
      { name: "Branded Social Content", icon: Sparkles, description: "Professional social media templates" },
      { name: "Real Estate Hot Takes", icon: Zap, description: "Industry news and trending topics" },
    ],
  },
  {
    id: "prospecting-hub",
    title: "Prospecting Hub",
    description: "Lead generation and prospecting strategies",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    href: "/prospecting-hub",
    tools: [
      { name: "For Sale By Owners", icon: Building, description: "FSBO lead generation strategies" },
      { name: "Absentee Owners", icon: UserSearch, description: "Target absentee property owners" },
      { name: "Expired Listings", icon: FileText, description: "Convert expired listings" },
      { name: "Probate", icon: FileText, description: "Probate property opportunities" },
      { name: "SOI", icon: Users, description: "Sphere of influence cultivation" },
      { name: "First Time Home Buyers", icon: User, description: "First-time buyer programs" },
      { name: "Real Estate Investors", icon: TrendingUp, description: "Investment property leads" },
      { name: "Divorce", icon: FileText, description: "Divorce-related property sales" },
    ],
  },
  {
    id: "training-hub",
    title: "Training Hub",
    description: "Comprehensive training and education",
    icon: GraduationCap,
    color: "from-orange-500 to-red-500",
    href: "/training-hub",
    tools: [
      { name: "Moxi Works Training", icon: Settings, description: "Complete Moxi platform training" },
      { name: "Script Mastery", icon: MessageSquare, description: "Master your sales scripts" },
      { name: "Buyer Process (6P's)", icon: User, description: "6-step buyer consultation process" },
      {
        name: "Listing Process (7P's)",
        icon: FileText,
        description: "7-step listing consultation and presentation process",
      },
      { name: "DISC/VAK Connection", icon: Brain, description: "Personality-based communication" },
    ],
  },
  {
    id: "services-hub",
    title: "Services Hub",
    description: "Professional services and consulting",
    icon: Briefcase,
    color: "from-indigo-500 to-purple-500",
    href: "/services-hub",
    tools: [
      { name: "Moxi Design Services", icon: Sparkles, description: "Professional design and marketing" },
      { name: "Brokerage Consulting", icon: Briefcase, description: "Business growth consulting" },
    ],
  },
  {
    id: "networking-hub",
    title: "Networking Hub",
    description: "Connect with real estate professionals",
    icon: Network,
    color: "from-teal-500 to-green-500",
    href: "/networking-hub",
    tools: [
      { name: "Community Groups & Chats", icon: Users, description: "Connect with real estate professionals" },
      { name: "Agent Directory", icon: Database, description: "Find and connect with other agents" },
    ],
  },
  {
    id: "gear-hub",
    title: "Gear Hub",
    description: "Tools and resources for agents",
    icon: Settings,
    color: "from-gray-500 to-slate-500",
    href: "/gear-hub",
    tools: [],
  },
]

export default function PortalPage() {
  const tenantConfig = useTenantConfig()
  const { currentLanguage } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <Image
                src={tenantConfig.branding.logo || "/placeholder.svg"}
                alt={tenantConfig.branding.name}
                width={120}
                height={48}
                className="object-contain filter brightness-0 invert"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <TranslatedText text={`Welcome to ${tenantConfig.branding.name}`} />
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              <TranslatedText text="Your complete real estate business platform" />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TranslatedText text="13 AI Tools" />
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TranslatedText text="Professional Training" />
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TranslatedText text="Marketing Resources" />
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {hubData.map((hub) => {
            const IconComponent = hub.icon
            return (
              <Link key={hub.id} href={hub.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${hub.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      <TranslatedText text={hub.title} />
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      <TranslatedText text={hub.description} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {hub.tools.slice(0, 3).map((tool, index) => {
                        const ToolIcon = tool.icon
                        return (
                          <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                            <ToolIcon className="h-4 w-4 text-gray-400" />
                            <span>
                              <TranslatedText text={tool.name} />
                            </span>
                          </div>
                        )
                      })}
                      {hub.tools.length > 3 && (
                        <div className="text-sm text-gray-500 font-medium">
                          <TranslatedText text={`+${hub.tools.length - 3} more tools`} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Access Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            <TranslatedText text="Quick Access" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/profile">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-blue-50 bg-transparent">
                <User className="h-6 w-6" />
                <TranslatedText text="My Profile" />
              </Button>
            </Link>
            <Link href="/creations-dashboard">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-green-50 bg-transparent">
                <FileText className="h-6 w-6" />
                <TranslatedText text="My Creations" />
              </Button>
            </Link>
            <Link href="/ai-hub">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-purple-50 bg-transparent">
                <Brain className="h-6 w-6" />
                <TranslatedText text="AI Tools" />
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-orange-50 bg-transparent">
                <Phone className="h-6 w-6" />
                <TranslatedText text="Get Support" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">13+</div>
            <div className="text-gray-600">
              <TranslatedText text="AI-Powered Tools" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">
              <TranslatedText text="Platform Access" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-gray-600">
              <TranslatedText text="Unlimited Usage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
