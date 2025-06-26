"use client"

import { useEffect } from "react"
import { useTenantConfig } from "@/contexts/tenant-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { Brain, Users, TrendingUp, FileText, Zap, Target, Star, CheckCircle, ArrowRight, Play, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HomePage() {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)
  const tenantConfig = useTenantConfig()
  const router = useRouter()

  // Redirect to custom home page if tenant has one
  useEffect(() => {
    if (tenantConfig.features.customHomePage) {
      router.push(tenantConfig.features.customHomePage)
    }
  }, [tenantConfig, router])

  // If tenant has custom home page, don't render this component
  if (tenantConfig.features.customHomePage) {
    return null
  }

  const handleLogin = () => {
    console.log("Sign In clicked - redirecting to portal")
    window.location.href = "/portal"
  }

  const handleSignup = () => {
    console.log("Signup clicked - redirecting to plans page")
    window.location.href = "https://www.thenextlevelu.com?msopen=/member/plans/all"
  }

  const handlePricing = () => {
    console.log("Pricing clicked - redirecting to plans page")
    window.location.href = "https://www.thenextlevelu.com?msopen=/member/plans/all"
  }

  const handleWatchDemo = (toolName: string) => {
    setSelectedDemo(toolName)
    setShowVideoModal(true)
  }

  const getVideoUrl = (toolName: string) => {
    const videoMap: { [key: string]: string } = {
      "Who's Who AI": "https://www.youtube.com/embed/aWj4jl0rwpY?autoplay=0&rel=0&modestbranding=1",
      "RealDeal AI": "https://www.youtube.com/embed/U6CeHo40zDY?autoplay=0&rel=0&modestbranding=1",
      "ScriptIT AI": "https://www.youtube.com/embed/pU2MdC4lI6w?autoplay=0&rel=0&modestbranding=1",
      "RolePlay AI": "https://www.youtube.com/embed/1OqmAzDiJPg?autoplay=0&rel=0&modestbranding=1",
      "Action AI": "https://www.youtube.com/embed/QXbBI0ljLKo?autoplay=0&rel=0&modestbranding=1",
      "RealBio AI": "https://www.youtube.com/embed/zyzeLTQieuA?autoplay=0&rel=0&modestbranding=1",
      "BizPlan AI": "https://www.youtube.com/embed/XP8w9Qq-vgI?autoplay=0&rel=0&modestbranding=1",
      "QuickCMA AI": "https://www.youtube.com/embed/TB0id4hQem8?autoplay=0&rel=0&modestbranding=1",
      "ListIT AI": "https://www.youtube.com/embed/ELgYo_ErzCs?autoplay=0&rel=0&modestbranding=1",
      "RealCoach AI": "https://www.youtube.com/embed/fPZKFTuQg98?autoplay=0&rel=0&modestbranding=1",
      "IdeaHub AI": "https://www.youtube.com/embed/fKoYPHRyfK8?autoplay=0&rel=0&modestbranding=1",
      "PropBot AI": "https://www.youtube.com/embed/m7RZC9TAe3g?autoplay=0&rel=0&modestbranding=1",
    }
    return videoMap[toolName] || "https://www.youtube.com/embed/qF050toaVYU?autoplay=0&rel=0&modestbranding=1"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-yellow-900">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/nlu-logo-light.png"
              alt="The Next Level U"
              width={66}
              height={66}
              className="object-contain"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              About
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              Testimonials
            </a>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="text-gray-300 hover:text-[#b6a888] transition-colors font-medium"
              >
                Sign In
              </button>
              <Button onClick={handleSignup} className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold">
                Get Started
              </Button>
            </div>
          </nav>
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleLogin}
              className="text-gray-300 hover:text-[#b6a888] transition-colors font-medium text-sm"
            >
              Sign In
            </button>
            <Button onClick={handleSignup} className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-[#b6a888]/20 text-[#b6a888] border-[#b6a888]/30">
            🚀 Transform Your Real Estate Business
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            The Next Level U<span className="block text-[#b6a888]">Real Estate Platform</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving
            community of real estate professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleSignup}
              className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold text-lg px-8 py-4"
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowVideoModal(true)}
              className="border-[#b6a888] text-[#b6a888] hover:bg-[#b6a888] hover:text-black text-lg px-8 py-4"
            >
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-gray-700">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white text-xl">
                {selectedDemo ? `${selectedDemo} Demo` : "Platform Demo"}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={
                selectedDemo
                  ? getVideoUrl(selectedDemo)
                  : "https://www.youtube.com/embed/qF050toaVYU?autoplay=0&rel=0&modestbranding=1"
              }
              title={selectedDemo ? `${selectedDemo} Demo` : "NLU Full Platform Demo"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-b-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <section id="features" className="py-20 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools, training, and resources you need to take your real
              estate business to the next level.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-white">AI Hub</CardTitle>
                <CardDescription className="text-gray-300">
                  12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">For a demo of each tool, click it below:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    {["IdeaHub AI", "ListIT AI", "ScriptIT AI", "RealBio AI", "RolePlay AI", "Action AI"].map(
                      (tool) => (
                        <button
                          key={tool}
                          onClick={() => handleWatchDemo(tool)}
                          className="text-[#b6a888] hover:text-[#a39577] text-left block"
                        >
                          {tool} Demo
                        </button>
                      ),
                    )}
                  </div>
                  <div className="space-y-1">
                    {["RealCoach AI", "BizPlan AI", "RealDeal AI", "QuickCMA AI", "Who's Who AI", "PropBot AI"].map(
                      (tool) => (
                        <button
                          key={tool}
                          onClick={() => handleWatchDemo(tool)}
                          className="text-[#b6a888] hover:text-[#a39577] text-left block"
                        >
                          {tool} Demo
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {[
              {
                icon: Target,
                title: "Prospecting Hub",
                desc: "Complete prospecting strategies for every lead type",
                items: [
                  "FSBO & Expired Listings",
                  "Sphere of Influence",
                  "Probate & Divorce Leads",
                  "Investor Strategies",
                ],
              },
              {
                icon: TrendingUp,
                title: "Marketing Hub",
                desc: "Professional marketing content and social media resources",
                items: ["Branded social content", "Market hot takes", "Professional templates", "Campaign strategies"],
              },
              {
                icon: FileText,
                title: "Training Hub",
                desc: "Comprehensive training programs and skill development",
                items: [
                  "Script mastery training",
                  "DISC & VAK personality",
                  "Process optimization",
                  "Moxi Works integration",
                ],
              },
              {
                icon: Users,
                title: "Networking Hub",
                desc: "Connect with other professionals and build relationships",
                items: ["Community chat", "Collaboration tools", "Professional networking", "Industry connections"],
              },
              {
                icon: Zap,
                title: "Services Hub",
                desc: "Professional design and consulting services",
                items: ["Website design", "Marketing materials", "Brokerage consulting", "Custom solutions"],
              },
            ].map((hub, idx) => (
              <Card
                key={idx}
                className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300"
              >
                <CardHeader>
                  <hub.icon className="h-12 w-12 text-[#b6a888] mb-4" />
                  <CardTitle className="text-white">{hub.title}</CardTitle>
                  <CardDescription className="text-gray-300">{hub.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {hub.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">We're Not Just Another Tech Company</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We live and breathe real estate. Our platform was born from real-world success in the trenches of the
              industry.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#b6a888]/20 to-transparent p-6 rounded-lg border border-[#b6a888]/30">
                <h3 className="text-2xl font-bold text-white mb-4">Real Estate Is Our DNA</h3>
                <p className="text-gray-300 leading-relaxed">
                  We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and
                  over 33 years of proven success in the industry.
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#b6a888]/10 to-transparent p-6 rounded-lg border border-[#b6a888]/20">
                <h3 className="text-xl font-bold text-white mb-3">Built by Agents, for Agents</h3>
                <p className="text-gray-300">
                  Our platform exists because our own agents were achieving incredible results using these tools.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "33+", label: "Years", sub: "In Business" },
                { num: "65K+", label: "Transactions", sub: "Completed" },
                { num: "$1B+", label: "Annual Sales", sub: "Volume" },
                { num: "100s", label: "of Agents", sub: "In Our Brokerage" },
              ].map((stat, i) => (
                <Card key={i} className="bg-gray-900/50 border-[#b6a888]/30 text-center p-6">
                  <div className="text-3xl font-bold text-[#b6a888] mb-2">{stat.num}</div>
                  <div className="text-white font-semibold mb-1">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.sub}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include access to every tool and resource.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Monthly</CardTitle>
                <div className="text-4xl font-bold text-[#b6a888] mt-4">
                  $29.99<span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <CardDescription className="text-gray-300">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Access to all 11 AI tools",
                    "Complete training library",
                    "Marketing resources",
                    "Community access",
                    "24/7 platform access",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handlePricing}
                  className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold"
                >
                  Get Started Monthly
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-[#b6a888] hover:border-[#b6a888] transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#b6a888] text-black font-semibold px-4 py-1">BEST VALUE</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Annual</CardTitle>
                <div className="text-4xl font-bold text-[#b6a888] mt-4">
                  $252<span className="text-lg text-gray-400 font-normal">/year</span>
                </div>
                <div className="text-green-400 font-medium">Only $21/month - Save $108!</div>
                <CardDescription className="text-gray-300">Best value for serious agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Access to all 11 AI tools",
                    "Complete training library",
                    "Marketing resources",
                    "Community access",
                    "24/7 platform access",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-green-400">
                    <Star className="h-5 w-5 text-green-500" />
                    Save $108 per year
                  </li>
                </ul>
                <Button
                  onClick={handlePricing}
                  className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold"
                >
                  Get Started Annual
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Members Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of real estate professionals who have transformed their business with The Next Level U.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Top Producer, Tampa Bay",
                initial: "S",
                quote:
                  "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.",
              },
              {
                name: "Mike Rodriguez",
                role: "Century 21 Agent",
                initial: "M",
                quote:
                  "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.",
              },
              {
                name: "Lisa Chen",
                role: "Broker Owner",
                initial: "L",
                quote:
                  "This platform has everything I need in one place. The community support and resources are unmatched.",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#b6a888] rounded-full flex items-center justify-center text-black font-bold mr-3">
                      {testimonial.initial}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful real estate professionals who have taken their business to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleSignup}
              className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold text-lg px-8 py-4"
            >
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#b6a888] text-[#b6a888] hover:bg-[#b6a888] hover:text-black text-lg px-8 py-4"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 bg-black/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/nlu-logo.png"
                  alt="The Next Level U"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400">
                Empowering real estate professionals with AI-powered tools and comprehensive training.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: [
                  { name: "Features", href: "#features" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "Testimonials", href: "#testimonials" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "#" },
                  { name: "Contact Us", href: "#" },
                  { name: "Community", href: "#" },
                  { name: "Status", href: "#" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { name: "About", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "/terms-of-service", isLink: true },
                ],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      {link.isLink ? (
                        <Link href={link.href} className="hover:text-[#b6a888] transition-colors">
                          {link.name}
                        </Link>
                      ) : (
                        <a href={link.href} className="hover:text-[#b6a888] transition-colors">
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 The Next Level U. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
