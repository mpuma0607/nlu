"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface FormData {
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
  tonality: string
}

export async function generateContent(formData: FormData) {
  try {
    const topic = formData.primaryTopic || formData.alternateTopic

    if (!topic) {
      throw new Error("Please provide a topic for content generation")
    }

    const prompt = `You are a professional real estate content creator. Generate engaging ${formData.contentType.toLowerCase()} content about "${topic}" in ${formData.language}.

Content Requirements:
- Topic: ${topic}
- Content Type: ${formData.contentType}
- Tonality: ${formData.tonality}
- Language: ${formData.language}
- Target Audience: Real estate professionals and their clients

Additional Context:
${formData.alternateTopic ? `Additional details: ${formData.alternateTopic}` : ""}

Instructions:
1. Write in the specified tonality: ${formData.tonality}
2. Make it relevant for real estate professionals
3. Include actionable insights or tips when appropriate
4. Keep it engaging and professional
5. Optimize for the specified content type (${formData.contentType})
6. If it's a social media post, include relevant hashtags
7. If it's an email, include a compelling subject line
8. If it's a blog article, structure it with headers and sections

Generate high-quality, original content that provides value to the reader.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1000,
    })

    // Generate a simple branded image URL (placeholder for now)
    const imageUrl = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(topic)}`

    return {
      text,
      imageUrl,
    }
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content. Please try again.")
  }
}
