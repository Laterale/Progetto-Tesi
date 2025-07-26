import { Message, useChat } from "ai/react"
import { motion } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"
import Markdown from "react-markdown"
import PageSwitcher, { pageIds } from "~/components/page-switcher"
import cn from "~/lib/cn"
import env from "~/lib/env"
import { useDictionary, useLocale } from "~/lib/i18n"
import { useSpeech } from "~/lib/speech"

export const ChatBackground = () => {
  return (
    <motion.div
      className="h-full w-full grid max-lg:grid-rows-2 lg:grid lg:grid-cols-5 pointer-events-none bg-sky-200"
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 100 }}
      transition={{ duration: 0.7 }}
    >
      <div className="lg:col-span-2 font-hand p-8" />
      <div className="lg:col-span-3 lg:max-h-screen relative bg-sky-100 [background-image:url(/assets/chat-background.svg)] [background-size:150px]">
        <img
          src="/assets/drawings/separator-h.svg"
          alt=""
          className="lg:hidden absolute left-0 -top-1 w-full"
        />
        <img
          src="/assets/drawings/separator-v.svg"
          alt=""
          className="hidden lg:block absolute top-0 -left-2 h-full"
        />
      </div>
    </motion.div>
  )
}

export const ChatContent = () => {
  const { chat: dictionary } = useDictionary()

  const locale = useLocale()
  useEffect(() => {
    if (locale == "en") speech.setLang("en-US")
    if (locale == "es") speech.setLang("es-ES")
    if (locale == "it") speech.setLang("it-IT")
  }, [])

  const speech = useSpeech()

  const { messages, input, setInput, handleInputChange, handleSubmit, append, isLoading } = useChat(
    {
      api: `/api/chat/${locale}`,
      onFinish: async (message) => {
        if (env.NEXT_PUBLIC_DISABLE_MESSAGE_AUTOPLAY) return
        // TODO: this replacement should only happen when the language is not english
        // TODO: this initial reproduction is not reflected in the related message component
        await speech.synthesis.synthesize(message.content.replaceAll(/smartlagoon/gi, "smartlagun"))
      },
    }
  )

  useEffect(() => {
    if (isLoading || messages.length == 0) return
    fetch("/api/chat/store", {
      method: "POST",
      body: JSON.stringify({ messages }),
    })
  }, [isLoading])

  // Copy speech transcript to the input field
  useEffect(() => {
    setInput(speech.recognition.transcript)
  }, [speech.recognition.transcript])

  // Submit when the recording has finished
  useEffect(() => {
    if (!speech.recognition.isListening && input.length > 0) handleSubmit()
  }, [speech.recognition.isListening])

  // Auto scroll to the bottom of the chat as new messages get added
  const scrollHelper = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (messages.length == 0) return
    scrollHelper.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages])

  const handleQuestionClick = async (question: string) =>
    append({ role: "user", content: question })

  return (
    <div className="h-full w-full grid max-lg:grid-rows-2 lg:grid lg:grid-cols-5 pointer-events-auto">
      <div className="lg:col-span-2 font-hand flex flex-col p-8">
        <h1 className="text-4xl lg:text-6xl tracking-wide lg:mt-4 mb-6 lg:mb-12">
          {dictionary.title}
        </h1>
        <p className="text-lg lg:text-2xl [line-height:2.25rem] lg:[line-height:2.5rem] tracking-wide styled-marks [&_mark]:bg-emerald-300 mb-6">
          {dictionary.description}
        </p>
        <ul className="flex flex-col gap-6">
          {dictionary.exampleQuestions.map((question, i) => (
            <li key={i} className="flex">
              <button
                className="grow px-4 py-3 text-lg text-left bg-white rounded-xl border-2 border-black shadow-solid-base hover:shadow-solid-lg transition-shadow"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
        <PageSwitcher currentPageId={pageIds.chat} className="mx-auto mt-auto" />
      </div>
      <div className="lg:col-span-3 lg:max-h-screen flex flex-col overflow-hidden relative">
        <div className="grow px-6 py-12 overflow-y-auto">
          <div className="min-h-full w-full max-w-4xl flex flex-col justify-end gap-6 mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={scrollHelper} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-6">
          <textarea
            value={input}
            onChange={handleInputChange}
            readOnly={env.NEXT_PUBLIC_DISABLE_KEYBOARD_INPUT ?? false}
            className="w-full max-w-2xl h-24 font-hand bg-white px-4 py-3 rounded-2xl border-2 border-black shadow-solid-base mb-6 !outline-none"
            placeholder={dictionary.chatBoxPlaceholder}
          />
          <div className="flex gap-6">
            {!env.NEXT_PUBLIC_DISABLE_KEYBOARD_INPUT && (
              <button
                type="submit"
                className="px-12 py-5 text-xl font-hand bg-purple-200 rounded-full border-2 border-black/70 shadow-solid-base !outline-none"
              >
                {dictionary.sendButtonText}
              </button>
            )}
            <button
              type="button"
              className={cn(
                "px-12 py-5 text-xl font-hand rounded-full border-2 border-black/70 shadow-solid-base !outline-none",
                speech.recognition.isListening ? "bg-rose-200" : "bg-green-200"
              )}
              onMouseDown={(e) => {
                if (e.buttons != 1) return
                speech.recognition.startListening()
              }}
              onMouseUp={() => speech.recognition.stopListening()}
              onTouchStart={() => speech.recognition.startListening()}
              onTouchEnd={() => speech.recognition.stopListening()}
              // Prevent context menus from popping up when long pressing on touchscreen
              style={{
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
              }}
            >
              {speech.recognition.isListening
                ? dictionary.recordButtonText.recording
                : dictionary.recordButtonText.idle}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ChatMessage: FC<{ message: Message }> = ({ message }) => {
  const speech = useSpeech()

  const [isPlaying, setIsPlaying] = useState(false)

  const playMessage = async () => {
    if (speech.synthesis.isSpeaking) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      // TODO: this replacement should only happen when the language is not english
      await speech.synthesis.synthesize(message.content.replaceAll(/smartlagoon/gi, "smartlagun"))
      setIsPlaying(false)
    }
  }

  return (
    <div
      className={cn(
        "max-w-xl flex items-end gap-3",
        message.role == "user" ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "font-hand px-4 py-3 rounded-xl border-2 border-black",
          "styled-marks [&_strong]:bg-blue-300",
          message.role == "user" ? "bg-blue-300 rounded-br-sm" : "bg-white rounded-bl-sm"
        )}
      >
        <Markdown>{message.content}</Markdown>
      </div>
      {message.role == "assistant" && (
        <button
          className={cn(
            "inline-flex mb-auto relative",
            speech.synthesis.isSpeaking && !isPlaying && "opacity-0"
          )}
          onClick={playMessage}
          // disabled={speech.synthesis.isSpeaking}
        >
          {isPlaying ? (
            <>
              <StopIcon />
              <LoadingSpinner />
            </>
          ) : (
            <PlayIcon />
          )}
        </button>
      )}
    </div>
  )
}

const PlayIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8 5.14v14l11-7l-11-7Z" />
    </svg>
  )
}

const StopIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
      <path fill="currentColor" d="M18 18H6V6h12v12Z" />
    </svg>
  )
}

const LoadingSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      className="absolute -top-1 -left-1"
    >
      <path
        fill="currentColor"
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
  )
}
