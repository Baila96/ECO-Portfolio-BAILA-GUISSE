import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './components.css'

// Empêche le navigateur de restaurer automatiquement la position de scroll
// précédente au rechargement de la page (sinon un F5 après avoir scrollé
// jusqu'à "Compétences" te repose exactement là, au lieu du haut de page).
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
