import { motion } from "framer-motion"
import { useState } from "react"
import FullScreenCarousel from "~/components/full-screen-carousel"
import PageSwitcher, { pageIds } from "~/components/page-switcher"
import Popover from "~/components/popover"
import Slideshow from "~/components/slideshow"
import cn from "~/lib/cn"
import data from "~/lib/data"
import { useDictionary } from "~/lib/i18n"

export const DrawingsBackground = () => {
  return (
    <motion.div
      className="h-full w-full bg-sky-200 overflow-hidden pointer-events-none"
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 100 }}
      transition={{ duration: 0.7 }}
    >
      <img 
      src="/assets/background.svg" 
      alt="Sea" 
      className="h-full w-full object-cover" 
      />
    </motion.div>
  )
}

export const DrawingsContent = () => {
  const { drawings: dictionary } = useDictionary()

  const [openedDrawings, setOpenedDrawings] = useState<string[]>([])

  const [carouselState, setCarouselState] = useState({
    open: false,
    drawings: [] as string[],
    initialDrawing: null as string | null,
  })
  const openCarousel = (drawings: string[], initialDrawing: string | null) => {
    setCarouselState({ open: true, drawings, initialDrawing })
  }
  const closeCarousel = async () => {
    setCarouselState({ ...carouselState, open: false })
  }

  return (
    <div className="h-full w-full overflow-hidden relative pointer-events-auto font-hand p-5 grid grid-rows-5 grid-cols-2 items-center">
      <h1 className="text-[clamp(1.8rem,3.5vw,5rem)] tracking-wide text-balance lg:text-left text-center col-span-2 lg:col-span-1">
        {dictionary.title}
      </h1>
      <div className="text-base lg:text-2xl tracking-wide text-balance lg:text-left text-center row-start-2 lg:col-span-1 col-span-2 mt-24">
        {dictionary.description}
      </div>
      <div className="hidden text-lg lg:text-2xl tracking-wide text-balance text-center">
        {dictionary.mascotte_dialogue.description}
      </div>
      <PageSwitcher
        currentPageId={pageIds.drawings}
        className="font-hand absolute-center-x bottom-14 z-10"
      />
      <div className="grid grid-cols-12 grid-rows-12 absolute inset-0">
        {data.map((record) => (
          <Popover
            key={record.code}
            triggerClassName={record.triggerClass}
            triggerContent={
              <div
                className={record.imageWrapperClass}
                onClick={() => setOpenedDrawings([...openedDrawings, record.code])}
              >
                <img
                  src={record.imageUrl}
                  alt={(dictionary as any)[record.code].title}
                  className={cn(
                    "transition-opacity lg:size-auto size-2/4",
                    record.imageClass,
                    openedDrawings.includes(record.code) && "opacity-50"
                  )}
                  style={record.imageStyle}
                />
              </div>
            }
          >
            <div className="w-[48rem] max-w-[calc(100vw-20px)] max-h-[calc(100vw-50px)] flex flex-col gap-6 py-6 font-hand bg-white rounded-lg border-2 border-black shadow-solid-base overflow-scroll">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-x-12 gap-y-6 px-6">
                <img
                  src={record.imageUrl}
                  alt=""
                  className="hidden xl:flex xl:h-24 xl:w-24 h-16 w-16 object-contain md:mr-6 md:order-2"
                />
                <div className="md:order-1">
                  <h2 className="text-[clamp(1.5rem,2vw,4rem)] mb-3">{(dictionary as any)[record.code].title}</h2>
                  <p className="text-[clamp(0.8rem,1vw,3rem)] styled-marks [&_mark]:bg-rose-300">
                    {(dictionary as any)[record.code].description}
                  </p>
                </div>
              </div>
              <Slideshow>
                {record.relatedDrawings.map((drawingUrl, i) => (
                  <img
                    key={i}
                    src={drawingUrl}
                    alt=""
                    className={cn(
                      "shrink-0 h-32  object-cover rounded border border-black",
                      i % 2 == 0 ? "-rotate-3" : "rotate-3"
                    )}
                    onClick={() => openCarousel(record.relatedDrawings, drawingUrl)}
                  />
                ))}
              </Slideshow>
            </div>
          </Popover>
        ))}
      </div>
      <FullScreenCarousel
        drawings={carouselState.drawings}
        initialDrawing={carouselState.initialDrawing}
        open={carouselState.open}
        onOpenChange={({ open }) =>
          open ? openCarousel(carouselState.drawings, null) : closeCarousel()
        }
      />
  </div>
  )
}
