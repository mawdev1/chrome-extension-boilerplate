import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent: React.FC<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>> = ({ children, ...props }) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content className="z-50 min-w-[12rem] rounded-md border bg-white p-1 text-sm shadow-md dark:border-gray-800 dark:bg-gray-900" {...props}>
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
)
export const DropdownMenuItem = DropdownMenuPrimitive.Item


