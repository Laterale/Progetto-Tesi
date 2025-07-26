"use client"

import { Popover as ArkPopover, PopoverRootProps } from "@ark-ui/react"
import { PropsWithChildren, ReactNode } from "react"
import cn from "~/lib/cn"

const Popover = ({
  triggerClassName,
  triggerContent,
  contentClassName,
  positioning,
  children,
}: PropsWithChildren<{
  triggerClassName?: string
  triggerContent: ReactNode
  contentClassName?: string
  positioning?: PopoverRootProps["positioning"]
}>) => (
  <ArkPopover.Root positioning={positioning}>
    <ArkPopover.Trigger className={cn("!outline-none", triggerClassName)}>
      {triggerContent}
    </ArkPopover.Trigger>
    <ArkPopover.Positioner>
      <ArkPopover.Content
        className={cn(
          "!outline-none z-20 data-[state='open']:animate-popover-content-fade-in data-[state='closed']:animate-popover-content-fade-out",
          contentClassName
        )}
      >
        {children}
        <ArkPopover.CloseTrigger className="text-4xl absolute top-2 right-6 font-hand">
          x
        </ArkPopover.CloseTrigger>
      </ArkPopover.Content>
    </ArkPopover.Positioner>
  </ArkPopover.Root>
)

export default Popover
