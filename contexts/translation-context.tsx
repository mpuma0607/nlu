"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { translationService } from "@/lib/translation-service"

interface TranslationContextType {
  currentLanguage: string
  setLanguage: (language: string) => void
  translate: (text: string) => Promise<string>
  translateSync: (text: string) => string
  isTranslating: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [translationCache, setTranslationCache] = useState<{ [key: string]: string }>({})
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("site-language")
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (language: string) => {
    setCurrentLanguage(language)
    localStorage.setItem("site-language", language)
    // Clear cache when language changes
    setTranslationCache({})
  }

  const translate = async (text: string): Promise<string> => {
    if (currentLanguage === "en") {
      return text
    }

    const cacheKey = `${text}_${currentLanguage}`
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey]
    }

    setIsTranslating(true)
    try {
      const translated = await translationService.translateText(text, currentLanguage)
      setTranslationCache((prev) => ({
        ...prev,
        [cacheKey]: translated,
      }))
      return translated
    } catch (error) {
      console.error("Translation error:", error)
      return text
    } finally {
      setIsTranslating(false)
    }
  }

  const translateSync = (text: string): string => {
    if (currentLanguage === "en") {
      return text
    }

    const cacheKey = `${text}_${currentLanguage}`
    return translationCache[cacheKey] || text
  }

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translate,
        translateSync,
        isTranslating,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
