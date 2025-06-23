"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import OpenAI from "openai"
import nodemailer from "nodemailer"

// Initialize OpenAI client
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type FormData = {
  primaryTopic: string
  alternateTopic: string
  language: string
  name: string
  email: string
  contentType: string
}

type EmailData = {
  to: string
  name: string
  content: string
  imageUrl: string
}

async function addLogoToImage(imageUrl: string): Promise<string> {
  try {
    // For next-lite, we'll return the original image URL since we can't process images server-side
    // In a full Next.js environment, this would use Sharp for image processing
    console.log("Image processing skipped in browser environment")
    return imageUrl
  } catch (error) {
    console.error("Error with image processing:", error)
    return imageUrl
  }
}

export async function generateContent(formData: FormData) {
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

    const { text: generatedText } = await generateText({
      model: openai("gpt-4o"),
      prompt: textPrompt,
    })

    // Generate image
    const imagePrompt = `You are an elite graphic designer for a Century 21 real estate brokerage. Your task is to create a **realistic, photo-quality, high-definition image** to accompany the following social media post:

${generatedText.substring(0, 300)}...

Design requirements:
- The image must align visually and emotionally with the message or theme of the post
- Use **vivid color, natural lighting, professional composition, and realistic textures**
- Ensure it's **scroll-stopping** and optimized for social platforms (Instagram, Facebook, LinkedIn)
- **Do not include any text or captions** on the image itself
- Leave some space in the bottom right corner for branding

This image should look like it was taken by a professional photographer and should enhance the brand's credibility and aesthetic appeal.`

    const imageResponse = await openaiClient.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    })

    const originalImageUrl = imageResponse.data[0]?.url || ""

    // In browser environment, use original image URL
    const processedImageUrl = await addLogoToImage(originalImageUrl)

    return {
      text: generatedText,
      imageUrl: processedImageUrl,
      imageBuffer: null, // No buffer processing in browser environment
    }
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content. Please try again.")
  }
}

export async function sendContentEmail(emailData: EmailData) {
  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Handle image for email attachment
    let imageBuffer: Buffer | null = null
    try {
      if (emailData.imageUrl && !emailData.imageUrl.startsWith("data:image")) {
        // Download image for email attachment
        const imageResponse = await fetch(emailData.imageUrl)
        if (imageResponse.ok) {
          const arrayBuffer = await imageResponse.arrayBuffer()
          imageBuffer = Buffer.from(arrayBuffer)
        }
      }
    } catch (imageError) {
      console.warn("Could not process image for attachment:", imageError)
    }

    const mailOptions = {
      from: `"The Next Level U" <${process.env.GMAIL_USER}>`,
      to: emailData.to,
      subject: "Your AI-Generated Social Media Content - The Next Level U",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Your Content is Ready!</h1>
            <p style="color: white; margin: 10px 0 0 0;">Generated by IdeaHub AI - The Next Level U</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${emailData.name},</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Your AI-generated social media content is ready! Here's your professional post content and accompanying image with Century 21 branding.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
              <h3 style="color: #1f2937; margin-top: 0;">Your Social Media Post:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${emailData.content}</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              ${imageBuffer ? "The accompanying branded image is attached to this email." : "You can also download the image from the website."} You can use both the text and image for your social media posts on Facebook, LinkedIn, Instagram, and other platforms.
            </p>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
              Best regards,<br>
              The Next Level U Team<br>
              <a href="mailto:MikePuma@c21be.com" style="color: #7c3aed;">MikePuma@c21be.com</a>
            </p>
          </div>
          
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
              © 2024 The Next Level U. Empowering real estate professionals with AI-powered tools.
            </p>
          </div>
        </div>
      `,
      attachments: imageBuffer
        ? [
            {
              filename: "social-media-image-branded.jpg",
              content: imageBuffer,
              contentType: "image/jpeg",
            },
          ]
        : [],
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// New function to handle image download with proper CORS
export async function downloadImage(imageData: string) {
  try {
    // If it's a base64 data URL, convert it to a blob
    if (imageData.startsWith("data:image")) {
      const base64Data = imageData.split(",")[1]
      const binaryData = Buffer.from(base64Data, "base64")
      return new Response(binaryData, {
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Disposition": 'attachment; filename="social-media-image-branded.jpg"',
        },
      })
    } else {
      // Fallback for URL-based images
      const response = await fetch(imageData)
      const blob = await response.blob()
      return new Response(blob, {
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Disposition": 'attachment; filename="social-media-image-branded.jpg"',
        },
      })
    }
  } catch (error) {
    console.error("Error preparing image download:", error)
    throw new Error("Failed to prepare image download")
  }
}