import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogContent: React.FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>> = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg dark:bg-gray-900" {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}


