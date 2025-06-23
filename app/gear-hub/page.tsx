"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { submitNotificationRequest } from "../services-hub/brokerage-consulting/actions"

export default function GearHubPage() {
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.append("service", "Gear Hub")

    const result = await submitNotificationRequest(formData)
    setMessage(result.message)
    setIsSubmitting(false)

    if (result.success) {
      setTimeout(() => {
        setShowModal(false)
        setMessage("")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Gear Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exclusive merchandise and tools designed for Next Level U agents. Show your pride and elevate your
            professional image.
          </p>
        </div>

        {/* Coming Soon Section */}
        <Card className="max-w-2xl mx-auto border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Clock className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-4">Coming Soon!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              We're working hard to bring you an amazing collection of Next Level U merchandise and professional tools.
            </p>

            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h3 className="font-semibold text-black mb-6">What to Expect:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Branded apparel and accessories</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Professional business tools</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Marketing materials and signage</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Tech accessories and gadgets</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowModal(true)}
              className="bg-black hover:bg-green-600 text-white px-8 py-6 rounded-xl text-lg font-medium transition-colors"
            >
              Notify Me When Available
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-black">Get Notified</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)} className="p-1">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-gray-600 mb-6">
                Enter your details and we'll notify you when Gear Hub merchandise becomes available.
              </p>

              <form action={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" type="text" required className="mt-1" placeholder="Your full name" />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required className="mt-1" placeholder="your@email.com" />
                </div>

                {message && (
                  <div className={`text-sm ${message.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                >
                  {isSubmitting ? "Submitting..." : "Notify Me"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
