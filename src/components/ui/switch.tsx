import * as React from 'react'
import * as SwitchPr from '@radix-ui/react-switch'

export const Switch: React.FC<React.ComponentPropsWithoutRef<typeof SwitchPr.Root>> = ({ className, ...props }) => (
  <SwitchPr.Root
    className={(className || '') + ' relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full border border-gray-300 bg-gray-200 transition-colors data-[state=checked]:bg-gray-900 dark:border-gray-700 dark:bg-gray-700 data-[state=checked]:dark:bg-gray-100'}
    {...props}
  >
    <SwitchPr.Thumb className="pointer-events-none inline-block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-4" />
  </SwitchPr.Root>
)


