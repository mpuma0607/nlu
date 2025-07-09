"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface CoachingFormData {
  name: string
  email: string
  experience: string
  currentChallenges: string
  goals: string
  marketArea: string
  businessType: string
  specificQuestions: string
}

export async function generateCoachingAdvice(formData: CoachingFormData) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
You are a highly experienced real estate coach and business mentor with over 20 years of experience helping agents and brokers build successful businesses. You have expertise in lead generation, sales techniques, market analysis, business development, and team building.

Provide personalized coaching advice for:

Agent Name: ${formData.name}
Experience Level: ${formData.experience}
Market Area: ${formData.marketArea}
Business Type: ${formData.businessType}

Current Challenges:
${formData.currentChallenges}

Goals:
${formData.goals}

Specific Questions:
${formData.specificQuestions || "None provided"}

Create a comprehensive coaching session response that includes:

## SITUATION ANALYSIS
- Assessment of current challenges and opportunities
- Strengths to leverage and areas for improvement
- Market positioning evaluation

## STRATEGIC RECOMMENDATIONS
- Specific action steps to address challenges
- Goal achievement roadmap with timelines
- Resource allocation suggestions

## TACTICAL IMPLEMENTATION
- Daily/weekly action items
- Scripts and templates to use
- Metrics to track progress

## SKILL DEVELOPMENT PLAN
- Training priorities based on experience level
- Recommended courses, books, or resources
- Practice exercises and role-play scenarios

## BUSINESS GROWTH STRATEGIES
- Lead generation optimization
- Client retention improvements
- Revenue diversification opportunities

## ACCOUNTABILITY FRAMEWORK
- Key performance indicators (KPIs) to monitor
- Weekly review process
- Milestone celebrations and adjustments

## NEXT STEPS
- Immediate actions (next 7 days)
- Short-term goals (next 30 days)
- Long-term vision (next 90 days)

Make this advice specific, actionable, and motivating. Include exact numbers, percentages, and timelines where appropriate. Address the agent's specific experience level and market conditions.

Be encouraging but realistic, and provide both strategic thinking and tactical execution guidance.
`,
    })

    // Send email with coaching advice
    try {
      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-coaching-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            coachingAdvice: text,
            formData: formData,
          }),
        },
      )

      if (!emailResponse.ok) {
        console.error("Failed to send coaching email:", await emailResponse.text())
      }
    } catch (emailError) {
      console.error("Coaching email error:", emailError)
    }

    return {
      success: true,
      advice: text,
    }
  } catch (error) {
    console.error("Coaching advice generation error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate coaching advice",
    }
  }
}
