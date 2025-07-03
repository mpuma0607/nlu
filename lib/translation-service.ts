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
    const mockTranslations: { [key: string]: { [key: string]: string } } = {
      fr: {
        "AI Hub": "Hub IA",
        "Marketing Hub": "Hub Marketing",
        "Prospecting Hub": "Hub Prospection",
        "Training Hub": "Hub Formation",
        "Services Hub": "Hub Services",
        "Networking Hub": "Hub Réseautage",
        "Gear Hub": "Hub Équipement",
        Profile: "Profil",
        "Get Support": "Obtenir de l'aide",
        "IdeaHub AI": "IdeaHub IA",
        RealBio: "RealBio",
        ListIT: "ListIT",
        ScriptIT: "ScriptIT",
        "QuickCMA AI": "QuickCMA IA",
        "RolePlay AI": "RolePlay IA",
        "PropBot AI": "PropBot IA",
        "Who's Who AI": "Who's Who IA",
        "GoalScreen AI": "GoalScreen IA",
        "Action AI": "Action IA",
        "RealCoach AI": "RealCoach IA",
        "BizPlan AI": "BizPlan IA",
        "RealDeal AI": "RealDeal IA",
        "Social Media Content Generation": "Génération de contenu pour les médias sociaux",
        "Professional Agent Bio Creation": "Création de biographie d'agent professionnel",
        "Property Listing Descriptions": "Descriptions d'annonces immobilières",
        "Custom Real Estate Scripts": "Scripts immobiliers personnalisés",
        "Comparative Market Analysis Tool": "Outil d'analyse comparative du marché",
        "Voice Conversation Practice": "Pratique de conversation vocale",
        "Intelligent Property Search & Analysis": "Recherche et analyse intelligente de propriétés",
        "Property Owner Skip Tracing": "Recherche de propriétaires",
        "Daily Contact Goal Wallpaper Creator": "Créateur de fond d'écran d'objectifs de contact quotidiens",
        "Daily Prospecting Action Plans": "Plans d'action de prospection quotidiens",
        "Personalized Business Coaching": "Coaching d'affaires personnalisé",
        "90-Day Business Plan Generator": "Générateur de plan d'affaires de 90 jours",
        "Contract Analysis & Summarization": "Analyse et résumé de contrats",
      },
      es: {
        "AI Hub": "Hub IA",
        "Marketing Hub": "Hub Marketing",
        "Prospecting Hub": "Hub Prospección",
        "Training Hub": "Hub Entrenamiento",
        "Services Hub": "Hub Servicios",
        "Networking Hub": "Hub Networking",
        "Gear Hub": "Hub Equipo",
        Profile: "Perfil",
        "Get Support": "Obtener Soporte",
        "IdeaHub AI": "IdeaHub IA",
        RealBio: "RealBio",
        ListIT: "ListIT",
        ScriptIT: "ScriptIT",
        "QuickCMA AI": "QuickCMA IA",
        "RolePlay AI": "RolePlay IA",
        "PropBot AI": "PropBot IA",
        "Who's Who AI": "Who's Who IA",
        "GoalScreen AI": "GoalScreen IA",
        "Action AI": "Action IA",
        "RealCoach AI": "RealCoach IA",
        "BizPlan AI": "BizPlan IA",
        "RealDeal AI": "RealDeal IA",
      },
      pt: {
        "AI Hub": "Hub IA",
        "Marketing Hub": "Hub Marketing",
        "Prospecting Hub": "Hub Prospecção",
        "Training Hub": "Hub Treinamento",
        "Services Hub": "Hub Serviços",
        "Networking Hub": "Hub Networking",
        "Gear Hub": "Hub Equipamentos",
        Profile: "Perfil",
        "Get Support": "Obter Suporte",
        "IdeaHub AI": "IdeaHub IA",
        RealBio: "RealBio",
        ListIT: "ListIT",
        ScriptIT: "ScriptIT",
        "QuickCMA AI": "QuickCMA IA",
        "RolePlay AI": "RolePlay IA",
        "PropBot AI": "PropBot IA",
        "Who's Who AI": "Who's Who IA",
        "GoalScreen AI": "GoalScreen IA",
        "Action AI": "Action IA",
        "RealCoach AI": "RealCoach IA",
        "BizPlan AI": "BizPlan IA",
        "RealDeal AI": "RealDeal IA",
      },
    }

    return mockTranslations[targetLanguage]?.[text] || text
  }
}

export const translationService = new TranslationService()
