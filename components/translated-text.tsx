"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/contexts/translation-context"
import type { JSX } from "react/jsx-runtime"

interface TranslatedTextProps {
  children: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function TranslatedText({ children, className, as: Component = "span" }: TranslatedTextProps) {
  const { currentLanguage, translate } = useTranslation()
  const [translatedText, setTranslatedText] = useState(children)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentLanguage === "en") {
      setTranslatedText(children)
      return
    }

    const translateText = async () => {
      setIsLoading(true)
      try {
        const translated = await translate(children)
        setTranslatedText(translated)
      } catch (error) {
        console.error("Translation error:", error)
        setTranslatedText(children)
      } finally {
        setIsLoading(false)
      }
    }

    translateText()
  }, [children, currentLanguage, translate])

  return <Component className={className}>{isLoading ? children : translatedText}</Component>
}
