"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "AI Hub",
    href: "/ai-hub",
    children: [
      { name: "Action AI", href: "/ai-hub/action-ai" },
      { name: "BizPlan AI", href: "/ai-hub/bizplan-ai" },
      { name: "GoalScreen AI", href: "/ai-hub/goalscreen-ai" },
      { name: "IdeaHub AI", href: "/ai-hub/ideahub-ai" },
      { name: "ListIt AI", href: "/ai-hub/listit-ai" },
      { name: "PropBot AI", href: "/ai-hub/propbot-ai" },
      { name: "QuickCMA AI", href: "/ai-hub/quickcma-ai" },
      { name: "RealBio", href: "/ai-hub/realbio" },
      { name: "RealCoach AI", href: "/ai-hub/realcoach-ai" },
      { name: "RealDeal AI", href: "/ai-hub/realdeal-ai" },
      { name: "RolePlay AI", href: "/ai-hub/roleplay-ai" },
      { name: "ScriptIt AI", href: "/ai-hub/scriptit-ai" },
      { name: "WhosWho AI", href: "/ai-hub/whos-who-ai" },
    ],
  },
  {
    name: "Prospecting Hub",
    href: "/prospecting-hub",
    children: [
      { name: "Absentee Owners", href: "/prospecting-hub/absentee-owners" },
      { name: "Divorce Real Estate", href: "/prospecting-hub/divorce-real-estate" },
      { name: "Expired Listings", href: "/prospecting-hub/expired-listings" },
      { name: "First-Time Buyers", href: "/prospecting-hub/first-time-buyers" },
      { name: "FSBO", href: "/prospecting-hub/fsbo" },
      { name: "Investors", href: "/prospecting-hub/investors" },
      { name: "Pre-Foreclosure", href: "/prospecting-hub/pre-foreclosure" },
      { name: "Probate", href: "/prospecting-hub/probate" },
      { name: "SOI", href: "/prospecting-hub/soi" },
    ],
  },
  {
    name: "Training Hub",
    href: "/training-hub",
    children: [
      { name: "Buyer Process", href: "/training-hub/buyer-process" },
      { name: "DISC & VAK", href: "/training-hub/disc-vak" },
      { name: "Listing Process", href: "/training-hub/listing-process" },
      { name: "Moxi Works", href: "/training-hub/moxi-works" },
      { name: "Onboarding", href: "/training-hub/onboarding" },
      { name: "Script Mastery", href: "/training-hub/script-mastery" },
    ],
  },
  {
    name: "Marketing Hub",
    href: "/marketing-hub",
    children: [
      { name: "Branded Social Content", href: "/marketing-hub/branded-social-content" },
      { name: "Brokerage Logos", href: "/marketing-hub/brokerage-logos" },
      { name: "Hot Takes", href: "/marketing-hub/hot-takes" },
    ],
  },
  {
    name: "Networking Hub",
    href: "/networking-hub",
    children: [{ name: "Agent Directory", href: "/networking-hub/agent-directory" }],
  },
  {
    name: "Services Hub",
    href: "/services-hub",
    children: [
      { name: "Brokerage Consulting", href: "/services-hub/brokerage-consulting" },
      { name: "Moxi Design", href: "/services-hub/moxi-design" },
    ],
  },
  {
    name: "Gear Hub",
    href: "/gear-hub",
  },
  {
    name: "Profile",
    href: "/profile",
    children: [
      { name: "Profile", href: "/profile" },
      { name: "Creations Dashboard", href: "/creations-dashboard" },
    ],
  },
  {
    name: "Support",
    href: "/support",
  },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const isParentActive = (item: any) => {
    if (isActive(item.href)) return true
    if (item.children) {
      return item.children.some((child: any) => isActive(child.href))
    }
    return false
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                The Next Level U Portal
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                if (item.children) {
                  return (
                    <DropdownMenu key={item.name}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "inline-flex items-center px-1 pt-1 text-sm font-medium",
                            isParentActive(item)
                              ? "border-b-2 border-blue-500 text-gray-900"
                              : "text-gray-500 hover:text-gray-700",
                          )}
                        >
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        {item.children.map((child) => (
                          <DropdownMenuItem key={child.name} asChild>
                            <Link
                              href={child.href}
                              className={cn(
                                "w-full",
                                isActive(child.href) ? "bg-gray-100 text-gray-900" : "text-gray-700",
                              )}
                            >
                              {child.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 text-sm font-medium",
                      isActive(item.href)
                        ? "border-b-2 border-blue-500 text-gray-900"
                        : "text-gray-500 hover:text-gray-700",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">{/* Additional header content can go here */}</div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => {
              if (item.children) {
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600">
                      {item.name}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "block border-l-4 py-2 pl-6 pr-4 text-base font-medium",
                          isActive(child.href)
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                    isActive(item.href)
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
