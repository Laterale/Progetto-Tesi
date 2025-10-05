"use client"
import { useEffect, useRef } from "react"
import { pageIds } from "~/components/page-switcher"
// import BreakpointDisplay from "~/components/breakpoint-display"
import { MenuContent } from "./sections/section0-menu"
import { EuMapContent } from "~/components/sections/section1-eu-map"
import { LagoonMapContent } from "~/components/sections/section2-lagoon-map"
import { DrawingsContent } from "~/components/sections/section3-drawings"
import { ChatContent } from "~/components/sections/section4-chat"
import { EndingContent } from "~/components/sections/section5-ending"
import env from "~/lib/env"

import Particles from "./bg"

const Main = () => {
  const container = useRef<HTMLDivElement>(null)
  const div0 = useRef<HTMLDivElement>(null)
  const div1 = useRef<HTMLDivElement>(null)
  const div2 = useRef<HTMLDivElement>(null)
  const div3 = useRef<HTMLDivElement>(null)
  const div4 = useRef<HTMLDivElement>(null)
  const div5 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blockScroll = (e: Event) => e.preventDefault()
    container.current?.addEventListener("wheel", blockScroll)
    return () => container.current?.removeEventListener("wheel", blockScroll)
  })

  return (
    <>
      {/* <BreakpointDisplay /> */}
      <div className="fixed inset-0 flex bg-[#2282bf] pointer-events-auto">
        <Particles
        particleColors={['#ffffff', '#0960c4']}
        particleCount={200}
        particleSpread={15}
        speed={0.05}
        particleBaseSize={200}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        />
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
          id={pageIds.lagoon}
          className="h-screen snap-center pointer-events-none relative"
        >
          <LagoonMapContent />
        </section>
        <section
          ref={div2}
          id={pageIds.drawings}
          className="h-screen snap-center pointer-events-none relative"
        >
          <DrawingsContent />
        </section>
        <section
          ref={div3}
          id={pageIds.eu}
          className="h-screen snap-center pointer-events-none relative"
        >
          <EuMapContent />
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
