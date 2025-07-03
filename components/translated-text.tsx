"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/contexts/translation-context"
import type { JSX } from "react/jsx-runtime" // Import JSX to declare it

interface TranslatedTextProps {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function TranslatedText({ text, className, as: Component = "span" }: TranslatedTextProps) {
  const { translate, currentLanguage } = useTranslation()
  const [translatedText, setTranslatedText] = useState(text)

  useEffect(() => {
    if (currentLanguage === "en") {
      setTranslatedText(text)
      return
    }

    translate(text).then(setTranslatedText)
  }, [text, currentLanguage, translate])

  return <Component className={className}>{translatedText}</Component>
}
