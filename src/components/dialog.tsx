"use client"

import { Dialog as ArkDialog, Portal } from "@ark-ui/react"
import { PropsWithChildren, ReactNode } from "react"
import cn from "~/lib/cn"

const Dialog = ({
  open,
  onOpenChange,
  triggerClassName,
  triggerContent,
  contentClassName,
  backdropClassName,
  children,
}: PropsWithChildren<{
  open?: boolean
  onOpenChange?: Parameters<typeof ArkDialog.Root>[0]["onOpenChange"]
  triggerClassName?: string
  triggerContent?: ReactNode
  contentClassName?: string
  backdropClassName?: string
}>) => (
  <ArkDialog.Root open={open} onOpenChange={onOpenChange}>
    {triggerContent && (
      <ArkDialog.Trigger className={triggerClassName}>{triggerContent}</ArkDialog.Trigger>
    )}
    <Portal>
      <ArkDialog.Backdrop
        className={cn(
          "data-[state='open']:animate-dialog-backdrop-fade-in data-[state='closed']:animate-dialog-backdrop-fade-out",
          backdropClassName
        )}
      >
        <div className="h-12 w-12 flex justify-center items-center text-4xl font-hand rounded-full absolute top-2 right-6">
          x
        </div>
      </ArkDialog.Backdrop>
      <ArkDialog.Positioner>
        <ArkDialog.Content
          className={cn(
            "data-[state='open']:animate-dialog-content-fade-in data-[state='closed']:animate-dialog-content-fade-out",
            contentClassName
          )}
        >
          {children}
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </Portal>
  </ArkDialog.Root>
)

export default Dialog
