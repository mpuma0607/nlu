"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Megaphone,
  GraduationCap,
  Briefcase,
  Network,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Target,
  Handshake,
} from "lucide-react"
import { useTenant } from "@/contexts/tenant-context"
import TranslatedText from "@/components/translated-text"

const hubData = [
  {
    id: "ai-hub",
    title: "AI Tool Hub",
    description: "11 powerful AI tools to automate and enhance your real estate business",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    href: "/ai-hub",
    tools: 11,
    category: "AI & Automation",
  },
  {
    id: "marketing-hub",
    title: "Marketing Hub",
    description: "Branded content, social media graphics, and real estate market insights",
    icon: Megaphone,
    color: "from-orange-500 to-red-500",
    href: "/marketing-hub",
    tools: 3,
    category: "Marketing & Content",
  },
  {
    id: "prospecting-hub",
    title: "Prospecting Hub",
    description: "Lead generation strategies for FSBO, expired listings, and more",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    href: "/prospecting-hub",
    tools: 8,
    category: "Lead Generation",
  },
  {
    id: "training-hub",
    title: "Training Hub",
    description: "Comprehensive training on Moxi Works, scripts, and sales processes",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    href: "/training-hub",
    tools: 5,
    category: "Education & Training",
  },
  {
    id: "services-hub",
    title: "Services Hub",
    description: "Professional design services and brokerage consulting",
    icon: Briefcase,
    color: "from-indigo-500 to-purple-500",
    href: "/services-hub",
    tools: 2,
    category: "Professional Services",
  },
  {
    id: "networking-hub",
    title: "Networking Hub",
    description: "Connect with agents, brokers, and industry professionals",
    icon: Network,
    color: "from-teal-500 to-green-500",
    href: "/networking-hub",
    tools: 1,
    category: "Community & Networking",
  },
  {
    id: "gear-hub",
    title: "Gear Hub",
    description: "Exclusive merchandise and professional tools for Next Level agents",
    icon: ShoppingBag,
    color: "from-yellow-500 to-orange-500",
    href: "/gear-hub",
    tools: 1,
    category: "Merchandise & Tools",
  },
]

export default function PortalPage() {
  const [hoveredHub, setHoveredHub] = useState<string | null>(null)
  const { tenant } = useTenant()

  const filteredHubs = hubData.filter((hub) => {
    if (!tenant?.features?.hiddenFeatures) return true
    const hubKey = hub.id.replace("-hub", "")
    return !tenant.features.hiddenFeatures.includes(hubKey)
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <TranslatedText>Welcome to Your Portal</TranslatedText>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              <TranslatedText>
                Access your complete suite of real estate superpowers. Choose your hub and start transforming your
                business today.
              </TranslatedText>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Results-Driven
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Handshake className="h-4 w-4 mr-2" />
                Agent-Focused
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Hubs Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <TranslatedText>Choose Your Hub</TranslatedText>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <TranslatedText>
              Access specialized tools and resources designed to elevate every aspect of your real estate business
            </TranslatedText>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHubs.map((hub) => {
            const IconComponent = hub.icon
            return (
              <Link key={hub.id} href={hub.href}>
                <Card
                  className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border-0 ${
                    hoveredHub === hub.id ? "shadow-2xl -translate-y-2" : "shadow-lg"
                  }`}
                  onMouseEnter={() => setHoveredHub(hub.id)}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${hub.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${hub.color} shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {hub.tools} tools
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      <TranslatedText>{hub.title}</TranslatedText>
                    </CardTitle>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {hub.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                      <TranslatedText>{hub.description}</TranslatedText>
                    </CardDescription>
                    <Button
                      className={`w-full bg-gradient-to-r ${hub.color} hover:shadow-lg transition-all duration-300 text-white border-0`}
                    >
                      <TranslatedText>Explore Hub</TranslatedText>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-gray-300">Professional Tools</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">11</div>
              <div className="text-gray-300">AI-Powered Solutions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Access & Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
