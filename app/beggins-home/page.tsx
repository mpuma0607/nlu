"use client"

import { useEffect } from "react"
import { useTenantConfig } from "@/contexts/tenant-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Brain, TrendingUp, FileText, Target, Star, ArrowRight, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function BegginsHomePage() {
  const tenantConfig = useTenantConfig()
  const router = useRouter()

  // Only show this page for Century 21 Beggins tenant
  useEffect(() => {
    if (tenantConfig.id !== "century21-beggins") {
      router.push("/")
    }
  }, [tenantConfig, router])

  if (tenantConfig.id !== "century21-beggins") {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-8">
            <Image
              src="/images/beggins-university-dark.png"
              alt="Beggins University"
              width={80}
              height={80}
              className="object-contain"
            />
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-white">Beggins University</h1>
              <p className="text-xl text-[#b6a888] mt-2">Century 21 Beggins Training Platform</p>
            </div>
          </div>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Welcome to your comprehensive training and development platform, designed to elevate our agents to the next
            level of success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training-hub/onboarding">
              <Button size="lg" className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold text-lg px-8 py-4">
                <GraduationCap className="mr-2 h-5 w-5" />
                Start Onboarding
              </Button>
            </Link>
            <Link href="/ai-hub">
              <Button
                size="lg"
                variant="outline"
                className="border-[#b6a888] text-[#b6a888] hover:bg-[#b6a888] hover:text-black text-lg px-8 py-4"
              >
                <Brain className="mr-2 h-5 w-5" />
                Explore AI Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Quick Access</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/training-hub/onboarding">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#b6a888]">
                <CardHeader className="text-center">
                  <GraduationCap className="h-12 w-12 text-[#b6a888] mx-auto mb-2" />
                  <CardTitle className="text-black">New Agent Onboarding</CardTitle>
                  <CardDescription>Complete your onboarding process</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/training-hub/dotloop-training">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#b6a888]">
                <CardHeader className="text-center">
                  <FileText className="h-12 w-12 text-[#b6a888] mx-auto mb-2" />
                  <CardTitle className="text-black">Dotloop Training</CardTitle>
                  <CardDescription>Master transaction management</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/marketing-hub/brokerage-logos">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#b6a888]">
                <CardHeader className="text-center">
                  <Star className="h-12 w-12 text-[#b6a888] mx-auto mb-2" />
                  <CardTitle className="text-black">Brokerage Assets</CardTitle>
                  <CardDescription>Download logos and branding</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/marketing-hub/zillow-showcase">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#b6a888]">
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 text-[#b6a888] mx-auto mb-2" />
                  <CardTitle className="text-black">Zillow Showcase</CardTitle>
                  <CardDescription>Enhance your listings</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Your Complete Training Platform</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access all the tools, training, and resources you need to succeed at Century 21 Beggins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Hub */}
            <Card className="border-2 hover:border-[#b6a888] transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-black">AI Hub</CardTitle>
                <CardDescription>13 powerful AI tools for listings, scripts, coaching, and more</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ai-hub">
                  <Button className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black">
                    Explore AI Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Training Hub */}
            <Card className="border-2 hover:border-[#b6a888] transition-colors">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-black">Training Hub</CardTitle>
                <CardDescription>Comprehensive training programs and skill development</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/training-hub">
                  <Button className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black">
                    Start Training
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Marketing Hub */}
            <Card className="border-2 hover:border-[#b6a888] transition-colors">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-black">Marketing Hub</CardTitle>
                <CardDescription>Professional marketing content and branding resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/marketing-hub">
                  <Button className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black">
                    Get Marketing Assets
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Century 21 Beggins Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Century 21 Beggins Excellence</h2>
            <p className="text-xl text-gray-600">Proud to be part of one of the most successful Century 21 offices</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-2 border-[#b6a888]">
              <div className="text-3xl font-bold text-[#b6a888] mb-2">33+</div>
              <div className="text-black font-semibold mb-1">Years</div>
              <div className="text-gray-600 text-sm">In Business</div>
            </Card>

            <Card className="text-center p-6 border-2 border-[#b6a888]">
              <div className="text-3xl font-bold text-[#b6a888] mb-2">65K+</div>
              <div className="text-black font-semibold mb-1">Transactions</div>
              <div className="text-gray-600 text-sm">Completed</div>
            </Card>

            <Card className="text-center p-6 border-2 border-[#b6a888]">
              <div className="text-3xl font-bold text-[#b6a888] mb-2">$1B+</div>
              <div className="text-black font-semibold mb-1">Annual Sales</div>
              <div className="text-gray-600 text-sm">Volume</div>
            </Card>

            <Card className="text-center p-6 border-2 border-[#b6a888]">
              <div className="text-3xl font-bold text-[#b6a888] mb-2">100s</div>
              <div className="text-black font-semibold mb-1">of Agents</div>
              <div className="text-gray-600 text-sm">In Our Team</div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
