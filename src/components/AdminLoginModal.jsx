import { useState } from 'react'
import { signIn } from '../services/authService'
import { isAdmin } from '../services/authService'

export default function AdminLoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { user, error: signInError } = await signIn(email, password)
    if (signInError) {
      setError(signInError)
      setLoading(false)
      return
    }

    if (!user) {
      setError('Login failed')
      setLoading(false)
      return
    }

    const adminCheck = await isAdmin()
    if (!adminCheck?.isAdmin) {
      setError('Access denied — admin only.')
      setLoading(false)
      return
    }

    setLoading(false)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔐</div>
          <h2 className="text-xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in with your admin account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Admin email address"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none"
            autoFocus
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}