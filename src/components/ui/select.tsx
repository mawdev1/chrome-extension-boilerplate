import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

export const Select = SelectPrimitive.Root
export const SelectTrigger: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>> = ({ children, ...props }) => (
  <SelectPrimitive.Trigger className="inline-flex h-9 items-center justify-between rounded-md border bg-white px-3 text-sm dark:border-gray-800 dark:bg-gray-900" {...props}>
    {children}
  </SelectPrimitive.Trigger>
)
export const SelectValue = SelectPrimitive.Value
export const SelectContent: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>> = ({ children, ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content className="z-50 min-w-[10rem] overflow-hidden rounded-md border bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-900" {...props}>
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)
export const SelectItem: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>> = ({ children, ...props }) => (
  <SelectPrimitive.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none focus:bg-gray-100 dark:focus:bg-gray-800" {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)


