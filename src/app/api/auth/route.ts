import { NextRequest } from "next/server"
import { authenticate } from "~/lib/auth"

export const GET = async (req: NextRequest) => {
  return authenticate(req)
}
