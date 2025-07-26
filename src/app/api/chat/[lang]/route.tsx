import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, streamText } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "~/lib/auth"
import env from "~/lib/env"
import { Locale } from "~/lib/i18n/config"
import { getDictionary } from "~/lib/i18n/dictionary"

const model = openai("gpt-4o-mini")

export const POST = async (req: NextRequest, { params }: { params: Promise<{ lang: Locale }> }) => {
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

  const { lang } = await params
  const prompt = (await getDictionary(lang)).chatbot.prompt

  const { messages } = await req.json()
  const coreMessages = convertToCoreMessages(messages)

  return (
    await streamText({
      model,
      system: prompt,
      messages: coreMessages,
    })
  ).toDataStreamResponse()
}
