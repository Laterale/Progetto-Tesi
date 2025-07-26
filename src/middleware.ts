import type { MiddlewareConfig, NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { i18n } from "~/lib/i18n/config"
import { getLocale } from "~/lib/i18n/dictionary"

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
    )
  }
  return
}

export const config: MiddlewareConfig = {
  // Matcher ignoring non-internationalized files
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|main.css).*)"],
}
