import { createClient } from '@supabase/supabase-js'

const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const anon = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', anonKey)
const service = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', serviceKey)

console.log('=== RLS AUDIT (anon key) ===\n')

const tables = ['products', 'orders', 'gallery', 'settings', 'profiles']
const ops = ['select', 'insert', 'update', 'delete']

for (const table of tables) {
  for (const op of ops) {
    const { data, error } = await anon
      .from(table)
      .select('id')
      .limit(1)
      .then(result => {
        if (op === 'select') return result
        if (op === 'insert') return anon.from(table).insert({ test: 1 }).select()
        if (op === 'update') return anon.from(table).update({ test: 1 }).eq('id', -1)
        if (op === 'delete') return anon.from(table).delete().eq('id', -1)
        return { data: null, error: new Error('Unknown op') }
      })
    
    const blocked = error?.code === '42501' || error?.message?.includes('RLS') || error?.message?.includes('permission')
    const status = blocked ? '✅ BLOCKED' : (error ? '⚠️ ERROR: ' + error.message?.slice(0, 60) : '⚠️ ALLOWED - MISSING RLS')
    console.log(`${table}.${op}: ${status}`)
  }
}

console.log('\n=== SERVICE LAYER AUTH CHECKS ===\n')

// Check if any service file imports serviceRoleKey
const fs = await import('fs')
const serviceFiles = fs.readdirSync('src/services')
let hasAdminKey = false
for (const file of serviceFiles) {
  const content = fs.readFileSync(`src/services/${file}`, 'utf8')
  if (content.includes('service_role') || content.includes(serviceKey.slice(0, 20))) {
    console.log(`⚠️ ${file} uses admin/service key - BYPASSES RLS`)
    hasAdminKey = true
  }
}
if (!hasAdminKey) console.log('✅ No service files use admin key (all use anon key)')

// Check legacy password
const files = fs.readdirSync('src')
let legacyPwd = false
for (const file of files) {
  const stat = fs.statSync(`src/${file}`)
  if (stat.isDirectory()) {
    const subFiles = fs.readdirSync(`src/${file}`)
    for (const sf of subFiles) {
      if (sf.endsWith('.js') || sf.endsWith('.jsx')) {
        const content = fs.readFileSync(`src/${file}/${sf}`, 'utf8')
        if (content.includes('ADMIN1234') || content.includes('hardcoded')) {
          console.log(`⚠️ Legacy password found in src/${file}/${sf}`)
          legacyPwd = true
        }
      }
    }
  }
}
if (!legacyPwd) console.log('✅ No legacy hardcoded passwords found in src/')

console.log('\n=== AUDIT COMPLETE ===')