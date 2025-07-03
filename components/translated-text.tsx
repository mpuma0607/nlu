"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/contexts/translation-context"

interface TranslatedTextProps {
  text: string
  className?: string
}

export default function TranslatedText({ text, className }: TranslatedTextProps) {
  const { currentLanguage, translate } = useTranslation()
  const [translatedText, setTranslatedText] = useState(text)

  useEffect(() => {
    if (currentLanguage === "en") {
      setTranslatedText(text)
      return
    }

    const translateText = async () => {
      try {
        const translated = await translate(text)
        setTranslatedText(translated)
      } catch (error) {
        console.error("Translation error:", error)
        setTranslatedText(text)
      }
    }

    translateText()
  }, [text, currentLanguage, translate])

  return <span className={className}>{translatedText}</span>
}
