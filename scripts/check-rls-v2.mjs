import { createClient } from '@supabase/supabase-js'

const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const anon = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', anonKey)
const service = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', serviceKey)

console.log('=== RLS TEST WITH REAL ROWS ===\n')

const tests = [
  { table: 'products', idCol: 'id', val: 1, canDelete: false },
  { table: 'gallery', idCol: 'id', val: 1, canDelete: false },
  { table: 'settings', idCol: 'id', val: 1, canDelete: false },
]

for (const t of tests) {
  // Verify row exists via service
  const { data: row } = await service.from(t.table).select('id').eq(t.idCol, t.val).limit(1)
  if (!row?.length) { console.log(`${t.table}: Row ${t.val} not found, skipping`); continue }

  // Try DELETE as anon
  const { error } = await anon.from(t.table).delete().eq(t.idCol, t.val)
  
  // Verify row still exists
  const { data: after } = await service.from(t.table).select('id').eq(t.idCol, t.val).limit(1)
  const stillExists = after?.length > 0

  if (error) {
    console.log(`${t.table}.DELETE: ✅ BLOCKED (${error.message.slice(0, 50)})`)
  } else if (stillExists) {
    console.log(`${t.table}.DELETE: ✅ SAFE (0 rows deleted, row still exists)`)
  } else {
    console.log(`${t.table}.DELETE: ❌ CRITICAL - Row was deleted by anon key!`)
  }
}

// Test INSERT blocked
for (const table of ['products', 'gallery', 'settings']) {
  const { error } = await anon.from(table).insert({ name: 'test' })
  if (error && (error.message.includes('violates') || error.message.includes('requires') || error.message.includes('policy'))) {
    console.log(`${table}.INSERT: ✅ BLOCKED (${error.message.slice(0, 50)})`)
  } else {
    console.log(`${table}.INSERT: ${error ? '⚠️ ' + error.message.slice(0, 50) : '⚠️ ALLOWED (gap)'}`)
  }
}

console.log('\n=== DONE ===')