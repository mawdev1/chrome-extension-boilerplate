/// <reference types="chrome"/>

// Background / Service Worker
import RPC from '../../lib/rpc'

console.log('Background script loaded and running!', new Date().toISOString())

const rpc = new RPC()

// Example method - these can be modularized for a cleaner background script
rpc.registerMethod('getDadJoke', async (): Promise<string> => {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'text/plain',
      },
    })
    
    if (!response.ok) {
      throw new Error(`Error fetching joke: ${response.status}`)
    }
    
    const data = await response.text()
    console.log('Dad joke fetched:', data)
    return data
  } catch (error) {
    console.error('Error in getDadJoke:', error)
    return 'Failed to fetch a joke. Try again later!'
  }
}) 