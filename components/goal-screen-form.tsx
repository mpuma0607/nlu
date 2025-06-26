"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useToast } from "@chakra-ui/react"
import { useTracking } from "@/lib/hooks/use-tracking"

const GoalScreenForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [email, setEmail] = useState("")
  const toast = useToast()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [generatedText, setGeneratedText] = useState<string>("")

  const { trackToolUsage, trackContentInteraction } = useTracking()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await trackToolUsage("goalscreen-ai", "generate-wallpaper")

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setGeneratedText("This is your generated goal screen text. You can copy it or send it to your email.")
      toast({
        title: "Goal Screen Text Generated!",
        description: "We've generated your goal screen text.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate goal screen text.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sendEmail = async () => {
    setIsEmailLoading(true)
    await trackContentInteraction("goalscreen-ai", "email-send")
    try {
      // Simulate sending an email
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Email Sent!",
        description: "Goal screen text has been sent to your email.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await trackContentInteraction("goalscreen-ai", "copy-content")
    if (textAreaRef.current) {
      textAreaRef.current.select()
      document.execCommand("copy")
      toast({
        title: "Copied to Clipboard!",
        description: "Goal screen text has been copied to your clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" isLoading={isLoading} disabled={isLoading}>
          Generate Goal Screen Text
        </button>
      </div>

      {generatedText && (
        <div>
          <textarea ref={textAreaRef} value={generatedText} readOnly />
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
          <div>
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={sendEmail} isLoading={isEmailLoading} disabled={isEmailLoading || !email}>
              Send to Email
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default GoalScreenForm
