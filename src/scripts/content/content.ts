/// <reference types="chrome"/>

import api from '@/lib/api'

function mountShadowUi() {
  const containerId = 'ext-shadow-root'
  if (document.getElementById(containerId)) return
  const host = document.createElement('div')
  host.id = containerId
  host.style.all = 'initial'
  document.documentElement.appendChild(host)
  const shadow = host.attachShadow({ mode: 'open' })
  const root = document.createElement('div')
  shadow.appendChild(root)
  const style = document.createElement('style')
  style.textContent = `:host{all:initial} .ext-card{position:fixed;bottom:12px;right:12px;background:#fff;color:#111;border:1px solid #ddd;border-radius:8px;padding:10px;box-shadow:0 4px 10px rgba(0,0,0,.1);font-family:system-ui,sans-serif;z-index:2147483647} .ext-card.dark{background:#111;color:#fff;border-color:#333}`
  shadow.appendChild(style)
  const card = document.createElement('div')
  card.className = 'ext-card'
  card.textContent = 'Extension content UI mounted (Shadow DOM)'
  root.appendChild(card)
}

const getJoke = async (): Promise<void> => {
  try {
    const joke = await api.getDadJoke()
    console.log('Dad joke from content script:', joke)
  } catch (error) {
    console.error('Error fetching joke in content script:', error)
  }
}

const init = (): void => {
  console.log('Content script initialized')
  mountShadowUi()
  getJoke()
}

init()


