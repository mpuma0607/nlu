import { Card, CardContent } from "@/components/ui/card"
import { Brain, Megaphone, GraduationCap, Wrench, Network, ShoppingBag, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TenantSwitcher from "@/components/tenant-switcher"

export default function PortalPage() {
  const hubs = [
    {
      title: "AI Tool Hub",
      description: "11 powerful AI tools to automate and enhance your real estate business",
      icon: Brain,
      href: "/ai-hub",
      color: "bg-gradient-to-br from-purple-600 to-blue-600",
    },
    {
      title: "Marketing Hub",
      description: "Branded content, social media graphics, and real estate market insights",
      icon: Megaphone,
      href: "/marketing-hub",
      color: "bg-gradient-to-br from-pink-600 to-red-600",
    },
    {
      title: "Prospecting Hub",
      description: "Lead generation strategies for FSBO, expired listings, and more",
      icon: Target,
      href: "/prospecting-hub",
      color: "bg-gradient-to-br from-orange-600 to-yellow-600",
    },
    {
      title: "Training Hub",
      description: "Comprehensive training on Moxi Works, scripts, and sales processes",
      icon: GraduationCap,
      href: "/training-hub",
      color: "bg-gradient-to-br from-blue-600 to-cyan-600",
    },
    {
      title: "Services Hub",
      description: "Professional design services and brokerage consulting",
      icon: Wrench,
      href: "/services-hub",
      color: "bg-gradient-to-br from-green-600 to-teal-600",
    },
    {
      title: "Networking Hub",
      description: "Connect with agents, brokers, and industry professionals",
      icon: Network,
      href: "/networking-hub",
      color: "bg-gradient-to-br from-indigo-600 to-purple-600",
    },
    {
      title: "Gear Hub",
      description: "Exclusive merchandise and professional tools for Next Level agents",
      icon: ShoppingBag,
      href: "/gear-hub",
      color: "bg-gradient-to-br from-gray-700 to-gray-900",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <TenantSwitcher />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-yellow-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Welcome to Your Portal</h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-[#b6a888] w-16"></div>
            <p className="text-xl text-[#b6a888] font-medium tracking-wide">EMPOWER • EDUCATE • ENCOURAGE</p>
            <div className="h-px bg-[#b6a888] w-16"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Access your complete suite of real estate superpowers. Choose your hub and start transforming your business
            today.
          </p>
        </div>
      </section>

      {/* Hubs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Choose Your Hub</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access specialized tools and resources designed to elevate every aspect of your real estate business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {hubs.map((hub, index) => (
              <Card
                key={index}
                className="h-full bg-white hover:bg-gray-50 transition-all duration-300 border-0 shadow-lg hover:shadow-2xl group"
              >
                <CardContent className="p-8 h-full">
                  <div className="flex flex-col h-full text-center">
                    <div
                      className={`w-20 h-20 ${hub.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <hub.icon className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#b6a888] transition-colors">
                      {hub.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{hub.description}</p>

                    <Link href={hub.href} className="w-full mt-auto">
                      <Button className="w-full bg-[#b6a888] hover:bg-[#a39577] text-white">Open {hub.title}</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
