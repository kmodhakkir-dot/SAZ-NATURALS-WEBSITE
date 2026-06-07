import { createClient } from '@supabase/supabase-js'

const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const service = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', serviceKey)

console.log('=== PROFILES & AUTH AUDIT ===\n')

// 1. Check profiles table schema
const { data: profileCols } = await service
  .from('profiles')
  .select('*')
  .limit(1)

console.log('1. Profiles table exists:', profileCols ? 'YES' : 'NO')
if (profileCols?.length > 0) {
  console.log('   Columns:', Object.keys(profileCols[0]).join(', '))
}

// 2. Check if trigger exists
const { data: triggerData, error: triggerErr } = await service.rpc('get_triggers', {})
if (triggerErr) {
  // Try querying pg_trigger directly
  console.log('   Trigger check: Requires manual SQL verification')
} else {
  console.log('   Triggers:', triggerData)
}

// 3. Check auth users
const { data: authUsers, error: authErr } = await service.auth.admin.listUsers()
console.log('\n2. Auth users count:', authUsers?.users?.length || 0)
if (authUsers?.users) {
  for (const user of authUsers.users) {
    const profile = profileCols?.find(p => p.id === user.id)
    console.log(`   ${user.email} (${user.id.slice(0, 8)}...): ${profile ? '✅ Has profile (role: ' + profile.role + ')' : '❌ NO PROFILE ROW'}`)
  }
}

// 4. Check RLS policies on profiles
const { data: policies } = await service.rpc('get_policies', { table_name: 'profiles' })
if (policies) {
  console.log('\n3. Profiles RLS policies:')
  for (const p of policies) {
    console.log(`   ${p.policyname} (${p.cmd}): ${p.qual || p.with_check}`)
  }
} else {
  console.log('\n3. Profiles RLS policies: Check manually')
}

console.log('\n=== AUDIT COMPLETE ===')