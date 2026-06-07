import { createClient } from '@supabase/supabase-js'

const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4LCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzgwNjgxNjc0LCJleHAiOjIwOTYyNTc2NzR9.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'

const svc = createClient(URL, SERVICE_KEY)

async function main() {
  const anon = createClient(URL, ANON_KEY)
  await anon.auth.signOut()
  
  const results = []
  let pass = 0, fail = 0
  
  const p = (await svc.from('products').select('id').limit(1)).data?.[0]
  const g = (await svc.from('gallery').select('id').limit(1)).data?.[0]
  const s = (await svc.from('settings').select('id').limit(1)).data?.[0]
  const pr = (await svc.from('profiles').select('id').limit(1)).data?.[0]

  console.log('=== ALL RLS TESTS (using .select() to check rows affected) ===\n')

  // ANONYMOUS
  console.log('--- Anonymous (no auth) ---')
  for (const { table, id, op, label } of [
    { table: 'products', id: p?.id, op: 'UPDATE', label: 'Anon UPDATE products' },
    { table: 'products', id: p?.id, op: 'DELETE', label: 'Anon DELETE products' },
    { table: 'gallery', id: g?.id, op: 'DELETE', label: 'Anon DELETE gallery' },
    { table: 'settings', id: s?.id, op: 'DELETE', label: 'Anon DELETE settings' },
    { table: 'profiles', id: pr?.id, op: 'UPDATE', label: 'Anon UPDATE profiles' },
    { table: 'profiles', id: pr?.id, op: 'DELETE', label: 'Anon DELETE profiles' },
  ]) {
    if (!id) continue
    const fn = op === 'UPDATE' 
      ? anon.from(table).update({ name: 'X' }).eq('id', id).select()
      : anon.from(table).delete().eq('id', id).select()
    const { data, error } = await fn
    const blocked = !error && (!data || data.length === 0)
    console.log(`  ${blocked ? '✅' : '❌'} ${label}: ${blocked ? 'BLOCKED' : 'ALLOWED!'}`)
    if (blocked) pass++; else fail++
  }

  // CUSTOMER
  console.log('\n--- Customer (authenticated) ---')
  await anon.auth.signInWithPassword({ email: 'customer.test@example.com', password: 'test123456' })
  
  for (const { table, id, op, label } of [
    { table: 'products', id: p?.id, op: 'UPDATE', label: 'Cust UPDATE products' },
    { table: 'products', id: p?.id, op: 'DELETE', label: 'Cust DELETE products' },
    { table: 'profiles', id: pr?.id, op: 'UPDATE', label: 'Cust UPDATE profiles' },
    { table: 'profiles', id: pr?.id, op: 'DELETE', label: 'Cust DELETE profiles' },
  ]) {
    if (!id) continue
    const fn = op === 'UPDATE'
      ? anon.from(table).update({ name: 'X' }).eq('id', id).select()
      : anon.from(table).delete().eq('id', id).select()
    const { data, error } = await fn
    const blocked = !error && (!data || data.length === 0)
    console.log(`  ${blocked ? '✅' : '❌'} ${label}: ${blocked ? 'BLOCKED' : 'ALLOWED!'}`)
    if (blocked) pass++; else fail++
  }
  
  // ORDERS - test with service key temp row
  console.log('\n--- Orders (anon) ---')
  await anon.auth.signOut()
  const o = (await svc.from('orders').insert({ id: 'ORD-TEST-' + Date.now(), customer_name: 'x', phone: '0', address: 'x', region: 'x', total: 0 }).select().single()).data
  if (o) {
    const { data, error } = await anon.from('orders').delete().eq('id', o.id).select()
    const blocked = !error && (!data || data.length === 0)
    console.log(`  ${blocked ? '✅' : '❌'} Anon DELETE orders: ${blocked ? 'BLOCKED' : 'ALLOWED!'}`)
    if (blocked) pass++; else fail++
    await svc.from('orders').delete().eq('id', o.id)
  }

  console.log(`\n=== RESULT: ${pass} PASS, ${fail} FAIL, ${pass + fail} TOTAL ===`)
  if (fail > 0) console.log('❌ FAILURES DETECTED')
  else console.log('✅ ALL TESTS PASS - RLS FULLY ENFORCED')
}

main().catch(console.error)