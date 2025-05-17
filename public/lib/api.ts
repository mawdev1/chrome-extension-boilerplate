import RPC from './rpc'

interface API {
  getDadJoke: () => Promise<string>;
}

const rpc = new RPC()

// Example API method
function getDadJoke(): Promise<string> {
  return rpc.invoke('getDadJoke')
}

const api: API = {
  getDadJoke,
}

export default api 