"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

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
  try {
    // In a real implementation, this would:
    // 1. Download the image from Unsplash
    // 2. Use Canvas API or Sharp to add Century 21 branding
    // 3. Return the processed image as base64 or upload to storage

    // For now, we'll return the original image URL
    // In production, you'd implement the actual image processing here
    console.log("Image branding processing would happen here for:", imageUrl)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return imageUrl
  } catch (error) {
    console.error("Error processing image:", error)
    return imageUrl
  }
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

    // Get relevant image from Unsplash
    const imageSearchQuery = getImageSearchQuery(topicToUse, formData.contentType)
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
