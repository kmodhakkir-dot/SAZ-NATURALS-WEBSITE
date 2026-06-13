import { supabase } from '../lib/supabase'

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { user: null, error: error.message }
  return { user: data.user, error: null }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Sign out error:', error.message)
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data
}

export async function isAdmin() {
  const user = await getCurrentUser()
  if (!user) return { isAdmin: false, email: null }

  const profile = await getUserProfile(user.id)
  const admin = profile?.role === 'admin'
  return { isAdmin: !!admin, email: user.email, role: profile?.role }
}


export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  const profile = await getUserProfile(user.id)
  if (!profile || profile.role !== 'admin') throw new Error('Not authorized')
  return user
}

export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}
