import { Loader2 } from "lucide-react"

export default function AgentDirectoryLoading() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading agent directory...</p>
        </div>
      </div>
    </div>
  )
}
