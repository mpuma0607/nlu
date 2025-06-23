"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building2, Download, Palette } from "lucide-react"

const logoCategories = [
  {
    id: "c21-beggins",
    title: "Century 21 Beggins Logos",
    description: "Official Century 21 Beggins branded logos and assets",
    color: "bg-black",
    driveUrl: "https://drive.google.com/embeddedfolderview?id=1example-beggins-logos#grid",
  },
  {
    id: "c21-be3",
    title: "Century 21 BE3 Logos",
    description: "Century 21 BE3 branded logos and marketing materials",
    color: "bg-blue-600",
    driveUrl: "https://drive.google.com/embeddedfolderview?id=1example-be3-logos#grid",
  },
  {
    id: "c21-list-with-beggins",
    title: "Century 21 List With Beggins Logos",
    description: "List With Beggins campaign logos and branding assets",
    color: "bg-green-600",
    driveUrl: "https://drive.google.com/embeddedfolderview?id=1example-list-with-beggins#grid",
  },
  {
    id: "c21-general",
    title: "Century 21 Logos",
    description: "General Century 21 corporate logos and brand assets",
    color: "bg-yellow-600",
    driveUrl: "https://drive.google.com/embeddedfolderview?id=1example-c21-general#grid",
  },
]

export default function BrokerageLogosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Brokerage Logos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access official Century 21 Beggins logos, branding assets, and marketing materials for your business needs.
          </p>
        </div>

        {/* Logo Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {logoCategories.map((category) => (
            <Dialog key={category.id}>
              <DialogTrigger asChild>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 cursor-pointer group">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Palette className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{category.description}</p>
                      <div className="flex items-center justify-center text-blue-600 font-medium">
                        <span>View Logos</span>
                        <Download className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-black flex items-center gap-3">
                    <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                      <Palette className="h-4 w-4 text-white" />
                    </div>
                    {category.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">{category.description}</DialogDescription>
                </DialogHeader>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src={category.driveUrl}
                    style={{ width: "100%", height: "600px", border: 0 }}
                    title={`${category.title} Library`}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Usage Guidelines */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-black">Logo Usage Guidelines</CardTitle>
              <CardDescription>Important information about using Century 21 Beggins logos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-black mb-2">✅ Approved Uses:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Marketing materials and advertisements</li>
                    <li>• Business cards and letterhead</li>
                    <li>• Social media profiles and posts</li>
                    <li>• Property signage and flyers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">❌ Prohibited Uses:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Modifying or altering logo colors</li>
                    <li>• Stretching or distorting the logo</li>
                    <li>• Using low-resolution versions</li>
                    <li>• Combining with competitor branding</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  For questions about logo usage or to request custom branding materials, contact the marketing
                  department.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
