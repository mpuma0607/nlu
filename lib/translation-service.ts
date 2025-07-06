export class TranslationService {
  async translate(text: string, targetLanguage: string): Promise<string> {
    // Just return the original text without translation
    return text
  }

  getSupportedLanguages(): string[] {
    return ["en"]
  }
}

export const translationService = new TranslationService()
