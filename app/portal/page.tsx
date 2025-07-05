"use client"
import { useTenantConfig } from "@/contexts/tenant-context"
import { useTracking } from "@/hooks/use-tracking"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import {
  Brain,
  Users,
  TrendingUp,
  FileText,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Wrench,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PortalPage() {
  const tenantConfig = useTenantConfig()
  const router = useRouter()
  const { trackEvent } = useTracking()

  const handleHubClick = (hubName: string, hubPath: string) => {
    trackEvent("hub_accessed", { hub: hubName })
    router.push(hubPath)
  }

  // Define all hubs with their info
  const allHubs = [
    {
      id: "ai-hub",
      title: "AI Hub",
      description: "Powerful AI tools for listings, scripts, bios, and more",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      href: "/ai-hub",
      features: ["12 AI Tools", "Content Generation", "Smart Analysis"],
    },
    {
      id: "prospecting-hub",
      title: "Prospecting Hub",
      description: "Complete prospecting strategies for every lead type",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/prospecting-hub",
      features: ["FSBO & Expired", "SOI Management", "Lead Generation"],
    },
    {
      id: "marketing-hub",
      title: "Marketing Hub",
      description: "Professional marketing content and social media resources",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/marketing-hub",
      features: ["Social Content", "Market Updates", "Brand Materials"],
    },
    {
      id: "training-hub",
      title: "Training Hub",
      description: "Comprehensive training programs and skill development",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      href: "/training-hub",
      features: ["Script Mastery", "DISC/VAK", "Process Training"],
    },
    {
      id: "onboarding-hub",
      title: "Onboarding Hub",
      description: "Your comprehensive guide to getting started",
      icon: BookOpen,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      href: "/onboarding-hub",
      features: ["Getting Started", "Training Modules", "Mentorship"],
      tenantOnly: "century21-beggins", // Only show for Beggins tenant
    },
    {
      id: "services-hub",
      title: "Services Hub",
      description: "Professional design and consulting services",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      href: "/services-hub",
      features: ["Design Services", "Consulting", "Custom Solutions"],
    },
    {
      id: "networking-hub",
      title: "Networking Hub",
      description: "Connect with other professionals and build relationships",
      icon: Users,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      href: "/networking-hub",
      features: ["Community Chat", "Agent Directory", "Collaboration"],
    },
    {
      id: "gear-hub",
      title: "Gear Hub",
      description: "Essential tools and resources for real estate professionals",
      icon: Wrench,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      href: "/gear-hub",
      features: ["Tools & Resources", "Equipment", "Recommendations"],
    },
  ]

  // Filter hubs based on tenant config
  const visibleHubs = allHubs.filter((hub) => {
    // If hub is tenant-specific, only show for that tenant
    if (hub.tenantOnly && hub.tenantOnly !== tenantConfig.id) {
      return false
    }

    // Check if hub is hidden in tenant config
    const hubKey = hub.id
    if (tenantConfig.features.hiddenHubs?.includes(hubKey)) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Image
              src={tenantConfig.branding.logoDark || tenantConfig.branding.logo || "/placeholder.svg"}
              alt={tenantConfig.branding.name}
              width={120}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Your Portal</h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-gray-300">EMPOWER</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">EDUCATE</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">ENCOURAGE</span>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access your complete suite of real estate superpowers. Choose your hub and start transforming your business
            today.
          </p>
        </div>
      </section>

      {/* Hubs Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Hub</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each hub is designed to supercharge a specific aspect of your real estate business. Explore the tools and
              resources that will take you to the next level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleHubs.map((hub) => {
              const IconComponent = hub.icon
              return (
                <Card
                  key={hub.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-300"
                  onClick={() => handleHubClick(hub.title, hub.href)}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 ${hub.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className={`h-8 w-8 ${hub.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {hub.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">{hub.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-6">
                      {hub.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full group-hover:bg-gray-900 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleHubClick(hub.title, hub.href)
                      }}
                    >
                      Explore {hub.title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">12+</div>
              <div className="text-gray-600">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Training Modules</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Platform Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful real estate professionals who have taken their business to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-hub">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Start with AI Hub
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/support">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                Get Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
