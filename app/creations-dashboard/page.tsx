"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Download,
  Copy,
  Trash2,
  Calendar,
  User,
  Building,
  MapPin,
  Loader2,
  AlertCircle,
  FolderOpen,
} from "lucide-react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { useToast } from "@/hooks/use-toast"

type Creation = {
  id: string
  tool_name: string
  content: any
  created_at: string
  user_email: string
  user_name: string
}

export default function CreationsDashboardPage() {
  const { user, isLoading: userLoading } = useMemberSpaceUser()
  const { toast } = useToast()
  const [creations, setCreations] = useState<Creation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user creations
  useEffect(() => {
    const fetchCreations = async () => {
      if (!user?.email) return

      try {
        setIsLoading(true)
        const response = await fetch(`/api/user-creations?email=${encodeURIComponent(user.email)}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch creations: ${response.statusText}`)
        }

        const data = await response.json()
        setCreations(data.creations || [])
        setError(null)
      } catch (error) {
        console.error("Error fetching creations:", error)
        setError(error instanceof Error ? error.message : "Failed to load creations")
        setCreations([])
      } finally {
        setIsLoading(false)
      }
    }

    if (user?.email) {
      fetchCreations()
    }
  }, [user?.email])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy content to clipboard",
        variant: "destructive",
      })
    }
  }

  const downloadAsText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const deleteCreation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this creation?")) return

    try {
      const response = await fetch(`/api/user-creations?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete creation")
      }

      setCreations((prev) => prev.filter((creation) => creation.id !== id))
      toast({
        title: "Deleted",
        description: "Creation deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete creation",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderCreationContent = (creation: Creation) => {
    const content = creation.content

    switch (creation.tool_name) {
      case "ideahub-ai":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Content Type: {content.contentType || "Social Post"}</Badge>
              <Badge variant="outline">Language: {content.language || "English"}</Badge>
            </div>
            {content.topic && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Topic:</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{content.topic}</p>
              </div>
            )}
            {content.text && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generated Content:</h4>
                <Textarea value={content.text} readOnly className="min-h-[200px]" />
              </div>
            )}
          </div>
        )

      case "realbio":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.name && (
                <div>
                  <h4 className="font-medium text-gray-900">Name:</h4>
                  <p className="text-sm text-gray-600">{content.name}</p>
                </div>
              )}
              {content.brokerage && (
                <div>
                  <h4 className="font-medium text-gray-900">Brokerage:</h4>
                  <p className="text-sm text-gray-600">{content.brokerage}</p>
                </div>
              )}
              {content.experience && (
                <div>
                  <h4 className="font-medium text-gray-900">Experience:</h4>
                  <p className="text-sm text-gray-600">{content.experience}</p>
                </div>
              )}
              {content.specialties && (
                <div>
                  <h4 className="font-medium text-gray-900">Specialties:</h4>
                  <p className="text-sm text-gray-600">{content.specialties}</p>
                </div>
              )}
            </div>
            {content.bio && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generated Bio:</h4>
                <Textarea value={content.bio} readOnly className="min-h-[200px]" />
              </div>
            )}
          </div>
        )

      case "listit-ai":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.propertyType && (
                <div>
                  <h4 className="font-medium text-gray-900">Property Type:</h4>
                  <p className="text-sm text-gray-600">{content.propertyType}</p>
                </div>
              )}
              {content.bedrooms && (
                <div>
                  <h4 className="font-medium text-gray-900">Bedrooms:</h4>
                  <p className="text-sm text-gray-600">{content.bedrooms}</p>
                </div>
              )}
              {content.bathrooms && (
                <div>
                  <h4 className="font-medium text-gray-900">Bathrooms:</h4>
                  <p className="text-sm text-gray-600">{content.bathrooms}</p>
                </div>
              )}
              {content.squareFootage && (
                <div>
                  <h4 className="font-medium text-gray-900">Square Footage:</h4>
                  <p className="text-sm text-gray-600">{content.squareFootage}</p>
                </div>
              )}
            </div>
            {content.propertyDescription && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generated Description:</h4>
                <Textarea value={content.propertyDescription} readOnly className="min-h-[200px]" />
              </div>
            )}
          </div>
        )

      case "scriptit-ai":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Script Type: {content.scriptType || "Unknown"}</Badge>
              <Badge variant="outline">Tone: {content.tone || "Professional"}</Badge>
            </div>
            {content.situation && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Situation:</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{content.situation}</p>
              </div>
            )}
            {content.script && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generated Script:</h4>
                <Textarea value={content.script} readOnly className="min-h-[200px]" />
              </div>
            )}
          </div>
        )

      case "action-ai":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.currentSituation && (
                <div>
                  <h4 className="font-medium text-gray-900">Current Situation:</h4>
                  <p className="text-sm text-gray-600">{content.currentSituation}</p>
                </div>
              )}
              {content.timeAvailable && (
                <div>
                  <h4 className="font-medium text-gray-900">Time Available:</h4>
                  <p className="text-sm text-gray-600">{content.timeAvailable}</p>
                </div>
              )}
            </div>
            {content.actionPlan && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generated Action Plan:</h4>
                <Textarea value={content.actionPlan} readOnly className="min-h-[200px]" />
              </div>
            )}
          </div>
        )

      case "realcoach-ai":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.experience && (
                <div>
                  <h4 className="font-medium text-gray-900">Experience Level:</h4>
                  <p className="text-sm text-gray-600">{content.experience}</p>
                </div>
              )}
              {content.challenge && (
                <div>
                  <h4 className="font-medium text-gray-900">Challenge:</h4>
                  <p className="text-sm text-gray-600">{content.challenge}</p>
                </div>
              )}
            </div>
            {content.coaching && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Coaching Advice:</h4>
                <Textarea value={content.coaching} readOnly className="min-h-[200px]" />
              </div>
            )}
          </div>
        )

      case "bizplan-ai":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.experience && (
                <div>
                  <h4 className="font-medium text-gray-900">Experience:</h4>
                  <p className="text-sm text-gray-600">{content.experience}</p>
                </div>
              )}
              {content.goals && (
                <div>
                  <h4 className="font-medium text-gray-900">Goals:</h4>
                  <p className="text-sm text-gray-600">{content.goals}</p>
                </div>
              )}
            </div>
            {content.businessPlan && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">90-Day Business Plan:</h4>
                <Textarea value={content.businessPlan} readOnly className="min-h-[300px]" />
              </div>
            )}
          </div>
        )

      case "goalscreen-ai":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.dailyGoal && (
                <div>
                  <h4 className="font-medium text-gray-900">Daily Goal:</h4>
                  <p className="text-sm text-gray-600">{content.dailyGoal}</p>
                </div>
              )}
              {content.motivationalQuote && (
                <div>
                  <h4 className="font-medium text-gray-900">Quote:</h4>
                  <p className="text-sm text-gray-600">{content.motivationalQuote}</p>
                </div>
              )}
            </div>
            {content.wallpaperText && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Wallpaper Text:</h4>
                <Textarea value={content.wallpaperText} readOnly className="min-h-[150px]" />
              </div>
            )}
          </div>
        )

      case "quickcma-ai":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.address && (
                <div>
                  <h4 className="font-medium text-gray-900">Property Address:</h4>
                  <p className="text-sm text-gray-600">{content.address}</p>
                </div>
              )}
              {content.propertyType && (
                <div>
                  <h4 className="font-medium text-gray-900">Property Type:</h4>
                  <p className="text-sm text-gray-600">{content.propertyType}</p>
                </div>
              )}
            </div>
            {content.cmaReport && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">CMA Report:</h4>
                <Textarea value={content.cmaReport} readOnly className="min-h-[300px]" />
              </div>
            )}
          </div>
        )

      case "whos-who-ai":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {content.address && (
                <div>
                  <h4 className="font-medium text-gray-900">Property Address:</h4>
                  <p className="text-sm text-gray-600">{content.address}</p>
                </div>
              )}
              {content.propertyType && (
                <div>
                  <h4 className="font-medium text-gray-900">Property Type:</h4>
                  <p className="text-sm text-gray-600">{content.propertyType}</p>
                </div>
              )}
            </div>
            {content.ownerInfo && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Owner Information:</h4>
                <Textarea value={content.ownerInfo} readOnly className="min-h-[200px]" />
              </div>
            )}
          </div>
        )

      default:
        return (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Content:</h4>
            <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded overflow-auto">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        )
    }
  }

  const getMainContent = (creation: Creation): string => {
    const content = creation.content

    switch (creation.tool_name) {
      case "ideahub-ai":
        return content.text || ""
      case "realbio":
        return content.bio || ""
      case "listit-ai":
        return content.propertyDescription || ""
      case "scriptit-ai":
        return content.script || ""
      case "action-ai":
        return content.actionPlan || ""
      case "realcoach-ai":
        return content.coaching || ""
      case "bizplan-ai":
        return content.businessPlan || ""
      case "goalscreen-ai":
        return content.wallpaperText || ""
      case "quickcma-ai":
        return content.cmaReport || ""
      case "whos-who-ai":
        return content.ownerInfo || ""
      default:
        return JSON.stringify(content, null, 2)
    }
  }

  const getToolDisplayName = (toolName: string): string => {
    const toolNames: { [key: string]: string } = {
      "ideahub-ai": "IdeaHub AI",
      realbio: "RealBio",
      "listit-ai": "ListIT AI",
      "scriptit-ai": "ScriptIT AI",
      "action-ai": "Action AI",
      "realcoach-ai": "RealCoach AI",
      "bizplan-ai": "BizPlan AI",
      "goalscreen-ai": "GoalScreen AI",
      "quickcma-ai": "QuickCMA AI",
      "whos-who-ai": "Who's Who AI",
    }
    return toolNames[toolName] || toolName
  }

  // Group creations by tool
  const creationsByTool = creations.reduce(
    (acc, creation) => {
      const toolName = creation.tool_name
      if (!acc[toolName]) {
        acc[toolName] = []
      }
      acc[toolName].push(creation)
      return acc
    },
    {} as { [key: string]: Creation[] },
  )

  if (userLoading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-96">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-600">Please log in to view your creations.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FolderOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Creations Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            View, manage, and download all your AI-generated content in one place.
          </p>

          {/* User Info */}
          {user && (
            <div className="mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-4 text-sm text-blue-800">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {user.name || user.firstName || "Member"}
                  </div>
                  {user.brokerage && (
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {user.brokerage}
                    </div>
                  )}
                  {user.market && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.market}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Loading your creations...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-96">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-gray-600 mb-4">Error loading creations: {error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : creations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No creations found.</p>
              <p className="text-sm text-gray-500 mb-4">
                Start using our AI tools to create content and it will appear here.
              </p>
              <Button asChild>
                <a href="/ai-hub">Explore AI Tools</a>
              </Button>
            </div>
          ) : (
            <Tabs defaultValue={Object.keys(creationsByTool)[0]} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-8">
                {Object.keys(creationsByTool).map((toolName) => (
                  <TabsTrigger key={toolName} value={toolName} className="text-xs">
                    {getToolDisplayName(toolName)}
                    <Badge variant="secondary" className="ml-2">
                      {creationsByTool[toolName].length}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(creationsByTool).map(([toolName, toolCreations]) => (
                <TabsContent key={toolName} value={toolName} className="space-y-6">
                  <div className="grid gap-6">
                    {toolCreations.map((creation) => (
                      <Card key={creation.id} className="border-0 shadow-lg">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                {getToolDisplayName(creation.tool_name)}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(creation.created_at)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {creation.user_name || creation.user_email}
                                </span>
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(getMainContent(creation))}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  downloadAsText(getMainContent(creation), `${creation.tool_name}-${creation.id}.txt`)
                                }
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteCreation(creation.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>{renderCreationContent(creation)}</CardContent>
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
  )
}
