"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, TrendingUp, FileText, Zap, Target, Star, CheckCircle, ArrowRight, Play } from "lucide-react"

export default function HomePage() {
  const handleSignup = () => {
    window.location.href = "https://www.thenextlevelu.com?msopen=/member/plans/all"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-yellow-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-[#b6a888] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">NLU</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              Pricing
            </a>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-[#b6a888] transition-colors font-medium">Sign In</button>
              <Button onClick={handleSignup} className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
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
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#b6a888] text-[#b6a888] hover:bg-[#b6a888] hover:text-black text-lg px-8 py-4"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            {/* AI Hub */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-white">AI Hub</CardTitle>
                <CardDescription className="text-gray-300">
                  12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    IdeaHub AI - Content generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    ListIT AI - Listing descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    ScriptIT AI - Call scripts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    RealBio AI - Professional bios
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Prospecting Hub */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader>
                <Target className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-white">Prospecting Hub</CardTitle>
                <CardDescription className="text-gray-300">
                  Complete prospecting strategies for every lead type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    FSBO & Expired Listings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Sphere of Influence
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Probate & Divorce Leads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Investor Strategies
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Marketing Hub */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-white">Marketing Hub</CardTitle>
                <CardDescription className="text-gray-300">
                  Professional marketing content and social media resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Branded social content
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Market hot takes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Campaign strategies
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Training Hub */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader>
                <FileText className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-white">Training Hub</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive training programs and skill development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Script mastery training
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    DISC & VAK personality
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Process optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Moxi Works integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Networking Hub */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-white">Networking Hub</CardTitle>
                <CardDescription className="text-gray-300">
                  Connect with other professionals and build relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Community chat
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Collaboration tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional networking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Industry connections
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Services Hub */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader>
                <Zap className="h-12 w-12 text-[#b6a888] mb-4" />
                <CardTitle className="text-white">Services Hub</CardTitle>
                <CardDescription className="text-gray-300">Professional design and consulting services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Website design
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Marketing materials
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Brokerage consulting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Custom solutions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include access to every tool and resource.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Monthly</CardTitle>
                <div className="text-4xl font-bold text-[#b6a888] mt-4">
                  $29.99
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <CardDescription className="text-gray-300">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Access to all 12 AI tools
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Complete training library
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Marketing resources
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Community access
                  </li>
                </ul>
                <Button
                  onClick={handleSignup}
                  className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold"
                >
                  Get Started Monthly
                </Button>
              </CardContent>
            </Card>

            {/* Annual Plan */}
            <Card className="bg-gray-900/50 border-[#b6a888] hover:border-[#b6a888] transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#b6a888] text-black font-semibold px-4 py-1">BEST VALUE</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Annual</CardTitle>
                <div className="text-4xl font-bold text-[#b6a888] mt-4">
                  $252
                  <span className="text-lg text-gray-400 font-normal">/year</span>
                </div>
                <div className="text-green-400 font-medium">Only $21/month - Save $108!</div>
                <CardDescription className="text-gray-300">Best value for serious agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Access to all 12 AI tools
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Complete training library
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Marketing resources
                  </li>
                  <li className="flex items-center gap-2 text-green-300">
                    <Star className="h-5 w-5 text-green-500" />
                    Save $108 per year
                  </li>
                </ul>
                <Button
                  onClick={handleSignup}
                  className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold"
                >
                  Get Started Annual
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful real estate professionals who have taken their business to the next level.
          </p>
          <Button
            size="lg"
            onClick={handleSignup}
            className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold text-lg px-8 py-4"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
