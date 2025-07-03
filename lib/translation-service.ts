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
        "Welcome to Your Portal": "Bienvenue sur votre portail",
        "Access your complete suite of real estate superpowers. Choose your hub and start transforming your business today.":
          "Accédez à votre suite complète de super-pouvoirs immobiliers. Choisissez votre hub et commencez à transformer votre entreprise dès aujourd'hui.",
        "Choose Your Hub": "Choisissez votre Hub",
        "Access specialized tools and resources designed to elevate every aspect of your real estate business":
          "Accédez à des outils et ressources spécialisés conçus pour élever tous les aspects de votre entreprise immobilière",
        "AI Tool Hub": "Hub d'outils IA",
        "11 powerful AI tools to automate and enhance your real estate business":
          "11 outils IA puissants pour automatiser et améliorer votre entreprise immobilière",
        "Marketing Hub": "Hub Marketing",
        "Branded content, social media graphics, and real estate market insights":
          "Contenu de marque, graphiques de médias sociaux et informations sur le marché immobilier",
        "Prospecting Hub": "Hub Prospection",
        "Lead generation strategies for FSBO, expired listings, and more":
          "Stratégies de génération de prospects pour FSBO, annonces expirées, et plus",
        "Training Hub": "Hub Formation",
        "Comprehensive training on Moxi Works, scripts, and sales processes":
          "Formation complète sur Moxi Works, scripts et processus de vente",
        "Services Hub": "Hub Services",
        "Professional design services and brokerage consulting":
          "Services de design professionnel et conseil en courtage",
        "Networking Hub": "Hub Réseautage",
        "Connect with agents, brokers, and industry professionals":
          "Connectez-vous avec des agents, courtiers et professionnels de l'industrie",
        "Gear Hub": "Hub Équipement",
        "Exclusive merchandise and professional tools for Next Level agents":
          "Marchandise exclusive et outils professionnels pour les agents Next Level",
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
        "Welcome to Your Portal": "Bienvenido a tu Portal",
        "Access your complete suite of real estate superpowers. Choose your hub and start transforming your business today.":
          "Accede a tu suite completa de superpoderes inmobiliarios. Elige tu hub y comienza a transformar tu negocio hoy.",
        "Choose Your Hub": "Elige tu Hub",
        "Access specialized tools and resources designed to elevate every aspect of your real estate business":
          "Accede a herramientas y recursos especializados diseñados para elevar todos los aspectos de tu negocio inmobiliario",
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
        "Welcome to Your Portal": "Bem-vindo ao seu Portal",
        "Access your complete suite of real estate superpowers. Choose your hub and start transforming your business today.":
          "Acesse seu conjunto completo de superpoderes imobiliários. Escolha seu hub e comece a transformar seu negócio hoje.",
        "Choose Your Hub": "Escolha seu Hub",
        "Access specialized tools and resources designed to elevate every aspect of your real estate business":
          "Acesse ferramentas e recursos especializados projetados para elevar todos os aspectos do seu negócio imobiliário",
      },
    }

    return mockTranslations[targetLanguage]?.[text] || text
  }
}

export const translationService = new TranslationService()
