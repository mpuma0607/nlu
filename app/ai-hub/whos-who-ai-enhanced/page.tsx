import { Suspense } from "react"
import { EnhancedWhosWhoForm } from "./enhanced-form"

export default function EnhancedWhosWhoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Enhanced Who's Who AI</h1>
          <p className="text-lg text-gray-600 mb-2">Advanced Property + People Search with Auto-Contact Retrieval</p>
          <p className="text-sm text-gray-500">
            Combines Zillow property data with automatic contact information lookup
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <EnhancedWhosWhoForm />
        </Suspense>
      </div>
    </div>
  )
}
