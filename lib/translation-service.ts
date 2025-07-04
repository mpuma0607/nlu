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
        "AI Tool Hub": "Hub d'outils IA",
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
        "11 powerful AI tools to automate and enhance your real estate business":
          "11 outils IA puissants pour automatiser et améliorer votre entreprise immobilière",
        "Branded content, social media graphics, and real estate market insights":
          "Contenu de marque, graphiques de médias sociaux et informations sur le marché immobilier",
        "Lead generation strategies for FSBO, expired listings, and more":
          "Stratégies de génération de prospects pour FSBO, annonces expirées, et plus",
        "Comprehensive training on Moxi Works, scripts, and sales processes":
          "Formation complète sur Moxi Works, scripts et processus de vente",
        "Professional design services and brokerage consulting":
          "Services de design professionnel et conseil en courtage",
        "Connect with agents, brokers, and industry professionals":
          "Connectez-vous avec des agents, courtiers et professionnels de l'industrie",
        "Exclusive merchandise and professional tools for Next Level agents":
          "Marchandise exclusive et outils professionnels pour les agents Next Level",
        Features: "Fonctionnalités",
        About: "À propos",
        Pricing: "Tarification",
        Testimonials: "Témoignages",
        "Sign In": "Se connecter",
        "Get Started": "Commencer",
        "🚀 Transform Your Real Estate Business": "🚀 Transformez votre entreprise immobilière",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "Plateforme Immobilière",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "Libérez votre potentiel avec nos outils alimentés par l'IA, une formation complète, des ressources marketing et une communauté florissante de professionnels de l'immobilier.",
        "Start Your Journey": "Commencez votre parcours",
        "Watch Demo": "Voir la démo",
        "Everything You Need to Succeed": "Tout ce dont vous avez besoin pour réussir",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "Notre plateforme complète fournit tous les outils, formations et ressources dont vous avez besoin pour amener votre entreprise immobilière au niveau supérieur.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 outils IA puissants incluant ListIt, ScriptIt, RealBio, ActionAI, et plus",
        "For a demo of each tool, click it below:": "Pour une démo de chaque outil, cliquez dessus ci-dessous:",
        "Complete prospecting strategies for every lead type":
          "Stratégies de prospection complètes pour chaque type de prospect",
        "FSBO & Expired Listings": "FSBO et annonces expirées",
        "Sphere of Influence": "Sphère d'influence",
        "Probate & Divorce Leads": "Prospects de succession et divorce",
        "Investor Strategies": "Stratégies d'investisseur",
        "Professional marketing content and social media resources":
          "Contenu marketing professionnel et ressources de médias sociaux",
        "Branded social content": "Contenu social de marque",
        "Market hot takes": "Analyses du marché",
        "Professional templates": "Modèles professionnels",
        "Campaign strategies": "Stratégies de campagne",
        "Comprehensive training programs and skill development":
          "Programmes de formation complets et développement des compétences",
        "Script mastery training": "Formation de maîtrise des scripts",
        "DISC & VAK personality": "Personnalité DISC et VAK",
        "Process optimization": "Optimisation des processus",
        "Moxi Works integration": "Intégration Moxi Works",
        "Connect with other professionals and build relationships":
          "Connectez-vous avec d'autres professionnels et construisez des relations",
        "Community chat": "Chat communautaire",
        "Collaboration tools": "Outils de collaboration",
        "Professional networking": "Réseautage professionnel",
        "Industry connections": "Connexions de l'industrie",
        "Professional design and consulting services": "Services de design professionnel et de conseil",
        "Website design": "Conception de site web",
        "Marketing materials": "Matériel marketing",
        "Brokerage consulting": "Conseil en courtage",
        "Custom solutions": "Solutions personnalisées",
        "We're Not Just Another Tech Company": "Nous ne sommes pas juste une autre entreprise technologique",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "Nous vivons et respirons l'immobilier. Notre plateforme est née du succès du monde réel dans les tranchées de l'industrie.",
        "Real Estate Is Our DNA": "L'immobilier est notre ADN",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "Nous possédons et exploitons l'un des plus grands courtages Century 21 du système, avec des centaines d'agents et plus de 33 ans de succès prouvé dans l'industrie. Ce n'est pas de la connaissance théorique - c'est une expérience éprouvée au combat des premières lignes de l'immobilier.",
        "Built by Agents, for Agents": "Construit par des agents, pour des agents",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "Notre plateforme existe parce que nos propres agents obtenaient des résultats incroyables en utilisant ces outils, méthodes de formation et scripts. Nous avons vu la transformation de première main et savions que nous devions partager ces ressources révolutionnaires avec toute la communauté immobilière.",
        Years: "Années",
        "In Business": "En affaires",
        Transactions: "Transactions",
        Completed: "Complétées",
        "Annual Sales": "Ventes annuelles",
        Volume: "Volume",
        "of Agents": "d'agents",
        "In Our Brokerage": "Dans notre courtage",
        "Experience Meets Innovation": "L'expérience rencontre l'innovation",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "Quand vous rejoignez The Next Level U, vous n'obtenez pas seulement un logiciel - vous obtenez des décennies de sagesse immobilière, des stratégies éprouvées et des outils qui ont généré plus d'un milliard de dollars de ventes.",
        "🏆 Proven by Real Results": "🏆 Prouvé par de vrais résultats",
        "Simple, Transparent Pricing": "Tarification simple et transparente",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "Choisissez le plan qui vous convient le mieux. Tous les plans incluent l'accès à chaque outil et ressource.",
        Monthly: "Mensuel",
        "Perfect for getting started": "Parfait pour commencer",
        "/month": "/mois",
        "Access to all 11 AI tools": "Accès à tous les 11 outils IA",
        "Complete training library": "Bibliothèque de formation complète",
        "Marketing resources": "Ressources marketing",
        "Community access": "Accès communautaire",
        "24/7 platform access": "Accès à la plateforme 24/7",
        "Get Started Monthly": "Commencer mensuellement",
        Annual: "Annuel",
        "BEST VALUE": "MEILLEURE VALEUR",
        "/year": "/an",
        "Only $21/month - Save $108!": "Seulement 21$/mois - Économisez 108$!",
        "Best value for serious agents": "Meilleure valeur pour les agents sérieux",
        "Save $108 per year": "Économisez 108$ par année",
        "Get Started Annual": "Commencer annuellement",
        "What Our Members Say": "Ce que disent nos membres",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "Rejoignez des milliers de professionnels de l'immobilier qui ont transformé leur entreprise avec The Next Level U.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "Les outils IA ont complètement transformé la façon dont je crée des annonces. Ce qui prenait des heures ne prend maintenant que des minutes, et la qualité est incroyable.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "Meilleur producteur, Tampa Bay",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "Les stratégies de prospection et les scripts m'ont aidé à conclure 40% plus d'affaires cette année. La formation est de classe mondiale.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Agent Century 21",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "Cette plateforme a tout ce dont j'ai besoin en un seul endroit. Le soutien communautaire et les ressources sont inégalés.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "Propriétaire courtier",
        "Ready to Transform Your Business?": "Prêt a transformar tu negocio?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "Únete a miles de profesionales inmobiliarios exitosos que han llevado su negocio al siguiente nivel.",
        "Start Your Free Trial": "Comienza Tu Prueba Gratuita",
        "Schedule a Demo": "Programa Una Demo",
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "Empoderando a profesionales inmobiliarios con herramientas impulsadas por IA y formación integral.",
        Platform: "Plataforma",
        Support: "Soporte",
        "Help Center": "Centro de Ayuda",
        "Contact Us": "Contáctanos",
        Community: "Comunidad",
        Status: "Estado",
        Legal: "Legal",
        "Privacy Policy": "Política de Privacidad",
        "Terms of Service": "Términos de Servicio",
        "IdeaHub AI Demo": "Demo IdeaHub IA",
        "ListIT AI Demo": "Demo ListIT IA",
        "ScriptIT AI Demo": "Demo ScriptIT IA",
        "RealBio AI Demo": "Demo RealBio IA",
        "RolePlay AI Demo": "Demo RolePlay IA",
        "Action AI Demo": "Demo Action IA",
        "RealCoach AI Demo": "Demo RealCoach IA",
        "BizPlan AI Demo": "Demo BizPlan IA",
        "RealDeal AI Demo": "Demo RealDeal IA",
        "QuickCMA AI Demo": "Demo QuickCMA IA",
        "Who's Who AI Demo": "Demo Who's Who IA",
        "PropBot AI Demo": "Demo PropBot IA",
        "Platform Demo": "Demo de la plataforma",
      },
      es: {
        "AI Hub": "Hub de IA",
        "AI Tool Hub": "Hub de Herramientas de IA",
        "Marketing Hub": "Hub de Marketing",
        "Prospecting Hub": "Hub de Prospección",
        "Training Hub": "Hub de Formación",
        "Services Hub": "Hub de Servicios",
        "Networking Hub": "Hub de Redes",
        "Gear Hub": "Hub de Equipo",
        Profile: "Perfil",
        "Get Support": "Obtener Soporte",
        "Welcome to Your Portal": "Bienvenido a Tu Portal",
        "Access your complete suite of real estate superpowers. Choose your hub and start transforming your business today.":
          "Accede a tu suite completa de superpoderes inmobiliarios. Elige tu hub y comienza a transformar tu negocio hoy.",
        "Choose Your Hub": "Elige Tu Hub",
        "Access specialized tools and resources designed to elevate every aspect of your real estate business":
          "Accede a herramientas y recursos especializados diseñados para elevar cada aspecto de tu negocio inmobiliario.",
        "11 powerful AI tools to automate and enhance your real estate business":
          "11 poderosas herramientas de IA para automatizar y mejorar tu negocio inmobiliario.",
        "Branded content, social media graphics, and real estate market insights":
          "Contenido de marca, gráficos de redes sociales e información sobre el mercado inmobiliario.",
        "Lead generation strategies for FSBO, expired listings, and more":
          "Estrategias de generación de leads para FSBO, anuncios expirados y más.",
        "Comprehensive training on Moxi Works, scripts, and sales processes":
          "Formación integral sobre Moxi Works, guiones y procesos de ventas.",
        "Professional design services and brokerage consulting":
          "Servicios de diseño profesional y consultoría de corretaje.",
        "Connect with agents, brokers, and industry professionals":
          "Conéctate con agentes, corredores y profesionales de la industria.",
        "Exclusive merchandise and professional tools for Next Level agents":
          "Mercancía exclusiva y herramientas profesionales para agentes de Next Level.",
        Features: "Características",
        About: "Acerca de",
        Pricing: "Precios",
        Testimonials: "Testimonios",
        "Sign In": "Iniciar Sesión",
        "Get Started": "Comenzar",
        "🚀 Transform Your Real Estate Business": "🚀 Transforma tu Negocio Inmobiliario",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "Plataforma Inmobiliaria",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "Desbloquea tu potencial con nuestras herramientas impulsadas por IA, formación integral, recursos de marketing y una próspera comunidad de profesionales inmobiliarios.",
        "Start Your Journey": "Comienza tu Viaje",
        "Watch Demo": "Ver Demo",
        "Everything You Need to Succeed": "Todo lo que Necesitas para Exitir",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "Nuestra plataforma integral proporciona todas las herramientas, formación y recursos que necesitas para llevar tu negocio inmobiliario al siguiente nivel.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 poderosas herramientas de IA que incluyen ListIt, ScriptIt, RealBio, ActionAI y más.",
        "For a demo of each tool, click it below:":
          "Para una demo de cada herramienta, haz clic en ella a continuación:",
        "Complete prospecting strategies for every lead type":
          "Estrategias de prospección completas para cada tipo de lead.",
        "FSBO & Expired Listings": "FSBO y Anuncios Expirados",
        "Sphere of Influence": "Esfera de Influencia",
        "Probate & Divorce Leads": "Leads de Sucesión y Divorcio",
        "Investor Strategies": "Estrategias de Inversor",
        "Professional marketing content and social media resources":
          "Contenido de marketing profesional y recursos de redes sociales.",
        "Branded social content": "Contenido social de marca.",
        "Market hot takes": "Análisis del mercado.",
        "Professional templates": "Plantillas profesionales.",
        "Campaign strategies": "Estrategias de campaña.",
        "Comprehensive training programs and skill development":
          "Programas de formación integral y desarrollo de habilidades.",
        "Script mastery training": "Formación de dominio de guiones.",
        "DISC & VAK personality": "Personalidad DISC y VAK.",
        "Process optimization": "Optimización de procesos.",
        "Moxi Works integration": "Integración de Moxi Works.",
        "Connect with other professionals and build relationships":
          "Conéctate con otros profesionales y construye relaciones.",
        "Community chat": "Chat de la comunidad.",
        "Collaboration tools": "Herramientas de colaboración.",
        "Professional networking": "Redes profesionales.",
        "Industry connections": "Conexiones de la industria.",
        "Professional design and consulting services": "Servicios de diseño y consultoría profesional.",
        "Website design": "Diseño de sitio web.",
        "Marketing materials": "Materiales de marketing.",
        "Brokerage consulting": "Consultoría de corretaje.",
        "Custom solutions": "Soluciones personalizadas.",
        "We're Not Just Another Tech Company": "No Somos Solo Otra Empresa de Tecnología",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "Vivimos y respiramos inmobiliario. Nuestra plataforma nació del éxito del mundo real en las trinquesas de la industria.",
        "Real Estate Is Our DNA": "El Inmobiliario Es Nuestro ADN",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "Poseemos y operamos uno de los corretajes Century 21 más grandes del sistema, con cientos de agentes y más de 33 años de éxito probado en la industria. Esto no es conocimiento teórico - es experiencia éprouvada en las primeras líneas del inmobiliario.",
        "Built by Agents, for Agents": "Construido por Agentes, Para Agentes",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "Nuestra plataforma existe porque nuestros propios agentes estaban logrando resultados increíbles utilizando estas herramientas, métodos de formación y guiones. Vimos la transformación de primera mano y sabíamos que teníamos que compartir estos recursos revolucionarios con toda la comunidad inmobiliaria.",
        Years: "Años",
        "In Business": "En Negocio",
        Transactions: "Transacciones",
        Completed: "Completadas",
        "Annual Sales": "Ventas Anuales",
        Volume: "Volumen",
        "of Agents": "de Agentes",
        "In Our Brokerage": "En Nuestro Corretaje",
        "Experience Meets Innovation": "La Experiencia Se Enfrenta a la Innovación",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "Cuando te unes a The Next Level U, no solo obtienes software - obtienes décadas de sabiduría inmobiliaria, estrategias probadas y herramientas que han generado más de un millardo de dólares en ventas.",
        "🏆 Proven by Real Results": "🏆 Demostrado por Resultados Reales",
        "Simple, Transparent Pricing": "Precios Simples y Transparentes",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "Elige el plan que mejor se adapte a ti. Todos los planes incluyen acceso a cada herramienta y recurso.",
        Monthly: "Mensual",
        "Perfect for getting started": "Perfecto para empezar",
        "/month": "/mes",
        "Access to all 11 AI tools": "Acceso a todas las 11 herramientas de IA",
        "Complete training library": "Biblioteca de formación completa",
        "Marketing resources": "Recursos de marketing",
        "Community access": "Acceso a la comunidad",
        "24/7 platform access": "Acceso a la plataforma 24/7",
        "Get Started Monthly": "Empezar Mensualmente",
        Annual: "Anual",
        "BEST VALUE": "MEJOR VALOR",
        "/year": "/año",
        "Only $21/month - Save $108!": "¡Sólo $21/mes - ¡Ahorra $108!",
        "Best value for serious agents": "Mejor valor para agentes serios",
        "Save $108 per year": "Ahorra $108 por año",
        "Get Started Annual": "Empezar Anualmente",
        "What Our Members Say": "¿Qué Dicen Nuestros Miembros?",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "Únete a miles de profesionales inmobiliarios que han transformado su negocio con The Next Level U.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is increíble.":
          "Las herramientas de IA han transformado completamente cómo creo anuncios. Lo que antes tomaba horas ahora toma minutos, y la calidad es increíble.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "Top Producer, Tampa Bay",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "Las estrategias de prospección y guiones me han ayudado a cerrar 40% más de negocios este año. La formación es de clase mundial.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Agente Century 21",
        "This platform has everything I need in one place. The community support and resources are incomparables.":
          "Esta plataforma tiene todo lo que necesito en un solo lugar. El apoyo comunitario y los recursos son incomparables.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "Propietario de Corretaje",
        "Ready to Transform Your Business?": "¿Listo para Transformar Tu Negocio?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "Únete a miles de profesionales inmobiliarios exitosos que han llevado su negocio al siguiente nivel.",
        "Start Your Free Trial": "Comienza Tu Prueba Gratuita",
        "Schedule a Demo": "Programa Una Demo",
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "Empoderando a profesionales inmobiliarios con herramientas impulsadas por IA y formación integral.",
        Platform: "Plataforma",
        Support: "Soporte",
        "Help Center": "Centro de Ayuda",
        "Contact Us": "Contáctanos",
        Community: "Comunidad",
        Status: "Estado",
        Legal: "Legal",
        "Privacy Policy": "Política de Privacidad",
        "Terms of Service": "Términos de Servicio",
        "IdeaHub AI Demo": "Demo IdeaHub IA",
        "ListIT AI Demo": "Demo ListIT IA",
        "ScriptIT AI Demo": "Demo ScriptIT IA",
        "RealBio AI Demo": "Demo RealBio IA",
        "RolePlay AI Demo": "Demo RolePlay IA",
        "Action AI Demo": "Demo Action IA",
        "RealCoach AI Demo": "Demo RealCoach IA",
        "BizPlan AI Demo": "Demo BizPlan IA",
        "RealDeal AI Demo": "Demo RealDeal IA",
        "QuickCMA AI Demo": "Demo QuickCMA IA",
        "Who's Who AI Demo": "Demo Who's Who IA",
        "PropBot AI Demo": "Demo PropBot IA",
        "Platform Demo": "Demo de la Plataforma",
      },
      pt: {
        // Navigation
        "AI Hub": "Hub de IA",
        "Marketing Hub": "Hub de Marketing",
        "Prospecting Hub": "Hub de Prospeção",
        "Training Hub": "Hub de Treinamento",
        "Services Hub": "Hub de Serviços",
        "Networking Hub": "Hub de Networking",
        "Gear Hub": "Hub de Equipamentos",
        Profile: "Perfil",
        "Get Support": "Obter Suporte",
        Features: "Recursos",
        About: "Sobre",
        Pricing: "Preços",
        Testimonials: "Depoimentos",
        "Sign In": "Entrar",
        "Get Started": "Começar",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 Transforme Seu Negócio Imobiliário",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "Plataforma Imobiliária",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "Desbloqueie seu potencial com nossas ferramentas alimentadas por IA, treinamento abrangente, recursos de marketing e uma comunidade próspera de profissionais imobiliários.",
        "Start Your Journey": "Comece Sua Jornada",
        "Watch Demo": "Assista à Demo",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "Tudo o Que Você Precisa para Suceder",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "Nossa plataforma abrangente fornece todas as ferramentas, treinamentos e recursos que você precisa para levar seu negócio imobiliário ao próximo nível.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 poderosas ferramentas de IA incluindo ListIt, ScriptIt, RealBio, ActionAI e mais",
        "For a demo of each tool, click it below:": "Para uma demo de cada ferramenta, clique abaixo:",
        "Complete prospecting strategies for every lead type":
          "Estratégias completas de prospecção para cada tipo de lead",
        "FSBO & Expired Listings": "FSBO e Anúncios Expirados",
        "Sphere of Influence": "Esfera de Influência",
        "Probate & Divorce Leads": "Leads de Sucessão e Divórcio",
        "Investor Strategies": "Estratégias de Investidor",
        "Professional marketing content and social media resources":
          "Conteúdo de marketing profissional e recursos de mídias sociais",
        "Branded social content": "Conteúdo social de marca",
        "Market hot takes": "Análises do mercado",
        "Professional templates": "Modelos profissionais",
        "Campaign strategies": "Estratégias de campanha",
        "Comprehensive training programs and skill development":
          "Programas de treinamento abrangentes e desenvolvimento de habilidades",
        "Script mastery training": "Treinamento de mestria em scripts",
        "DISC & VAK personality": "Personalidade DISC e VAK",
        "Process optimization": "Otimização de processo",
        "Moxi Works integration": "Integração Moxi Works",
        "Connect with other professionals and build relationships":
          "Conecte-se com outros profissionais e construa relacionamentos",
        "Community chat": "Chat da comunidade",
        "Collaboration tools": "Ferramentas de colaboração",
        "Professional networking": "Networking profissional",
        "Industry connections": "Conexões de indústria",
        "Professional design and consulting services": "Serviços de design e consultoria profissional",
        "Website design": "Design de site",
        "Marketing materials": "Materiais de marketing",
        "Brokerage consulting": "Consultoria de corretagem",
        "Custom solutions": "Soluções personalizadas",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "Não Somos Mais Uma Empresa de Tecnologia",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "Vivemos e respiramos imobiliário. Nosso plataforma nasceu do sucesso do mundo real nas trinquesas da indústria.",
        "Real Estate Is Our DNA": "O Imobiliário É Nosso DNA",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "Possuímos e operamos um dos maiores corretos Century 21 do sistema, com centenas de agentes e mais de 33 anos de sucesso comprovado na indústria. Isso não é conhecimento teórico - é experiência testada no campo do imobiliário.",
        "Built by Agents, for Agents": "Construído por Agentes, Para Agentes",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "Nossa plataforma existe porque nossos próprios agentes estavam alcançando resultados incríveis usando essas ferramentas, métodos de treinamento e scripts. Vimos a transformação de perto e sabíamos que tínhamos que compartilhar esses recursos revolucionários com toda a comunidade imobiliária.",
        Years: "Anos",
        "In Business": "Em Negócios",
        Transactions: "Transações",
        Completed: "Completadas",
        "Annual Sales": "Vendas Anuais",
        Volume: "Volume",
        "of Agents": "de Agentes",
        "In Our Brokerage": "Em Nosso Corretor",
        "Experience Meets Innovation": "Experiência Enfrenta Inovação",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "Quando você se junta ao The Next Level U, você não está apenas obtendo software - você está obtendo décadas de sabedoria imobiliária, estratégias comprovadas e ferramentas que geraram mais de um bilhão de dólares em vendas.",
        "🏆 Proven by Real Results": "🏆 Proveno por Resultados Reais",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "Preços Simples e Transparentes",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "Escolha o plano que funciona melhor para você. Todos os planos incluem acesso a todas as ferramentas e recursos.",
        Monthly: "Mensal",
        "Perfect for getting started": "Perfeito para começar",
        "/month": "/mês",
        "Access to all 11 AI tools": "Acesso a todas as 11 ferramentas de IA",
        "Complete training library": "Biblioteca de treinamento completa",
        "Marketing resources": "Recursos de marketing",
        "Community access": "Acesso à comunidade",
        "24/7 platform access": "Acesso à plataforma 24/7",
        "Get Started Monthly": "Começar Mensalmente",
        Annual: "Anual",
        "BEST VALUE": "MELHOR VALOR",
        "/year": "/ano",
        "Only $21/month - Save $108!": "Apenas $21/mês - Economize $108!",
        "Best value for serious agents": "Melhor valor para agentes sérios",
        "Save $108 per year": "Economize $108 por ano",
        "Get Started Annual": "Começar Anualmente",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "O Que Nossos Membros Dizem",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "Junte-se a milhares de profissionais imobiliários que transformaram seus negócios com The Next Level U.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "As ferramentas de IA transformaram completamente como eu crio anúncios. O que antes levava horas agora leva minutos, e a qualidade é incrível.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "Top Producer, Tampa Bay",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "As estratégias de prospecção e scripts me ajudaram a fechar 40% mais negócios este ano. O treinamento é de classe mundial.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Agente Century 21",
        "This platform has everything I need in one place. The community support and resources are incomparáveis.":
          "Esta plataforma tem tudo o que preciso em um só lugar. O apoio comunitário e os recursos são incomparáveis.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "Proprietário de Corretagem",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "Pronto para Transformar Seu Negócio?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "Junte-se a milhares de profissionais imobiliários de sucesso que levaram seus negócios ao próximo nível.",
        "Start Your Free Trial": "Comece Sua Trial Gratuita",
        "Schedule a Demo": "Agende uma Demo",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "Empoderando profissionais imobiliários com ferramentas alimentadas por IA e treinamento abrangente.",
        Platform: "Plataforma",
        Support: "Suporte",
        "Help Center": "Centro de Ajuda",
        "Contact Us": "Contate-nos",
        Community: "Comunidade",
        Status: "Status",
        Legal: "Legal",
        "Privacy Policy": "Política de Privacidade",
        "Terms of Service": "Termos de Serviço",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "Demo IdeaHub IA",
        "ListIT AI Demo": "Demo ListIT IA",
        "ScriptIT AI Demo": "Demo ListIT IA",
        "RealBio AI Demo": "Demo RealBio IA",
        "RolePlay AI Demo": "Demo RolePlay IA",
        "Action AI Demo": "Demo Action IA",
        "RealCoach AI Demo": "Demo RealCoach IA",
        "BizPlan AI Demo": "Demo BizPlan IA",
        "RealDeal AI Demo": "Demo RealDeal IA",
        "QuickCMA AI Demo": "Demo QuickCMA IA",
        "Who's Who AI Demo": "Demo Who's Who IA",
        "PropBot AI Demo": "Demo PropBot IA",
        "Platform Demo": "Demo da Plataforma",
      },
      de: {
        // Navigation
        "AI Hub": "Künstliche Intelligenz Hub",
        "Marketing Hub": "Marketing Hub",
        "Prospecting Hub": "Prospecting Hub",
        "Training Hub": "Training Hub",
        "Services Hub": "Services Hub",
        "Networking Hub": "Networking Hub",
        "Gear Hub": "Ausrüstung Hub",
        Profile: "Profil",
        "Get Support": "Hilfe anfordern",
        Features: "Merkmale",
        About: "Über uns",
        Pricing: "Preise",
        Testimonials: "Referenzen",
        "Sign In": "Anmelden",
        "Get Started": "Loslegen",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 Transformieren Sie Ihr Immobilienunternehmen",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "Immobilienplattform",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "Entdecken Sie Ihr volles Potenzial mit unseren künstlichen Intelligenz-gestützten Tools, umfassender Ausbildung, Marketingressourcen und einer lebendigen Community von Immobilienprofessionals.",
        "Start Your Journey": "Beginnen Sie Ihre Reise",
        "Watch Demo": "Demo ansehen",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "Alles, was Sie für Erfolg benötigen",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "Unsere umfassende Plattform bietet Ihnen alle Tools, Schulungen und Ressourcen, die Sie benötigen, um Ihr Immobilienunternehmen auf den nächsten Stand zu bringen.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 leistungsstarke künstliche Intelligenz-Tools, einschließlich ListIt, ScriptIt, RealBio, ActionAI und mehr",
        "For a demo of each tool, click it below:": "Klicken Sie auf jedes Tool, um eine Demo anzusehen:",
        "Complete prospecting strategies for every lead type": "Vollständige Prospekting-Strategien für jeden Lead-Typ",
        "FSBO & Expired Listings": "FSBO und abgelaufene Listings",
        "Sphere of Influence": "Einflussbereich",
        "Probate & Divorce Leads": "Leads für Nachlass und Scheidung",
        "Investor Strategies": "Investor-Strategien",
        "Professional marketing content and social media resources":
          "Professioneller Marketinginhalt und Social Media-Ressourcen",
        "Branded social content": "Markeninhalt für Social Media",
        "Market hot takes": "Marktanalyse",
        "Professional templates": "Professionelle Vorlagen",
        "Campaign strategies": "Kampagnenstrategien",
        "Comprehensive training programs and skill development":
          "Umfassende Schulungsprogramme und Fähigkeitsentwicklung",
        "Script mastery training": "Schulung zur Meisterung von Skripten",
        "DISC & VAK personality": "DISC & VAK Persönlichkeit",
        "Process optimization": "Prozessoptimierung",
        "Moxi Works integration": "Integration von Moxi Works",
        "Connect with other professionals and build relationships":
          "Verbinden Sie sich mit anderen Profis und bauen Sie Beziehungen auf",
        "Community chat": "Community-Chat",
        "Collaboration tools": "Kollaborationswerkzeuge",
        "Professional networking": "Professionelles Networking",
        "Industry connections": "Industrieverbindungen",
        "Professional design and consulting services": "Professionelle Design- und Beratungsdienstleistungen",
        "Website design": "Website-Design",
        "Marketing materials": "Marketingmaterialien",
        "Brokerage consulting": "Beratung für Immobilienmakler",
        "Custom solutions": "Individuelle Lösungen",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "Wir sind nicht nur eine weitere Tech-Firma",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "Wir leben und atmen Immobilien. Unsere Plattform wurde aus Erfolg im echten Leben der Branche geboren.",
        "Real Estate Is Our DNA": "Immobilien sind unser DNA",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "Wir besitzen und betreiben einen der größten Century 21-Brokeragen im System mit hunderten von Agenten und über 33 Jahren bewährtem Erfolg in der Branche. Dies ist keine theoretische Kenntnis - es ist eine im Einsatz getestete Erfahrung aus den ersten Linien der Immobilienbranche.",
        "Built by Agents, for Agents": "Gebaut von Agenten, für Agenten",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "Unsere Plattform existiert, weil unsere eigenen Agenten unglaubliche Ergebnisse mit diesen Tools, Schulungsmethoden und Skripten erzielt haben. Wir sahen die Transformation selbst und wussten, dass wir diese veränderten Ressourcen mit der gesamten Immobiliencommunity teilen müssen.",
        Years: "Jahre",
        "In Business": "In Geschäft",
        Transactions: "Transaktionen",
        Completed: "Abgeschlossen",
        "Annual Sales": "Jährliche Verkäufe",
        Volume: "Volumen",
        "of Agents": "von Agenten",
        "In Our Brokerage": "In unserem Brokerage",
        "Experience Meets Innovation": "Erfahrung trifft Innovation",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "Wenn Sie The Next Level U beitreten, erhalten Sie nicht nur Software - Sie erhalten Jahrzehnte von Immobilienwissen, bewährten Strategien und Tools, die über ein Milliarde Dollar in Verkäufen erbracht haben.",
        "🏆 Proven by Real Results": "🏆 Bewiesen durch echte Ergebnisse",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "Einfache, transparente Preise",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "Wählen Sie das passendste Angebot für Sie. Alle Pläne bieten Zugriff auf alle Tools und Ressourcen.",
        Monthly: "Monatlich",
        "Perfect for getting started": "Ideal für den Einstieg",
        "/month": "/Monat",
        "Access to all 11 AI tools": "Zugriff auf alle 11 künstlichen Intelligenz-Tools",
        "Complete training library": "Vollständige Schulungsbibliothek",
        "Marketing resources": "Marketingressourcen",
        "Community access": "Zugriff auf die Community",
        "24/7 platform access": "24/7 Zugriff auf die Plattform",
        "Get Started Monthly": "Monatlich beginnen",
        Annual: "Jährlich",
        "BEST VALUE": "BESTE WERTUNG",
        "/year": "/Jahr",
        "Only $21/month - Save $108!": "Nur $21/Monat - sparen Sie $108!",
        "Best value for serious agents": "Beste Wertung für ernsthafte Agenten",
        "Save $108 per year": "Jährlich $108 sparen",
        "Get Started Annual": "Jährlich beginnen",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "Was unsere Mitglieder sagen",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "Treten Sie tausenden von Immobilienprofessionals bei, die ihr Geschäft mit The Next Level U transformiert haben.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is unglaublich.":
          "Die künstlichen Intelligenz-Tools haben vollständig verändert, wie ich Listings erstelle. Was früher Stunden dauerte, dauert jetzt nur Minuten, und die Qualität ist unglaublich.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "Top Producer, Tampa Bay",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "Die Prospekting-Strategien und Skripte haben mir geholfen, 40% mehr Deals dieses Jahres zu schließen. Die Schulung ist weltklasse.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Century 21 Agent",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "Diese Plattform hat alles, was ich brauche, an einem Ort. Der Community-Support und die Ressourcen sind unübertroffen.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "Immobilienmaklerinhaber",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "Bereit, Ihr Geschäft zu transformieren?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "Treten Sie tausenden von erfolgreichen Immobilienprofessionals bei, die ihr Geschäft auf den nächsten Stand gebracht haben.",
        "Start Your Free Trial": "Starten Sie Ihre kostenlose Testversion",
        "Schedule a Demo": "Terminieren Sie eine Demo",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "Bereiten wir Immobilienprofessionals mit künstlichen Intelligenz-Tools und umfassender Ausbildung auf.",
        Platform: "Plattform",
        Support: "Support",
        "Help Center": "Hilfezentrum",
        "Contact Us": "Kontaktieren Sie uns",
        Community: "Community",
        Status: "Status",
        Legal: "Rechtliches",
        "Privacy Policy": "Datenschutzrichtlinie",
        "Terms of Service": "Nutzungsbedingungen",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "IdeaHub AI Demo",
        "ListIT AI Demo": "ListIT AI Demo",
        "ScriptIT AI Demo": "ScriptIT AI Demo",
        "RealBio AI Demo": "RealBio AI Demo",
        "RolePlay AI Demo": "RolePlay AI Demo",
        "Action AI Demo": "Action AI Demo",
        "RealCoach AI Demo": "RealCoach AI Demo",
        "BizPlan AI Demo": "BizPlan AI Demo",
        "RealDeal AI Demo": "RealDeal AI Demo",
        "QuickCMA AI Demo": "QuickCMA AI Demo",
        "Who's Who AI Demo": "Who's Who AI Demo",
        "PropBot AI Demo": "PropBot AI Demo",
        "Platform Demo": "Plattform Demo",
      },
      it: {
        // Navigation
        "AI Hub": "Hub IA",
        "Marketing Hub": "Hub Marketing",
        "Prospecting Hub": "Hub Prospezione",
        "Training Hub": "Hub Formazione",
        "Services Hub": "Hub Servizi",
        "Networking Hub": "Hub Networking",
        "Gear Hub": "Hub Attrezzature",
        Profile: "Profilo",
        "Get Support": "Ottieni Supporto",
        Features: "Funzionalità",
        About: "Chi Siamo",
        Pricing: "Prezzi",
        Testimonials: "Testimonianze",
        "Sign In": "Accedi",
        "Get Started": "Inizia",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 Trasforma il Tuo Negozio Immobiliare",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "Piattaforma Immobiliare",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "Rilascia il tuo potenziale con i nostre strumenti alimentati da IA, la formazione completa, le risorse di marketing e una comunità prospera di professionisti immobiliari.",
        "Start Your Journey": "Inizia la Tua Avventura",
        "Watch Demo": "Guarda la Demo",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "Tutto ciò che Hai Bisogno per Succeedere",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "La nostra piattaforma completa fornisce tutti gli strumenti, la formazione e le risorse che hai bisogno per portare il tuo business immobiliare al livello successivo.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 potenti strumenti IA che includono ListIt, ScriptIt, RealBio, ActionAI e altro ancora",
        "For a demo of each tool, click it below:": "Per una demo di ogni strumento, clicca qui sotto:",
        "Complete prospecting strategies for every lead type":
          "Strategie di prospezione complete per ogni tipo di lead",
        "FSBO & Expired Listings": "FSBO e Annunci Scaduti",
        "Sphere of Influence": "Sfera di influenza",
        "Probate & Divorce Leads": "Lead di Successione e Divorzio",
        "Investor Strategies": "Strategie di Investitore",
        "Professional marketing content and social media resources":
          "Contenuti di marketing professionale e risorse di social media",
        "Branded social content": "Contenuti social di marca",
        "Market hot takes": "Analisi del mercato",
        "Professional templates": "Modelli professionali",
        "Campaign strategies": "Strategie di campagna",
        "Comprehensive training programs and skill development":
          "Programmi di formazione completi e sviluppo delle competenze",
        "Script mastery training": "Formazione per la padronanza dello script",
        "DISC & VAK personality": "Personalità DISC e VAK",
        "Process optimization": "Ottimizzazione del processo",
        "Moxi Works integration": "Integrazione Moxi Works",
        "Connect with other professionals and build relationships":
          "Connettiti con altri professionisti e costruisci relazioni",
        "Community chat": "Chat della comunità",
        "Collaboration tools": "Strumenti di collaborazione",
        "Professional networking": "Networking professionale",
        "Industry connections": "Connessioni dell'industria",
        "Professional design and consulting services": "Servizi di progettazione e consulenza professionale",
        "Website design": "Progettazione sito web",
        "Marketing materials": "Materiali di marketing",
        "Brokerage consulting": "Consulenza di corruzione",
        "Custom solutions": "Soluzioni personalizzate",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "Non Siamo Solo Un'altra Azienda Tecnologica",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "Viviamo e respiriamo l'immobiliare. La nostra piattaforma è nata dal successo del mondo reale nelle trince della settore.",
        "Real Estate Is Our DNA": "L'Immobiliare È Il Nostro DNA",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "Possediamo e operiamo uno dei più grandi corruzioni Century 21 del sistema, con centinaia di agenti e oltre 33 anni di successo comprovato nel settore. Questo non è conoscenza teorica - è esperienza testata in prima linea dell'immobiliare.",
        "Built by Agents, for Agents": "Costruita da Agenti, Per Agenti",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "La nostra piattaforma esiste perché i nostre agenti stessi stavano ottenendo risultati incredibili utilizzando questi strumenti, metodi di formazione e script. Abbiamo visto la trasformazione di persona e sappiamo che dovevamo condividere queste risorse rivoluzionarie con tutta la comunità immobiliare.",
        Years: "Anni",
        "In Business": "In Affari",
        Transactions: "Transazioni",
        Completed: "Completate",
        "Annual Sales": "Vendite Annuale",
        Volume: "Volume",
        "of Agents": "di Agenti",
        "In Our Brokerage": "Nel Nostro Corruzione",
        "Experience Meets Innovation": "Esperienza Incontra Innovazione",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "Quando si unisce a The Next Level U, non si ottiene solo software - si ottiene decenni di saggezza immobiliare, strategie comprovate e strumenti che hanno generato oltre un miliardo di dollari in vendite.",
        "🏆 Proven by Real Results": "🏆 Dimostrato da Risultati Realistici",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "Prezzi Semplici e Transparenti",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "Scegli il piano che funziona meglio per te. Tutti i piani includono l'accesso a tutti gli strumenti e alle risorse.",
        Monthly: "Mensile",
        "Perfect for getting started": "Perfetto per iniziare",
        "/month": "/mese",
        "Access to all 11 AI tools": "Accesso a tutti i 11 strumenti IA",
        "Complete training library": "Libreria di formazione completa",
        "Marketing resources": "Risorse di marketing",
        "Community access": "Accesso alla comunità",
        "24/7 platform access": "Accesso alla piattaforma 24/7",
        "Get Started Monthly": "Inizia Mensilmente",
        Annual: "Annuale",
        "BEST VALUE": "MEGLIO VALORE",
        "/year": "/anno",
        "Only $21/month - Save $108!": "Solo $21/mese - Risparmia $108!",
        "Best value for serious agents": "Miglior valore per agenti seriosi",
        "Save $108 per year": "Risparmia $108 all'anno",
        "Get Started Annual": "Inizia Annuale",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "Cosa Dicono i Nostri Membri",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "Unisciti a migliaia di professionisti immobiliari che hanno trasformato il loro business con The Next Level U.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredibile.":
          "Gli strumenti IA hanno completamente trasformato il modo in cui creo annunci. Ciò che impiegava ore ora impiega minuti, e la qualità è incredibile.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "Top Producer, Tampa Bay",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "Le strategie di prospezione e gli script mi hanno aiutato a chiudere 40% più affari questo anno. La formazione è di classe mondiale.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Agente Century 21",
        "This platform has everything I need in one place. The community support and resources are incomparabili.":
          "Questa piattaforma ha tutto ciò che ho bisogno in un solo posto. Il supporto della comunità e le risorse sono incomparabili.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "Proprietario di Corruzione",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "Pronto a Trasformare il Tuo Business?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "Unisciti a migliaia di professionisti immobiliari di successo che hanno portato il loro business al livello successivo.",
        "Start Your Free Trial": "Inizia la Tua Trial Gratuita",
        "Schedule a Demo": "Pianifica una Demo",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "Potenziando professionisti immobiliari con strumenti alimentati da IA e formazione completa.",
        Platform: "Piattaforma",
        Support: "Supporto",
        "Help Center": "Centro di Aiuto",
        "Contact Us": "Contattaci",
        Community: "Comunità",
        Status: "Stato",
        Legal: "Legale",
        "Privacy Policy": "Politica sulla Privacy",
        "Terms of Service": "Termini di Servizio",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "Demo IdeaHub IA",
        "ListIT AI Demo": "Demo ListIT IA",
        "ScriptIT AI Demo": "Demo ScriptIT IA",
        "RealBio AI Demo": "Demo RealBio IA",
        "RolePlay AI Demo": "Demo RolePlay IA",
        "Action AI Demo": "Demo Action IA",
        "RealCoach AI Demo": "Demo RealCoach IA",
        "BizPlan AI Demo": "Demo BizPlan IA",
        "RealDeal AI Demo": "Demo RealDeal IA",
        "QuickCMA AI Demo": "Demo QuickCMA IA",
        "Who's Who AI Demo": "Demo Who's Who IA",
        "PropBot AI Demo": "Demo PropBot IA",
        "Platform Demo": "Demo della Piattaforma",
      },
      ja: {
        // Navigation
        "AI Hub": "AIハブ",
        "Marketing Hub": "マーケティングハブ",
        "Prospecting Hub": "プロスペクティングハブ",
        "Training Hub": "トレーニングハブ",
        "Services Hub": "サービスハブ",
        "Networking Hub": "ネットワーキングハブ",
        "Gear Hub": "ギアハブ",
        Profile: "プロフィール",
        "Get Support": "サポートを受ける",
        Features: "機能",
        About: "について",
        Pricing: "価格",
        Testimonials: "お客様の声",
        "Sign In": "ログイン",
        "Get Started": "始める",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 あなたの不動産ビジネスを変革する",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "不動産プラットフォーム",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "私たちのAIパワードツール、包括的なトレーニング、マーケティングリソース、そして活気ある不動産プロフェッショナルのコミュニティで、あなたの可能性を解放しましょう。",
        "Start Your Journey": "あなたの旅を始める",
        "Watch Demo": "デモを見る",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "成功するためのすべて",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "私たちの包括的なプラットフォームは、あなたの不動産ビジネスを次のレベルに上げるためのすべてのツール、トレーニング、リソースを提供します。",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "ListIt、ScriptIt、RealBio、ActionAIを含む12の強力なAIツール",
        "For a demo of each tool, click it below:": "各ツールのデモを見るには、以下をクリックしてください:",
        "Complete prospecting strategies for every lead type": "すべてのリードタイプの完全なプロスペクティング戦略",
        "FSBO & Expired Listings": "FSBOと期限切れのリスト",
        "Sphere of Influence": "影響範囲",
        "Probate & Divorce Leads": "相続と離婚のリード",
        "Investor Strategies": "投資家戦略",
        "Professional marketing content and social media resources":
          "プロフェッショナルなマーケティングコンテンツとソーシャルメディアリソース",
        "Branded social content": "ブランドのソーシャルコンテンツ",
        "Market hot takes": "市場の最新情報",
        "Professional templates": "プロフェッショナルなテンプレート",
        "Campaign strategies": "キャンペーン戦略",
        "Comprehensive training programs and skill development": "包括的なトレーニングプログラムとスキル開発",
        "Script mastery training": "スクリプトマスターシップトレーニング",
        "DISC & VAK personality": "DISC & VAK性格",
        "Process optimization": "プロセス最適化",
        "Moxi Works integration": "Moxi Works統合",
        "Connect with other professionals and build relationships": "他のプロフェッショナルとつながり、関係を築く",
        "Community chat": "コミュニティチャット",
        "Collaboration tools": "コラボレーションツール",
        "Professional networking": "プロフェッショナルネットワーキング",
        "Industry connections": "業界のつながり",
        "Professional design and consulting services": "プロフェッショナルデザインとコンサルティングサービス",
        "Website design": "ウェブサイトデザイン",
        "Marketing materials": "マーケティング資料",
        "Brokerage consulting": "ブローカージュールコンサルティング",
        "Custom solutions": "カスタムソリューション",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "私たちは単なるテクノロジー企業ではありません",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "私たちは不動産を生き生きと感じています。私たちのプラットフォームは、業界の戦いの最前线で見つけた実際の成功から生まれました。",
        "Real Estate Is Our DNA": "不動産は私たちのDNAです",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "私たちはシステムの中で最大のCentury 21ブローカージュールの一つを所有し運営しています。数百のエージェントと、業界で33年以上の実績があります。これは理論的な知識ではありません - これは不動産の最前线で試された経験です。",
        "Built by Agents, for Agents": "エージェントによって作られ、エージェントのために",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "私たちのプラットフォームは、私たち自身のエージェントがこれらのツール、トレーニング方法、スクリプトを使用して驚異的な結果を達成していることにあります。私たちはその変革を直接見ることができ、この革新的なリソースを整个の不動産コミュニティと分かち合わなければならないことを知りました。",
        Years: "年",
        "In Business": "営業中",
        Transactions: "取引",
        Completed: "完了",
        "Annual Sales": "年間売上",
        Volume: "ボリューム",
        "of Agents": "エージェント",
        "In Our Brokerage": "私たちのブローカージュールで",
        "Experience Meets Innovation": "経験と革新が会う",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "The Next Level Uに参加すると、単にソフトウェアを入手するだけでなく、数十年の不動産の知識、証明された戦略、そして1兆ドル以上の売上を生み出したツールを入手します。",
        "🏆 Proven by Real Results": "🏆 実際の結果で証明された",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "シンプルで透明な価格",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "あなたに最適なプランを選んでください。すべてのプランには、すべてのツールとリソースへのアクセスが含まれています。",
        Monthly: "月額",
        "Perfect for getting started": "始めに最適",
        "/month": "/月",
        "Access to all 11 AI tools": "すべての11のAIツールへのアクセス",
        "Complete training library": "完全なトレーニングライブラリ",
        "Marketing resources": "マーケティングリソース",
        "Community access": "コミュニティへのアクセス",
        "24/7 platform access": "24/7のプラットフォームへのアクセス",
        "Get Started Monthly": "月額で始める",
        Annual: "年間",
        "BEST VALUE": "最高の価値",
        "/year": "/年",
        "Only $21/month - Save $108!": "月額$21 - $108を節約!",
        "Best value for serious agents": "真剣なエージェントにとって最高の価値",
        "Save $108 per year": "年間$108を節約",
        "Get Started Annual": "年間で始める",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "メンバーの声",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "The Next Level Uでビジネスを変革した千数の不動産プロフェッショナルに参加してください。",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "AIツールは、リストを作成する方法を完全に変革しました。これまで数時間かかることが、今では数分で完了し、品質も素晴らしいです。",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "トッププロデューサー、タマパベイ",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "プロスペクティング戦略とスクリプトは、この年に40%以上の取引を締めくくってくれました。トレーニングは世界クラスです。",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Century 21エージェント",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "このプラットフォームには、私が必要とするすべてが含まれています。コミュニティのサポートとリソースは他にないほど優れています。",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "ブローカー所有者",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "ビジネスを変革する準備ができていますか？",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "The Next Level Uでビジネスを次のレベルに上げた千数の成功した不動産プロフェッショナルに参加してください。",
        "Start Your Free Trial": "無料トライアルを始める",
        "Schedule a Demo": "デモを予約する",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "AIパワードツールと包括的なトレーニングで、不動産プロフェッショナルを支援しています。",
        Platform: "プラットフォーム",
        Support: "サポート",
        "Help Center": "ヘルプセンター",
        "Contact Us": "お問い合わせ",
        Community: "コミュニティ",
        Status: "ステータス",
        Legal: "法的",
        "Privacy Policy": "プライバシーポリシー",
        "Terms of Service": "利用規約",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "IdeaHub AI デモ",
        "ListIT AI Demo": "ListIT AI デモ",
        "ScriptIT AI Demo": "ScriptIT AI デモ",
        "RealBio AI Demo": "RealBio AI デモ",
        "RolePlay AI Demo": "RolePlay AI デモ",
        "Action AI Demo": "Action AI デモ",
        "RealCoach AI Demo": "RealCoach AI デモ",
        "BizPlan AI Demo": "BizPlan AI デモ",
        "RealDeal AI Demo": "RealDeal AI デモ",
        "QuickCMA AI Demo": "QuickCMA AI デモ",
        "Who's Who AI Demo": "Who's Who AI デモ",
        "PropBot AI Demo": "PropBot AI デモ",
        "Platform Demo": "プラットフォームデモ",
      },
      ko: {
        // Navigation
        "AI Hub": "AI 허브",
        "Marketing Hub": "마케팅 허브",
        "Prospecting Hub": "프로스펙팅 허브",
        "Training Hub": "트레이닝 허브",
        "Services Hub": "서비스 허브",
        "Networking Hub": "네트워킹 허브",
        "Gear Hub": "장비 허브",
        Profile: "프로필",
        "Get Support": "지원 받기",
        Features: "기능",
        About: "회사 소개",
        Pricing: "가격",
        Testimonials: "고객의 목소리",
        "Sign In": "로그인",
        "Get Started": "시작하기",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 당신의 부동산 비즈니스를 변화시키세요",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "부동산 플랫폼",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "우리의 AI 기반 도구, 포괄적인 교육, 마케팅 자료 및 활기찬 부동산 전문가 커뮤니티로 당신의 잠재력을 발휘하세요.",
        "Start Your Journey": "여정을 시작하세요",
        "Watch Demo": "데모 보기",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "성공을 위한 모든 것",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "우리의 포괄적인 플랫폼은 부동산 비즈니스를 다음 단계로 이끌기 위해 필요한 모든 도구, 교육 및 자료를 제공합니다.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "ListIt, ScriptIt, RealBio, ActionAI를 포함한 12개의 강력한 AI 도구",
        "For a demo of each tool, click it below:": "각 도구의 데모를 보려면 아래를 클릭하세요:",
        "Complete prospecting strategies for every lead type": "모든 리드 유형에 대한 완벽한 프로스펙팅 전략",
        "FSBO & Expired Listings": "FSBO 및 만료된 목록",
        "Sphere of Influence": "영향력 범위",
        "Probate & Divorce Leads": "상속 및 이혼 리드",
        "Investor Strategies": "투자자 전략",
        "Professional marketing content and social media resources": "전문 마케팅 콘텐츠 및 소셜 미디어 자료",
        "Branded social content": "브랜드 소셜 콘텐츠",
        "Market hot takes": "시장 핫 테이크",
        "Professional templates": "전문 템플릿",
        "Campaign strategies": "캠페인 전략",
        "Comprehensive training programs and skill development": "포괄적인 교육 프로그램 및 기술 개발",
        "Script mastery training": "스크립트 마스터리 교육",
        "DISC & VAK personality": "DISC & VAK 성격",
        "Process optimization": "프로세스 최적화",
        "Moxi Works integration": "Moxi Works 통합",
        "Connect with other professionals and build relationships": "다른 전문가들과 연결하고 관계를 구축하세요",
        "Community chat": "커뮤니티 채팅",
        "Collaboration tools": "협업 도구",
        "Professional networking": "전문 네트워킹",
        "Industry connections": "산업 연결",
        "Professional design and consulting services": "전문 디자인 및 컨설팅 서비스",
        "Website design": "웹사이트 디자인",
        "Marketing materials": "마케팅 자료",
        "Brokerage consulting": "브로커지 상담",
        "Custom solutions": "사용자 정의 솔루션",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "우리는 단순한 기술 회사가 아닙니다",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "우리는 부동산을 살아가는 것입니다. 우리의 플랫폼은 산업의 전선에서 본 실제적인 성공으로 탄생했습니다.",
        "Real Estate Is Our DNA": "부동산은 우리의 DNA입니다",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "우리는 시스템에서 가장 큰 Century 21 브로커지 중 하나를 소유하고 운영하고 있습니다. 수백명의 에이전트와 산업에서 33년 이상의 입증된 성공을 가지고 있습니다. 이것은 이론적인 지식이 아닙니다 - 이것은 부동산 전선에서 테스트된 경험입니다.",
        "Built by Agents, for Agents": "에이전트가 만든, 에이전트를 위한",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "우리의 플랫폼은 이러한 도구, 교육 방법 및 스크립트를 사용하여 우리 자신의 에이전트가 놀라운 결과를 달성하고 있다는 것을 직접 보았기 때문입니다. 우리는 그 변화를 목격했고, 이러한 혁신적인 자원을 전체 부동산 커뮤니티와 공유해야 한다고 생각했습니다.",
        Years: "년",
        "In Business": "영업 중",
        Transactions: "거래",
        Completed: "완료됨",
        "Annual Sales": "연간 매출",
        Volume: "거래량",
        "of Agents": "의 에이전트",
        "In Our Brokerage": "우리의 브로커지에서",
        "Experience Meets Innovation": "경험과 혁신이 만나다",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "The Next Level U에 가입하면 소프트웨어만 받는 것이 아니라, 수십 년간의 부동산 지혜, 입증된 전략, 그리고 10억 달러 이상의 매출을 창출한 도구를 받게 됩니다.",
        "🏆 Proven by Real Results": "🏆 실제 결과로 입증됨",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "단순하고 투명한 가격",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "당신에게 가장 적합한 플랜을 선택하세요. 모든 플랜에는 모든 도구와 자원에 대한 액세스가 포함되어 있습니다.",
        Monthly: "월간",
        "Perfect for getting started": "시작하기에 이상적",
        "/month": "/월",
        "Access to all 11 AI tools": "모든 11개의 AI 도구에 대한 액세스",
        "Complete training library": "완전한 교육 라이브러리",
        "Marketing resources": "마케팅 자료",
        "Community access": "커뮤니티 액세스",
        "24/7 platform access": "24/7 플랫폼 액세스",
        "Get Started Monthly": "월간 시작하기",
        Annual: "연간",
        "BEST VALUE": "최상의 가치",
        "/year": "/년",
        "Only $21/month - Save $108!": "월 $21 - $108 절약!",
        "Best value for serious agents": "진지한 에이전트를 위한 최상의 가치",
        "Save $108 per year": "연간 $108 절약",
        "Get Started Annual": "연간 시작하기",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "우리 회원들의 말",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "The Next Level U로 비즈니스를 변화시킨 수천 명의 부동산 전문가와 함께하세요.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "AI 도구는 제가 목록을 만드는 방식을 완전히 변화시켰습니다. 과거에는 시간이 많이 걸렸지만 이제는 몇 분만에 완료되며, 품질도 놀라워요.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "타마파베이 최고 생산자",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "프로스펙팅 전략과 스크립트는 저에게 이 년도에 40% 더 많은 거래를 닫는 데 도움이 되었습니다. 교육은 세계적인 수준입니다.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Century 21 에이전트",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "이 플랫폼에는 제가 필요한 모든 것이 포함되어 있습니다. 커뮤니티 지원과 자료는 독특합니다.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "브로커 소유자",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "비즈니스를 변화시키 준비가 되셨나요?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "The Next Level U로 비즈니스를 다음 단계로 이끌어낸 수천 명의 성공한 부동산 전문가와 함께하세요.",
        "Start Your Free Trial": "무료 체험 시작하기",
        "Schedule a Demo": "데모 예약하기",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "AI 기반 도구와 포괄적인 교육으로 부동산 전문가를 지원하고 있습니다.",
        Platform: "플랫폼",
        Support: "지원",
        "Help Center": "도움말 센터",
        "Contact Us": "연락처",
        Community: "커뮤니티",
        Status: "상태",
        Legal: "법적",
        "Privacy Policy": "개인 정보 보호 정책",
        "Terms of Service": "이용 약관",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "IdeaHub AI 데모",
        "ListIT AI Demo": "ListIT AI 데모",
        "ScriptIT AI Demo": "ScriptIT AI 데모",
        "RealBio AI Demo": "RealBio AI 데모",
        "RolePlay AI Demo": "RolePlay AI 데모",
        "Action AI Demo": "Action AI 데모",
        "RealCoach AI Demo": "RealCoach AI 데모",
        "BizPlan AI Demo": "BizPlan AI 데모",
        "RealDeal AI Demo": "RealDeal AI 데모",
        "QuickCMA AI Demo": "QuickCMA AI 데모",
        "Who's Who AI Demo": "Who's Who AI 데모",
        "PropBot AI Demo": "PropBot AI 데모",
        "Platform Demo": "플랫폼 데모",
      },
      zh: {
        // Navigation
        "AI Hub": "AI中心",
        "Marketing Hub": "营销中心",
        "Prospecting Hub": "市场调研中心",
        "Training Hub": "培训中心",
        "Services Hub": "服务中心",
        "Networking Hub": "网络中心",
        "Gear Hub": "设备中心",
        Profile: "个人资料",
        "Get Support": "获取支持",
        Features: "特色",
        About: "关于我们",
        Pricing: "价格",
        Testimonials: "客户评价",
        "Sign In": "登录",
        "Get Started": "开始",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 转变您的房地产业务",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "房地产平台",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "利用我们的AI工具、全面培训、营销资源和充满活力的房地产专业人士社区，释放您的潜力。",
        "Start Your Journey": "开始您的旅程",
        "Watch Demo": "观看演示",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "您成功所需的一切",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "我们的全面平台为您提供所有需要的工具、培训和资源，以将您的房地产业务提升到下一个层次。",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "包括ListIt、ScriptIt、RealBio、ActionAI等在内的12个强大AI工具",
        "For a demo of each tool, click it below:": "点击下方查看每个工具的演示:",
        "Complete prospecting strategies for every lead type": "针对每种潜在客户类型，提供完整的市场调研策略",
        "FSBO & Expired Listings": "FSBO及过期房源",
        "Sphere of Influence": "影响力范围",
        "Probate & Divorce Leads": "遗产及离婚潜在客户",
        "Investor Strategies": "投资者策略",
        "Professional marketing content and social media resources": "专业的营销内容及社交媒体资源",
        "Branded social content": "品牌社交媒体内容",
        "Market hot takes": "市场热门分析",
        "Professional templates": "专业模板",
        "Campaign strategies": "活动策略",
        "Comprehensive training programs and skill development": "全面的培训计划及技能提升",
        "Script mastery training": "脚本掌握培训",
        "DISC & VAK personality": "DISC & VAK性格",
        "Process optimization": "流程优化",
        "Moxi Works integration": "Moxi Works集成",
        "Connect with other professionals and build relationships": "与其他专业人士建立联系并构建关系",
        "Community chat": "社区聊天",
        "Collaboration tools": "协作工具",
        "Professional networking": "专业网络",
        "Industry connections": "行业联系",
        "Professional design and consulting services": "专业设计及咨询服务",
        "Website design": "网站设计",
        "Marketing materials": "营销材料",
        "Brokerage consulting": "经纪咨询",
        "Custom solutions": "定制解决方案",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "我们不仅仅是一家科技公司",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "我们生活和呼吸房地产。我们的平台诞生于行业前线的实际成功。",
        "Real Estate Is Our DNA": "房地产就是我们的DNA",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "我们拥有并运营系统中最大的Century 21经纪公司之一，拥有数百名经纪人和超过33年的行业成功经验。这不是理论知识——这是从房地产前线测试过的实战经验。",
        "Built by Agents, for Agents": "由经纪人打造，为经纪人",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "我们的平台存在是因为我们的经纪人使用这些工具、培训方法和脚本取得了令人惊叹的结果。我们亲眼见证了这种变化，并知道我们必须与整个房地产社区分享这些颠覆性的资源。",
        Years: "年",
        "In Business": "在业务中",
        Transactions: "交易",
        Completed: "完成",
        "Annual Sales": "年度销售额",
        Volume: "交易量",
        "of Agents": "的经纪人",
        "In Our Brokerage": "在我们的经纪公司",
        "Experience Meets Innovation": "经验与创新相遇",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "当你加入The Next Level U时，你不仅仅得到软件——你得到的是数十年的房地产智慧、经过验证的策略和创造了数十亿美元销售额的工具。",
        "🏆 Proven by Real Results": "🏆 由实际结果验证",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "简单透明的价格",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "选择最适合你的计划。所有计划都包括对所有工具和资源的访问。",
        Monthly: "月度",
        "Perfect for getting started": "非常适合入门",
        "/month": "/月",
        "Access to all 11 AI tools": "访问所有11个AI工具",
        "Complete training library": "完整的培训资料库",
        "Marketing resources": "营销资源",
        "Community access": "社区访问",
        "24/7 platform access": "24/7平台访问",
        "Get Started Monthly": "月度开始",
        Annual: "年度",
        "BEST VALUE": "最佳价值",
        "/year": "/年",
        "Only $21/month - Save $108!": "只需$21/月 - 节省$108！",
        "Best value for serious agents": "最适合认真经纪人的最佳价值",
        "Save $108 per year": "每年节省$108",
        "Get Started Annual": "年度开始",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "我们的会员怎么说",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "加入成千上万的房地产专业人士，他们通过The Next Level U改变了他们的业务。",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "这些AI工具完全改变了我创建房源的方式。过去需要几个小时的工作现在只需要几分钟，而且质量令人惊叹。",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "Tampa Bay顶级生产商",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "这些市场调研策略和脚本帮助我在今年关闭了40%更多的交易。培训是世界级的。",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Century 21经纪人",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "这个平台汇集了我所需的一切。社区支持和资源无可比拟。",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "经纪人所有者",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "准备好改变您的业务了吗？",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "加入成千上万的成功房地产专业人士，他们已经将业务提升到了新的层次。",
        "Start Your Free Trial": "开始您的免费试用",
        "Schedule a Demo": "预约演示",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "通过AI工具和全面培训，为房地产专业人士提供动力。",
        Platform: "平台",
        Support: "支持",
        "Help Center": "帮助中心",
        "Contact Us": "联系我们",
        Community: "社区",
        Status: "状态",
        Legal: "法律",
        "Privacy Policy": "隐私政策",
        "Terms of Service": "服务条款",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "IdeaHub AI演示",
        "ListIT AI Demo": "ListIT AI演示",
        "ScriptIT AI Demo": "ScriptIT AI演示",
        "RealBio AI Demo": "RealBio AI演示",
        "RolePlay AI Demo": "RolePlay AI演示",
        "Action AI Demo": "Action AI演示",
        "RealCoach AI Demo": "RealCoach AI演示",
        "BizPlan AI Demo": "BizPlan AI演示",
        "RealDeal AI Demo": "RealDeal AI演示",
        "QuickCMA AI Demo": "QuickCMA AI演示",
        "Who's Who AI Demo": "Who's Who AI演示",
        "PropBot AI Demo": "PropBot AI演示",
        "Platform Demo": "平台演示",
      },
      ru: {
        // Navigation
        "AI Hub": "Центр ИИ",
        "Marketing Hub": "Центр Маркетинга",
        "Prospecting Hub": "Центр Проникновения",
        "Training Hub": "Центр Обучения",
        "Services Hub": "Центр Услуг",
        "Networking Hub": "Центр Сетевого Общения",
        "Gear Hub": "Центр Оборудования",
        Profile: "Профиль",
        "Get Support": "Получить Поддержку",
        Features: "Функции",
        About: "О нас",
        Pricing: "Цены",
        Testimonials: "Отзывы",
        "Sign In": "Войти",
        "Get Started": "Начать",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 Преобразуйте Вашу Недвижимостную Компанию",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "Платформа Недвижимости",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "Разблокируйте свой потенциал с нашими инструментами на основе ИИ, полным курсами обучения, маркетинговыми ресурсами и процветающей сообществом недвижимостных профессионалов.",
        "Start Your Journey": "Начните Ваш Путь",
        "Watch Demo": "Посмотреть Демо",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "Всё, что Вам Нужно для Успеха",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "Наша всесторонняя платформа предоставляет все необходимые инструменты, курсы обучения и ресурсы для того, чтобы вывести вашу недвижимостную компанию на новый уровень.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 мощных инструментов ИИ, включая ListIt, ScriptIt, RealBio, ActionAI и другие",
        "For a demo of each tool, click it below:": "Для просмотра демонстрации каждого инструмента нажмите ниже:",
        "Complete prospecting strategies for every lead type": "Полные стратегии проникновения для каждого типа лидов",
        "FSBO & Expired Listings": "FSBO и просроченные объявления",
        "Sphere of Influence": "Сфера влияния",
        "Probate & Divorce Leads": "Лиды по наследству и разводу",
        "Investor Strategies": "Стратегии инвесторов",
        "Professional marketing content and social media resources":
          "Профессиональный маркетинговый контент и ресурсы социальных сетей",
        "Branded social content": "Брендируемый социальный контент",
        "Market hot takes": "Анализ рынка",
        "Professional templates": "Профессиональные шаблоны",
        "Campaign strategies": "Стратегии кампаний",
        "Comprehensive training programs and skill development": "Полные программы обучения и развитие навыков",
        "Script mastery training": "Обучение мастерству скриптов",
        "DISC & VAK personality": "Персональность DISC и VAK",
        "Process optimization": "Оптимизация процессов",
        "Moxi Works integration": "Интеграция Moxi Works",
        "Connect with other professionals and build relationships":
          "Свяжитесь с другими профессионалами и постройте отношения",
        "Community chat": "Чат сообщества",
        "Collaboration tools": "Инструменты для сотрудничества",
        "Professional networking": "Профессиональное сетевое взаимодействие",
        "Industry connections": "Отраслевые связи",
        "Professional design and consulting services": "Профессиональные услуги по дизайну и консалтингу",
        "Website design": "Дизайн веб-сайта",
        "Marketing materials": "Маркетинговые материалы",
        "Brokerage consulting": "Консалтинг по брокерству",
        "Custom solutions": "Индивидуальные решения",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "Мы не просто еще одна технологическая компания",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "Мы живем и дышим недвижимостью. Наша платформа родилась из реального успеха в тяжелых боях нашей отрасли.",
        "Real Estate Is Our DNA": "Недвижимость — это наша ДНК",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "Мы владеем и управляем одним из крупнейших Century 21 брокерских агентств в системе, с сотнями агентов и более 33 лет успешной работы в отрасли. Это не теоретические знания — это опыт, проверенный в бою на передовых недвижимости.",
        "Built by Agents, for Agents": "Создано агентами, для агентов",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "Наша платформа существует потому, что наши собственные агенты достигали удивительных результатов с помощью этих инструментов, методов обучения и скриптов. Мы видели эту трансформацию вживую и знали, что должны поделиться этими революционными ресурсами с всей недвижимостной сообществом.",
        Years: "Лет",
        "In Business": "В бизнесе",
        Transactions: "Транзакции",
        Completed: "Завершено",
        "Annual Sales": "Годовые продажи",
        Volume: "Объем",
        "of Agents": "агентов",
        "In Our Brokerage": "В нашем брокерском агентстве",
        "Experience Meets Innovation": "Опыт встречает инновации",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "Когда вы присоединяетесь к The Next Level U, вы получаете не только программное обеспечение — вы получаете десятилетия опыта в недвижимости, проверенные стратегии и инструменты, которые сгенерировали более миллиарда долларов в продажах.",
        "🏆 Proven by Real Results": "🏆 Подтверждено реальными результатами",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "Простые и Честные Цены",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "Выберите план, который лучше всего подходит для вас. Все планы включают доступ ко всем инструментам и ресурсам.",
        Monthly: "Ежемесячно",
        "Perfect for getting started": "Идеально подходит для начала",
        "/month": "/месяц",
        "Access to all 11 AI tools": "Доступ ко всем 11 инструментам ИИ",
        "Complete training library": "Полная библиотека обучения",
        "Marketing resources": "Маркетинговые ресурсы",
        "Community access": "Доступ к сообществу",
        "24/7 platform access": "Доступ к платформе 24/7",
        "Get Started Monthly": "Начать Ежемесячно",
        Annual: "Ежегодно",
        "BEST VALUE": "ЛУЧШЕЕ ЗНАЧЕНИЕ",
        "/year": "/год",
        "Only $21/month - Save $108!": "Только $21/месяц — сэкономьте $108!",
        "Best value for serious agents": "Лучшее соотношение цены и качества для профессионалов",
        "Save $108 per year": "Сэкономьте $108 в год",
        "Get Started Annual": "Начать Ежегодно",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "Что Говорят Наши Члены",
        "Join thousands of real estate professionals who have transformed their business with The Next Level U.":
          "Присоединяйтесь к тысячам профессионалов недвижимости, которые преобразовали свои бизнесы с помощью The Next Level U.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "Инструменты ИИ полностью изменили способ создания объявлений. Что раньше занимало часы, теперь занимает минуты, и качество просто потрясающее.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "Топ Производитель, Tampa Bay",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "Стратегии и скрипты проникновения помогли мне закрыть на 40% больше сделок в этом году. Обучение мирового класса.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "Агент Century 21",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "Эта платформа имеет все, что мне нужно в одном месте. Поддержка сообщества и ресурсы безупречны.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "Владелец брокерского агентства",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "Готовы Преобразовать Ваш Бизнес?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "Присоединяйтесь к тысячам успешных профессионалов недвижимости, которые преобразовали свои бизнесы.",
        "Start Your Free Trial": "Начните Бесплатную Триал",
        "Schedule a Demo": "Запишитесь на Демо",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "Предоставляем профессионалам недвижимости инструменты на основе ИИ и полное обучение.",
        Platform: "Платформа",
        Support: "Поддержка",
        "Help Center": "Центр Помощи",
        "Contact Us": "Свяжитесь с Нами",
        Community: "Сообщество",
        Status: "Статус",
        Legal: "Юридическая информация",
        "Privacy Policy": "Политика конфиденциальности",
        "Terms of Service": "Условия использования",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "Демо IdeaHub AI",
        "ListIT AI Demo": "Демо ListIT AI",
        "ScriptIT AI Demo": "Демо ScriptIT AI",
        "RealBio AI Demo": "Демо RealBio AI",
        "RolePlay AI Demo": "Демо RolePlay AI",
        "Action AI Demo": "Демо Action AI",
        "RealCoach AI Demo": "Демо RealCoach AI",
        "BizPlan AI Demo": "Демо BizPlan AI",
        "RealDeal AI Demo": "Демо RealDeal AI",
        "QuickCMA AI Demo": "Демо QuickCMA AI",
        "Who's Who AI Demo": "Демо Who's Who AI",
        "PropBot AI Demo": "Демо PropBot AI",
        "Platform Demo": "Демо платформы",
      },
      ar: {
        // Navigation
        "AI Hub": "مركز الذكاء الاصطناعي",
        "Marketing Hub": "مركز التسويق",
        "Prospecting Hub": "مركز التحقيق",
        "Training Hub": "مركز التدريب",
        "Services Hub": "مركز الخدمات",
        "Networking Hub": "مركز الشبكات",
        "Gear Hub": "مركز الأدوات",
        Profile: "الملف الشخصي",
        "Get Support": "الحصول على الدعم",
        Features: "المميزات",
        About: "معلومات عنا",
        Pricing: "التسعير",
        Testimonials: "التوصيات",
        "Sign In": "تسجيل الدخول",
        "Get Started": "ابدأ",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 تحويل عملك العقاري إلى المستوى التالي",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "منصة العقارات",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "اكتشف قدراتك مع أدواتنا القوية المدعومة بالذكاء الاصطناعي، وبرامج التدريب الشاملة، وموارد التسويق، ومجتمع نشط من الخبراء العقاراتي.",
        "Start Your Journey": "ابدأ رحلتك",
        "Watch Demo": "شاهد العرض التوضيحي",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "كل ما تحتاجه للنجاح",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "منصتنا الشاملة توفر لك كل الأدوات والتدريبات والموارد التي تحتاجها لرفع عملك العقاري إلى المستوى التالي.",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 أداة ذكاء اصطناعي قوية تشمل ListIt، ScriptIt، RealBio، ActionAI، وغيرها",
        "For a demo of each tool, click it below:": "لعرض توضيحي لكل أداة، انقر عليها أدناه:",
        "Complete prospecting strategies for every lead type": "استراتيجيات كاملة للتحقيق في كل نوع من الرؤوس",
        "FSBO & Expired Listings": "العقارات الخاصة بالمالك وقائمة العقارات المنتهية",
        "Sphere of Influence": "النطاق الإيجابي",
        "Probate & Divorce Leads": "الرؤوس المتعلقة بالوراثة والطلاق",
        "Investor Strategies": "استراتيجيات المستثمرين",
        "Professional marketing content and social media resources":
          "محتوى التسويق المهني وموارد وسائل التواصل الاجتماعي",
        "Branded social content": "محتوى وسائل التواصل الاجتماعي مميز",
        "Market hot takes": "تحليلات السوق الحارة",
        "Professional templates": "قوالب محترفة",
        "Campaign strategies": "استراتيجيات الحملات",
        "Comprehensive training programs and skill development": "برامج التدريب الشاملة وتطوير المهارات",
        "Script mastery training": "تدريب على م dominance النصوص",
        "DISC & VAK personality": "شخصية DISC و VAK",
        "Process optimization": "تحسين العمليات",
        "Moxi Works integration": "تكامل Moxi Works",
        "Connect with other professionals and build relationships": "اتصل بالمهنيين الآخرين و بنِّي علاقات",
        "Community chat": "محادثة المجتمع",
        "Collaboration tools": "أدوات التعاون",
        "Professional networking": "شبكات مهنية",
        "Industry connections": "اتصالات الصناعة",
        "Professional design and consulting services": "خدمات التصميم والконсультancy المهنية",
        "Website design": "تصميم الموقع",
        "Marketing materials": "مواد التسويق",
        "Brokerage consulting": "خدمات الاستشارات للشركات العقارية",
        "Custom solutions": "حلول مخصصة",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "نحن ليس مجرد شركة تكنولوجيا أخرى",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "نحن نعيش و نتنفس العقارات. منصتنا ولدت من النجاح في عالم الواقع في صناعتنا.",
        "Real Estate Is Our DNA": "العقارات هي جزء من نفسينا",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "نحن نمتلك و ندير واحدة من أكبر الشركات العقارية في النظام، مع مئات الوكالات والخبرة الناجحة في الصناعة لأكثر من 33 عاما. هذا ليس مجرد معرفة نظرية - إنه تجربة مثالية من خطوط العقارات.",
        "Built by Agents, for Agents": "بنِّيت من قبل الوكالات، للوكالات",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "منصتنا موجودة لأن الوكالات الخاصة بنا كانت تحقق نتائج مذهلة باستخدام هذه الأدوات والطرق التدريبية والنصوص. رأينا التحول بنفسنا وعرفنا أننا يجب أن نشارك هذه الموارد المذهلة مع المجتمع العقاري بأكمله.",
        Years: "سنوات",
        "In Business": "في العمل",
        Transactions: "المعاملات",
        Completed: "مكتملة",
        "Annual Sales": "المبيعات السنوية",
        Volume: "الحجم",
        "of Agents": "من الوكالات",
        "In Our Brokerage": "في مكتبنا",
        "Experience Meets Innovation": "تجربة تلتقي بالإبداع",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "عندما تانضم إلى The Next Level U، لن تتلقى فقط برنامج كمبيوتر - ستتلقى عقود من الذكاء العقاري، والاستراتيجيات المثبتة، والأدوات التي أنتجت أكثر من مليار دولار في المبيعات.",
        "🏆 Proven by Real Results": "🏆 مثبتة من خلال النتائج الحقيقية",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "أسعار بسيطة وشفافة",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "اختر الخطة التي تناسبك بشكل أفضل. تشمل جميع الخطط الوصول إلى كل أداة وموارد.",
        Monthly: "شهري",
        "Perfect for getting started": "مثالية للبدء",
        "/month": "/شهر",
        "Access to all 11 AI tools": "وصول إلى جميع أدوات الذكاء الاصطناعي 11",
        "Complete training library": "مكتبة التدريب الكاملة",
        "Marketing resources": "موارد التسويق",
        "Community access": "وصول إلى المجتمع",
        "24/7 platform access": "وصول إلى المنصة 24/7",
        "Get Started Monthly": "ابدأ شهريًا",
        Annual: "سنوي",
        "BEST VALUE": "أفضل القيمة",
        "/year": "/عام",
        "Only $21/month - Save $108!": "فقط $21/شهر - اوفر $108!",
        "Best value for serious agents": "أفضل القيمة للموكلين المحترفين",
        "Save $108 per year": "وفر $108 سنويًا",
        "Get Started Annual": "ابدأ سنويًا",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "ماذا يقول أعضائنا",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "انضم إلى آلاف المحترفين العقاراتي الناجحين الذين قدموا تغييرًا في أعمالهم.",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "أدوات الذكاء الاصطناعي تحولت تمامًا كيف أقوم بإنشاء القائمة. ما كان يستغرق ساعات الآن يستغرق دقائق فقط، و الجودة مذهلة.",
        "Sarah Johnson": "Sarah Johnson",
        "Top Producer, Tampa Bay": "المنتج الرائدة، Tampa Bay",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "استراتيجيات التحقيق والنصوص مساعدتني في إغلاق 40٪ أكثر صفقات هذا العام. التدريب عالمي المستوى.",
        "Mike Rodriguez": "Mike Rodriguez",
        "Century 21 Agent": "وكيل Century 21",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "هذه المنصة تحتوي على كل ما أحتاجه في مكان واحد. دعم المجتمع و الموارد غير مسبوق.",
        "Lisa Chen": "Lisa Chen",
        "Broker Owner": "مالك الوكالة",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "هل أنت مستعد لتحويل عملك؟",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "انضم إلى آلاف المحترفين العقاراتي الناجحين الذين قدموا تغييرًا في أعمالهم.",
        "Start Your Free Trial": "ابدأ تجربتك المجانية",
        "Schedule a Demo": "جدول عرض توضيحي",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "تعزيز المحترفين العقاراتي باستخدام أدوات ذكاء اصطناعي وتدريب شامل.",
        Platform: "المنصة",
        Support: "الدعم",
        "Help Center": "مركز المساعدة",
        "Contact Us": "اتصل بنا",
        Community: "المجتمع",
        Status: "الحالة",
        Legal: "قانوني",
        "Privacy Policy": "سياسة الخصوصية",
        "Terms of Service": "شروط الخدمة",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "عرض توضيحي IdeaHub AI",
        "ListIT AI Demo": "عرض توضيحي ListIT AI",
        "ScriptIT AI Demo": "عرض توضيحي ScriptIT AI",
        "RealBio AI Demo": "عرض توضيحي RealBio AI",
        "RolePlay AI Demo": "عرض توضيحي RolePlay AI",
        "Action AI Demo": "عرض توضيحي Action AI",
        "RealCoach AI Demo": "عرض توضيحي RealCoach AI",
        "BizPlan AI Demo": "عرض توضيحي BizPlan AI",
        "RealDeal AI Demo": "عرض توضيحي RealDeal AI",
        "QuickCMA AI Demo": "عرض توضيحي QuickCMA AI",
        "Who's Who AI Demo": "عرض توضيحي Who's Who AI",
        "PropBot AI Demo": "عرض توضيحي PropBot AI",
        "Platform Demo": "عرض توضيحي للمنصة",
      },
      hi: {
        // Navigation
        "AI Hub": "AI हूब",
        "Marketing Hub": "मार्केटिंग हूब",
        "Prospecting Hub": "प्रोस्पेक्टिंग हूब",
        "Training Hub": "ट्रेनिंग हूब",
        "Services Hub": "सेवाएं हूब",
        "Networking Hub": "नेटवर्किंग हूब",
        "Gear Hub": "गीर हूब",
        Profile: "प्रोफाइल",
        "Get Support": "सहायता पाएं",
        Features: "विशेषताएं",
        About: "के बारे में",
        Pricing: "कीमत",
        Testimonials: "टेस्टिमोनियल",
        "Sign In": "साइन इन करें",
        "Get Started": "शुरू करें",

        // Consumer Homepage - Header
        "🚀 Transform Your Real Estate Business": "🚀 आपका वास्तुसंचालन व्यवसाय को परिवर्तित करें",
        "The Next Level U": "The Next Level U",
        "Real Estate Platform": "वास्तुसंचालन प्लेटफॉर्म",
        "Unlock your potential with our AI-powered tools, comprehensive training, marketing resources, and a thriving community of real estate professionals.":
          "हमारे AI व्यवस्थित उपकरणों, संपूर्ण प्रशिक्षण, मार्केटिंग संसाधनों और एक जीवितजी वास्तुसंचालन व्यवसायों की समुदाय के साथ आपका अपना पूर्ण प्रतिष्ठित करें।",
        "Start Your Journey": "अपनी यात्रा शुरू करें",
        "Watch Demo": "डेमो देखें",

        // Consumer Homepage - Features Section
        "Everything You Need to Succeed": "सफलता के लिए आपको जो कुछ भी चाहिए",
        "Our comprehensive platform provides all the tools, training, and resources you need to take your real estate business to the next level.":
          "हमारा समग्र प्लेटफार्म आपको सभी उपकरण, प्रशिक्षण और संसाधन प्रदान करता है जो आपको अपने रियल एस्टेट व्यवसाय को अगले स्तर पर ले जाने की आवश्यकता है।",
        "12 powerful AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more":
          "12 शक्तिशाली AI उपकरण जिनमें ListIt, ScriptIt, RealBio, ActionAI और अधिक शामिल हैं",
        "For a demo of each tool, click it below:": "प्रत्येक उपकरण के डेमो के लिए, नीचे क्लिक करें:",
        "Complete prospecting strategies for every lead type": "हर लीड प्रकार के लिए पूर्ण प्रॉस्पेक्टिंग रणनीतियाँ",
        "FSBO & Expired Listings": "FSBO और समाप्त लिस्टिंग",
        "Sphere of Influence": "प्रभाव का क्षेत्र",
        "Probate & Divorce Leads": "विरासत और तलाक लीड",
        "Investor Strategies": "निवेशक रणनीतियाँ",
        "Professional marketing content and social media resources": "पेशेवर मार्केटिंग सामग्री और सोशल मीडिया संसाधन",
        "Branded social content": "ब्रांडेड सोशल सामग्री",
        "Market hot takes": "बाजार की ताजा जानकारी",
        "Professional templates": "पेशेवर टेम्पलेट",
        "Campaign strategies": "अभियान रणनीतियाँ",
        "Comprehensive training programs and skill development": "व्यापक प्रशिक्षण कार्यक्रम और कौशल विकास",
        "Script mastery training": "स्क्रिप्ट मास्टर प्रशिक्षण",
        "DISC & VAK personality": "DISC और VAK व्यक्तित्व",
        "Process optimization": "प्रक्रिया अनुकूलन",
        "Moxi Works integration": "Moxi Works एकीकरण",
        "Connect with other professionals and build relationships": "अन्य पेशेवरों से जुड़ें और संबंध बनाएं",
        "Community chat": "समुदाय चैट",
        "Collaboration tools": "सहयोग उपकरण",
        "Professional networking": "पेशेवर नेटवर्किंग",
        "Industry connections": "उद्योग संबंध",
        "Professional design and consulting services": "पेशेवर डिजाइन और परामर्श सेवाएँ",
        "Website design": "वेबसाइट डिजाइन",
        "Marketing materials": "मार्केटिंग सामग्री",
        "Brokerage consulting": "ब्रोकर परामर्श",
        "Custom solutions": "कस्टम समाधान",

        // Consumer Homepage - About Section
        "We're Not Just Another Tech Company": "हम सिर्फ एक और तकनीकी कंपनी नहीं हैं",
        "We live and breathe real estate. Our platform was born from real-world success in the trenches of the industry.":
          "हम रियल एस्टेट में जीते और सांस लेते हैं। हमारा प्लेटफार्म उद्योग की खाइयों में वास्तविक दुनिया की सफलता से जन्मा है।",
        "Real Estate Is Our DNA": "रियल एस्टेट हमारी डीएनए है",
        "We own and operate one of the largest Century 21 brokerages in the system, with hundreds of agents and over 33 years of proven success in the industry. This isn't theoretical knowledge—it's battle-tested experience from the front lines of real estate.":
          "हम सिस्टम में सबसे बड़े सेंचुरी 21 ब्रोकरों में से एक के मालिक हैं और इसे संचालित करते हैं, जिसमें सैकड़ों एजेंट और उद्योग में 33 वर्षों से अधिक का सिद्ध अनुभव है। यह कोई सैद्धांतिक ज्ञान नहीं है—यह रियल एस्टेट के मोर्चे से परीक्षण किया गया अनुभव है।",
        "Built by Agents, for Agents": "एजेंटों द्वारा, एजेंटों के लिए निर्मित",
        "Our platform exists because our own agents were achieving incredible results using these tools, training methods, and scripts. We saw the transformation firsthand and knew we had to share these game-changing resources with the entire real estate community.":
          "हमारा प्लेटफार्म इसलिए मौजूद है क्योंकि हमारे अपने एजेंट इन उपकरणों, प्रशिक्षण विधियों और स्क्रिप्ट का उपयोग करके अद्भुत परिणाम प्राप्त कर रहे थे। हमने पहले हाथ से परिवर्तन देखा और हमें पता था कि हमें इन गेम-चेंजिंग संसाधनों को पूरे रियल एस्टेट समुदाय के साथ साझा करना होगा।",
        Years: "साल",
        "In Business": "व्यापार में",
        Transactions: "लेनदेन",
        Completed: "पूर्ण",
        "Annual Sales": "वार्षिक बिक्री",
        Volume: "वॉल्यूम",
        "of Agents": "एजेंटों का",
        "In Our Brokerage": "हमारे ब्रोकर में",
        "Experience Meets Innovation": "अनुभव नवाचार से मिलता है",
        "When you join The Next Level U, you're not just getting software—you're getting decades of real estate wisdom, proven strategies, and tools that have generated over a billion dollars in sales.":
          "जब आप द नेक्स्ट लेवल यू में शामिल होते हैं, तो आप केवल सॉफ़्टवेयर नहीं प्राप्त कर रहे हैं—आप रियल एस्टेट की बुद्धिमत्ता, सिद्ध रणनीतियों और उपकरणों की दशकों की प्राप्ति कर रहे हैं, जिन्होंने एक अरब डॉलर से अधिक की बिक्री उत्पन्न की है।",
        "🏆 Proven by Real Results": "🏆 वास्तविक परिणामों द्वारा सिद्ध",

        // Consumer Homepage - Pricing Section
        "Simple, Transparent Pricing": "सरल, पारदर्शी मूल्य निर्धारण",
        "Choose the plan that works best for you. All plans include access to every tool and resource.":
          "उस योजना का चयन करें जो आपके लिए सबसे अच्छा काम करती है। सभी योजनाओं में हर उपकरण और संसाधन तक पहुंच शामिल है।",
        Monthly: "मासिक",
        "Perfect for getting started": "शुरू करने के लिए सही",
        "/month": "/महीना",
        "Access to all 11 AI tools": "सभी 11 AI उपकरणों तक पहुंच",
        "Complete training library": "पूर्ण प्रशिक्षण पुस्तकालय",
        "Marketing resources": "मार्केटिंग संसाधन",
        "Community access": "समुदाय तक पहुंच",
        "24/7 platform access": "24/7 प्लेटफार्म तक पहुंच",
        "Get Started Monthly": "मासिक रूप से शुरू करें",
        Annual: "वार्षिक",
        "BEST VALUE": "सर्वश्रेष्ठ मूल्य",
        "/year": "/वर्ष",
        "Only $21/month - Save $108!": "केवल $21/महीना - $108 बचाएं!",
        "Best value for serious agents": "गंभीर एजेंटों के लिए सर्वश्रेष्ठ मूल्य",
        "Save $108 per year": "प्रति वर्ष $108 बचाएं",
        "Get Started Annual": "वार्षिक रूप से शुरू करें",

        // Consumer Homepage - Testimonials Section
        "What Our Members Say": "हमारे सदस्यों का क्या कहना है",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "उन हजारों सफल रियल एस्टेट पेशेवरों में शामिल हों जिन्होंने अपने व्यवसाय को अगले स्तर पर ले लिया है।",
        "The AI tools have completely transformed how I create listings. What used to take hours now takes minutes, and the quality is incredible.":
          "AI उपकरणों ने पूरी तरह से बदल दिया है कि मैं लिस्टिंग कैसे बनाता हूं। जो पहले घंटों लगते थे, अब मिनटों में हो जाते हैं, और गुणवत्ता अद्भुत है।",
        "Sarah Johnson": "सारा जॉनसन",
        "Top Producer, Tampa Bay": "टॉप प्रोड्यूसर, टाम्पा बे",
        "The prospecting strategies and scripts have helped me close 40% more deals this year. The training is world-class.":
          "प्रॉस्पेक्टिंग रणनीतियों और स्क्रिप्टों ने मुझे इस वर्ष 40% अधिक सौदों को बंद करने में मदद की है। प्रशिक्षण विश्व स्तरीय है।",
        "Mike Rodriguez": "माइक रोड्रिगेज",
        "Century 21 Agent": "सेंचुरी 21 एजेंट",
        "This platform has everything I need in one place. The community support and resources are unmatched.":
          "इस प्लेटफार्म में मुझे एक ही जगह पर सभी चीजें मिलती हैं। समुदाय का समर्थन और संसाधन बेजोड़ हैं।",
        "Lisa Chen": "लीसा चेन",
        "Broker Owner": "ब्रोकर मालिक",

        // Consumer Homepage - CTA Section
        "Ready to Transform Your Business?": "क्या आप अपने व्यवसाय को बदलने के लिए तैयार हैं?",
        "Join thousands of successful real estate professionals who have taken their business to the next level.":
          "उन हजारों सफल रियल एस्टेट पेशेवरों में शामिल हों जिन्होंने अपने व्यवसाय को अगले स्तर पर ले लिया है।",
        "Start Your Free Trial": "अपनी मुफ्त परीक्षण शुरू करें",
        "Schedule a Demo": "डेमो शेड्यूल करें",

        // Consumer Homepage - Footer
        "Empowering real estate professionals with AI-powered tools and comprehensive training.":
          "AI-संचालित उपकरणों और व्यापक प्रशिक्षण के साथ रियल एस्टेट पेशेवरों को सशक्त बनाना।",
        Platform: "प्लेटफार्म",
        Support: "समर्थन",
        "Help Center": "सहायता केंद्र",
        "Contact Us": "हमसे संपर्क करें",
        Community: "समुदाय",
        Status: "स्थिति",
        Legal: "कानूनी",
        "Privacy Policy": "गोपनीयता नीति",
        "Terms of Service": "सेवा की शर्तें",

        // AI Tool Names for demos
        "IdeaHub AI Demo": "आईडिया हब एआई डेमो",
        "ListIT AI Demo": "लिस्टआईटी एआई डेमो",
        "ScriptIT AI Demo": "स्क्रिप्टआईटी एआई डेमो",
        "RealBio AI Demo": "रियलबायो एआई डेमो",
        "RolePlay AI Demo": "रोलप्ले एआई डेमो",
        "Action AI Demo": "एक्शन एआई डेमो",
        "RealCoach AI Demo": "रियलकोच एआई डेमो",
        "BizPlan AI Demo": "बिज़प्लान एआई डेमो",
        "RealDeal AI Demo": "रियलडील एआई डेमो",
        "QuickCMA AI Demo": "क्विकसीएमए एआई डेमो",
        "Who's Who AI Demo": "हूज़ हू एआई डेमो",
        "PropBot AI Demo": "प्रॉपबॉट एआई डेमो",
        "Platform Demo": "प्लेटफार्म डेमो",
      },
    }
    return mockTranslations[targetLanguage][text] || text
  }
}
</merged_code>
