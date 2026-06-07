import { createClient } from '@supabase/supabase-js'

const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'

const anon = createClient(URL, ANON_KEY)
const svc = createClient(URL, SERVICE_KEY)

async function test() {
  // Check if RLS is working by testing UPDATE with .select()
  const { data: prods } = await anon.from('products').select('id, name').limit(1)
  if (!prods?.length) {
    console.log('No products found')
    return
  }
  
  const id = prods[0].id
  const origName = prods[0].name
  console.log('Product ID:', id, 'Original name:', origName)
  
  // Test UPDATE - with RLS enabled, anon should get 0 rows back
  console.log('\n--- Testing UPDATE as anon ---')
  const { data: updData, error: updErr } = await anon.from('products').update({ name: 'RLS_TEST' }).eq('id', id).select()
  if (updErr) {
    console.log('UPDATE result: ERROR -', updErr.message)
  } else if (updData?.length > 0) {
    console.log('UPDATE result: ALLOWED! Rows updated:', updData.length)
  } else {
    console.log('UPDATE result: BLOCKED by RLS (0 rows affected)')
  }
  
  // Test DELETE with select
  console.log('\n--- Testing DELETE as anon ---')
  const { data: delData, error: delErr } = await anon.from('products').delete().eq('id', id).select()
  if (delErr) {
    console.log('DELETE result: ERROR -', delErr.message)
  } else if (delData?.length > 0) {
    console.log('DELETE result: ALLOWED! Rows deleted:', delData.length)
  } else {
    console.log('DELETE result: BLOCKED by RLS (0 rows affected)')
  }
  
  // Verify product still exists and restore name
  const { data: check } = await svc.from('products').select('id, name').eq('id', id).single()
  console.log('\nProduct still exists:', check?.name)
  
  if (check?.name !== origName) {
    await svc.from('products').update({ name: origName }).eq('id', id)
    console.log('Restored original name:', origName)
  }
}

test().catch(console.error)