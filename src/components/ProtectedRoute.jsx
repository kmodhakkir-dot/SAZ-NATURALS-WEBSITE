import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getUserProfile } from '../services/authService'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking')
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    async function check() {
      const user = await getCurrentUser()
      if (!user) {
        if (mounted) navigate('/', { replace: true })
        return
      }
      const profile = await getUserProfile(user.id)
      if (!profile || profile.role !== 'admin') {
        if (mounted) navigate('/', { replace: true })
        return
      }
      if (mounted) setStatus('granted')
    }
    check()
    return () => { mounted = false }
  }, [navigate])

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return children
}