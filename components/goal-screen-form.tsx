"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"

const GoalScreenForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [email, setEmail] = useState("")
  const toast = useToast()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [generatedText, setGeneratedText] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setGeneratedText("This is your generated goal screen text. You can copy it or send it to your email.")
      toast({
        title: "Goal Screen Text Generated!",
        description: "We've generated your goal screen text.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate goal screen text.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sendEmail = async () => {
    setIsEmailLoading(true)
    try {
      // Simulate sending an email
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Email Sent!",
        description: "Goal screen text has been sent to your email.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email.",
        variant: "destructive",
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (textAreaRef.current) {
      textAreaRef.current.select()
      document.execCommand("copy")
      toast({
        title: "Copied to Clipboard!",
        description: "Goal screen text has been copied to your clipboard.",
        variant: "success",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-500"
        >
          {isLoading ? "Generating..." : "Generate Goal Screen Text"}
        </button>
      </div>

      {generatedText && (
        <div className="space-y-2">
          <textarea ref={textAreaRef} value={generatedText} readOnly className="w-full h-32 p-2 border rounded" />
          <button onClick={copyToClipboard} className="bg-green-500 text-white py-1 px-3 rounded">
            Copy to Clipboard
          </button>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button
              onClick={sendEmail}
              disabled={isEmailLoading || !email}
              className="bg-purple-500 text-white py-1 px-3 rounded disabled:bg-gray-500"
            >
              {isEmailLoading ? "Sending..." : "Send to Email"}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default GoalScreenForm
