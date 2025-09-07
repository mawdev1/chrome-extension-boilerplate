import * as React from 'react'

export const Separator: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...props }) => (
  <hr className={(className || '') + ' my-2 border-gray-200 dark:border-gray-800'} {...props} />
)


