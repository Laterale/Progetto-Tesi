"use client"
import { FC, useEffect, useRef } from "react"
import { useChat, Message } from "ai/react"
import { useDictionary, useLocale } from "~/lib/i18n"
import { useSpeech } from "~/lib/speech"
import env from "~/lib/env"
import cn from "~/lib/cn"
import Markdown from "react-markdown"

export const CompactChat: FC = () => {
  const { chat: dictionary } = useDictionary()
  const locale = useLocale()
  const speech = useSpeech()

  // Copia il testo trascritto nel campo input
  useEffect(() => {
    if (speech.recognition.transcript) {
      setInput(speech.recognition.transcript)
    }
  }, [speech.recognition.transcript])

  // Imposta la lingua della sintesi vocale
  useEffect(() => {
    if (locale == "en") speech.setLang("en-US")
    if (locale == "es") speech.setLang("es-ES")
    if (locale == "it") speech.setLang("it-IT")
  }, [])

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `/api/chat/${locale}`,
    onFinish: async (message) => {
      if (env.NEXT_PUBLIC_DISABLE_MESSAGE_AUTOPLAY) return
      await speech.synthesis.synthesize(message.content.replaceAll(/smartlagoon/gi, "smartlagun"))
    },
  })

  // Auto-scroll
  const scrollRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col w-full h-[70vh] max-h-[600px] bg-transparent rounded-2xl border-2 border-black shadow-lg overflow-hidden">
      {/* Messaggi */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-[#2282bf] border-white flex flex-col items-center">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full h-20 rounded-xl border-2 border-black px-3 py-2 font-hand resize-none"
          placeholder={dictionary.chatBoxPlaceholder}
        />
        <div className="flex gap-3 mt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 rounded-full bg-blue-200 border-2 border-black font-hand hover:bg-blue-300"
          >
            {dictionary.sendButtonText}
          </button>
          <button
            type="button"
            onMouseDown={() => speech.recognition.startListening()}
            onMouseUp={() => speech.recognition.stopListening()}
            onTouchStart={() => speech.recognition.startListening()}
            onTouchEnd={() => speech.recognition.stopListening()}
            className={cn(
              "px-6 py-2 rounded-full border-2 border-black font-hand",
              speech.recognition.isListening ? "bg-rose-200" : "bg-green-200"
            )}
          >
            {speech.recognition.isListening
              ? dictionary.recordButtonText.recording
              : dictionary.recordButtonText.idle}
          </button>
        </div>
      </form>
    </div>
  )
}

const ChatMessage: FC<{ message: Message }> = ({ message }) => {
  const speech = useSpeech()

  return (
    <div
      className={cn(
        "flex max-w-[80%]",
        message.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
      )}
    >
      <div
        className={cn(
          "px-4 py-3 rounded-xl border-2 border-black font-hand text-base",
          message.role === "user" ? "bg-blue-200" : "bg-gray-100"
        )}
      >
        <Markdown>{message.content}</Markdown>
      </div>
      {message.role === "assistant" && (
        <button
          className="ml-2 self-center text-gray-500 hover:text-gray-800"
          onClick={() =>
            speech.synthesis.synthesize(message.content.replaceAll(/smartlagoon/gi, "smartlagun"))
          }
        >
          🔊
        </button>
      )}
    </div>
  )
}