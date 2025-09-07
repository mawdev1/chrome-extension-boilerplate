import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

const DemoDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ margin: 0 }}>Demo dialog</h3>
          <p style={{ margin: 0 }}>This is a lazy-loaded dialog using Radix primitives.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DemoDialog


