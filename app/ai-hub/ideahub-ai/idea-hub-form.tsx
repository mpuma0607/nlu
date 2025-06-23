"use client"

import type React from "react"

import { useState } from "react"
import { generateContent } from "./actions"

export default function IdeaHubForm() {
  const [idea, setIdea] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await generateContent(idea)
      setGeneratedContent(result)
    } catch (error) {
      console.error("Error generating content:", error)
      setGeneratedContent("An error occurred while generating content.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="idea">Enter your idea:</label>
        <input
          type="text"
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., A social media app for pet owners"
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Content"}
      </button>

      {generatedContent && (
        <div>
          <h3>Generated Content:</h3>
          <p>{generatedContent}</p>
        </div>
      )}
    </form>
  )
}
