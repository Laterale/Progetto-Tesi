"use client"
import { CompactChat } from "~/components/compacted-chatbot"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export const ChatbotPanel = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-96 left-3 z-50
          bg-transparent hover:bg-blue-700 text-white
          rounded-full shadow-lg
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-blue-300 
        "
      >
        <img src="/assets/MascotteIcon2.png" alt="" className="size-[80px] animate-bounce-slight"/>
      </button>

      {/* Animated Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay (fade in/out) */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <motion.div
            className="
              fixed bottom-0 right-0 left-0 top-0 z-50
              flex flex-col items-center justify-center
              "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            >
        <div className="relative w-[90%] max-w-3xl bg-[#3bb5d4] rounded-2xl shadow-2xl md:p-10">
        {/* Avatar circolare */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2">
            <img
            src="/assets/MascotteIcon2.png"
            alt="Chatbot Avatar"
            className="size-[150px] rounded-full object-cover animate"
            />
          </div>
          {/* Close button */}
          <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          >
            <X size={28}/>
          </button>
          {/* Chat content */}
          <CompactChat/>
        </div>
        </motion.div>
        </>
        )}
      </AnimatePresence>
    </>
  )
}