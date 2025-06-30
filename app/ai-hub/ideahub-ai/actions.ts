"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface IdeaHubFormData {
  businessName: string
  businessType: string
  targetAudience: string
  contentType: string
  tonality: string
  specificTopic: string
  keyPoints: string
  callToAction: string
}

export async function generateIdeaHubContent(formData: IdeaHubFormData): Promise<string> {
  const { businessName, businessType, targetAudience, contentType, tonality, specificTopic, keyPoints, callToAction } =
    formData

  // Map tonality values to descriptive text
  const tonalityMap: Record<string, string> = {
    "professional-authoritative": "Professional & Authoritative (Confident, knowledgeable, clear)",
    "friendly-approachable": "Friendly & Approachable (Warm, conversational, down-to-earth)",
    "witty-playful": "Witty & Playful (Lighthearted, tongue-in-cheek, surprising twists)",
    "inspirational-motivational": "Inspirational & Motivational (Uplifting, aspirational, empowering)",
    "educational-informative": "Educational & Informative (Clear, explanatory, step-by-step)",
    "conversational-story-driven": "Conversational & Story-Driven (Narrative, personal anecdotes, dialogue style)",
    "urgent-action-oriented": 'Urgent & Action-Oriented (Direct, brisk, focused on "now")',
    "empathetic-supportive": "Empathetic & Supportive (Compassionate, understanding, reassuring)",
    "visionary-futuristic": "Visionary & Futuristic (Forward-looking, trend-spotting, big-picture)",
    "bold-disruptive": "Bold & Disruptive (Challenging conventions, strong opinions, confident declarations)",
  }

  const selectedTonality = tonalityMap[tonality] || tonalityMap["professional-authoritative"]

  const prompt = `You are an expert real estate content creator and marketing specialist. Generate engaging, high-quality content for a real estate professional.

Business Details:
- Business Name: ${businessName}
- Business Type: ${businessType || "Real estate services"}
- Target Audience: ${targetAudience || "General real estate clients"}
- Content Type: ${contentType}
- Tonality: ${selectedTonality}
- Specific Topic: ${specificTopic || "General real estate content"}
- Key Points to Include: ${keyPoints || "None specified"}
- Call to Action: ${callToAction || "Contact for more information"}

Requirements:
1. Create content that matches the specified tonality exactly
2. Make it relevant to the target audience
3. Include the key points naturally if provided
4. End with the specified call to action
5. Make it engaging and professional
6. Ensure it's appropriate for the content type specified
7. Keep it concise but impactful
8. Use real estate industry best practices
9. Make it ready to use without further editing

Generate the content now:`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    return text
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content")
  }
}
