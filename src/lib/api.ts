import { RPC } from '@/lib/rpc'

interface API {
  getDadJoke: () => Promise<string>
}

const rpc = new RPC()

function getDadJoke(): Promise<string> {
  return rpc.invoke('getDadJoke')
}

const api: API = {
  getDadJoke,
}

export default api


