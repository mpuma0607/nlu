export default function Loading() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Loading Agent Directory...</h1>
          <p className="text-xl text-gray-600">Please wait while we load the agent directory.</p>
        </div>
      </div>
    </div>
  )
}
