"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimpleTestPage() {
  const [clicks, setClicks] = useState(0)
  const [message, setMessage] = useState("")

  const handleClick = async () => {
    setClicks((prev) => prev + 1)
    setMessage(`Button clicked ${clicks + 1} times!`)

    // Simulate tracking (this would normally go to your database)
    console.log("Tracking click:", {
      tool: "simple-test",
      action: "button-click",
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">🎯 Tracking System Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg mb-4">This demonstrates how the tracking system works in your portal</p>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-blue-700">
                  <strong>Clicks recorded:</strong> {clicks}
                </p>
                {message && <p className="text-sm text-green-700 mt-2">{message}</p>}
              </div>

              <Button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700" size="lg">
                Test Tracking System
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">How it works:</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Each click gets logged to your database</li>
                <li>• User info and timestamps are recorded</li>
                <li>• You can view analytics in the admin dashboard</li>
                <li>• All your AI tools now have this tracking built-in</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
