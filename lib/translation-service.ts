class TranslationService {
  private cache = new Map<string, string>()

  async translateText(text: string, targetLanguage: string): Promise<string> {
    if (!text || targetLanguage === "en") {
      return text
    }

    const cacheKey = `${text}_${targetLanguage}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      // Use server action instead of direct API call
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLanguage,
        }),
      })

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`)
      }

      const data = await response.json()
      const translatedText = data.translatedText

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
