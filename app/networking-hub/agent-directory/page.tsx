"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertCircle, CheckCircle } from "lucide-react"

export default function AgentDirectoryPage() {
  const [directoryLoaded, setDirectoryLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("=== AGENT DIRECTORY PAGE LOADED ===")

    // Load CommunityBox script
    const loadCommunityBoxScript = () => {
      try {
        setIsLoading(true)

        // Remove existing scripts if any
        const existingScript = document.getElementById("communitybox-script")
        if (existingScript) {
          existingScript.remove()
        }

        // Create and execute the bootstrap script
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "https://cfapi.communitybox.co/bootstrap/revision", true)

        xhr.onload = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            try {
              const returnObj = JSON.parse(xhr.responseText)
              if (returnObj.hasOwnProperty("err")) {
                console.error("CommunityBox bootstrap error:", returnObj.err)
                setDirectoryLoaded(false)
                setIsLoading(false)
              } else {
                const r = returnObj.revision
                const script = document.createElement("script")
                script.id = "communitybox-script"
                script.src = `https://dashboard.communitybox.co/embed/${r}/cbebloader-${r}.js`

                script.onload = () => {
                  console.log("CommunityBox script loaded successfully")
                  setDirectoryLoaded(true)
                  setIsLoading(false)
                }

                script.onerror = () => {
                  console.error("Failed to load CommunityBox script")
                  setDirectoryLoaded(false)
                  setIsLoading(false)
                }

                document.head.appendChild(script)
              }
            } catch (parseError) {
              console.error("Error parsing CommunityBox response:", parseError)
              setDirectoryLoaded(false)
              setIsLoading(false)
            }
          } else {
            console.error("CommunityBox bootstrap request failed:", xhr.status, xhr.statusText)
            setDirectoryLoaded(false)
            setIsLoading(false)
          }
        }

        xhr.onerror = () => {
          console.error("CommunityBox bootstrap network error")
          setDirectoryLoaded(false)
          setIsLoading(false)
        }

        xhr.send("f8f0cb28-5e59-4cd2-91e5-29bc474bc78e")
      } catch (error) {
        console.error("Error loading CommunityBox:", error)
        setDirectoryLoaded(false)
        setIsLoading(false)
      }
    }

    loadCommunityBoxScript()

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
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Agent Directory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow real estate professionals, find potential partners, and build your network.
          </p>

          {/* Status Display */}
          <div className="mt-6 space-y-2">
            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="flex items-center justify-center text-sm text-blue-800">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Loading agent directory...
                </div>
              </div>
            )}

            {directoryLoaded && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="flex items-center justify-center text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Agent directory loaded successfully
                </div>
              </div>
            )}

            {!isLoading && !directoryLoaded && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="text-sm text-red-800">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Failed to load agent directory. Please refresh the page.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Agent Directory Embed */}
        <div className="mb-8">
          <Card className="max-w-6xl mx-auto border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardTitle className="text-2xl">Agent Directory</CardTitle>
              <CardDescription className="text-blue-100">
                Browse and connect with real estate professionals in your network
                {directoryLoaded && <span className="ml-2">✅ Connected</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="min-h-[800px] w-full relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <span className="text-gray-600">Loading agent directory...</span>
                  </div>
                )}

                {/* CommunityBox Directory Container */}
                <div
                  id="communitybox-target"
                  box="6bdb3884-cffe-43f5-bbca-d38f5aa62029"
                  className="w-full min-h-[800px]"
                >
                  {!directoryLoaded && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500 p-6">
                      <Users className="h-16 w-16 mb-4" />
                      <p className="text-lg mb-2">Agent directory is not available</p>
                      <p className="text-sm text-center">
                        The agent directory failed to load. Please refresh the page or contact support if the issue
                        persists.
                      </p>
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
