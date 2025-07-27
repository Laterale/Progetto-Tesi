import { motion } from "framer-motion"
import { useDictionary } from "~/lib/i18n"
import PageSwitcher, { pageIds } from "../page-switcher"

export const MenuBackground = () => {
    return(
        <motion.div
        className="h-full w-full  bg-sky-600"
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}      
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0 }}
        >
            <div className="">

            </div>
        </motion.div>
    )
}

export const MenuContent = () =>{
    const { menu: dictionary } = useDictionary()
    return(
    <div className="h-full w-full grid max-lg:grid-rows-2 lg:grid lg:grid-cols-5">
        <div className="lg:col-span-2 font-hand flex flex-col p-8 pointer-events-auto max-lg:max-h-[50vh] max-lg:justify-center max-lg:h-[50vh]">
            <h1 className="text-[clamp(2rem,8vw,3rem)] tracking-wide mb-4 break-words leading-snug lg:text-[clamp(3rem,5vw,4rem)] max-lg:leading-tight">
                {dictionary.title}
            </h1>
            <p className="text-[clamp(0.6rem,3.0vw,1.2rem)] tracking-wide styled-marks [&_mark]:bg-purple-300 max-lg:leading-snug">
                {dictionary.description}
            </p>
            <div className="lg:flex lg:justify-between grid grid-cols-2 items-end mt-auto">
                <PageSwitcher
                currentPageId={pageIds.menu}
                className="max-w-[250px] min-w-[169px] col-span-1 translate-y-10 lg:relative lg:translate-x-[60%] lg:-translate-y-32"
                />           
            </div>
        </div>
    </div>
    )
}