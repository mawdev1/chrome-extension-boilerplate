import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger
export const TooltipContent: React.FC<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>> = ({ children, ...props }) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content className="z-50 rounded-md bg-black px-2 py-1 text-xs text-white" sideOffset={4} {...props}>
      {children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
)


