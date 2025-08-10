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
            src="/assets/Mar_Menor_Mascotte_2.png"
            alt="Mascotte Start"
            className="absolute lg:right-40 bottom-0 lg:size-96 size-80"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.7 }}
            />
            <motion.img
            src="/assets/icon.png"
            alt="Mascotte Start"
            className="absolute right-10 top-10 lg:size-20 size-14"
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
    <div className="h-full w-full grid grid-cols-3 grid-rows-3 font-hand pointer-events-auto p-10">
        <div className="lg:col-start-3 lg:row-start-2 lg:col-span-1 lg:items-center col-start-1 row-start-2 col-span-3 flex justify-center items-center">
            <MenuTextBox className="p-5">    
            </MenuTextBox>
        </div>
        <LocaleSwitcher className="absolute left-10 bottom-10"/>
        <div className="lg:col-span-2 col-span-3 flex justify-center items-end pb-10">
            <h1 className="text-[clamp(2.5rem,8vw,3rem)] lg:text-[clamp(3rem,5vw,4rem)] text-center tracking-wide break-words leading-snug animate-bounce-slight">
                SKETCHLAGOON
            </h1>
        </div>
        <div className="row-start-3 lg:col-start-1 col-start-2 lg:col-span-2 flex justify-center items-center">
            <StartButton
            className={"lg:p-3 p-2"}>
            </StartButton>       
        </div>
    </div>
    )
}