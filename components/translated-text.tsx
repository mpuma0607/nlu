interface TranslatedTextProps {
  text: string
  className?: string
}

export default function TranslatedText({ text, className }: TranslatedTextProps) {
  // Just return the original text without translation
  return <span className={className}>{text}</span>
}
