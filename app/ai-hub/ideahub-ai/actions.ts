"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface FormState {
  success?: boolean
  error?: string
  content?: string
  topic?: string
  contentType?: string
  tonality?: string
  targetAudience?: string
  keyPoints?: string
}

export async function generateIdeaHubContent(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const topic = formData.get("topic") as string
    const contentType = formData.get("contentType") as string
    const tonality = formData.get("tonality") as string
    const targetAudience = formData.get("targetAudience") as string
    const keyPoints = formData.get("keyPoints") as string

    if (!topic || !contentType || !tonality) {
      return {
        error: "Please fill in all required fields (topic, content type, and tonality).",
      }
    }

    // Map content type values to readable labels
    const contentTypeLabels: { [key: string]: string } = {
      "social-media-post": "Social Media Post",
      "blog-article": "Blog Article",
      "email-newsletter": "Email Newsletter",
      "video-script": "Video Script",
      "podcast-outline": "Podcast Outline",
      "infographic-content": "Infographic Content",
      "press-release": "Press Release",
      "case-study": "Case Study",
      "market-report": "Market Report",
      "buyer-guide": "Buyer Guide",
      "seller-tips": "Seller Tips",
      "investment-analysis": "Investment Analysis",
    }

    // Map tonality values to readable labels
    const tonalityLabels: { [key: string]: string } = {
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

    const contentTypeLabel = contentTypeLabels[contentType] || contentType
    const tonalityLabel = tonalityLabels[tonality] || tonality

    const prompt = `You are an expert real estate marketing content creator. Create engaging, high-quality content for real estate professionals.

Content Type: ${contentTypeLabel}
Topic: ${topic}
Tonality: ${tonalityLabel}
${targetAudience ? `Target Audience: ${targetAudience}` : ""}
${keyPoints ? `Key Points to Include: ${keyPoints}` : ""}

Please create compelling, professional content that:
1. Captures attention and engages the target audience
2. Uses the specified tonality throughout
3. Is appropriate for the content type and platform
4. Includes relevant real estate insights and value
5. Has a clear call-to-action when appropriate
6. Is optimized for the intended use case

Generate the content now:`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 2000,
    })

    return {
      success: true,
      content: text,
      topic,
      contentType,
      tonality,
      targetAudience,
      keyPoints,
    }
  } catch (error) {
    console.error("Error generating content:", error)
    return {
      error: "Failed to generate content. Please try again.",
    }
  }
}
