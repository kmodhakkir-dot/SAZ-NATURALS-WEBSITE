import { createClient } from '@supabase/supabase-js'

const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4LCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzgwNjgxNjc0LCJleHAiOjIwOTYyNTc2NzR9.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'

const svc = createClient(URL, SERVICE_KEY)

async function test(label, anon, table, op, id, payload) {
  const fn = op === 'UPDATE' ? anon.from(table).update(payload).eq('id', id).select()
            : anon.from(table).delete().eq('id', id).select()
  const { data, error } = await fn
  if (error) return `${label}: ERROR - ${error.message}`
  return `${label}: ${data?.length ? 'ALLOWED' : 'BLOCKED'}`
}

async function run() {
  const pass = [], fail = []

  // Get reference data
  const p = (await svc.from('products').select('id, name').limit(1)).data?.[0]
  const g = (await svc.from('gallery').select('id').limit(1)).data?.[0]
  const s = (await svc.from('settings').select('id').limit(1)).data?.[0]
  const pr = (await svc.from('profiles').select('id').limit(1)).data?.[0]

  const results = []

  // ===== ANONYMOUS TESTS =====
  const anon = createClient(URL, ANON_KEY)
  await anon.auth.signOut()
  
  if (p) {
    results.push(await test('Anon UPDATE products', anon, 'products', 'UPDATE', p.id, { name: 'X' }))
    results.push(await test('Anon DELETE products', anon, 'products', 'DELETE', p.id))
  }
  if (g) results.push(await test('Anon DELETE gallery', anon, 'gallery', 'DELETE', g.id))
  if (s) results.push(await test('Anon DELETE settings', anon, 'settings', 'DELETE', s.id))
  if (pr) {
    results.push(await test('Anon UPDATE profiles', anon, 'profiles', 'UPDATE', pr.id, { name: 'X' }))
    results.push(await test('Anon DELETE profiles', anon, 'profiles', 'DELETE', pr.id))
  }
  
  const o = (await svc.from('orders').insert({ id: 'FULL-TEST-' + Date.now(), customer_name: 'test', phone: '0', address: 'x', region: 'x', total: 0 }).select().single()).data
  if (o) {
    results.push(await test('Anon DELETE orders', anon, 'orders', 'DELETE', o.id))
    await svc.from('orders').delete().eq('id', o.id)
  }

  // ===== CUSTOMER TESTS =====
  const cust = createClient(URL, ANON_KEY)
  const custLogin = await cust.auth.signInWithPassword({ email: 'customer.test@example.com', password: 'test123456' })
  if (custLogin.data?.user && p) {
    results.push(await test('Customer UPDATE products', cust, 'products', 'UPDATE', p.id, { name: 'X' }))
    results.push(await test('Customer DELETE products', cust, 'products', 'DELETE', p.id))
  }
  if (custLogin.data?.user && pr) {
    results.push(await test('Customer UPDATE profiles', cust, 'profiles', 'UPDATE', pr.id, { name: 'X' }))
    results.push(await test('Customer DELETE profiles', cust, 'profiles', 'DELETE', pr.id))
  }

  // Print results
  console.log('\n=== FULL RLS TEST RESULTS ===\n')
  for (const r of results) {
    const ok = r.includes('BLOCKED')
    if (ok) pass.push(r); else fail.push(r)
    console.log(`${ok ? '✅' : '❌'} ${r}`)
  }
  
  console.log(`\nPASS: ${pass.length} | FAIL: ${fail.length}`)
  if (fail.length > 0) {
    console.log('\nFailures:')
    fail.forEach(f => console.log(`  ❌ ${f}`))
  } else {
    console.log('\n🎉 ALL PASS - RLS IS FULLY ENFORCED!')
  }
  
  // Restore product if needed
  if (p) await svc.from('products').update({ name: p.name }).eq('id', p.id)
}

run().catch(console.error)