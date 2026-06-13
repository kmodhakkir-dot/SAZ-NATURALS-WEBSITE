import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, ShoppingCart } from 'lucide-react'
import { cn } from '../lib/utils'
import { useCart } from '../hooks/useCart'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ isDark, toggleTheme, onCartClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 120
      sections.forEach(section => {
        const top = section.offsetTop
        const height = section.offsetHeight
        const id = section.getAttribute('id')
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-nav shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 text-xl font-heading font-bold"
          >
            <img src="/images/saz-naturals.jpg" alt="SAZ Naturals" className="w-9 h-9 rounded-full object-cover border-2 border-white/30" />
            <span className={isScrolled || isDark ? 'text-foreground' : 'text-white'}>
              SAZ Naturals
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeSection === item.href.slice(1)
                    ? 'bg-primary-500 text-white'
                    : isScrolled || isDark
                      ? 'text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {item.label}
              </a>
            ))}
            
            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="ml-2 p-2.5 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-200 relative"
              title="View Cart"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button
              onClick={toggleTheme}
              className={cn(
                'ml-1 p-2.5 rounded-full transition-all duration-200',
                isScrolled || isDark
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-500'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-lg bg-primary-500 text-white"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-lg',
                isScrolled || isDark
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-white'
              )}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'p-2 rounded-lg',
                isScrolled || isDark
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-white'
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-nav border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    activeSection === item.href.slice(1)
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}