import { AnimatePresence, motion } from "framer-motion"
import StartButton  from "../start-button"
import MenuTextBox from "../menuTextBox"
import LocaleSwitcher from "../locale-switcher"
import { useState } from "react"
  
export const MenuBackground = () => {
    return(
        <motion.div
        className="h-full w-full bg-[#49a8df] overflow-hidden"
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}      
        exit = {{ opacity: 0 }}
        transition = {{ duration: 1.0 }}
        >
        </motion.div>
    )
}

export const MenuContent = () =>{
    const [canStart, setCanStart] = useState(false);
    return(
    <div className="h-full w-full grid grid-cols-3 grid-rows-4 font-hand pointer-events-auto p-4">
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
        <div className="col-start-1 row-start-2 col-span-3 items-start">
            <MenuTextBox 
            className="p-5"
            onAllStepsCompleted={() => setCanStart(true)}
            />    
        </div>
        <div className="row-start-4 col-start-1 col-span-3 flex justify-center items-center">
        <AnimatePresence>
          {canStart && (
            <motion.div
              key="start-button"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
            >
              <StartButton
                className="p-3"
                onClick={() => {
                  console.log("Start button action triggered!");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        <LocaleSwitcher className="absolute left-10 bottom-10"/>
    </div>
    )
}