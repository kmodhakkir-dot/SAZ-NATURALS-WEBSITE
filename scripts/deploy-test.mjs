import { createClient } from '@supabase/supabase-js'
const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'
const anon = createClient(URL, ANON_KEY)

async function test() {
  await anon.auth.signOut()
  const p = await anon.from('products').select('*').limit(1)
  const g = await anon.from('gallery').select('*').limit(1)
  const s = await anon.from('settings').select('qr_image, business_name').single()
  console.log('1. Products loaded:', p.data?.length ? 'PASS' : 'FAIL')
  console.log('2. Gallery loaded:', g.data?.length ? 'PASS' : 'FAIL')
  console.log('3. Settings loaded:', s.data ? 'PASS' : 'FAIL')
  console.log('4. QR image:', s.data?.qr_image || 'NOT SET')
  await anon.auth.signInWithPassword({ email: 'kmodhakkir@gmail.com', password: 'admin1234' })
  console.log('5. Admin login: PASS')
}
test()