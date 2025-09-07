import React, { Suspense, useEffect, useState } from 'react'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ToastProvider, ToastViewport, ToastRoot, ToastTitle, ToastDescription } from '@/components/ui/toast'

const DemoDialog = React.lazy(() => import('@/features/DemoDialog'))
const DemoCommand = React.lazy(() => import('@/features/DemoCommand'))

const App: React.FC = () => {
  const [joke, setJoke] = useState<string>('')

  // Example on how to use the API in the popup
  useEffect(() => {
    const getJoke = async (): Promise<void> => {
      const joke = await api.getDadJoke()
      setJoke(joke)
    }

    getJoke()
  }, [])

  return (
    <ThemeProvider>
      <ToastProvider>
        <div>
          <Header />
          <Card>
            <CardHeader>
              <CardTitle>Dad Joke API Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0 }}>{joke}</p>
              <Separator />
              <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Button onClick={() => api.getDadJoke().then(setJoke)}>Get another</Button>
                <Suspense fallback={<span style={{ fontSize: 12, opacity: .7 }}>Loading…</span>}>
                  <DemoDialog />
                </Suspense>
                <Suspense fallback={<span style={{ fontSize: 12, opacity: .7 }}>Loading…</span>}>
                  <DemoCommand />
                </Suspense>
                <ToastDemo />
              </div>
            </CardContent>
          </Card>
          <div style={{ height: 8 }} />
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontSize: 14 }}>Dark mode</div>
                <ThemeSwitch />
              </div>
            </CardContent>
          </Card>
          <div style={{ height: 8 }} />
          <Card>
            <CardHeader>
              <CardTitle>Help</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: 13, opacity: .8 }}>Use the menu to change theme, open dialog, or show a toast. Content script UI mounts in a Shadow DOM to avoid CSS collisions.</p>
            </CardContent>
          </Card>
        </div>
        <ToastViewport />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App 

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <h1 className="title" style={{ margin: 0 }}>Chrome Extension Boilerplate</h1>
      <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
        <SelectTrigger style={{ minWidth: 130 }}>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='system'>System</SelectItem>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const checked = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  return (
    <Switch
      checked={checked}
      onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
      aria-label='Toggle dark mode'
    />
  )
}

const ToastDemo: React.FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant='outline' onClick={() => setOpen(true)}>Show toast</Button>
      <ToastRoot open={open} onOpenChange={setOpen} duration={2000}>
        <ToastTitle>Heads up</ToastTitle>
        <ToastDescription>This is a demo toast.</ToastDescription>
      </ToastRoot>
    </>
  )
}