import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = (props: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) => (
  <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-50 m-2 w-80" {...props} />
)
export const ToastRoot: React.FC<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>> = ({ children, ...props }) => (
  <ToastPrimitive.Root className="mb-2 rounded-md border bg-white p-3 shadow dark:border-gray-800 dark:bg-gray-900" {...props}>
    {children}
  </ToastPrimitive.Root>
)
export const ToastTitle = ToastPrimitive.Title
export const ToastDescription = ToastPrimitive.Description


