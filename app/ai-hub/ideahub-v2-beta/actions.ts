"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Initialize Pexels API
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || "demo-key"

type FormData = {
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
}

async function searchPexelsImage(query: string): Promise<string> {
  try {
    const searchQuery = encodeURIComponent(query)
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=15&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.photos && data.photos.length > 0) {
      // Get a random image from the results
      const randomIndex = Math.floor(Math.random() * data.photos.length)
      const selectedImage = data.photos[randomIndex]
      return selectedImage.src.large
    } else {
      // Fallback to a generic real estate search
      return await searchPexelsImage("house home property")
    }
  } catch (error) {
    console.error("Error fetching from Pexels:", error)
    // Return a placeholder if Pexels fails
    return "/placeholder.svg?height=400&width=600"
  }
}

async function addBrandingToImage(imageUrl: string): Promise<string> {
  // For now, just return the original Pexels image without processing
  return imageUrl
}

function extractKeywordsFromTopic(originalTopic: string): string {
  // Extract specific keywords from the TOPIC for better image search
  const topicLower = originalTopic.toLowerCase()

  // Pool/Spa specific - be very specific
  if (topicLower.includes("pool")) return "swimming pool"
  if (topicLower.includes("spa") || topicLower.includes("hot tub")) return "spa hot tub"
  if (topicLower.includes("jacuzzi")) return "jacuzzi"

  // Kitchen specific
  if (topicLower.includes("kitchen")) return "kitchen"

  // Bathroom specific
  if (topicLower.includes("bathroom")) return "bathroom"

  // Outdoor/Garden specific
  if (topicLower.includes("garden") || topicLower.includes("landscaping")) return "garden"
  if (topicLower.includes("patio") || topicLower.includes("deck")) return "patio"
  if (topicLower.includes("backyard")) return "backyard"

  // Home office
  if (topicLower.includes("office") || topicLower.includes("workspace")) return "home office"

  // Living spaces
  if (topicLower.includes("living room")) return "living room"
  if (topicLower.includes("bedroom")) return "bedroom"

  // Investment/Business
  if (topicLower.includes("investment") || topicLower.includes("profit")) return "real estate investment"

  // Home features
  if (topicLower.includes("fireplace")) return "fireplace"

  // Default fallback
  return "house home"
}

export async function generateContentV2(formData: FormData) {
  try {
    // Determine the topic to use
    const topicToUse = formData.primaryTopic || formData.alternateTopic
    if (!topicToUse) {
      throw new Error("Please provide either a selected topic or custom topic")
    }

    console.log("Topic being used:", topicToUse)

    // Generate content type specific prompts
    let contentTypeInstructions = ""
    let characterLimit = ""

    switch (formData.contentType) {
      case "Social post":
        contentTypeInstructions =
          "Create a professional social media post that is engaging and shareable. Focus on being concise while still providing value."
        characterLimit = "Keep the post under 280 characters to ensure it works well across all social platforms."
        break
      case "Text message":
        contentTypeInstructions =
          "Create a brief, friendly text message that gets straight to the point. Use a conversational tone appropriate for SMS."
        characterLimit = "Keep the message under 160 characters to fit in a single SMS."
        break
      case "Email":
        contentTypeInstructions =
          "Create a professional email with a clear subject line, proper greeting, informative body content, and appropriate closing. Structure it with proper email formatting."
        characterLimit = "Write a complete email with full details and explanations."
        break
      case "Blog article":
        contentTypeInstructions =
          "Create a comprehensive blog article with an engaging title, introduction, main content with subheadings, and conclusion. Make it informative and valuable for readers."
        characterLimit = "Write a full-length article with detailed explanations and examples."
        break
      default:
        contentTypeInstructions = "Create a professional social media post that is engaging and shareable."
        characterLimit = "Keep the post under 280 characters."
    }

    const textPrompt = `You are a professional content creator for a Century 21 real estate brokerage. Your task is to write a unique, polished, and professional ${formData.contentType.toLowerCase()} in ${formData.language}.

${contentTypeInstructions}

The content should be based on the topic: ${topicToUse}

Requirements:
- Maintain a **professional and polished tone** at all times  
- Ensure the content is **unique**, not generic or templated  
- Highlight how I, as a **top local real estate agent**, can assist with this topic  
- Keep the content informative, relevant, and audience-focused  
- ${characterLimit}
- Close with a subtle but strong call to action that encourages engagement or contact

${formData.contentType === "Email" ? "Format as a complete email with subject line, greeting, body, and closing." : ""}
${formData.contentType === "Blog article" ? "Include a compelling title and structure with subheadings where appropriate." : ""}

Please write the content in ${formData.language} and ensure it reads naturally and professionally for native speakers.`

    // Generate text content
    const { text: generatedText } = await generateText({
      model: openai("gpt-4o"),
      prompt: textPrompt,
    })

    // Use ONLY the original topic to create image search query
    const topicKeywords = extractKeywordsFromTopic(topicToUse)
    console.log("Topic:", topicToUse)
    console.log("Image search keywords:", topicKeywords)

    const pexelsImageUrl = await searchPexelsImage(topicKeywords)

    // Add Century 21 branding to the image
    const brandedImageUrl = await addBrandingToImage(pexelsImageUrl)

    return {
      text: generatedText,
      imageUrl: brandedImageUrl,
      imageBuffer: null,
    }
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content. Please try again.")
  }
}
