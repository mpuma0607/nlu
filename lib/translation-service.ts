// Translation service using Google Translate API
export interface TranslationCache {
  [key: string]: {
    [language: string]: string
  }
}

class TranslationService {
  private cache: TranslationCache = {}
  private apiKey: string | null = null

  constructor() {
    // In a real implementation, you'd get this from environment variables
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY || null
  }

  async translateText(text: string, targetLanguage: string, sourceLanguage = "en"): Promise<string> {
    // Return original text if same language
    if (targetLanguage === sourceLanguage) {
      return text
    }

    // Check cache first
    const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey][targetLanguage]
    }

    // For demo purposes, return mock translations for common UI elements
    const mockTranslations = this.getMockTranslations(text, targetLanguage)
    if (mockTranslations) {
      return mockTranslations
    }

    // In production, you would use Google Translate API here
    try {
      if (this.apiKey) {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: text,
            source: sourceLanguage,
            target: targetLanguage,
          }),
        })

        const data = await response.json()
        const translatedText = data.data.translations[0].translatedText

        // Cache the result
        if (!this.cache[cacheKey]) {
          this.cache[cacheKey] = {}
        }
        this.cache[cacheKey][targetLanguage] = translatedText

        return translatedText
      }
    } catch (error) {
      console.error("Translation error:", error)
    }

    // Fallback to original text
    return text
  }

  private getMockTranslations(text: string, targetLanguage: string): string | null {
    const translations: { [key: string]: { [lang: string]: string } } = {
      "AI Hub": {
        fr: "Hub IA",
        es: "Hub de IA",
        pt: "Hub de IA",
        de: "KI-Hub",
        it: "Hub IA",
        ja: "AIハブ",
        ko: "AI 허브",
        zh: "AI中心",
      },
      "Marketing Hub": {
        fr: "Hub Marketing",
        es: "Hub de Marketing",
        pt: "Hub de Marketing",
        de: "Marketing-Hub",
        it: "Hub Marketing",
        ja: "マーケティングハブ",
        ko: "마케팅 허브",
        zh: "营销中心",
      },
      "Prospecting Hub": {
        fr: "Hub de Prospection",
        es: "Hub de Prospección",
        pt: "Hub de Prospecção",
        de: "Akquise-Hub",
        it: "Hub Prospezione",
        ja: "見込み客ハブ",
        ko: "잠재고객 허브",
        zh: "潜在客户中心",
      },
      "Training Hub": {
        fr: "Hub de Formation",
        es: "Hub de Entrenamiento",
        pt: "Hub de Treinamento",
        de: "Schulungs-Hub",
        it: "Hub Formazione",
        ja: "トレーニングハブ",
        ko: "교육 허브",
        zh: "培训中心",
      },
      "Services Hub": {
        fr: "Hub des Services",
        es: "Hub de Servicios",
        pt: "Hub de Serviços",
        de: "Service-Hub",
        it: "Hub Servizi",
        ja: "サービスハブ",
        ko: "서비스 허브",
        zh: "服务中心",
      },
      "Networking Hub": {
        fr: "Hub de Réseautage",
        es: "Hub de Networking",
        pt: "Hub de Networking",
        de: "Netzwerk-Hub",
        it: "Hub Networking",
        ja: "ネットワーキングハブ",
        ko: "네트워킹 허브",
        zh: "网络中心",
      },
      "Gear Hub": {
        fr: "Hub Équipement",
        es: "Hub de Equipos",
        pt: "Hub de Equipamentos",
        de: "Ausrüstungs-Hub",
        it: "Hub Attrezzature",
        ja: "ギアハブ",
        ko: "장비 허브",
        zh: "设备中心",
      },
      Profile: {
        fr: "Profil",
        es: "Perfil",
        pt: "Perfil",
        de: "Profil",
        it: "Profilo",
        ja: "プロフィール",
        ko: "프로필",
        zh: "个人资料",
      },
      "Get Support": {
        fr: "Obtenir de l'aide",
        es: "Obtener Soporte",
        pt: "Obter Suporte",
        de: "Support erhalten",
        it: "Ottieni Supporto",
        ja: "サポートを受ける",
        ko: "지원 받기",
        zh: "获取支持",
      },
    }

    return translations[text]?.[targetLanguage] || null
  }

  getSupportedLanguages() {
    return [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "es", name: "Español", flag: "🇪🇸" },
      { code: "pt", name: "Português", flag: "🇵🇹" },
      { code: "de", name: "Deutsch", flag: "🇩🇪" },
      { code: "it", name: "Italiano", flag: "🇮🇹" },
      { code: "ja", name: "日本語", flag: "🇯🇵" },
      { code: "ko", name: "한국어", flag: "🇰🇷" },
      { code: "zh", name: "中文", flag: "🇨🇳" },
      { code: "ru", name: "Русский", flag: "🇷🇺" },
      { code: "ar", name: "العربية", flag: "🇸🇦" },
      { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    ]
  }
}

export const translationService = new TranslationService()
