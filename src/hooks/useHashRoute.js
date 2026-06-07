import { useEffect, useState } from 'react'

/**
 * Simple hash-based routing hook.
 * No router dependency required.
 * Supports: /, /checkout, /success, /admin
 */
export function useHashRoute() {
  const [path, setPath] = useState(() => {
    if (typeof window === 'undefined') return 'home'
    const hash = window.location.hash.replace('#', '') || '/'
    return normalizePath(hash)
  })

  useEffect(() => {
    const onChange = () => {
      const hash = window.location.hash.replace('#', '') || '/'
      setPath(normalizePath(hash))
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = (to) => {
    const target = to.startsWith('#') ? to : '#' + to
    if (window.location.hash !== target) {
      window.location.hash = target
    }
  }

  const replace = (to) => {
    const target = to.startsWith('#') ? to : '#' + to
    const url = new URL(window.location.href)
    url.hash = target
    window.history.replaceState(null, '', url.toString())
    const hash = target.replace('#', '') || '/'
    setPath(normalizePath(hash))
  }

  return { path, navigate, replace }
}

function normalizePath(raw) {
  const clean = raw.split('?')[0].split('&')[0].trim() || '/'
  if (clean === '/' || clean === '') return 'home'
  if (clean === '/checkout' || clean === 'checkout') return 'checkout'
  if (clean === '/success' || clean === 'success') return 'success'
  if (clean === '/admin' || clean === 'admin') return 'admin'
  return 'home'
}
