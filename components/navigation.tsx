"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useTenant } from "@/contexts/tenant-context"
import LanguageSelector from "./language-selector"
import TranslatedText from "./translated-text"

const navigationItems = [
  { name: "AI Hub", href: "/ai-hub" },
  { name: "Marketing Hub", href: "/marketing-hub" },
  { name: "Prospecting Hub", href: "/prospecting-hub" },
  { name: "Training Hub", href: "/training-hub" },
  { name: "Services Hub", href: "/services-hub" },
  { name: "Networking Hub", href: "/networking-hub" },
  { name: "Gear Hub", href: "/gear-hub" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { tenant } = useTenant()

  const filteredNavItems = navigationItems.filter((item) => {
    if (!tenant?.features?.hiddenFeatures) return true
    const itemKey = item.href.replace("/", "").replace("-", "")
    return !tenant.features.hiddenFeatures.includes(itemKey)
  })

  const isActive = (href: string) => pathname === href

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/portal" className="flex-shrink-0 flex items-center">
              {tenant?.branding?.logo ? (
                <img
                  className="h-8 w-auto"
                  src={tenant.branding.logo || "/placeholder.svg"}
                  alt={tenant.branding.name}
                />
              ) : (
                <div className="text-xl font-bold text-gray-900">{tenant?.branding?.name || "Portal"}</div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <TranslatedText>{item.name}</TranslatedText>
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/profile"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <TranslatedText>Profile</TranslatedText>
            </Link>
            <Link
              href="/support"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <TranslatedText>Get Support</TranslatedText>
            </Link>
            {tenant?.id === "brokerage-private" && <LanguageSelector />}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      <TranslatedText>{item.name}</TranslatedText>
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    <TranslatedText>Profile</TranslatedText>
                  </Link>
                  <Link
                    href="/support"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    <TranslatedText>Get Support</TranslatedText>
                  </Link>
                  {tenant?.id === "brokerage-private" && (
                    <div className="px-3 py-2">
                      <LanguageSelector />
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
