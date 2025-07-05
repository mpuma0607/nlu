// Stub translation service without sensitive API key
export class TranslationService {
  async translateText(text: string, targetLanguage = "en"): Promise<string> {
    // Just return original text without translation
    return text
  }

  getSupportedLanguages() {
    return ["en"]
  }
}

export const translationService = new TranslationService()
