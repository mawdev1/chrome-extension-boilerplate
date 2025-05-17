import React, { useEffect, useState } from 'react'
import api from '../../public/lib/api'

const App: React.FC = () => {
  const [joke, setJoke] = useState<string>('')

  // Example on how to use the API in the popup
  useEffect(() => {
    const getJoke = async (): Promise<void> => {
      const joke = await api.getDadJoke()
      setJoke(joke)
    }

    getJoke()
  }, [])

  return (
    <div>
      <h1 className="title">Chrome Extension Boilerplate</h1>
      <h2>Technologies & Features in this codebase:</h2>
      <ul>
        <li>React 18.2.0</li>
        <li>TypeScript 5.3.3</li>
        <li>Webpack 5.90.3</li>
        <li>Babel 7.23.9</li>
        <li>RPC messaging system</li>
        <li>Background service worker</li>
        <li>Content scripts</li>
        <li>API integration (icanhazdadjoke.com)</li>
        <li>Chrome Extension Manifest V3</li>
        <li>ESLint & Prettier</li>
        <li>SCSS/CSS with PostCSS</li>
        <li>Hot reloading</li>
      </ul>
      <h3>Additional Dependencies:</h3>
      <ul>
        <li>chucknorris-io</li>
        <li>one-liner-joke</li>
      </ul>
      <div className="joke-wrapper">
        <p><strong>Dad Joke API Demo:</strong></p>
        <p>{joke}</p>
      </div>
    </div>
  )
}

export default App 