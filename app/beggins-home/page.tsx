"use client"
import Link from "next/link"
import { useEffect } from "react"

import { useState } from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTenantConfig } from "@/contexts/tenant-context"
import {
  BookOpen,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  MessageSquare,
  FileText,
  BarChart3,
  Zap,
  ArrowRight,
  Play,
  Award,
  GraduationCap,
} from "lucide-react"

export default function BegginsHomePage() {
  const tenantConfig = useTenantConfig()
  const [mounted, setMounted] = useState(false)
  const aiTools = [
    {
      title: "IdeaHub AI",
      description: "Social Media Content Generation",
      href: "/ai-hub/ideahub-ai",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "RealBio",
      description: "Professional Agent Bio Creation",
      href: "/ai-hub/realbio",
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "ListIT",
      description: "Property Listing Descriptions",
      href: "/ai-hub/listit-ai",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "ScriptIT",
      description: "Custom Real Estate Scripts",
      href: "/ai-hub/scriptit-ai",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-orange-500",
    },
    {
      title: "QuickCMA AI",
      description: "Comparative Market Analysis",
      href: "/ai-hub/quickcma-ai",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "bg-indigo-500",
    },
    {
      title: "RealCoach AI",
      description: "Personalized Business Coaching",
      href: "/ai-hub/realcoach-ai",
      icon: <Target className="h-6 w-6" />,
      color: "bg-red-500",
    },
  ]

  const trainingModules = [
    {
      title: "Dotloop Training",
      description: "Complete Dotloop platform training",
      href: "/training-hub/dotloop-training",
      icon: <BookOpen className="h-6 w-6" />,
      status: "Available",
    },
    {
      title: "New Agent Onboarding",
      description: "Comprehensive onboarding process",
      href: "/training-hub/onboarding",
      icon: <GraduationCap className="h-6 w-6" />,
      status: "Required",
    },
    {
      title: "Script Mastery",
      description: "Master your sales scripts",
      href: "/training-hub/script-mastery",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "Popular",
    },
    {
      title: "DISC/VAK Connection",
      description: "Personality-based communication",
      href: "/training-hub/disc-vak",
      icon: <Users className="h-6 w-6" />,
      status: "Advanced",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Simple Header with just logo and login */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo - using logoDark for dark background */}
          <div className="flex items-center">
            <Image
              src={tenantConfig.branding.logoDark || tenantConfig.branding.logo || "/placeholder.svg"}
              alt={tenantConfig.branding.name}
              width={200}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Login Link */}
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            <Link href="/portal">Login</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Welcome to {tenantConfig.branding.name}</h1>

          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-32"></div>
            <span className="px-6 text-xl text-gray-300 font-light">EMPOWER • EDUCATE • ENCOURAGE</span>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-32"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Your comprehensive training and development platform, designed to elevate our agents to the next level of
            success.
          </p>

          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
            <Link href="/portal">Access Your Portal</Link>
          </Button>
        </div>
      </main>

      {/* Quick Access Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Quick Access</h2>

          {/* AI Tools Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <Zap className="mr-3 h-6 w-6 text-yellow-500" />
              AI-Powered Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiTools.map((tool, index) => (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tool.color}`}>{tool.icon}</div>
                      <div>
                        <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">{tool.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="ghost" className="w-full text-white hover:bg-white/10">
                      <Link href={tool.href}>
                        Launch Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Training Modules */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <BookOpen className="mr-3 h-6 w-6 text-blue-500" />
              Training Modules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingModules.map((module, index) => (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">{module.icon}</div>
                        <div>
                          <CardTitle className="text-white">{module.title}</CardTitle>
                          <CardDescription className="text-gray-400">{module.description}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={module.status === "Required" ? "destructive" : "secondary"}
                        className={
                          module.status === "Required"
                            ? "bg-red-500/20 text-red-300"
                            : module.status === "Popular"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-gray-500/20 text-gray-300"
                        }
                      >
                        {module.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="w-full text-white hover:bg-white/10">
                      <Link href={module.href}>
                        Start Training
                        <Play className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Training</h3>
              <p className="text-gray-400">
                From onboarding to advanced techniques, our platform covers everything you need to succeed in real
                estate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Tools</h3>
              <p className="text-gray-400">
                Leverage cutting-edge AI technology to create content, analyze markets, and streamline your workflow.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-400">
                Monitor your learning journey and business growth with detailed analytics and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Real Estate Career?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful agents who have transformed their business with Beggins University.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-semibold px-8 py-4 text-lg"
            >
              <Link href="/training-hub/onboarding">
                <GraduationCap className="mr-2 h-5 w-5" />
                Get Started Today
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/support">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/20">
        <div className="container mx-auto text-center">
          {/* Using dark background logo in footer */}
          <Image
            src="/images/beggins-university-dark.png"
            alt="Beggins University"
            width={100}
            height={40}
            className="mx-auto mb-4 object-contain"
          />
          <p className="text-gray-400 mb-4">© 2024 Beggins University - Century 21 Beggins. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
              Support
            </Link>
            <Link href="/training-hub" className="text-gray-400 hover:text-white transition-colors">
              Training
            </Link>
            <Link href="/ai-hub" className="text-gray-400 hover:text-white transition-colors">
              AI Tools
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
