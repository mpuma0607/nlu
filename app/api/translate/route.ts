import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json()

    if (!text || targetLanguage === "en") {
      return NextResponse.json({ translatedText: text })
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY

    if (!apiKey) {
      console.warn("Google Translate API key not found, using mock translation")
      return NextResponse.json({ translatedText: text })
    }

    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        format: "text",
      }),
    })

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`)
    }

    const data = await response.json()
    const translatedText = data.data.translations[0].translatedText

    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error("Translation error:", error)
    const text = "" // Declare the text variable here
    return NextResponse.json({ translatedText: text })
  }
}
