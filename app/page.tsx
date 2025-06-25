"use client"

import { BoltIcon, DevicePhoneMobileIcon, GlobeAmericasIcon, ScaleIcon, BrainIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { X } from "lucide-react"

const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAmericasIcon,
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: BoltIcon,
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: DevicePhoneMobileIcon,
  },
]

const aiHubFeatures = [
  "AI-powered listing descriptions",
  "Custom script generation",
  "Professional bio creation",
  "Market analysis tools",
]

export default function Home() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitted(true)

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      console.log("Email submitted successfully!")
    } else {
      console.error("Failed to submit email.")
    }
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Automated Real Estate Solutions</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to automate your real estate business.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            From lead generation to closing, we've got you covered. Join the waitlist to be the first to experience the
            future of real estate.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 text-center">
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  {submitted ? "Submitting..." : "Join the Waitlist"}
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              By joining the waitlist, you agree to our{" "}
              <a href="#" className="font-semibold text-white">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-white">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="mx-auto max-w-md">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500">
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-8 text-white">{feature.name}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
            <div className="mx-auto max-w-md">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500">
                  <BrainIcon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-8 text-white">AI Hub</h3>
                {/* AI Tools List with Demo Links */}
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li className="flex items-center justify-between">
                    IdeaHub AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    ListIT AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    ScriptIT AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    RealBio AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    RolePlay AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    Action AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    RealCoach AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    BizPlan AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    RealDeal AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    QuickCMA AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                  <li className="flex items-center justify-between">
                    Who's Who AI
                    <button
                      onClick={() => setShowVideoModal(true)}
                      className="text-[#b6a888] hover:text-[#a39577] text-xs"
                    >
                      Watch Demo
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Demo Video Modal */}
        {selectedDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {selectedDemo
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                  Demo
                </h3>
                <button onClick={() => setSelectedDemo(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Demo video will be loaded here for {selectedDemo}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
