import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'

export const Command: React.FC<React.ComponentPropsWithoutRef<typeof CommandPrimitive>> = ({ className, ...props }) => (
  <CommandPrimitive className={(className || '') + ' rounded-md border p-2 dark:border-gray-800'} {...props} />
)


