/// <reference types="chrome"/>

import { RPC } from '@/lib/rpc'

console.log('Background script loaded and running!', new Date().toISOString())

const rpc = new RPC()

rpc.register('getDadJoke', async (): Promise<string> => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'text/plain' },
  })
  if (!response.ok) throw new Error(`Error fetching joke: ${response.status}`)
  const data = await response.text()
  return data
})


