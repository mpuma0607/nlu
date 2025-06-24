"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
// Remove this line:
// import sharp from "sharp"

// Initialize Unsplash API
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "demo-key"

type FormData = {
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
}

async function searchUnsplashImage(query: string): Promise<string> {
  try {
    const searchQuery = encodeURIComponent(`real estate ${query}`)
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      // Get a random image from the results
      const randomIndex = Math.floor(Math.random() * data.results.length)
      const selectedImage = data.results[randomIndex]
      return selectedImage.urls.regular
    } else {
      // Fallback to a generic real estate search
      return await searchUnsplashImage("house home property")
    }
  } catch (error) {
    console.error("Error fetching from Unsplash:", error)
    // Return a placeholder if Unsplash fails
    return "/placeholder.svg?height=400&width=600"
  }
}

async function addBrandingToImage(imageUrl: string): Promise<string> {
  // For now, just return the original Unsplash image without processing
  return imageUrl
}

function getImageSearchQuery(topic: string, contentType: string): string {
  // Generate relevant search terms based on the topic
  const topicLower = topic.toLowerCase()

  if (topicLower.includes("home") || topicLower.includes("house")) {
    return "beautiful home house exterior"
  } else if (topicLower.includes("kitchen")) {
    return "modern kitchen interior"
  } else if (topicLower.includes("bathroom")) {
    return "luxury bathroom interior"
  } else if (topicLower.includes("garden") || topicLower.includes("yard")) {
    return "beautiful garden backyard"
  } else if (topicLower.includes("office")) {
    return "home office interior"
  } else if (topicLower.includes("living room")) {
    return "modern living room interior"
  } else if (topicLower.includes("bedroom")) {
    return "beautiful bedroom interior"
  } else if (topicLower.includes("investment") || topicLower.includes("money")) {
    return "real estate investment property"
  } else if (topicLower.includes("agent") || topicLower.includes("realtor")) {
    return "real estate agent professional"
  } else if (topicLower.includes("sell") || topicLower.includes("sale")) {
    return "house for sale real estate"
  } else if (topicLower.includes("buy") || topicLower.includes("purchase")) {
    return "home buying real estate"
  } else {
    return "real estate property home"
  }
}

function extractKeywordsFromContent(content: string, originalTopic: string): string {
  // Extract specific keywords from the generated content for better image search
  const contentLower = content.toLowerCase()
  const topicLower = originalTopic.toLowerCase()
  const keywords = []

  // Pool/Spa specific
  if (contentLower.includes("pool") || topicLower.includes("pool")) keywords.push("swimming pool")
  if (contentLower.includes("spa") || topicLower.includes("spa")) keywords.push("spa hot tub")
  if (contentLower.includes("jacuzzi")) keywords.push("jacuzzi")
  if (contentLower.includes("hot tub")) keywords.push("hot tub")

  // Kitchen specific
  if (contentLower.includes("kitchen") || topicLower.includes("kitchen")) keywords.push("modern kitchen")
  if (contentLower.includes("cooking") || contentLower.includes("chef")) keywords.push("kitchen cooking")

  // Bathroom specific
  if (contentLower.includes("bathroom") || topicLower.includes("bathroom")) keywords.push("luxury bathroom")
  if (contentLower.includes("shower")) keywords.push("modern shower")
  if (contentLower.includes("bathtub")) keywords.push("bathtub")

  // Outdoor/Garden specific
  if (contentLower.includes("garden") || contentLower.includes("landscaping")) keywords.push("beautiful garden")
  if (contentLower.includes("patio") || contentLower.includes("deck")) keywords.push("outdoor patio")
  if (contentLower.includes("backyard")) keywords.push("backyard")

  // Home office
  if (contentLower.includes("office") || contentLower.includes("workspace")) keywords.push("home office")
  if (contentLower.includes("work from home")) keywords.push("home workspace")

  // Living spaces
  if (contentLower.includes("living room")) keywords.push("modern living room")
  if (contentLower.includes("bedroom")) keywords.push("beautiful bedroom")
  if (contentLower.includes("dining room")) keywords.push("dining room")

  // Investment/Business
  if (contentLower.includes("investment") || contentLower.includes("profit")) keywords.push("real estate investment")
  if (contentLower.includes("rental") || contentLower.includes("tenant")) keywords.push("rental property")

  // Home features
  if (contentLower.includes("fireplace")) keywords.push("fireplace")
  if (contentLower.includes("garage")) keywords.push("garage")
  if (contentLower.includes("basement")) keywords.push("finished basement")
  if (contentLower.includes("attic")) keywords.push("attic conversion")

  // Luxury features
  if (contentLower.includes("luxury") || contentLower.includes("high-end")) keywords.push("luxury home")
  if (contentLower.includes("marble") || contentLower.includes("granite")) keywords.push("luxury interior")

  // If no specific keywords found, use the original topic
  if (keywords.length === 0) {
    // Extract key terms from the original topic
    if (topicLower.includes("pool") || topicLower.includes("spa")) return "swimming pool spa backyard"
    if (topicLower.includes("kitchen")) return "modern kitchen interior"
    if (topicLower.includes("bathroom")) return "luxury bathroom interior"
    if (topicLower.includes("garden")) return "beautiful garden landscaping"
    if (topicLower.includes("office")) return "home office workspace"
    return "beautiful home real estate"
  }

  return keywords.join(" ")
}

export async function generateContentV2(formData: FormData) {
  try {
    // Determine the topic to use
    const topicToUse = formData.primaryTopic || formData.alternateTopic
    if (!topicToUse) {
      throw new Error("Please provide either a selected topic or custom topic")
    }

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

    // Use the generated content to create a better image search query
    const contentKeywords = extractKeywordsFromContent(generatedText, topicToUse)
    const imageSearchQuery = `${contentKeywords}`
    const unsplashImageUrl = await searchUnsplashImage(imageSearchQuery)

    // Add Century 21 branding to the image
    const brandedImageUrl = await addBrandingToImage(unsplashImageUrl)

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
