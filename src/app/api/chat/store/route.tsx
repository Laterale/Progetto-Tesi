import { NextRequest, NextResponse } from "next/server"
import { db } from "~/db"
import { MessageInsert, Messages } from "~/db/schema"
import { isAuthenticated } from "~/lib/auth"
import env from "~/lib/env"

export const POST = async (req: NextRequest) => {
  if (env.NEXT_PUBLIC_DISABLE_CHATBOT_PAGE)
    return NextResponse.json(
      { message: "The chatbot feature is currently disabled." },
      { status: 503 }
    )

  if (!isAuthenticated(req))
    return NextResponse.json(
      { message: "Authentication is required for this feature." },
      { status: 401 }
    )

  try {
    const { messages } = (await req.json()) as { messages: MessageInsert[] }
    const existingMessages = await db.select().from(Messages)
    const messagesToInsert = messages
      // Remove messages already in the db
      .filter((m) => !existingMessages.some((em) => m.id == em.id))
      // Convert date strings to date objects
      .map((m) => ({ ...m, createdAt: new Date(m.createdAt as any) }))
    // console.log(messages, existingMessages, messagesToInsert)
    if (messagesToInsert.length > 0) {
      await db.insert(Messages).values(messagesToInsert)
    }
    return Response.json({ success: true })
  } catch {
    return Response.json({ success: false })
  }
}
