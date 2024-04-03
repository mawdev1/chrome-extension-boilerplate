// Explanation of the RPC class:
// This class is used to communicate between the content script and the background script.
// The class has two methods:
// 1. registerMethod: This method is used to register a method in the background script.
// 2. invoke: This method is used to call a method in the background script.
// The class listens for messages from the background script and invokes the registered method.
// The class also sends a message to the background script and listens for the response.

// Usage: import RPC from './lib/rpc.js'

class RPC {
  constructor() {
    this.methods = {}

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'invoke' && this.methods[request.methodName]) {
        this.methods[request.methodName](...request.args)
          .then((response) => sendResponse({ status: 'success', response }))
          .catch((error) =>
            sendResponse({ status: 'error', error: error.message })
          )
        return true // Return true to indicate async response.
      }
    })
  }

  registerMethod(name, func) {
    this.methods[name] = func
  }

  invoke(methodName, ...args) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'invoke', methodName, args },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message))
          } else if (response.status === 'success') {
            resolve(response.response)
          } else {
            reject(new Error(response.error))
          }
        }
      )
    })
  }
}

module.exports = RPC
