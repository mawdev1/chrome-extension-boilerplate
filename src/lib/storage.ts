/// <reference types="chrome"/>

type StorageArea = 'sync' | 'local' | 'session'

class ChromeStorage {
  private area: chrome.storage.StorageArea

  constructor(storageArea: StorageArea = 'sync') {
    this.area = chrome.storage[storageArea]
  }

  async get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      this.area.get(key, (result: { [key: string]: any }) => {
        resolve((result[key] as T) || null)
      })
    })
  }

  async getMultiple<T>(keys: string[]): Promise<Record<string, T>> {
    return new Promise((resolve) => {
      this.area.get(keys, (result: Record<string, T>) => {
        resolve(result)
      })
    })
  }

  async set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      this.area.set({ [key]: value }, () => {
        resolve()
      })
    })
  }

  async remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      this.area.remove(key, () => {
        resolve()
      })
    })
  }

  async clear(): Promise<void> {
    return new Promise((resolve) => {
      this.area.clear(() => {
        resolve()
      })
    })
  }
}

export const syncStorage = new ChromeStorage('sync')
export const localStorage = new ChromeStorage('local')
export const sessionStorage = new ChromeStorage('session')


