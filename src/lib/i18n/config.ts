import { ReactNode } from "react"

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "es", "it"],
} as const

export type Locale = (typeof i18n)["locales"][number]

export type GenericDictionary = {
  [key: string]: ReactNode | GenericDictionary
}
