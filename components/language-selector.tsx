"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import { translationService } from "@/lib/translation-service"

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const supportedLanguages = translationService.getSupportedLanguages()
  const currentLang = supportedLanguages.find((lang) => lang.code === currentLanguage)

  return (
    <Select value={currentLanguage} onValueChange={setLanguage}>
      <SelectTrigger className="w-auto min-w-[120px] bg-transparent border-0 hover:bg-gray-100">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm">
            {currentLang?.flag} {currentLang?.name}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
