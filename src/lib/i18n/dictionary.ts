import "server-only"

import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import type { Locale } from "~/lib/i18n/config"
import { i18n } from "~/lib/i18n/config"

const dictionaries = {
  en: () => import("../../dictionaries/en").then((module) => module.default),
  es: () => import("../../dictionaries/es").then((module) => module.default),
  it: () => import("../../dictionaries/it").then((module) => module.default),
}

export const getLocale = (request: Request) => {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  const locale = matchLocale(
    languages,
    locales,
    i18n.defaultLocale
  ) as (typeof i18n.locales)[number]
  return locale
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
