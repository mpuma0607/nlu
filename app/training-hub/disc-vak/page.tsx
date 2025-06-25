"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface VAKPageProps {
  module: { id: string } | null
  setExpandedImage: (imageUrl: string | null) => void
}

const VAKPage = ({ module, setExpandedImage }: VAKPageProps) => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold text-center mb-8">VAK Learning Styles</h1>

      {module && module.id === "vak" && (
        <div className="space-y-6">
          <div
            className="relative w-full cursor-pointer hover:opacity-90 transition-opacity rounded-lg overflow-hidden"
            onClick={() => setExpandedImage("/images/vak-learning-styles-chart.png")}
          >
            <Image
              src="/images/vak-learning-styles-chart.png"
              alt="VAK Learning Styles Overview - Getting to Know the VAK Senses"
              width={1200}
              height={800}
              className="w-full object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center">
              <span className="bg-white bg-opacity-75 px-3 py-1 rounded-full text-sm font-medium">Click to expand</span>
            </div>
          </div>

          <h3 className="text-xl font-bold">VAK Learning Styles</h3>
          <p className="text-gray-700">
            VAK represents the three primary sensory learning styles: Visual, Auditory, and Kinesthetic. Understanding
            these preferences helps you communicate more effectively.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-bold text-lg text-blue-600 mb-3">Visual Learners</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Process information through seeing</li>
                  <li>Prefer charts, diagrams, and pictures</li>
                  <li>Say phrases like "I see what you mean"</li>
                  <li>Notice visual details and appearances</li>
                  <li>May gesture toward their eyes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-bold text-lg text-green-600 mb-3">Auditory Learners</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Process information through hearing</li>
                  <li>Prefer discussions and verbal instructions</li>
                  <li>Say phrases like "That sounds right"</li>
                  <li>May tilt head when listening</li>
                  <li>Distracted by noise</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-bold text-lg text-red-600 mb-3">Kinesthetic Learners</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Process information through moving and doing</li>
                  <li>Prefer hands-on activities and demonstrations</li>
                  <li>Say phrases like "I can't grasp it"</li>
                  <li>Learn by trial and error</li>
                  <li>May fidget or move around</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default VAKPage
