"use client"

import { useEffect, useState } from "react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Calendar,
  FileText,
  MessageSquare,
  Home,
  Calculator,
  Target,
  Briefcase,
  Lightbulb,
  ImageIcon,
  User,
} from "lucide-react"

interface UserCreation {
  id: number
  tool_type: string
  title: string
  content: string
  form_data: any
  metadata: any
  created_at: string
  expires_at: string
}

const toolIcons = {
  "listit-ai": Home,
  realbio: User,
  "scriptit-ai": MessageSquare,
  "quickcma-ai": Calculator,
  "action-ai": Target,
  "bizplan-ai": Briefcase,
  "ideahub-ai": Lightbulb,
  "goalscreen-ai": ImageIcon,
  "realcoach-ai": User,
}

const toolNames = {
  "listit-ai": "ListIT AI",
  realbio: "RealBio",
  "scriptit-ai": "ScriptIT AI",
  "quickcma-ai": "QuickCMA AI",
  "action-ai": "Action AI",
  "bizplan-ai": "BizPlan AI",
  "ideahub-ai": "IdeaHub AI",
  "goalscreen-ai": "GoalScreen AI",
  "realcoach-ai": "RealCoach AI",
}

export default function ProfilePage() {
  const { user, isLoading } = useMemberSpaceUser()
  const [creations, setCreations] = useState<UserCreation[]>([])
  const [loadingCreations, setLoadingCreations] = useState(false)

  useEffect(() => {
    // Override MemberSpace widget styles after it loads
    const overrideMemberSpaceStyles = () => {
      const style = document.createElement("style")
      style.textContent = `
        /* Override MemberSpace widget container */
        [data-memberspace-widget],
        .memberspace-widget,
        .ms-widget-container,
        .ms-modal,
        .ms-popup,
        iframe[src*="memberspace"] {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          max-height: none !important;
          min-height: 100% !important;
        }
        
        /* Override any modal or popup constraints */
        .ms-modal-content,
        .ms-popup-content,
        .memberspace-modal,
        .memberspace-popup {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Override iframe constraints */
        .ms-widget-iframe,
        iframe[data-memberspace] {
          width: 100% !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          border: none !important;
        }
        
        /* Hide any close buttons or resize handles */
        .ms-close-btn,
        .ms-resize-handle {
          display: none !important;
        }
        
        /* Ensure scrolling works within the widget */
        .ms-content,
        .memberspace-content {
          overflow: auto !important;
          height: 100% !important;
        }
      `
      document.head.appendChild(style)
    }

    // Apply styles immediately and after a delay for dynamic content
    overrideMemberSpaceStyles()
    setTimeout(overrideMemberSpaceStyles, 1000)
    setTimeout(overrideMemberSpaceStyles, 3000)

    // Watch for DOM changes and reapply styles
    const observer = new MutationObserver(() => {
      overrideMemberSpaceStyles()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  // Fetch user creations when user is loaded
  useEffect(() => {
    if (user?.id) {
      fetchUserCreations()
    }
  }, [user])

  const fetchUserCreations = async () => {
    if (!user?.id) return

    setLoadingCreations(true)
    try {
      const response = await fetch(`/api/user-creations?userId=${user.id}`)
      const data = await response.json()

      if (data.success) {
        setCreations(data.creations)
      }
    } catch (error) {
      console.error("Error fetching user creations:", error)
    } finally {
      setLoadingCreations(false)
    }
  }

  const downloadCreation = async (creation: UserCreation) => {
    try {
      // Handle different content types
      if (creation.tool_type === "ideahub-ai") {
        // For IdeaHub, download both image and text
        if (creation.metadata?.imageUrl) {
          // Download image
          const link = document.createElement("a")
          link.href = creation.metadata.imageUrl
          link.download = `${creation.title.replace(/\s+/g, "_")}_image.jpg`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }

        // Download text content
        const blob = new Blob([creation.content], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${creation.title.replace(/\s+/g, "_")}_content.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else if (creation.tool_type === "goalscreen-ai") {
        // For GoalScreen, download just the image
        if (creation.metadata?.imageUrl) {
          const link = document.createElement("a")
          link.href = creation.metadata.imageUrl
          link.download = `${creation.title.replace(/\s+/g, "_")}_wallpaper.jpg`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      } else {
        // For other tools, generate PDF
        const response = await fetch("/api/generate-creation-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creation: creation,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate PDF")
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${creation.title.replace(/\s+/g, "_")}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Error downloading creation:", error)
      alert("Failed to download. Please try again.")
    }
  }

  // Group creations by tool type
  const creationsByTool = creations.reduce(
    (acc, creation) => {
      if (!acc[creation.tool_type]) {
        acc[creation.tool_type] = []
      }
      acc[creation.tool_type].push(creation)
      return acc
    },
    {} as Record<string, UserCreation[]>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Column - MemberSpace Widget */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-gradient-to-r from-[#b6a888] to-[#a39577] text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold">Member Profile</h2>
            </div>
            <div className="p-4">
              <div
                className="w-full h-[600px] overflow-hidden"
                dangerouslySetInnerHTML={{ __html: '[ms-widget-embed path="/member/sign_in"]' }}
              />
            </div>
          </div>

          {/* Right Column - Creations Dashboard */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Creations Dashboard
              </h2>
              {user && <p className="text-blue-100 text-sm mt-1">Welcome back, {user.firstName || user.name}!</p>}
            </div>

            <div className="p-4">
              {isLoading || loadingCreations ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : creations.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No saved creations yet.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Use the "Save to Dashboard" button in any AI tool to save your creations here.
                  </p>
                </div>
              ) : (
                <Tabs defaultValue={Object.keys(creationsByTool)[0]} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 gap-1">
                    {Object.keys(creationsByTool).map((toolType) => {
                      const Icon = toolIcons[toolType as keyof typeof toolIcons] || FileText
                      return (
                        <TabsTrigger key={toolType} value={toolType} className="flex items-center gap-1 text-xs">
                          <Icon className="h-3 w-3" />
                          <span className="hidden sm:inline">
                            {toolNames[toolType as keyof typeof toolNames] || toolType}
                          </span>
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>

                  {Object.entries(creationsByTool).map(([toolType, toolCreations]) => (
                    <TabsContent key={toolType} value={toolType} className="mt-4">
                      <div className="space-y-4 max-h-[500px] overflow-y-auto">
                        {toolCreations.map((creation) => (
                          <Card key={creation.id} className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-lg">{creation.title}</CardTitle>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {toolNames[toolType as keyof typeof toolNames] || toolType}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Calendar className="h-3 w-3" />
                                      {new Date(creation.created_at).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadCreation(creation)}
                                  className="flex items-center gap-1"
                                >
                                  <Download className="h-3 w-3" />
                                  Download
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm text-gray-600 line-clamp-3">
                                {creation.content.substring(0, 200)}...
                              </div>
                              <div className="mt-2 text-xs text-gray-400">
                                Expires: {new Date(creation.expires_at).toLocaleDateString()}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="space-y-6 p-4">
          {/* MemberSpace Widget */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-gradient-to-r from-[#b6a888] to-[#a39577] text-white p-3 rounded-t-lg">
              <h2 className="text-lg font-bold">Member Profile</h2>
            </div>
            <div className="p-3">
              <div
                className="w-full h-[400px] overflow-hidden"
                dangerouslySetInnerHTML={{ __html: '[ms-widget-embed path="/member/sign_in"]' }}
              />
            </div>
          </div>

          {/* Creations Dashboard */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-t-lg">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Your Creations
              </h2>
              {user && <p className="text-blue-100 text-xs mt-1">Welcome, {user.firstName || user.name}!</p>}
            </div>

            <div className="p-3">
              {isLoading || loadingCreations ? (
                <div className="flex items-center justify-center py-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : creations.length === 0 ? (
                <div className="text-center py-6">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">No saved creations yet.</p>
                  <p className="text-xs text-gray-500 mt-1">Use "Save to Dashboard" in any AI tool.</p>
                </div>
              ) : (
                <Tabs defaultValue={Object.keys(creationsByTool)[0]} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 gap-1">
                    {Object.keys(creationsByTool)
                      .slice(0, 4)
                      .map((toolType) => {
                        const Icon = toolIcons[toolType as keyof typeof toolIcons] || FileText
                        return (
                          <TabsTrigger key={toolType} value={toolType} className="flex items-center gap-1 text-xs">
                            <Icon className="h-3 w-3" />
                            <span className="truncate">
                              {toolNames[toolType as keyof typeof toolNames] || toolType}
                            </span>
                          </TabsTrigger>
                        )
                      })}
                  </TabsList>

                  {Object.entries(creationsByTool).map(([toolType, toolCreations]) => (
                    <TabsContent key={toolType} value={toolType} className="mt-3">
                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {toolCreations.map((creation) => (
                          <Card key={creation.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm line-clamp-1">{creation.title}</h4>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadCreation(creation)}
                                  className="ml-2 flex-shrink-0"
                                >
                                  <Download className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-xs text-gray-600 line-clamp-2 mb-2">
                                {creation.content.substring(0, 100)}...
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{new Date(creation.created_at).toLocaleDateString()}</span>
                                <span>Expires: {new Date(creation.expires_at).toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
