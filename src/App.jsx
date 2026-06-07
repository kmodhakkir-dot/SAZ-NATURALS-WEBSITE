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
import AdminLoginModal from './components/AdminLoginModal'
import { CartProvider } from './hooks/useCart'
import { OrdersProvider } from './hooks/useOrders'
import { useHashRoute } from './hooks/useHashRoute'

const AdminDashboard = lazy(() => import('./components/AdminDashboard'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [page, setPage] = useState('home')
  const [completedOrder, setCompletedOrder] = useState(null)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
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
  const goToAdmin = () => {
    setShowAdminLogin(false)
    navigate('/admin')
  }
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
                  <Footer onAdminClick={() => setShowAdminLogin(true)} />
                </>
              )}
              {page === 'checkout' && <Checkout onBack={goHome} onSuccess={goToSuccess} />}
              {page === 'success' && <OrderSuccess order={completedOrder} onBack={goHome} />}
              {page === 'admin' && (
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminDashboard onLogout={goHome} onBack={goHome} />
                </Suspense>
              )}
            </div>
            {showAdminLogin && (
              <AdminLoginModal
                onClose={() => setShowAdminLogin(false)}
                onSuccess={goToAdmin}
              />
            )}
          </div>
        </ErrorBoundary>
      </OrdersProvider>
    </CartProvider>
  )
}