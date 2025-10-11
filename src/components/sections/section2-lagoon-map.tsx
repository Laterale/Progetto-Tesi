import PageSwitcher, { pageIds } from "~/components/page-switcher"
import { useDictionary } from "~/lib/i18n"
import { LagoonTextBox } from "../textboxes";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "~/components/useInView";


export const LagoonMapContent = () => {
  const { lagoonMap: dictionary } = useDictionary()
  const [currentStep, updateStep] = useState(0);
  const handleStepChange = (step: number) => {
    updateStep(step-1)
  };
  const stepImages = [
  [
    { src: "/assets/drawings/clam02c.png", alt: "clam 1", position: "left-28 bottom-80", size: "size-[30px]" },
    { src: "/assets/drawings/clam02c.png", alt: "clam 2", position: "right-48 bottom-52", size: "size-[40px]" },
    { src: "/assets/drawings/fish05c.png", alt: "fish 1", position: "left-32 bottom-64", size: "h-[30px] w-[80px]" },
    { src: "/assets/drawings/fish05c.png", alt: "fish 2", position: "left-28 bottom-72", size: "h-[15px] w-[40px]" },
    { src: "/assets/drawings/seahorse02c.png", alt: "seahorse 1", position: "right-40 bottom-80", size: "h-[50px] w-[30px]"},
    { src: "/assets/drawings/seahorse02c.png", alt: "seahorse 2", position: "right-48 bottom-96", size: "h-[30px] w-[20px]"},
    { src: "/assets/drawings/seahorse02c.png", alt: "seahorse 3", position: "right-52 bottom-80", size: "h-[30px] w-[20px]"},
    { src: "/assets/drawings/boat04c.png", alt: "boat 1", position: "left-28 bottom-96", size: "size-[40px]" },
    { src: "/assets/drawings/boat04c.png", alt: "boat 2", position: "left-40 absolute-center-y", size: "size-[50px]" },
  ],
  [
    { src: "/assets/dead-fish.png", alt: "dead fish 1", position: "left-36 bottom-56", size: "h-[40px] w-[80px]" },
    { src: "/assets/dead-fish.png", alt: "dead fish 2", position: "left-40 bottom-96", size: "h-[30px] w-[80px]" },
    { src: "/assets/dead-fish.png", alt: "dead fish 3", position: "left-20 bottom-80", size: "h-[20px] w-[50px]" },
    { src: "/assets/dead-seahorse.png", alt: "dead seahorse 1", position: "left-20 bottom-96", size: "h-[30px] w-[50px]"},
    { src: "/assets/dead-seahorse.png", alt: "dead sesahorse 2", position: "right-40 bottom-72", size: "h-[40px] w-[70px]"},
    { src: "/assets/dead-seahorse.png", alt: "dead sesahorse 3", position: "right-56 absolute-center-y", size: "h-[30px] w-[50px]"},
  ],
  [
    { src: "/assets/drawings/buoy01c.png", alt: "buoy", position: "left-32 absolute-center-y", size: "h-[100px] w-[30px]" },
  ],

  ];
  const avatarImages = [
    {src: "/assets/MascotteSmile.png", size:"h-[500px] w-[190px]"}, 
   {src: "/assets/MascotteAnnoyed.png", size:"h-[500px] w-[180px]"},
    {src: "/assets/MascottePointing.png", size:"h-[500px] w-[270px]"},
    {src: "/assets/MascotteSmile.png", size:"h-[500px] w-[190px]"},
  ]
  const currentAvatar = avatarImages[currentStep] ?? avatarImages[0]
  const { ref, isInView } = useInView({ threshold: 0.5 });
  return (
    <div className="h-full w-full right-8 grid grid-rows-8 grid-cols-4 font-hand pointer-events-auto pr-5 pl-5 bg-[url('/assets/mar-menor-bg.png')] bg-cover bg-no-repeat">
      <div className="col-span-4 flex justify-center items-center">
        <h1 className="text-[clamp(2rem,7vw,3rem)] text-center tracking-wide break-words leading-snug animate-bounce-slight">
          {dictionary.title}
        </h1>
      </div>
      <div ref={ref} className="col-span-4 z-20">
        {isInView &&<LagoonTextBox updateStep={handleStepChange}/>}
      </div>
      <AnimatePresence>
        <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        >
        {stepImages[currentStep]?.map((img, i) => (
          <motion.img
          key={i}
          src={img.src}
          alt={img.alt}
          className={`absolute ${img.position} ${img.size} z-10 animate-bounce-slight`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.img
        key={currentAvatar?.src}
        src={currentAvatar?.src}
        alt="Avatar"
        className={`absolute bottom-0 right-0 ${currentAvatar?.size} z-0`}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        />
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
