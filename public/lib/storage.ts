/// <reference types="chrome"/>

/**
 * Chrome Storage Utility
 * 
 * This utility provides a wrapper around Chrome's storage API
 * with TypeScript support and Promise-based methods.
 */

type StorageArea = 'sync' | 'local' | 'session'; 

class ChromeStorage {
  private area: chrome.storage.StorageArea;

  constructor(storageArea: StorageArea = 'sync') {
    this.area = chrome.storage[storageArea];
  }

  /**
   * Get a value from storage
   * @param key The key to retrieve
   * @returns Promise that resolves with the value
   */
  async get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      this.area.get(key, (result: {[key: string]: any}) => {
        resolve(result[key] as T || null);
      });
    });
  }

  /**
   * Get multiple values from storage
   * @param keys The keys to retrieve
   * @returns Promise that resolves with an object containing the keys and values
   */
  async getMultiple<T>(keys: string[]): Promise<Record<string, T>> {
    return new Promise((resolve) => {
      this.area.get(keys, (result: Record<string, T>) => {
        resolve(result);
      });
    });
  }

  /**
   * Set a value in storage
   * @param key The key to set
   * @param value The value to store
   * @returns Promise that resolves when the operation is complete
   */
  async set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      this.area.set({ [key]: value }, () => {
        resolve();
      });
    });
  }

  /**
   * Remove a key from storage
   * @param key The key to remove
   * @returns Promise that resolves when the operation is complete
   */
  async remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      this.area.remove(key, () => {
        resolve();
      });
    });
  }

  /**
   * Clear all data from the storage area
   * @returns Promise that resolves when the operation is complete
   */
  async clear(): Promise<void> {
    return new Promise((resolve) => {
      this.area.clear(() => {
        resolve();
      });
    });
  }
}

// Export instances for each storage area
export const syncStorage = new ChromeStorage('sync');
export const localStorage = new ChromeStorage('local');
export const sessionStorage = new ChromeStorage('session'); 