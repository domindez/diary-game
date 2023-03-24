import React from 'react'
import ReactDOM from 'react-dom/client'
import './Sass/index.scss'
import App from './App'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-KMDVRPL'
}
TagManager.initialize(tagManagerArgs)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
    <App />
)
