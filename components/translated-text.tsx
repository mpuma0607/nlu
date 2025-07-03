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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentLanguage === "en") {
      setTranslatedText(text)
      return
    }

    setIsLoading(true)
    translate(text)
      .then(setTranslatedText)
      .finally(() => setIsLoading(false))
  }, [text, currentLanguage, translate])

  if (isLoading) {
    return <span className={className}>{text}</span>
  }

  return <span className={className}>{translatedText}</span>
}
