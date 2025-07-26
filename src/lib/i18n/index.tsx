"use client"

import { usePathname } from "next/navigation"
import { createContext, FC, ReactNode, useContext } from "react"
import { Dictionary } from "~/lib/i18n/dictionary"

export const useLocale = () => {
  const pathname = usePathname()
  const currentLocale = pathname.split("/")[1]
  return currentLocale
}

const DictionaryContext = createContext<Dictionary | null>(null)

export const DictionaryProvider: FC<{
  value: Dictionary
  children: ReactNode
}> = ({ value, children }) => {
  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>
}

export const useDictionary = () => useContext(DictionaryContext)!
