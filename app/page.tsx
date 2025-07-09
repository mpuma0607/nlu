import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Brain,
  MessageSquare,
  FileText,
  Search,
  Users,
  Target,
  BarChart3,
  Clock,
  ArrowRight,
  Sparkles,
  Rocket,
  Shield,
  CheckCircle,
} from "lucide-react"

export default function HomePage() {
  const aiTools = [
    {
      title: "Action AI",
      description: "Generate personalized daily action plans for real estate prospecting",
      icon: <Target className="h-6 w-6" />,
      href: "/ai-hub/action-ai",
      color: "bg-blue-500",
      features: ["Daily Action Plans", "Prospecting Scripts", "VAK Language", "Multi-language Support"],
      status: "Popular",
    },
    {
      title: "Content AI",
      description: "Create engaging real estate content for social media and marketing",
      icon: <FileText className="h-6 w-6" />,
      href: "/ai-hub/content-ai",
      color: "bg-green-500",
      features: ["Social Media Posts", "Email Templates", "Blog Content", "Marketing Copy"],
      status: "New",
    },
    {
      title: "Who's Who AI",
      description: "Advanced property owner research and skip tracing with AI analysis",
      icon: <Search className="h-6 w-6" />,
      href: "/ai-hub/whos-who-ai",
      color: "bg-purple-500",
      features: ["Skip Tracing", "Owner Research", "Contact Details", "AI Summaries"],
      status: "Featured",
    },
    {
      title: "QuickCMA",
      description: "Instant comparative market analysis with professional reports",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/ai-hub/quickcma",
      color: "bg-orange-500",
      features: ["Market Analysis", "Comparable Properties", "PDF Reports", "Email Delivery"],
      status: "Popular",
    },
    {
      title: "Chat AI",
      description: "Intelligent real estate assistant for questions and guidance",
      icon: <MessageSquare className="h-6 w-6" />,
      href: "/ai-hub/chat-ai",
      color: "bg-indigo-500",
      features: ["Real Estate Q&A", "Market Insights", "Strategy Advice", "24/7 Support"],
      status: "Coming Soon",
    },
    {
      title: "Lead AI",
      description: "AI-powered lead generation and qualification system",
      icon: <Users className="h-6 w-6" />,
      href: "/ai-hub/lead-ai",
      color: "bg-pink-500",
      features: ["Lead Scoring", "Qualification", "Follow-up Sequences", "CRM Integration"],
      status: "Coming Soon",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Popular":
        return "bg-blue-100 text-blue-800"
      case "New":
        return "bg-green-100 text-green-800"
      case "Featured":
        return "bg-purple-100 text-purple-800"
      case "Coming Soon":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">The Next Level U</h1>
                <p className="text-sm text-gray-600">AI-Powered Real Estate Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Member Access
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Powered by Advanced AI
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Real Estate Business with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Access cutting-edge AI tools designed specifically for real estate professionals. Generate leads, create
              content, analyze markets, and automate your workflow with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Explore AI Tools
              </Button>
              <Button size="lg" variant="outline">
                <Shield className="h-5 w-5 mr-2" />
                View Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Tools</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive suite of AI tools designed to streamline your real estate operations and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`${tool.color} p-3 rounded-lg text-white mb-4`}>{tool.icon}</div>
                    <Badge variant="outline" className={getStatusColor(tool.status)}>
                      {tool.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  {tool.status !== "Coming Soon" ? (
                    <Button asChild className="w-full group-hover:bg-blue-600 transition-colors">
                      <Link href={tool.href}>
                        Launch Tool
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      <Clock className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Real Estate Professionals</h2>
            <p className="text-blue-100 text-lg">Join thousands of agents already using our AI tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-blue-100">AI Generations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">The Next Level U</h3>
                  <p className="text-sm text-gray-400">AI Real Estate Portal</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering real estate professionals with cutting-edge AI technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">AI Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/ai-hub/action-ai" className="hover:text-white">
                    Action AI
                  </Link>
                </li>
                <li>
                  <Link href="/ai-hub/content-ai" className="hover:text-white">
                    Content AI
                  </Link>
                </li>
                <li>
                  <Link href="/ai-hub/whos-who-ai" className="hover:text-white">
                    Who's Who AI
                  </Link>
                </li>
                <li>
                  <Link href="/ai-hub/quickcma" className="hover:text-white">
                    QuickCMA
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Training
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 The Next Level U. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
