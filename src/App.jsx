import { useState, Suspense, lazy, useEffect } from 'react'
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
import { CartProvider } from './hooks/useCart'
import { OrdersProvider } from './hooks/useOrders'
import { useHashRoute } from './hooks/useHashRoute'
import { isAdmin } from './services/authService'

const AdminDashboard = lazy(() => import('./components/AdminDashboard'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>
  )
}

function AdminGate({ children, onAdminReady }) {
  const [status, setStatus] = useState('checking')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    let mounted = true
    isAdmin().then((result) => {
      if (!mounted) return
      // result is an object: { isAdmin, email }
      if (result?.isAdmin) {
        setUserEmail(result.email || '')
        setStatus('admin')
        if (onAdminReady) onAdminReady(result.email)
      } else {
        setStatus('login')
      }
    }).catch(() => {
      if (mounted) setStatus('login')
    })
    return () => { mounted = false }
  }, [])

  if (status === 'checking') return <LoadingSpinner />
  if (status === 'admin') return children
  return <AdminLoginRedirect />
}

function AdminLoginRedirect() {
  // AdminDashboard itself shows the login form when not authenticated.
  // Render it directly with a notice.
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminDashboard onLogout={() => { window.location.hash = '' }} onBack={() => { window.location.hash = '' }} />
    </Suspense>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [page, setPage] = useState('home')
  const [completedOrder, setCompletedOrder] = useState(null)
  const { path, navigate } = useHashRoute()

  // Sync internal page state with hash router
  useEffect(() => {
    setPage(path)
  }, [path])

  const toggleTheme = () => setIsDark(!isDark)
  const goToCheckout = () => navigate('/checkout')
  const goToSuccess = (order) => {
    setCompletedOrder(order)
    navigate('/success')
  }
  const goToAdmin = () => navigate('/admin')
  const goHome = () => {
    setCompletedOrder(null)
    navigate('/')
  }

  return (
    <CartProvider>
      <OrdersProvider>
        <ErrorBoundary>
          <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              {page === 'home' && (
                <>
                  <Navbar isDark={isDark} toggleTheme={toggleTheme} onCartClick={goToCheckout} />
                  <main>
                    <Hero isDark={isDark} />
                    <About />
                    <Products onAddToCart={goToCheckout} />
                    <Benefits />
                    <Gallery />
                    <Contact />
                  </main>
                  <Footer onAdminClick={goToAdmin} />
                </>
              )}
              {page === 'checkout' && <Checkout onBack={goHome} onSuccess={goToSuccess} />}
              {page === 'success' && <OrderSuccess order={completedOrder} onBack={goHome} />}
              {page === 'admin' && (
                <AdminGate>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AdminDashboard onLogout={goHome} onBack={goHome} />
                  </Suspense>
                </AdminGate>
              )}
            </div>
          </div>
        </ErrorBoundary>
      </OrdersProvider>
    </CartProvider>
  )
}
