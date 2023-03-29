import ReactDOM from 'react-dom/client'
import './Sass/index.scss'
import App from './App'
import LanguageDetector from 'i18next-browser-languagedetector'
import TagManager from 'react-gtm-module'
import i18n from './i18n'

const tagManagerArgs = {
  gtmId: 'GTM-KMDVRPL'
}
TagManager.initialize(tagManagerArgs)

void i18n.use(LanguageDetector).init({
  detection: {
    order: ['navigator']
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
    <App />
)
