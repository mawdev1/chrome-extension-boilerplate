import React from 'react'
import { render } from "react-dom"

function Popup() {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h3>Chrome Extension Webpack</h3>
            <h4>Boilerplate</h4>
        </div>
    )
}

render(<Popup />, document.getElementById('react-target'))