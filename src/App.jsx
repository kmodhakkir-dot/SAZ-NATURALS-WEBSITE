import { useState, Suspense, lazy, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Benefits from './components/Benefits'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import OrderTracking from './components/OrderTracking'
import AdminLoginModal from './components/AdminLoginModal'
import ProtectedRoute from './components/ProtectedRoute'
import PrivacyPolicy from './components/legal/PrivacyPolicy'
import TermsOfService from './components/legal/TermsOfService'
import RefundPolicy from './components/legal/RefundPolicy'
import { CartProvider } from './hooks/useCart'

const AdminDashboard = lazy(() => import('./components/AdminDashboard'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>
  )
}

function HomePage() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return false
  })
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  const [showAdminLogin, setShowAdminLogin] = useState(false)

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onCartClick={() => navigate('/checkout')} />
      <main>
        <Hero isDark={isDark} />
        <About />
        <Products />
        <Benefits />
        <Gallery />
        <Contact />
      </main>
      <Footer onAdminClick={() => setShowAdminLogin(true)} />
      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSuccess={() => { setShowAdminLogin(false); navigate('/admin') }}
        />
      )}
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<ErrorBoundary><Checkout /></ErrorBoundary>} />
          <Route path="/success/:orderId" element={<ErrorBoundary><OrderSuccess /></ErrorBoundary>} />
          <Route path="/track" element={<ErrorBoundary><OrderTracking /></ErrorBoundary>} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/privacy" element={<ErrorBoundary><PrivacyPolicy /></ErrorBoundary>} />
          <Route path="/terms" element={<ErrorBoundary><TermsOfService /></ErrorBoundary>} />
          <Route path="/refund" element={<ErrorBoundary><RefundPolicy /></ErrorBoundary>} />
        </Routes>
        <Analytics />
      </div>
    </CartProvider>
  )
}