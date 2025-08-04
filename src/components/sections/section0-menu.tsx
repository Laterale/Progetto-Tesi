import { motion } from "framer-motion"
import StartButton  from "../start-button"
import MenuTextBox from "../menuTextBox"
import LocaleSwitcher from "../locale-switcher"

export const MenuBackground = () => {
    return(
        <motion.div
        className="relative h-full w-full bg-[#9AD5F6] overflow-hidden"
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}      
        exit = {{ opacity: 0 }}
        transition = {{ duration: 1.0 }}
        >
            <motion.img
            src="/assets/maps/mar-menor.png"
            alt="Mar Menor"
            className=""
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.7 }}
            />
            <motion.img
            src="/assets/upper-mascotte.png"
            alt="Mascotte Start"
            className="absolute right-1/4 bottom-0 size-80"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.7 }}
            />
        </motion.div>
    )
}

export const MenuContent = () =>{
    return(
    <div className="h-full w-full grid grid-cols-3 grid-rows-3 font-hand pointer-events-auto">
        <MenuTextBox
        className="absolute right-10 top-10">
        </MenuTextBox>
        <LocaleSwitcher className="absolute left-10 bottom-10"/>
        <div className="row-start-2 col-span-3 flex-col p-10">
            <h1 className="text-[clamp(2rem,8vw,3rem)] lg:text-[clamp(3rem,5vw,4rem)] text-center tracking-wide break-words leading-snug ">
                {"SKETCHLAGOON"}
            </h1>
        </div>
        <div className="row-start-3 col-start-2 flex justify-center items-center">
            <StartButton>
            </StartButton>       
        </div>
    </div>
    )
}