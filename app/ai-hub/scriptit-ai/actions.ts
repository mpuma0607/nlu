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

    const prompt = `You are an expert real estate script writer and communication coach specializing in DISC behavioral analysis and VAK (Visual, Auditory, Kinesthetic) sensory language patterns.

Create a professional ${formData.scriptType} script for ${formData.agentName} from ${formData.brokerageName} targeting ${topicToUse}.

SCRIPT REQUIREMENTS:
${scriptTypeDetails.requirements}

DISC & VAK INTEGRATION:
- Incorporate language that appeals to all DISC personality types (Dominant, Influential, Steady, Compliant)
- Include VAK sensory language (Visual: "see," "picture," "imagine"; Auditory: "hear," "sounds," "listen"; Kinesthetic: "feel," "touch," "experience")
- Use a balanced approach that doesn't favor one style over others

TOPIC CONTEXT:
${topicContext}

STRUCTURE:
1. Opening/Hook (builds rapport, gets attention)
2. Value Proposition (what's in it for them)
3. Proof/Credibility (establish trust)
4. Call to Action (clear next step)
5. Objection Handling (if applicable)

TONE & STYLE:
- Professional yet conversational
- Confident but not pushy
- Empathetic and understanding
- Results-oriented

${formData.additionalDetails ? `ADDITIONAL REQUIREMENTS: ${formData.additionalDetails}` : ""}

Create ONE comprehensive script that seamlessly integrates DISC and VAK principles throughout. Make it natural and conversational, not robotic or overly structured.

${scriptTypeDetails.lengthGuidance}

Focus on creating genuine connection and providing clear value to the prospect.`

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
