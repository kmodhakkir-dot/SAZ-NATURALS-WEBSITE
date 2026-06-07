import { createClient } from '@supabase/supabase-js'

const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const service = createClient('https://wjcuzgtritigeqwyqhix.supabase.co', serviceKey)

console.log('Creating test customer user...')

// Create test customer
const { data: newUser, error: createErr } = await service.auth.admin.createUser({
  email: 'customer.test@example.com',
  password: 'test123456',
  email_confirm: true
})

if (createErr && !createErr.message.includes('already')) {
  console.log('Create error:', createErr.message)
} else {
  console.log('User created:', newUser?.user?.email || 'already exists')
}

// Get the customer user
const { data: users } = await service.auth.admin.listUsers()
const customer = users.users.find(u => u.email === 'customer.test@example.com')

if (customer) {
  // Create profile with role='customer'
  const { error: profErr } = await service
    .from('profiles')
    .upsert({ id: customer.id, email: customer.email, role: 'customer', name: 'Test Customer' })
  
  if (profErr) {
    console.log('Profile error:', profErr.message)
  } else {
    console.log('✅ Profile created with role=customer')
  }
}

// List all profiles
const { data: profiles } = await service.from('profiles').select('email, role')
console.log('\nAll profiles:')
for (const p of profiles || []) console.log(`  ${p.email} → role: ${p.role}`)