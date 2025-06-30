"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface IdeaHubFormData {
  topic: string
  contentType: string
  tonality: string
  additionalInfo: string
}

export async function generateIdeaHubContent(formData: IdeaHubFormData) {
  try {
    const { topic, contentType, tonality, additionalInfo } = formData

    // Map tonality values to descriptive text for the prompt
    const tonalityMap: Record<string, string> = {
      "professional-authoritative": "professional and authoritative tone - confident, knowledgeable, clear",
      "friendly-approachable": "friendly and approachable tone - warm, conversational, down-to-earth",
      "witty-playful": "witty and playful tone - lighthearted, tongue-in-cheek, surprising twists",
      "inspirational-motivational": "inspirational and motivational tone - uplifting, aspirational, empowering",
      "educational-informative": "educational and informative tone - clear, explanatory, step-by-step",
      "conversational-story-driven":
        "conversational and story-driven tone - narrative, personal anecdotes, dialogue style",
      "urgent-action-oriented": "urgent and action-oriented tone - direct, brisk, focused on 'now'",
      "empathetic-supportive": "empathetic and supportive tone - compassionate, understanding, reassuring",
      "visionary-futuristic": "visionary and futuristic tone - forward-looking, trend-spotting, big-picture",
      "bold-disruptive": "bold and disruptive tone - challenging conventions, strong opinions, confident declarations",
    }

    const selectedTonality = tonalityMap[tonality] || "professional and engaging tone"

    const prompt = `You are an expert real estate content creator. Generate engaging ${contentType} content about "${topic}" using a ${selectedTonality}.

${additionalInfo ? `Additional context: ${additionalInfo}` : ""}

Requirements:
- Make it specific to real estate professionals
- Include actionable insights or tips
- Use industry-appropriate language
- Make it engaging and valuable for the target audience
- Ensure the content matches the specified tonality throughout
- If it's social media content, include relevant hashtags
- If it's a blog article, include a compelling headline and structure
- If it's an email newsletter, include a subject line suggestion

Generate high-quality, professional content that real estate agents can use immediately.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1500,
    })

    return text
  } catch (error) {
    console.error("Error generating IdeaHub content:", error)
    throw new Error("Failed to generate content")
  }
}
