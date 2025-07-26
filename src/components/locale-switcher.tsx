"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react"
import { i18n, type Locale } from "~/lib/i18n/config"

const LocaleSwitcher: FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname()

  const currentLocale = pathname.split("/")[1]

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/"
    const segments = pathname.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  return (
    <ul className={"font-hand flex gap-4 " + className}>
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathname(locale)}
              className={locale == currentLocale ? "underline decoration-wavy" : ""}
            >
              {locale.toUpperCase()}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default LocaleSwitcher
