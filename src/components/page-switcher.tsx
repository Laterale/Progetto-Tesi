import { FC } from "react"
import cn from "~/lib/cn"
import env from "~/lib/env"
import { useDictionary } from "~/lib/i18n"

export const pageIds = {
  menu: "menu",
  eu: "eu-map",
  lagoon: "lagoon-map",
  drawings: "drawings",
  chat: "chat",
  questionnaire: "ending",
}

const enabledPageIds = [
  pageIds.eu,
  pageIds.lagoon,
  pageIds.drawings,
  env.NEXT_PUBLIC_DISABLE_CHATBOT_PAGE ? false : pageIds.chat,
  env.NEXT_PUBLIC_DISABLE_QUESTIONNAIRE_PAGE ? false : pageIds.questionnaire,
].filter(Boolean) as string[]

const PageSwitcher: FC<{
  className?: string
  currentPageId: string
}> = ({ className, currentPageId }) => {
  const dictionary = useDictionary()

  const prevPageId = enabledPageIds[enabledPageIds.indexOf(currentPageId) - 1]
  const nextPageId = enabledPageIds[enabledPageIds.indexOf(currentPageId) + 1]

  return (
    <div
      className={cn(
        "grid grid-cols-2 p-3 bg-white rounded-full border-2 border-black shadow-solid-base",
        className
      )}
    >
      <button
        className={cn(
          "flex items-center gap-[clamp(0.25rem,1vw,0.75rem)] text-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.25rem,1vw,0.5rem)] outline-none transition-all",
      !prevPageId && "text-neutral-400"
        )}
        onClick={() =>
          document.getElementById(prevPageId ?? "")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span>{"^"}</span>
        <span>{dictionary.ui.pageSwitcher.prev}</span>
      </button>
      <button
        className={cn(
          "flex items-center justify-end gap-[clamp(0.25rem,1vw,0.75rem)] text-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.25rem,1vw,0.5rem)] outline-none transition-all",
      nextPageId ? "animate-bounce-medium" : "text-neutral-400"
        )}
        onClick={() =>
          document.getElementById(nextPageId ?? "")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span>{dictionary.ui.pageSwitcher.next}</span>
        <span>{"v"}</span>
      </button>
    </div>
  )
}

export default PageSwitcher
