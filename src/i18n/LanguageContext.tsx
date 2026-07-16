import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'fr' | 'en'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  const saved = localStorage.getItem('portfolio-lang')
  if (saved === 'fr' || saved === 'en') return saved

  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('en') ? 'en' : 'fr'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang)
    localStorage.setItem('portfolio-lang', nextLang)
    document.documentElement.lang = nextLang
  }

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
