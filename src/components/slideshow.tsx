"use client"

import { PropsWithChildren, useEffect, useRef, useState } from "react"
import { useResizeObserver } from "usehooks-ts"

const Slideshow = ({ children }: PropsWithChildren) => {
  const scroller = useRef<HTMLDivElement>(null)

  const { width = 0 } = useResizeObserver({ ref: scroller, box: "border-box" })

  const [scrollable, setScrollable] = useState(false)
  useEffect(() => {
    const canScroll =
      scroller.current && scroller.current.scrollWidth > scroller.current.clientWidth
    setScrollable(canScroll ?? false)
  }, [width])

  const onScroll = (direction: "left" | "right") => {
    if (!scroller.current) return
    scroller.current.scrollLeft += direction == "right" ? 408 : -408
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbars px-16 py-6"
      >
        {children}
      </div>
      {scrollable && (
        <>
          <button
            className="h-12 w-12 bg-white rounded-full border-2 border-black/70 absolute-center-y left-2 !outline-none"
            onClick={() => onScroll("left")}
          >
            <div>{"<"}</div>
          </button>
          <button
            className="h-12 w-12 bg-white rounded-full border-2 border-black/70 absolute-center-y right-2 !outline-none"
            onClick={() => onScroll("right")}
          >
            <div>{">"}</div>
          </button>
        </>
      )}
    </div>
  )
}

export default Slideshow
