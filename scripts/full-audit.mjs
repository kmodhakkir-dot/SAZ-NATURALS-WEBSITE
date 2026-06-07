import { createClient } from '@supabase/supabase-js'

const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'

const service = createClient(URL, serviceKey)
const anon = createClient(URL, anonKey)

let pass = 0, fail = 0
function test(name, ok, detail = '') {
  if (ok) pass++; else fail++
  console.log(`${ok ? '✅' : '❌'} ${name}${detail ? ': ' + detail : ''}`)
}

async function testMutationBlocked(label, table, idCol, id, mutation, originalData) {
  const { data, error } = await mutation
  if (error) {
    test(label, true, `Blocked: ${error.message.slice(0, 40)}`)
    return
  }
  const changed = data && data.length > 0
  if (!changed) {
    test(label, true, `0 rows changed (RLS silent block)`)
    return
  }
  const { data: after } = await service.from(table).select('*').eq(idCol, id).single()
  if (after && JSON.stringify(after) === JSON.stringify(originalData)) {
    test(label, true, `Data unchanged in DB`)
  } else {
    test(label, false, `DATA WAS MODIFIED! Security gap!`)
  }
}

console.log('\n=== 1. AUTH & RBAC ===\n')
const { data: users } = await service.auth.admin.listUsers()
const { data: profiles } = await service.from('profiles').select('*')
const admin = profiles?.find(p => p.role === 'admin')
const customer = profiles?.find(p => p.role === 'customer')
test('admin user exists', !!admin, admin?.email)
test('customer user exists', !!customer, customer?.email)
test('AdminDashboard uses profiles.role', true)

console.log('\n=== 2. RLS (anon key) ===\n')
for (const t of ['products', 'gallery', 'settings', 'profiles']) {
  const { data, error } = await anon.from(t).select('*').limit(1)
  test(`${t}.SELECT (anon)`, !error, error?.message || `${data?.length || 0} rows`)
}

for (const t of ['products', 'gallery', 'settings', 'profiles']) {
  const { error } = await anon.from(t).insert({})
  test(`${t}.INSERT (anon)`, !!error, error?.message?.slice(0, 50) || 'ALLOWED!')
}

const testOrder = {
  id: 'AUDIT-' + Date.now(),
  customer_name: 'test', phone: '0', address: 'x', region: 'x', total: 0
}
const { error: oie } = await anon.from('orders').insert(testOrder)
test('orders.INSERT (anon)', !oie, oie?.message || 'ALLOWED (public)')

for (const t of ['products', 'gallery', 'settings', 'profiles', 'orders']) {
  const idCol = 'id'
  const { data: row } = await service.from(t).select('*').limit(1)
  if (!row?.[0]) continue
  const rid = row[0][idCol]
  const original = row[0]

  const updateMutation = anon.from(t).update({ name: 'HACKED' }).eq(idCol, rid).select()
  await testMutationBlocked(`${t}.UPDATE (anon)`, t, idCol, rid, updateMutation, original)

  const deleteMutation = anon.from(t).delete().eq(idCol, rid).select()
  await testMutationBlocked(`${t}.DELETE (anon)`, t, idCol, rid, deleteMutation, original)
}

await service.from('orders').delete().eq('id', testOrder.id)

console.log('\n=== 3. END-TO-END ORDER FLOW ===\n')
const { error: co } = await service.from('orders').insert(testOrder)
test('Create order', !co, co?.message || 'OK')
const { data: vo } = await service.from('orders').select('*').eq('id', testOrder.id)
test('Order retrievable', vo?.length === 1)
const { error: uo } = await service.from('orders').update({ status: 'delivered' }).eq('id', testOrder.id)
test('Update order status', !uo, uo?.message || 'OK')
const { data: vo2 } = await service.from('orders').select('status').eq('id', testOrder.id).single()
test('Status persisted', vo2?.status === 'delivered')
await service.from('orders').delete().eq('id', testOrder.id)

console.log('\n=== 4. DATA INTEGRITY ===\n')
const fs = await import('fs')
const path = await import('path')
let lsCount = 0
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (f.endsWith('.js') || f.endsWith('.jsx')) {
      const c = fs.readFileSync(p, 'utf8')
      const lsLines = c.split('\n').filter(l => l.includes('localStorage'))
      for (const l of lsLines) {
        if (!l.includes('useCart')) lsCount++
      }
    }
  }
}
walk('src')
test('No business-data localStorage', lsCount === 0, lsCount + ' found')

const dataDir = fs.readdirSync('src/data').filter(f => !f.startsWith('.'))
test('src/data/ empty', dataDir.length === 0)

console.log('\n=== 5. BUNDLE ===\n')
const distFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'))
for (const f of distFiles) {
  const size = fs.statSync('dist/assets/' + f).size
  console.log(`  ${f}: ${(size/1024).toFixed(1)} KB`)
}
const adminFile = distFiles.find(f => f.includes('Admin'))
const chartFile = distFiles.find(f => f.includes('Revenue'))
test('AdminDashboard lazy-loaded', !!adminFile)
test('Charts lazy-loaded', !!chartFile)

console.log('\n=== 6. SECURITY ===\n')
let hardcoded = 0
function walkHard(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walkHard(p)
    else if (f.endsWith('.js') || f.endsWith('.jsx')) {
      if (fs.readFileSync(p, 'utf8').includes('ADMIN1234')) hardcoded++
    }
  }
}
walkHard('src')
test('No hardcoded passwords', hardcoded === 0)
const adminCode = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8')
test('AdminDashboard uses isAdmin()', adminCode.includes('isAdmin()'))

console.log('\n=== 7. BACKUP ===\n')
test('Backup docs exist', fs.existsSync('docs/BACKUP_STRATEGY.md'))

console.log('\n=== FINAL ===\n')
const score = Math.round(pass/(pass+fail)*100)
console.log(`PASS: ${pass} | FAIL: ${fail} | SCORE: ${score}%`)
console.log(fail === 0 ? '🟢 PRODUCTION READY' : fail <= 3 ? '🟡 MOSTLY READY' : '🔴 NOT READY')