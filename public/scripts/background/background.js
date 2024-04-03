// Backgound / Service Worker
const RPC = require('../../lib/rpc')

const rpc = new RPC()

// Example method - thse can be modularized for a cleaner background script
rpc.registerMethod('getDadJoke', async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'text/plain',
    },
  })
  const data = await response.text()
  return data
})
