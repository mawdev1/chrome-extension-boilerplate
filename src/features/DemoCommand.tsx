import React from 'react'
import { Command } from '@/components/ui/command'

const DemoCommand: React.FC = () => {
  return (
    <div>
      <Command>
        <div style={{ padding: 8, fontSize: 12, opacity: 0.8 }}>Type to filter (demo)</div>
      </Command>
    </div>
  )
}

export default DemoCommand


