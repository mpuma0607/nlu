"use client"

import { useState } from "react"
import { CheckCircle, X } from "lucide-react"

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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">AI-Powered Real Estate Tools</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Automate Your Real Estate Business
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Supercharge your real estate workflow with our suite of AI-driven tools. From lead generation to closing,
            we've got you covered.
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
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-green-600 px-4 py-3 font-semibold text-white shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  {submitted ? "Submitting..." : "Join the Waitlist"}
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              By joining the waitlist, you agree to our{" "}
              <a href="#" className="font-semibold text-green-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-green-600">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
          <h3 className="text-lg font-semibold leading-7 text-gray-900">AI Hub</h3>
          <p className="mt-2 text-base leading-8 text-gray-600">
            Explore our suite of AI tools designed to streamline your real estate business.
          </p>

          {/* AI Tools List with Demo Links */}
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                IdeaHub AI
              </div>
              <button onClick={() => setShowVideoModal(true)} className="text-[#b6a888] hover:text-[#a39577] text-xs">
                Watch Demo
              </button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                ListIT AI
              </div>
              <button onClick={() => setShowVideoModal(true)} className="text-[#b6a888] hover:text-[#a39577] text-xs">
                Watch Demo
              </button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                ScriptIT AI
              </div>
              <button onClick={() => setShowVideoModal(true)} className="text-[#b6a888] hover:text-[#a39577] text-xs">
                Watch Demo
              </button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                RealBio AI
              </div>
              <button onClick={() => setShowVideoModal(true)} className="text-[#b6a888] hover:text-[#a39577] text-xs">
                Watch Demo
              </button>
            </li>
          </ul>
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
