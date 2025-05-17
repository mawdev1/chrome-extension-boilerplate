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
      <h2>Features include:</h2>
      <ul>
        <li>Messaging RPC</li>
        <li>Popup/Content API</li>
        <li>React 18</li>
        <li>Webpack 5</li>
        <li>Babel 7</li>
        <li>Hot reloading</li>
        <li>ESLint</li>
        <li>Prettier</li>
        <li>TypeScript</li>
        <li>SCSS/Sass</li>
      </ul>
      <div className="joke-wrapper">
        <p>{joke}</p>
      </div>
    </div>
  )
}

export default App 