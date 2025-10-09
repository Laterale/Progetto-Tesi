import { AnimatePresence, motion } from "framer-motion"
import StartButton  from "../start-button"
import {MenuTextBox} from "../textboxes"
import LocaleSwitcher from "../locale-switcher"
import { useState } from "react"

export const MenuContent = () =>{
    const [canStart, setCanStart] = useState(false);
    const [currentStep, updateStep] = useState(0);
    const handleStepChange = (step: number) => {
        updateStep(step-1)
      };
    const avatarImages = [
    "/assets/MascotteAnnoyed.png",   // step 0
    "/assets/MascotteFierce.png",     // step 1
    "/assets/MascottePointing.png",  // step 2
    "/assets/MascotteAnnoyed.png", // step 3
    ]
    const currentAvatar =
    avatarImages[currentStep] ?? avatarImages[0]
    return(
    <div className="h-full w-full grid grid-cols-3 grid-rows-7 font-hand pointer-events-auto pr-5 pl-5">
      <div className="col-span-3 flex justify-center items-center">
        <div>
          <img
          src="/assets/icon.png"
          alt="Icon"
          className="absolute size-14 lg:size-20 animate-bounce-slight"
          />
          <h1 className="pl-5 text-[clamp(2.5rem,8vw,3rem)] lg:text-[clamp(3rem,5vw,4rem)] text-center tracking-wide break-words leading-snug animate-bounce-slight">
            SKETCHLAGOON
          </h1>
        </div>
      </div>
      <div className="col-start-1 row-start-2 col-span-3 items-start z-10">
        <MenuTextBox 
        onAllStepsCompleted={() => setCanStart(true)}
        updateStep={handleStepChange}
        />    
      </div>
      <AnimatePresence mode="wait">
        <motion.img
        key={currentAvatar}
        src={currentAvatar}
        alt="Avatar"
        className="absolute bottom-0 right-0 h-[500px] w-[250px] z-0"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        />
      </AnimatePresence>
      <div className="absolute-center-x bottom-20">
        <AnimatePresence>
        {canStart && (
          <motion.div
          key="start-button"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
          >
            <StartButton className="p-3"/>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      <LocaleSwitcher className="absolute left-10 bottom-10"/>
    </div>
  )
}