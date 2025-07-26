import jwt from "jsonwebtoken"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"
import env from "~/lib/env"

const AUTH_COOKIE_NAME = "sketchlagoon-auth-token"
const AUTH_DURATION = 60 * 60 * 24 // 1 day

export const authenticate = (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get("key")

  if (key != env.AUTH_PASSKEY) return Response.json({ message: "Wrong passkey." }, { status: 400 })

  const token = jwt.sign({ tokenId: nanoid() }, env.AUTH_SECRET, { expiresIn: AUTH_DURATION })
  const res = NextResponse.json({ message: "Success!" })
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    maxAge: AUTH_DURATION,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV == "production",
  })
  return res
}

export const isAuthenticated = (req: NextRequest) => {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value
  if (!token) return null
  try {
    jwt.verify(token, env.AUTH_SECRET)
    return true
  } catch {
    return false
  }
}
