"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type ScriptFormData = {
  agentName: string
  brokerageName: string
  scriptType: string
  topic: string
  customTopic: string
  additionalDetails: string
  agentEmail: string
}

export async function generateScript(formData: ScriptFormData) {
  try {
    // Determine the topic to use
    const topicToUse = formData.topic === "other" ? formData.customTopic : formData.topic

    // Get script type details
    const scriptTypeDetails = getScriptTypeDetails(formData.scriptType)

    // Get topic-specific context
    const topicContext = getTopicContext(topicToUse)

    const prompt = `You are an expert real estate script writer. Create ONE professional ${formData.scriptType} script for ${formData.agentName} from ${formData.brokerageName} targeting ${topicToUse}.

CRITICAL: Write ONE complete script that naturally incorporates VAK (Visual, Auditory, Kinesthetic) language patterns throughout. DO NOT create separate scripts or sections for different personality types.

${scriptTypeDetails.requirements}

VAK LANGUAGE INTEGRATION:
- Visual words: "see," "picture," "look," "view," "imagine," "envision," "clear," "bright," "focus"
- Auditory words: "hear," "listen," "sounds," "tell," "discuss," "rings true," "clicks," "resonates"  
- Kinesthetic words: "feel," "touch," "grasp," "handle," "solid," "smooth," "comfortable," "experience"

TOPIC CONTEXT: ${topicContext}

SCRIPT STRUCTURE:
1. Opening Hook (attention-grabbing, builds rapport)
2. Value Proposition (clear benefit using VAK language)
3. Proof/Credibility (establish trust with sensory language)
4. Call to Action (specific next step)
5. Objection Handling (brief, if applicable)

TONE: Professional, conversational, confident but not pushy, empathetic

${formData.additionalDetails ? `ADDITIONAL REQUIREMENTS: ${formData.additionalDetails}` : ""}

${scriptTypeDetails.lengthGuidance}

IMPORTANT: Write this as ONE complete, flowing script that naturally weaves in visual, auditory, and kinesthetic language throughout. Make it sound conversational and natural, not like it's targeting different personality types.`

    const { text: generatedScript } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    return {
      script: generatedScript,
    }
  } catch (error) {
    console.error("Error generating script:", error)
    throw new Error("Failed to generate script. Please try again.")
  }
}

function getScriptTypeDetails(scriptType: string) {
  const details = {
    email: {
      requirements: "Email format with subject line, professional greeting, body content, and closing signature.",
      lengthGuidance: "Keep the email comprehensive but scannable - aim for 200-400 words.",
    },
    phone: {
      requirements: "Phone conversation script with natural dialogue flow, pause points, and response handling.",
      lengthGuidance: "Create a 2-3 minute conversation script (approximately 300-500 words).",
    },
    text: {
      requirements: "Text message format that's concise, friendly, and action-oriented.",
      lengthGuidance:
        "KEEP THIS VERY SHORT - Maximum 160 characters to fit in one SMS message. Be direct and compelling.",
    },
    video: {
      requirements: "Video script with clear speaking points, timing cues, and visual direction notes.",
      lengthGuidance: "Create a 60-90 second video script (approximately 150-250 words).",
    },
    doorknocking: {
      requirements: "Face-to-face conversation script for door-to-door prospecting with natural dialogue.",
      lengthGuidance: "Create a 1-2 minute door conversation script (approximately 200-350 words).",
    },
  }

  return details[scriptType as keyof typeof details] || details.phone
}

function getTopicContext(topic: string) {
  const contexts = {
    "expired-listing":
      "Focus on why their listing didn't sell, market expertise, and fresh marketing approach. Address frustration and offer hope.",
    "first-time-homebuyer":
      "Emphasize guidance, education, and support through the buying process. Address fears and excitement.",
    "past-client":
      "Leverage existing relationship, referral opportunities, and continued service. Focus on staying connected.",
    neighbor: "Use local market knowledge, recent sales activity, and community connection. Be neighborly and helpful.",
    fsbo: "Address challenges of selling alone, market expertise, and time savings. Respect their independence while showing value.",
    "homeowner-high-equity":
      "Focus on market opportunities, timing, and wealth-building potential. Appeal to financial benefits.",
    foreclosure: "Be sensitive and helpful, focus on solutions and options. Emphasize urgency with compassion.",
    rental: "Address investment opportunities, market timing, and property management benefits.",
    divorce:
      "Be extremely sensitive, focus on practical solutions and discretion. Emphasize support and understanding.",
    "just-sold":
      "Congratulate and leverage success story for referrals and future business. Build on positive momentum.",
  }

  return contexts[topic as keyof typeof contexts] || "Focus on providing value and building trust with the prospect."
}
