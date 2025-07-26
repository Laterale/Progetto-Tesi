import { useScroll, useMotionValueEvent } from "framer-motion"
import { RefObject, useState } from "react"

export const useScrollDirection = (container: RefObject<HTMLElement>) => {
  const [scrollValue, setScrollValue] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")

  const { scrollY } = useScroll({ container })

  useMotionValueEvent(scrollY, "change", (latestScrollValue) => {
    setScrollDirection(latestScrollValue > scrollValue ? "down" : "up")
    setScrollValue(latestScrollValue)
  })

  return scrollDirection
}
