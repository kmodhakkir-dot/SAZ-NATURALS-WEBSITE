import { createClient } from '@supabase/supabase-js'

const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'

const service = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', serviceKey)
const anon = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', anonKey)

console.log('=== Direct UPDATE/DELETE test (anon key) ===\n')

const { data: prod } = await anon.from('products').select('id, name').limit(1)
if (!prod?.length) {
  console.log('No products to test')
  process.exit(0)
}

const pid = prod[0].id
console.log('Testing product id:', pid, 'name:', prod[0].name)

const { error: uerr, data: udata } = await anon.from('products').update({ name: 'HACKED_TEST' }).eq('id', pid).select()
console.log('UPDATE result:', uerr ? `BLOCKED: ${uerr.message.slice(0, 80)}` : `ALLOWED! ${udata?.length || 0} rows changed`)

const { error: derr, data: ddata } = await anon.from('products').delete().eq('id', pid).select()
console.log('DELETE result:', derr ? `BLOCKED: ${derr.message.slice(0, 80)}` : `ALLOWED! ${ddata?.length || 0} rows deleted`)

const { data: after } = await anon.from('products').select('id, name').eq('id', pid)
console.log('Product after tests:', after)