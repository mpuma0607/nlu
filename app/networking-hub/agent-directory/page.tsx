"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertCircle, CheckCircle } from "lucide-react"

export default function AgentDirectoryPage() {
  const [communityBoxLoaded, setCommunityBoxLoaded] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)

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

        // Create the bootstrap script as provided
        const script = document.createElement("script")
        script.id = "communitybox-script"
        script.async = true
        script.innerHTML = `
          ( function() {
            xhr = new XMLHttpRequest();
            xhr.open( "POST", "https://cfapi.communitybox.co/bootstrap/revision", true );
            xhr.onload = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                var returnObj = JSON.parse(xhr.responseText);
                if( returnObj.hasOwnProperty("err") ) {
                  console.error(returnObj.err);
                } else {
                  var r = returnObj.revision;
                  var l = document.createElement("script");
                  l.src = "https://dashboard.communitybox.co/embed/"+r+"/cbebloader-"+r+".js";
                  l.onload = function() {
                    console.log("CommunityBox loaded successfully");
                    setCommunityBoxLoaded(true);
                  };
                  l.onerror = function() {
                    console.error("Failed to load CommunityBox embed script");
                    setLoadingError("Failed to load community directory");
                  };
                  document.head.appendChild( l );
                };
              } else {
                console.error("Failed to bootstrap CommunityBox");
                setLoadingError("Failed to connect to community directory");
              }
            };
            xhr.onerror = function() {
              console.error("Network error loading CommunityBox");
              setLoadingError("Network error connecting to community directory");
            };
            xhr.send( "f8f0cb28-5e59-4cd2-91e5-29bc474bc78e" );
          })();
        `

        document.head.appendChild(script)
      } catch (error) {
        console.error("Error loading CommunityBox:", error)
        setLoadingError("Error initializing community directory")
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
            Connect with fellow real estate professionals in your network. Browse member profiles, send direct messages,
            and build meaningful connections.
          </p>

          {/* Status Display */}
          <div className="mt-6 space-y-2">
            {communityBoxLoaded && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="flex items-center justify-center text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Community directory loaded successfully
                </div>
              </div>
            )}

            {loadingError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="text-sm text-red-800">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  {loadingError}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CommunityBox Embed */}
        <div className="mb-8">
          <Card className="max-w-6xl mx-auto border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardTitle className="text-2xl">Member Directory</CardTitle>
              <CardDescription className="text-green-100">
                Browse and connect with other real estate professionals
                {communityBoxLoaded && <span className="ml-2">✅ Connected</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="min-h-[600px] w-full relative">
                {!communityBoxLoaded && !loadingError && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                    <span className="text-gray-600">Loading community directory...</span>
                  </div>
                )}

                {loadingError && (
                  <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                    <AlertCircle className="h-16 w-16 mb-4 text-red-500" />
                    <p className="text-lg font-medium text-red-600">Unable to load directory</p>
                    <p className="text-sm mt-2">Please refresh the page or try again later.</p>
                  </div>
                )}

                {/* CommunityBox Target Container */}
                <div
                  id="communitybox-target"
                  box="6bdb3884-cffe-43f5-bbca-d38f5aa62029"
                  className="w-full min-h-[600px]"
                  style={{ minHeight: "600px" }}
                >
                  {!communityBoxLoaded && !loadingError && (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                      <Users className="h-16 w-16 mb-4" />
                      <p>Community directory is loading...</p>
                      <p className="text-sm mt-2">Connecting you with other members...</p>
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
