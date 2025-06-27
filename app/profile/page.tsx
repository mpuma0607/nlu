"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, AlertCircle, CheckCircle } from "lucide-react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"

export default function ProfilePage() {
  const { user, isLoading, error } = useMemberSpaceUser()
  const [memberSpaceLoaded, setMemberSpaceLoaded] = useState(false)

  useEffect(() => {
    console.log("=== PROFILE PAGE LOADED ===")

    // Load MemberSpace profile embed
    const loadMemberSpaceProfile = () => {
      try {
        // Remove existing script if any
        const existingScript = document.getElementById("memberspace-profile-script")
        if (existingScript) {
          existingScript.remove()
        }

        // Create and load MemberSpace profile script
        const script = document.createElement("script")
        script.id = "memberspace-profile-script"
        script.src = "https://api.memberspace.com/auth/profile.js"
        script.async = true

        script.onload = () => {
          console.log("MemberSpace profile script loaded successfully")
          setMemberSpaceLoaded(true)
        }

        script.onerror = () => {
          console.error("Failed to load MemberSpace profile script")
          setMemberSpaceLoaded(false)
        }

        document.head.appendChild(script)
      } catch (error) {
        console.error("Error loading MemberSpace profile:", error)
        setMemberSpaceLoaded(false)
      }
    }

    loadMemberSpaceProfile()

    // Cleanup function
    return () => {
      const script = document.getElementById("memberspace-profile-script")
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
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Profile</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your member profile, update your information, and customize your account settings.
          </p>

          {/* Status Display */}
          <div className="mt-6 space-y-2">
            {user && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-md mx-auto">
                <p className="text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  Welcome, {user.name || user.email || user.firstName || "Member"}!
                </p>
                {user.brokerage && <p className="text-xs text-green-600">{user.brokerage}</p>}
                {user.market && <p className="text-xs text-green-600">{user.market}</p>}
              </div>
            )}

            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="flex items-center justify-center text-sm text-blue-800">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Loading profile...
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="text-sm text-red-800">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Profile loading error: {error}
                </div>
              </div>
            )}

            {memberSpaceLoaded && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-md mx-auto">
                <div className="flex items-center justify-center text-sm text-green-800">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Profile system loaded successfully
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MemberSpace Profile Embed */}
        <div className="mb-8">
          <Card className="max-w-6xl mx-auto border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl">Member Profile</CardTitle>
              <CardDescription className="text-blue-100">
                Update your profile information and account settings
                {memberSpaceLoaded && <span className="ml-2">✅ Connected</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="min-h-[600px] w-full relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <span className="text-gray-600">Loading profile system...</span>
                  </div>
                )}

                {/* MemberSpace Profile Container */}
                <div id="memberspace-profile-container" className="w-full min-h-[600px] p-6">
                  {!memberSpaceLoaded && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                      <User className="h-16 w-16 mb-4" />
                      <p>Profile system is loading...</p>
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
