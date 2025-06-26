"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wrench, Clock, Bell, Mail } from "lucide-react"
import { useTenantConfig } from "@/contexts/tenant-context"

export default function GearHubPage() {
  const tenantConfig = useTenantConfig()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Wrench className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gear Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your one-stop shop for real estate tools, equipment, and resources to power your business.
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <Clock className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Coming Soon!</CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-4">
              We're working hard to bring you an amazing collection of real estate tools and gear.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    1
                  </Badge>
                  Professional Tools
                </h3>
                <p className="text-sm text-gray-600 ml-8">
                  High-quality cameras, measuring tools, and presentation equipment
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    2
                  </Badge>
                  Marketing Materials
                </h3>
                <p className="text-sm text-gray-600 ml-8">
                  Business cards, yard signs, brochures, and branded merchandise
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                  Tech Solutions
                </h3>
                <p className="text-sm text-gray-600 ml-8">
                  CRM systems, mobile apps, and productivity software recommendations
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    4
                  </Badge>
                  Exclusive Deals
                </h3>
                <p className="text-sm text-gray-600 ml-8">
                  Member-only discounts and special pricing on essential tools
                </p>
              </div>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                <Bell className="h-4 w-4" />
                <span>Get notified when Gear Hub launches</span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="h-4 w-4 mr-2" />
                Notify Me When Available
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Have suggestions for tools or gear you'd like to see?
            <a href="/support" className="text-blue-600 hover:text-blue-700 ml-1">
              Let us know!
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
