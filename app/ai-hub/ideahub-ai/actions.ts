"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface FormData {
  contentType: string
  tonality: string
  language: string
  topic: string
  targetAudience: string
  keyPoints: string
  callToAction: string
  additionalContext: string
}

export async function generateContent(formData: FormData) {
  try {
    const { contentType, tonality, language, topic, targetAudience, keyPoints, callToAction, additionalContext } =
      formData

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

Target Audience: ${targetAudience}

${keyPoints ? `Key Points to Include:\n${keyPoints}` : ""}

${callToAction ? `Call to Action: ${callToAction}` : ""}

${additionalContext ? `Additional Context: ${additionalContext}` : ""}

Requirements:
- Make it specific to real estate professionals
- Include actionable insights or tips
- Use industry-appropriate language
- Make it engaging and valuable for the target audience
- Ensure the content matches the specified tonality throughout
- Write in ${language}

Generate high-quality, professional content that real estate agents can use immediately.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1500,
    })

    return {
      success: true,
      content: text,
    }
  } catch (error) {
    console.error("Error generating IdeaHub content:", error)
    return {
      success: false,
      error: "Failed to generate content",
    }
  }
}
