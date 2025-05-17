/// <reference types="chrome"/>

import api from '../../lib/api'

// Example on how to use the API in content scripts
const getJoke = async (): Promise<void> => {
  try {
    const joke = await api.getDadJoke()
    console.log('Dad joke from content script:', joke)
  } catch (error) {
    console.error('Error fetching joke in content script:', error)
  }
}

// Initialize the content script
const init = (): void => {
  console.log('Content script initialized')
  getJoke()
}

init() 