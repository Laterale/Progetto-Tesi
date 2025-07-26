import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const CoercedBooleanSchema = z
  .enum(["true", "false"])
  .transform((v) => JSON.parse(v))
  .pipe(z.coerce.boolean())

const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string(),
    TURSO_DB_URL: z.string().url(),
    TURSO_AUTH_TOKEN: z.string(),
    AUTH_PASSKEY: z.string(),
    AUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_DISABLE_CHATBOT_PAGE: CoercedBooleanSchema.nullish(),
    NEXT_PUBLIC_DISABLE_KEYBOARD_INPUT: CoercedBooleanSchema.nullish(),
    NEXT_PUBLIC_DISABLE_MESSAGE_AUTOPLAY: CoercedBooleanSchema.nullish(),
    NEXT_PUBLIC_DISABLE_QUESTIONNAIRE_PAGE: CoercedBooleanSchema.nullish(),
    NEXT_PUBLIC_QUESTIONNAIRE_URL: z.string().url().nullish(),
  },
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    TURSO_DB_URL: process.env.TURSO_DB_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    AUTH_PASSKEY: process.env.AUTH_PASSKEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_DISABLE_CHATBOT_PAGE: process.env.NEXT_PUBLIC_DISABLE_CHATBOT_PAGE,
    NEXT_PUBLIC_DISABLE_KEYBOARD_INPUT: process.env.NEXT_PUBLIC_DISABLE_KEYBOARD_INPUT,
    NEXT_PUBLIC_DISABLE_MESSAGE_AUTOPLAY: process.env.NEXT_PUBLIC_DISABLE_MESSAGE_AUTOPLAY,
    NEXT_PUBLIC_DISABLE_QUESTIONNAIRE_PAGE: process.env.NEXT_PUBLIC_DISABLE_QUESTIONNAIRE_PAGE,
    NEXT_PUBLIC_QUESTIONNAIRE_URL: process.env.NEXT_PUBLIC_QUESTIONNAIRE_URL,
  },
})

export default env
