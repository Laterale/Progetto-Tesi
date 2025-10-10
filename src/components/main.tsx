"use client"
import { useEffect, useRef } from "react"
import { pageIds } from "~/components/page-switcher"
import { MenuContent } from "./sections/section1-menu"
import { EuMapContent } from "~/components/sections/section4-eu-map"
import { LagoonMapContent } from "~/components/sections/section2-lagoon-map"
import { DrawingsContent } from "~/components/sections/section3-drawings"
import { EndingContent } from "~/components/sections/section5-ending"
import { ChatbotPanel } from "~/components/chatbot-panel"
import env from "~/lib/env"
import Particles from "./bg"

const Main = () => {
  const container = useRef<HTMLDivElement>(null)
  const div0 = useRef<HTMLDivElement>(null)
  const div1 = useRef<HTMLDivElement>(null)
  const div2 = useRef<HTMLDivElement>(null)
  const div3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blockScroll = (e: Event) => e.preventDefault()
    container.current?.addEventListener("wheel", blockScroll)
    return () => container.current?.removeEventListener("wheel", blockScroll)
  })

  return (
    <>
      {/* <BreakpointDisplay /> */}
      <div className="fixed inset-0 flex bg-[#2293bf] pointer-events-auto">
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
          <img src="/assets/fondale.png" alt="fondale" className="w-full h-[40px] absolute bottom-0 z-0" />
        </section>
      </div>
      <ChatbotPanel/>
    </>
  )
}

export default Main
