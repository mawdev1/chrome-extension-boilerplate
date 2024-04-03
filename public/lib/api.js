import RPC from './rpc'

const rpc = new RPC()

// Example API method
function getDadJoke() {
  return rpc.invoke('getDadJoke')
}

const api = {
  getDadJoke,
}

export default api
