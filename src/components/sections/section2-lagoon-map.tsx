import { AnimationProps, motion } from "framer-motion"
import { FC } from "react"
import PageSwitcher, { pageIds } from "~/components/page-switcher"
import { useDictionary } from "~/lib/i18n"

export const LagoonMapBackground: FC<{
  animation: "zoom-in" | "zoom-out"
}> = ({ animation }) => {
  const animations: AnimationProps =
    animation == "zoom-out"
      ? {
          initial: { opacity: 0, scale: 1.5 },
          exit: { opacity: 0, scale: 1.0 },
        }
      : {
          initial: { opacity: 0, scale: 1.0 },
          exit: { opacity: 0, scale: 1.5 },
        }

  return (
    <motion.div
      className="h-full w-full grid max-lg:grid-rows-2 lg:grid lg:grid-cols-5 pointer-events-none bg-green-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="lg:col-span-2 font-hand p-8" />
      <div className="lg:col-span-3 lg:max-h-screen relative pointer-events-auto">
        <div className="h-full w-full overflow-hidden">
          <motion.img
            src="/assets/maps/mar-menor.png"
            alt="EU Map"
            className="h-full w-full object-cover"
            initial={animations.initial}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={animations.exit}
            transition={{ duration: 0.7 }}
          />
        </div>
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

export const LagoonMapContent = () => {
  const { lagoonMap: dictionary } = useDictionary()

  return (
    <div className="h-full w-full grid lg:grid-cols-5">
      <div className="lg:col-span-2 font-hand flex flex-col p-8 pointer-events-auto max-lg:max-h-[50vh] max-lg:justify-center max-lg:h-[50vh]">
        <h1 className="text-[clamp(2rem,8vw,3rem)] tracking-wide mb-4 break-words leading-snug lg:text-[clamp(3rem,5vw,4rem)] max-lg:leading-tight">
          {dictionary.title}
        </h1>
        <p className="text-[clamp(0.6rem,3.0vw,1.2rem)] tracking-wide styled-marks [&_mark]:bg-indigo-300 max-lg:leading-snug">
          {dictionary.description}
        </p>
        <div className="flex justify-between items-end mt-auto">
          <div />
          <PageSwitcher
            currentPageId={pageIds.lagoon}
            className="max-w-[250px] min-w-[169px] col-span-1 translate-y-10 lg:relative lg:translate-x-[60%] lg:-translate-y-32"
          />
        </div>
      </div>
      <div className="lg:col-span-3 lg:max-h-screen overflow-hidden relative" />
    </div>
  )
}
