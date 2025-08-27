import { motion } from "framer-motion"
import StartButton  from "../start-button"
import MenuTextBox from "../menuTextBox"
import LocaleSwitcher from "../locale-switcher"

export const MenuBackground = () => {
    return(
        <motion.div
        className="h-full w-full grid grid-cols-3 grid-rows-4 bg-[#49a8df] overflow-hidden"
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}      
        exit = {{ opacity: 0 }}
        transition = {{ duration: 1.0 }}
        >
        </motion.div>
    )
}

export const MenuContent = () =>{
    return(
    <div className="h-full w-full grid grid-cols-3 grid-rows-4 font-hand pointer-events-auto">
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
        <div className="col-start-1 row-start-2 col-span-3 items-center">
            <MenuTextBox className="p-5"/>    
        </div>
        <div className="row-start-4 col-start-1 col-span-3 flex justify-center items-center">
            <StartButton className={"p-3"}/>
        </div>
        <LocaleSwitcher className="absolute left-10 bottom-10"/>
    </div>
    )
}