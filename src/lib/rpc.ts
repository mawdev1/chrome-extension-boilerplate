import { z } from 'zod'

type MethodMap = {
  getDadJoke: { args: []; result: string }
}

type RpcRequest<K extends keyof MethodMap = keyof MethodMap> = {
  _rpc: true
  id: string
  method: K
  args: MethodMap[K]['args']
}

type RpcSuccess<K extends keyof MethodMap> = {
  id: string
  ok: true
  result: MethodMap[K]['result']
}

type RpcError = { id: string; ok: false; error: string }

const requestSchema = z.object({
  _rpc: z.literal(true),
  id: z.string(),
  method: z.string(),
  args: z.array(z.any()),
})

const makeId = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`

export class RPC {
  private handlers: Partial<{ [K in keyof MethodMap]: (...a: MethodMap[K]['args']) => Promise<MethodMap[K]['result']> }> = {}

  constructor() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (!requestSchema.safeParse(message).success) return
      if (sender.id && sender.id !== chrome.runtime.id) return
      const req = message as RpcRequest
      const tryHandle = () => this.handlers[req.method as keyof MethodMap] as any

      const attempt = () => {
        const handler = tryHandle()
        if (!handler) return false
        ;(async () => {
          try {
            const result = await handler(...req.args)
            const res: RpcSuccess<any> = { id: req.id, ok: true, result }
            sendResponse(res)
          } catch (e: any) {
            const err: RpcError = { id: req.id, ok: false, error: e?.message ?? 'unknown error' }
            sendResponse(err)
          }
        })()
        return true
      }

      if (attempt()) return true

      const start = Date.now()
      const waitMs = 1000
      const interval = 25
      const t = setInterval(() => {
        if (attempt()) {
          clearInterval(t)
        } else if (Date.now() - start > waitMs) {
          clearInterval(t)
          const err: RpcError = { id: req.id, ok: false, error: `rpc method not ready: ${req.method}` }
          sendResponse(err)
        }
      }, interval)

      return true
    })
  }

  register<K extends keyof MethodMap>(method: K, handler: (...a: MethodMap[K]['args']) => Promise<MethodMap[K]['result']>) {
    this.handlers[method] = handler
  }

  invoke<K extends keyof MethodMap>(method: K, ...args: MethodMap[K]['args']): Promise<MethodMap[K]['result']> {
    const id = makeId()
    const req: RpcRequest<K> = { _rpc: true, id, method, args }
    const timeoutMs = 10000
    return new Promise((resolve, reject) => {
      let done = false
      const timer = setTimeout(() => {
        if (done) return
        done = true
        reject(new Error(`rpc timeout for ${String(method)}`))
      }, timeoutMs)
      chrome.runtime.sendMessage(req, (res: RpcSuccess<K> | RpcError) => {
        if (done) return
        done = true
        clearTimeout(timer)
        if (chrome.runtime.lastError) return reject(new Error(chrome.runtime.lastError.message))
        if (!res) return reject(new Error('no response'))
        if ('ok' in res && res.ok) return resolve(res.result as MethodMap[K]['result'])
        reject(new Error((res as RpcError).error))
      })
    })
  }
}


