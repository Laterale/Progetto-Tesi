import type { Metadata } from "next"
import { Inter } from "next/font/google"
import cn from "~/lib/cn"
import { Locale, i18n } from "~/lib/i18n/config"
import { SpeechProvider } from "~/lib/speech"

import "~/app/main.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SKETCHLAGOON",
}

// Enable SSG for all languages
export const generateStaticParams = async () => i18n.locales.map((locale) => ({ lang: locale }))

const RootLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: Locale }
}>) => {
  return (
    <html lang={params.lang} className="min-h-full flex">
      <body className={cn(inter.className, "grow flex flex-col")}>
        <SpeechProvider>{children}</SpeechProvider>
      </body>
    </html>
  )
}

export default RootLayout
