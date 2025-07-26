"use client"

import "regenerator-runtime/runtime"

import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"
import sr, { useSpeechRecognition } from "react-speech-recognition"

const createSpeechApi = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const browserSupportsSpeechSynthesis =
    typeof window === "undefined" ? false : "speechSynthesis" in window

  const [lang, setLang] = useState("en-US")
  const [voice, setVoice] = useState<SpeechSynthesisVoice>()

  const [isSpeaking, setIsSpeaking] = useState(false)

  const synthesize = (text: string) =>
    new Promise<void>((resolve) => {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = lang
      if (voice) utter.voice = voice
      utter.onend = () => {
        setIsSpeaking(false)
        resolve()
      }
      utter.onerror = () => setIsSpeaking(false)
      setIsSpeaking(true)
      window.speechSynthesis.speak(utter)
    })

  // Dirty patch for the default Spanish voice
  // TODO: this should probably be handled somewhere else
  useEffect(() => {
    const loadVoice = () => {
      if (lang == "es-ES") {
        setVoice(speechSynthesis.getVoices().find((v) => v.name == "Mónica"))
      }
    }
    loadVoice()
    speechSynthesis.onvoiceschanged = loadVoice
    return () => {
      speechSynthesis.onvoiceschanged = null
    }
  }, [lang])

  return {
    synthesis: {
      synthesize,
      isSpeaking,
      isSupported: browserSupportsSpeechSynthesis,
    },
    recognition: {
      startListening: () => {
        resetTranscript()
        sr.startListening({ language: lang, continuous: true })
      },
      stopListening: () => sr.stopListening(),
      transcript,
      resetTranscript,
      isListening: listening,
      isMicrophoneAvailable,
      isSupported: browserSupportsSpeechRecognition,
    },
    lang,
    setLang,
  }
}

type SpeechApi = ReturnType<typeof createSpeechApi>

const SpeechContext = createContext<SpeechApi>(null as any)

export const SpeechProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SpeechContext.Provider value={createSpeechApi()}>{children}</SpeechContext.Provider>
}

export const useSpeech = () => useContext(SpeechContext)
