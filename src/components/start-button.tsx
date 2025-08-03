import cn from "~/lib/cn"
import { FC } from "react"
import { pageIds } from "~/components/page-switcher"
//import { useDictionary } from "~/lib/i18n"


const StartButton: FC<{
    className?: String,
}> = ({className}) => {
    //const dictionary = useDictionary()
    return(
        <div 
        className={cn("p-7 bg-white rounded-full border-2 border-black shadow-solid-base",className)}
        >
            <button
            className={cn("flex items-center outline-none transition-all animate-bounce-medium",className)}
            onClick={() =>document.getElementById(pageIds.eu ?? "")?.scrollIntoView({ behavior: "smooth" })}
            >
                <span>
                    {"START"}
                </span>
            </button>
        </div>
    )
}
export default StartButton