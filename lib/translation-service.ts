class TranslationService {
  private cache = new Map<string, string>()
  private apiKey: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || ""
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    if (!text || targetLanguage === "en") {
      return text
    }

    const cacheKey = `${text}_${targetLanguage}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      if (!this.apiKey) {
        console.warn("Google Translate API key not found, using mock translation")
        return this.getMockTranslation(text, targetLanguage)
      }

      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
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

      this.cache.set(cacheKey, translatedText)
      return translatedText
    } catch (error) {
      console.error("Translation error:", error)
      return this.getMockTranslation(text, targetLanguage)
    }
  }

  private getMockTranslation(text: string, targetLanguage: string): string {
    // Return original text as fallback
    return text
  }
}

export const translationService = new TranslationService()
