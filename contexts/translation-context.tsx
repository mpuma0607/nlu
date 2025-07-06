"use client"

import { createContext, useContext, type ReactNode } from "react"

interface TranslationContextType {
  translate: (text: string) => string
  currentLanguage: string
  setLanguage: (language: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const translate = (text: string) => text // Just return original text
  const currentLanguage = "en"
  const setLanguage = (language: string) => {} // Do nothing

  return (
    <TranslationContext.Provider value={{ translate, currentLanguage, setLanguage }}>
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
