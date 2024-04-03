// Backgound / Service Worker
const RPC = require('../../lib/rpc') // Adjust the path as necessary

const rpc = new RPC()

// Example method
rpc.registerMethod('getDadJoke', async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'text/plain',
    },
  })
  const data = await response.text()
  return data
})
