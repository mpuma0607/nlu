import { OpenAIStream } from "ai"
import { Configuration, OpenAIApi } from "openai"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = (model: "gpt-4" | "gpt-3.5-turbo" | "gpt-4o") =>
  new OpenAIApi(config).createChatCompletion.bind(null, {
    model,
    stream: true,
    temperature: 0.7,
    // max_tokens: 1000,
    messages: [],
  })

export type FormState = {
  name: string
  prospectType: string
  customProspectType?: string
  language: string
  specificGoals?: string
}

export type ActionPlanResult = {
  plan: string
  html: string
}

async function generateText({ model, prompt }: { model: Function; prompt: string }) {
  const response = await model({
    messages: [{ role: "user", content: prompt }],
    stream: true,
  })

  const stream = OpenAIStream(response)
  const text = await new Response(stream).text()
  return { text }
}

export async function generateActionPlan(formData: FormState): Promise<ActionPlanResult> {
  try {
    const prospectType = formData.prospectType === "Other" ? formData.customProspectType : formData.prospectType

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are an expert real estate coach creating a comprehensive daily action plan. Generate a beautifully formatted, professional action plan in HTML format.

PROSPECT FOCUS: ${prospectType}
AGENT NAME: ${formData.name}
LANGUAGE: ${formData.language}
SPECIFIC GOALS: ${formData.specificGoals || "General prospecting success"}

Create a complete daily action plan with the following structure. Use professional HTML formatting with inline CSS for a clean, modern look:

1. **DAILY CONTACT GOALS** - Specific numbers for calls, texts, emails
2. **MORNING PREPARATION** (30 minutes) - Database review, script practice, mindset
3. **PHONE OUTREACH BLOCK** (2-3 hours) - Calling strategy with scripts
4. **TEXT MESSAGE CAMPAIGN** (30 minutes) - Text templates and timing
5. **EMAIL OUTREACH** (45 minutes) - Email templates and follow-up sequence
6. **SOCIAL MEDIA ENGAGEMENT** (30 minutes) - Platform-specific strategies
7. **FOLLOW-UP ACTIVITIES** (1 hour) - Lead nurturing and relationship building
8. **END-OF-DAY REVIEW** (15 minutes) - Tracking and planning tomorrow

For each section, provide:
- Specific time allocations
- Exact scripts and templates
- Step-by-step instructions
- Success metrics to track

Format the response as clean, professional HTML with:
- Modern typography and spacing
- Color-coded sections with professional colors
- Clear headings and subheadings
- Bullet points and numbered lists
- Call-out boxes for important tips
- Professional styling that looks like a premium business document

Use inline CSS styling throughout. Make it visually appealing and easy to scan.`,
    })

    // Also generate a clean text version for PDF
    const { text: plainText } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Create a clean, text-only version of the daily action plan for ${prospectType} prospecting.

AGENT: ${formData.name}
GOALS: ${formData.specificGoals || "General prospecting success"}

Format as clean text with clear sections, bullet points, and specific scripts. Make it professional and actionable.`,
    })

    return {
      plan: plainText,
      html: text,
    }
  } catch (error) {
    console.error("Error generating action plan:", error)
    throw new Error("Failed to generate action plan")
  }
}
