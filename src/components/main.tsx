"use client"

import { AnimatePresence, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import { pageIds } from "~/components/page-switcher"
// import BreakpointDisplay from "~/components/breakpoint-display"
import { EuMapBackground, EuMapContent } from "~/components/sections/section1-eu-map"
import { LagoonMapBackground, LagoonMapContent } from "~/components/sections/section2-lagoon-map"
import { DrawingsBackground, DrawingsContent } from "~/components/sections/section3-drawings"
import { ChatBackground, ChatContent } from "~/components/sections/section4-chat"
import { EndingContent } from "~/components/sections/section5-ending"
import env from "~/lib/env"
import { useScrollDirection } from "~/lib/scroll-direction"
import { MenuBackground, MenuContent } from "./sections/section0-menu"

const Main = () => {
  const container = useRef<HTMLDivElement>(null)
  const div0 = useRef<HTMLDivElement>(null)
  const div1 = useRef<HTMLDivElement>(null)
  const div2 = useRef<HTMLDivElement>(null)
  const div3 = useRef<HTMLDivElement>(null)
  const div4 = useRef<HTMLDivElement>(null)
  const div5 = useRef<HTMLDivElement>(null)

  const div0InView = useInView(div0, { amount: 0.5 })
  const div1InView = useInView(div1, { amount: 0.5 })
  const div2InView = useInView(div2, { amount: 0.5 })
  const div3InView = useInView(div3, { amount: 0.5 })
  const div4InView = useInView(div4, { amount: 0.5 })
  // const div5InView = useInView(div5, { amount: 0.5 })

  const scrollDirection = useScrollDirection(container)

  useEffect(() => {
    const blockScroll = (e: Event) => e.preventDefault()
    container.current?.addEventListener("wheel", blockScroll)
    return () => container.current?.removeEventListener("wheel", blockScroll)
  })

  return (
    <>
      {/* <BreakpointDisplay /> */}
      <div className="fixed inset-0 flex bg-sky-200 pointer-events-auto">
        <AnimatePresence mode="wait">
          {div0InView && <MenuBackground key="div0-bg"/>}
          {div1InView && <EuMapBackground key="div1-bg" />}
          {div2InView && (
            <LagoonMapBackground
              key="div2-bg"
              animation={scrollDirection == "down" ? "zoom-in" : "zoom-out"}
            />
          )}
          {div3InView && <DrawingsBackground key="div3-bg" />}
          {div4InView && <ChatBackground key="div4-bg" />}
        </AnimatePresence>
      </div>
      <div
        ref={container}
        className="flex flex-col [&>*]:shrink-0 max-h-screen overflow-x-hidden overflow-y-auto overscroll-none snap-y snap-mandatory relative no-scrollbars touch-none"
      >
        <section
          ref={div0}
          id={pageIds.menu}
          className="h-screen snap-center pointer-events-none relative"
        >
          <MenuContent />
        </section>        
        <section
          ref={div1}
          id={pageIds.eu}
          className="h-screen snap-center pointer-events-none relative"
        >
          <EuMapContent />
        </section>
        <section
          ref={div2}
          id={pageIds.lagoon}
          className="h-screen snap-center pointer-events-none relative"
        >
          <LagoonMapContent />
        </section>
        <section
          ref={div3}
          id={pageIds.drawings}
          className="h-screen snap-center pointer-events-none relative"
        >
          <DrawingsContent />
        </section>
        {!env.NEXT_PUBLIC_DISABLE_CHATBOT_PAGE && (
          <section
            ref={div4}
            id={pageIds.chat}
            className="h-screen snap-center pointer-events-none relative"
          >
            <ChatContent />
          </section>
        )}
        {!env.NEXT_PUBLIC_DISABLE_QUESTIONNAIRE_PAGE && (
          <section
            ref={div5}
            id={pageIds.questionnaire}
            className="h-screen snap-center pointer-events-none relative"
          >
            <EndingContent />
          </section>
        )}
      </div>
    </>
  )
}

export default Main
