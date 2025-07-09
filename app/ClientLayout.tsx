"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Brain,
  BarChart3,
  User,
  LogOut,
  Home,
  Sparkles,
  Target,
  FileText,
  Search,
  Users,
  TrendingUp,
} from "lucide-react"

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const pathname = usePathname()

  // Check MemberSpace login status
  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== "undefined" && (window as any).MemberSpace?.ready) {
        const memberData = (window as any).MemberSpace.getMemberInfo()
        setIsLoggedIn(memberData.isLoggedIn)
        if (memberData.isLoggedIn && memberData.memberInfo) {
          setUserInfo(memberData.memberInfo)
        }
      } else {
        // MemberSpace not ready yet, try again
        setTimeout(checkLoginStatus, 100)
      }
    }

    checkLoginStatus()
  }, [])

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "AI Hub", href: "/ai-hub", icon: Brain },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ]

  const aiTools = [
    { name: "Action AI", href: "/ai-hub/action-ai", icon: Target, description: "Daily action plans" },
    { name: "Content AI", href: "/ai-hub/content-ai", icon: FileText, description: "Content creation" },
    { name: "QuickCMA", href: "/ai-hub/quickcma", icon: TrendingUp, description: "Market analysis" },
    { name: "Who's Who AI", href: "/ai-hub/whos-who-ai", icon: Search, description: "Property research" },
    { name: "RealCoach AI", href: "/ai-hub/realcoach-ai", icon: User, description: "Business coaching" },
    { name: "RealBio", href: "/ai-hub/realbio", icon: Users, description: "Professional bios" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleLogin = () => {
    if (typeof window !== "undefined" && (window as any).MemberSpace) {
      ;(window as any).MemberSpace.openLogin()
    }
  }

  const handleLogout = () => {
    if (typeof window !== "undefined" && (window as any).MemberSpace) {
      ;(window as any).MemberSpace.logout()
      setIsLoggedIn(false)
      setUserInfo(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                The Next Level U
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && userInfo ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{userInfo.firstName || userInfo.name || "User"}</div>
                      <div className="text-gray-500 text-xs">{userInfo.memberships?.[0]?.name || "Member"}</div>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900 bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        The Next Level U
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6">
                    <div className="space-y-2">
                      {navigation.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                              isActive(item.href)
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>

                    {/* AI Tools Section */}
                    <div className="mt-8">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Tools</h3>
                      <div className="space-y-1">
                        {aiTools.map((tool) => {
                          const Icon = tool.icon
                          return (
                            <Link
                              key={tool.name}
                              href={tool.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive(tool.href)
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <div>
                                <div className="font-medium">{tool.name}</div>
                                <div className="text-xs text-gray-500">{tool.description}</div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </nav>

                  {/* Mobile User Menu */}
                  <div className="border-t pt-4">
                    {isLoggedIn && userInfo ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 px-3 py-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {userInfo.firstName || userInfo.name || "User"}
                            </div>
                            <div className="text-sm text-gray-500">{userInfo.memberships?.[0]?.name || "Member"}</div>
                          </div>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full justify-start text-gray-600 hover:text-gray-900 bg-transparent"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  The Next Level U
                </span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Transform your real estate business with AI-powered tools for prospecting, content creation, market
                analysis, and professional coaching.
              </p>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Real Estate Focused
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">AI Tools</h3>
              <ul className="space-y-2">
                {aiTools.slice(0, 4).map((tool) => (
                  <li key={tool.name}>
                    <Link href={tool.href} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/analytics" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/ai-hub" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                    AI Hub
                  </Link>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Support</span>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Documentation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 The Next Level U. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-500 text-sm">Privacy Policy</span>
              <span className="text-gray-500 text-sm">Terms of Service</span>
              <span className="text-gray-500 text-sm">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
