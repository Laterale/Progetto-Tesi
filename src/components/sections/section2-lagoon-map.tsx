import PageSwitcher, { pageIds } from "~/components/page-switcher"
import { useDictionary } from "~/lib/i18n"
import { LagoonTextBox } from "../textboxes";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



export const LagoonMapContent = () => {
  const { lagoonMap: dictionary } = useDictionary()
  const [currentStep, updateStep] = useState(0);
  const handleStepChange = (step: number) => {
    updateStep(step-1)
  };
  const stepImages = [
  { id: 0, src: "/assets/icon.png", alt: "marker 1", position: "left-10 bottom-40" },
  { id: 1, src: "/assets/icon.png", alt: "marker 2", position: "right-10 bottom-52" },
  { id: 2, src: "/assets/icon.png", alt: "marker 3", position: "left-1/2 bottom-20 -translate-x-1/2"},
  { id: 3, src: "/assets/icon.png", alt: "marker 4", position: "right-10 bottom-52"}
  ];

  return (
    <div className="h-full w-full grid grid-rows-8 grid-cols-4 font-hand pointer-events-auto pr-5 pl-5 bg-[url('/assets/mar-menor-bg.png')] bg-cover bg-no-repeat">
      <div className="col-span-4 flex justify-center items-center">
        <h1 className="text-[clamp(2rem,7vw,3rem)] text-center tracking-wide break-words leading-snug animate-bounce-slight">
          {dictionary.title}
        </h1>
      </div>
      <div className="col-span-4">
        <LagoonTextBox updateStep={handleStepChange}/>
      </div>
      <AnimatePresence>
        {stepImages
          .filter((img) => img.id === currentStep)
          .map((img) => (
            <motion.img
              key={img.id}
              src={img.src}
              alt={img.alt}
              className={`absolute ${img.position} size-[120px] z-10 animate-bounce-slight`}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          ))}
      </AnimatePresence>
      <div className="absolute-center-x bottom-10 z-20">
        <PageSwitcher
        currentPageId={pageIds.lagoon}
        className="max-w-[200px] min-w-[120px]"
        />
      </div>
    </div>
  )
}
