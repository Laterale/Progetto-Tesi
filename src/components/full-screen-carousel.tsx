import { Dialog as ArkDialog } from "@ark-ui/react"
import { FC, useEffect, useState } from "react"
import Dialog from "~/components/dialog"

const FullScreenCarousel: FC<{
  drawings: string[]
  initialDrawing?: string | null
  open: boolean
  onOpenChange?: Parameters<typeof ArkDialog.Root>[0]["onOpenChange"]
}> = ({ drawings, initialDrawing, open, onOpenChange }) => {
  const [currentDrawing, setCurrentDrawing] = useState<string | null>(initialDrawing ?? null)

  useEffect(() => {
    setCurrentDrawing(initialDrawing ?? drawings[0] ?? null)
  }, [drawings, initialDrawing])

  const prevDrawing = () => {
    let i = drawings.indexOf(currentDrawing ?? "") - 1
    if (i < 0) i = drawings.length - 1
    setCurrentDrawing(drawings[i]!)
  }
  const nextDrawing = () => {
    let i = drawings.indexOf(currentDrawing ?? "") + 1
    if (i >= drawings.length) i = 0
    setCurrentDrawing(drawings[i]!)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      backdropClassName="fixed inset-0 bg-sky-200 z-40"
      contentClassName="fixed inset-0 z-50 p-6"
    >
      <ArkDialog.CloseTrigger className="h-full w-full flex">
        <img
          src={currentDrawing ?? ""}
          alt=""
          className="h-full mx-auto object-contain bg-transparent rounded-lg border-2 border-black"
        />
      </ArkDialog.CloseTrigger>
      <button
        className="h-16 w-16 text-3xl bg-white rounded-full border-2 border-black/70 absolute-center-y left-6 !outline-none"
        onClick={prevDrawing}
      >
        <div>{"<"}</div>
      </button>
      <button
        className="h-16 w-16 text-3xl bg-white rounded-full border-2 border-black/70 absolute-center-y right-6 !outline-none"
        onClick={nextDrawing}
      >
        <div>{">"}</div>
      </button>
    </Dialog>
  )
}

export default FullScreenCarousel
