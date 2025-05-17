/// <reference types="chrome"/>

// Explanation of the RPC class:
// This class is used to communicate between the content script and the background script.
// The class has two methods:
// 1. registerMethod: This method is used to register a method in the background script.
// 2. invoke: This method is used to call a method in the background script.
// The class listens for messages from the background script and invokes the registered method.
// The class also sends a message to the background script and listens for the response.

// Usage: import RPC from './lib/rpc.js'

interface RPCMessage {
  action: string;
  methodName: string;
  args: any[];
}

interface RPCResponse {
  status: 'success' | 'error';
  response?: any;
  error?: string;
}

type RPCMethod = (...args: any[]) => Promise<any>;

class RPC {
  private methods: Record<string, RPCMethod>;

  constructor() {
    this.methods = {};

    chrome.runtime.onMessage.addListener((request: RPCMessage, sender, sendResponse) => {
      if (request.action === 'invoke' && this.methods[request.methodName]) {
        this.methods[request.methodName](...request.args)
          .then((response) => sendResponse({ status: 'success', response }))
          .catch((error: Error) =>
            sendResponse({ status: 'error', error: error.message })
          );
        return true; // Return true to indicate async response.
      }
    });
  }

  registerMethod(name: string, func: RPCMethod): void {
    this.methods[name] = func;
  }

  invoke(methodName: string, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'invoke', methodName, args },
        (response: RPCResponse) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response?.status === 'success') {
            resolve(response.response);
          } else {
            reject(new Error(response?.error || 'Unknown error'));
          }
        }
      );
    });
  }
}

export default RPC; 