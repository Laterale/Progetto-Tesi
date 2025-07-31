import { motion } from "framer-motion"
import { useDictionary } from "~/lib/i18n"
import StartButton  from "../start-button"

export const MenuBackground = () => {
    return(
        <motion.div
        className="h-full w-full grid grid-cols-5 bg-sky-300 overflow-hidden"
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}      
        exit = {{ opacity: 0 }}
        transition = {{ duration: 1.0 }}
        >
            <motion.img
            src="/assets/Mar_Menor_Mascotte.png"
            alt="Mascotte Start"
            className="p-14 col-span-2 col-start-4 object-bottom"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.7 }}
            />
        </motion.div>
    )
}

export const MenuContent = () =>{
    const { menu: dictionary } = useDictionary()
    return(
    <div className="h-full w-full grid grid-cols-3 grid-rows-3 font-hand pointer-events-auto">
        <div className="row-start-2 col-span-3 flex-col p-10">
            <h1 className="text-[clamp(2rem,8vw,3rem)] lg:text-[clamp(3rem,5vw,4rem)] text-center tracking-wide break-words leading-snug ">
                {dictionary.title}
            </h1>
        </div>
        <div className="row-start-3 col-start-2 flex justify-center items-center">
            <StartButton>
            </StartButton>       
        </div>
    </div>
    )
}