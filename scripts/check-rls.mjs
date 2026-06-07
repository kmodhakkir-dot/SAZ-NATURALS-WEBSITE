import { createClient } from '@supabase/supabase-js'

const anon = createClient(
  'https://wjcuzgtritigeqwyqhix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'
)

console.log('=== RLS VERIFICATION ===\n')

const tables = ['products', 'orders', 'gallery', 'settings', 'profiles']

for (const table of tables) {
  // SELECT: should work (public read policy)
  const { data: selectData, error: selectErr } = await anon
    .from(table)
    .select('id')
    .limit(1)
  
  console.log(`${table}.SELECT: ${selectErr ? '❌ BLOCKED (error: ' + selectErr.message.slice(0, 60) + ')' : '✅ ALLOWED (rows: ' + (selectData?.length || 0) + ')'}`)

  // DELETE: should fail (anon not authenticated)
  const { error: delErr } = await anon
    .from(table)
    .delete()
    .eq('id', -99999)
  
  console.log(`${table}.DELETE: ${delErr ? '✅ BLOCKED (error: ' + delErr.message.slice(0, 60) + ')' : '⚠️ ALLOWED (security gap)'}`)

  // INSERT with invalid data: should fail with auth or column error
  const { error: insErr } = await anon
    .from(table)
    .insert({ nonexist: 'test' })
  
  const isAuthBlocked = insErr?.message?.includes('new row violates') || insErr?.message?.includes('requires role')
  console.log(`${table}.INSERT (invalid): ${isAuthBlocked ? '✅ BLOCKED' : '⚠️ Policy: ' + (insErr?.message?.slice(0, 60) || 'ALLOWED')}`)
}

console.log('\n=== SUMMARY ===')
console.log('RLS is working if:')
console.log('  - SELECT is ALLOWED for all tables (public read)')
console.log('  - DELETE is BLOCKED for anon key')
console.log('  - INSERT is BLOCKED for anon key (except orders)')