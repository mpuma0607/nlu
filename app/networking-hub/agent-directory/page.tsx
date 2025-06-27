"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function AgentDirectoryPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("=== AGENT DIRECTORY PAGE LOADED ===")

    // Load CommunityBox script
    const loadCommunityBox = () => {
      try {
        // Remove existing script if any
        const existingScript = document.getElementById("communitybox-script")
        if (existingScript) {
          existingScript.remove()
        }

        // Create XMLHttpRequest to get the revision
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "https://cfapi.communitybox.co/bootstrap/revision", true)

        xhr.onload = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            try {
              const returnObj = JSON.parse(xhr.responseText)
              if (returnObj.hasOwnProperty("err")) {
                console.error("CommunityBox error:", returnObj.err)
                setError(returnObj.err)
                setIsLoading(false)
              } else {
                const r = returnObj.revision
                const script = document.createElement("script")
                script.id = "communitybox-script"
                script.src = `https://dashboard.communitybox.co/embed/${r}/cbebloader-${r}.js`

                script.onload = () => {
                  console.log("CommunityBox script loaded successfully")
                  setIsLoaded(true)
                  setIsLoading(false)
                  setError(null)
                }

                script.onerror = () => {
                  console.error("Failed to load CommunityBox script")
                  setError("Failed to load community directory")
                  setIsLoading(false)
                }

                document.head.appendChild(script)
              }
            } catch (parseError) {
              console.error("Error parsing CommunityBox response:", parseError)
              setError("Failed to parse community response")
              setIsLoading(false)
            }
          } else {
            console.error("CommunityBox request failed:", xhr.status, xhr.statusText)
            setError(`Request failed: ${xhr.status} ${xhr.statusText}`)
            setIsLoading(false)
          }
        }

        xhr.onerror = () => {
          console.error("CommunityBox request error")
          setError("Network error loading community")
          setIsLoading(false)
        }

        xhr.send("f8f0cb28-5e59-4cd2-91e5-29bc474bc78e")
      } catch (error) {
        console.error("Error loading CommunityBox:", error)
        setError(error instanceof Error ? error.message : "Unknown error")
        setIsLoading(false)
      }
    }

    loadCommunityBox()

    // Cleanup function
    return () => {
      const script = document.getElementById("communitybox-script")
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Agent Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow real estate professionals in your network. Find agents, share experiences, and build
            meaningful relationships.
          </p>

          {/* Status Display */}
          <div className="mt-6 space-y-2">
            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="flex items-center justify-center text-sm text-blue-800">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading agent directory...
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="text-sm text-red-800">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Error: {error}
                </div>
              </div>
            )}

            {isLoaded && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="flex items-center justify-center text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Agent directory loaded successfully
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-black">Find Agents</CardTitle>
              <CardDescription>Browse and search through our network of real estate professionals</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-green-500 mx-auto mb-4"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <CardTitle className="text-black">Direct Messaging</CardTitle>
              <CardDescription>Connect and communicate directly with other agents in the network</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-purple-500 mx-auto mb-4"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6" />
                <path d="m21 12-6 0m-6 0-6 0" />
              </svg>
              <CardTitle className="text-black">Network Building</CardTitle>
              <CardDescription>
                Build your professional network and discover collaboration opportunities
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CommunityBox Embed */}
        <div className="mb-8">
          <Card className="max-w-6xl mx-auto border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardTitle className="text-2xl">Agent Directory</CardTitle>
              <CardDescription className="text-green-100">
                Browse and connect with agents in your network
                {isLoaded && <span className="ml-2">✅ Connected</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="min-h-[600px] w-full relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-10">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                    <span className="text-gray-600">Loading agent directory...</span>
                  </div>
                )}

                {error && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-10">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                    <span className="text-gray-600 mb-2">Failed to load agent directory</span>
                    <span className="text-sm text-gray-500">{error}</span>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* CommunityBox Container */}
                <div className="w-full min-h-[600px] p-6">
                  <div id="communitybox-target" box="6bdb3884-cffe-43f5-bbca-d38f5aa62029"></div>

                  {!isLoaded && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                      <Users className="h-16 w-16 mb-4" />
                      <p>Agent directory is loading...</p>
                      <p className="text-sm mt-2">If this takes too long, please refresh the page.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
