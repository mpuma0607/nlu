"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import { translationService } from "@/lib/translation-service"

export default function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = translationService.getSupportedLanguages()
  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang.flag}</span>
          <span className="hidden md:inline">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer ${
              currentLanguage === language.code ? "bg-blue-50 text-blue-700" : ""
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
            {currentLanguage === language.code && <span className="ml-auto text-blue-600">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
