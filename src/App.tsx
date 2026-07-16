import { AnimatePresence, motion } from 'framer-motion'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BackToTop from './components/BackToTop'
import CursorSpotlight from './components/CursorSpotlight'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import { LanguageProvider } from './i18n/LanguageContext'

const pageTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <main className="page-shell">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={location.pathname} className="page-transition" initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }} transition={pageTransition}>
          <Routes location={location}><Route path="/" element={<Home />} /><Route path="/projet/:slug" element={<ProjectDetail />} /></Routes>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { document.body.classList.toggle('loading-lock', loading); if (!loading) return; const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [loading])
  return (
    <LanguageProvider>
      <HashRouter>
        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
        <CursorSpotlight /><Nav /><AnimatedRoutes /><Footer /><BackToTop />
      </HashRouter>
    </LanguageProvider>
  )
}
