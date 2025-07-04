"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTenant } from "@/contexts/tenant-context"
import { useTranslation } from "@/contexts/translation-context"
import { TranslatedText } from "@/components/translated-text"
import Link from "next/link"
import {
  Brain,
  Megaphone,
  Target,
  GraduationCap,
  Briefcase,
  Users,
  ShoppingBag,
  User,
  HelpCircle,
  Sparkles,
} from "lucide-react"

const hubsData = [
  {
    id: "ai-hub",
    title: "AI Tool Hub",
    description: "11 powerful AI tools to automate and enhance your real estate business",
    icon: Brain,
    href: "/ai-hub",
    color: "bg-purple-500",
    tools: 11,
  },
  {
    id: "marketing-hub",
    title: "Marketing Hub",
    description: "Branded content, social media graphics, and real estate market insights",
    icon: Megaphone,
    href: "/marketing-hub",
    color: "bg-blue-500",
    tools: 4,
  },
  {
    id: "prospecting-hub",
    title: "Prospecting Hub",
    description: "Lead generation strategies for FSBO, expired listings, and more",
    icon: Target,
    href: "/prospecting-hub",
    color: "bg-green-500",
    tools: 8,
  },
  {
    id: "training-hub",
    title: "Training Hub",
    description: "Comprehensive training on Moxi Works, scripts, and sales processes",
    icon: GraduationCap,
    href: "/training-hub",
    color: "bg-orange-500",
    tools: 5,
  },
  {
    id: "services-hub",
    title: "Services Hub",
    description: "Professional design services and brokerage consulting",
    icon: Briefcase,
    href: "/services-hub",
    color: "bg-red-500",
    tools: 2,
  },
  {
    id: "networking-hub",
    title: "Networking Hub",
    description: "Connect with agents, brokers, and industry professionals",
    icon: Users,
    href: "/networking-hub",
    color: "bg-indigo-500",
    tools: 2,
  },
  {
    id: "gear-hub",
    title: "Gear Hub",
    description: "Exclusive merchandise and professional tools for Next Level agents",
    icon: ShoppingBag,
    href: "/gear-hub",
    color: "bg-pink-500",
    tools: 1,
  },
]

export default function PortalPage() {
  const { config } = useTenant()
  const { translate } = useTranslation()
  const [translatedContent, setTranslatedContent] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const translateContent = async () => {
      const translations: { [key: string]: string } = {}

      // Translate main content
      translations.welcomeTitle = await translate("Welcome to Your Portal")
      translations.welcomeDescription = await translate(
        "Access your complete suite of real estate superpowers. Choose your hub and start transforming your business today.",
      )
      translations.chooseHub = await translate("Choose Your Hub")
      translations.hubsDescription = await translate(
        "Access specialized tools and resources designed to elevate every aspect of your real estate business",
      )

      // Translate hub titles and descriptions
      for (const hub of hubsData) {
        translations[`${hub.id}-title`] = await translate(hub.title)
        translations[`${hub.id}-description`] = await translate(hub.description)
      }

      setTranslatedContent(translations)
    }

    translateContent()
  }, [translate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {translatedContent.welcomeTitle || "Welcome to Your Portal"}
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {translatedContent.welcomeDescription ||
              "Access your complete suite of real estate superpowers. Choose your hub and start transforming your business today."}
          </p>
        </div>

        {/* Hub Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {translatedContent.chooseHub || "Choose Your Hub"}
          </h2>
          <p className="text-slate-600 text-center mb-8">
            {translatedContent.hubsDescription ||
              "Access specialized tools and resources designed to elevate every aspect of your real estate business"}
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hubsData.map((hub) => {
            const Icon = hub.icon
            return (
              <Link key={hub.id} href={hub.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-purple-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${hub.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {hub.tools} tools
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{translatedContent[`${hub.id}-title`] || hub.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {translatedContent[`${hub.id}-description`] || hub.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/profile">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <User className="h-4 w-4" />
              <TranslatedText text="Profile" />
            </Button>
          </Link>
          <Link href="/support">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <HelpCircle className="h-4 w-4" />
              <TranslatedText text="Get Support" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
