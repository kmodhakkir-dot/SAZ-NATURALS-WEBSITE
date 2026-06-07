import { createClient } from '@supabase/supabase-js'

const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const service = createClient(URL, SERVICE_KEY)

async function createProfiles() {
  // Create admin profile
  const { data: adminProfile, error: adminErr } = await service.from('profiles').upsert({
    id: '54c7617f-a2c0-454e-b150-b076bd482d40',
    email: 'kmodhakkir@gmail.com',
    role: 'admin',
    name: 'Admin User'
  }, { onConflict: 'id' }).select()
  
  if (adminErr) {
    console.log('Admin profile error:', adminErr.message)
  } else {
    console.log('Admin profile created:', adminProfile)
  }
  
  // Create customer profile
  const { data: custProfile, error: custErr } = await service.from('profiles').upsert({
    id: '46bdd0e8-48f4-45a7-8012-9af2472e6d30',
    email: 'customer.test@example.com',
    role: 'customer',
    name: 'Test Customer'
  }, { onConflict: 'id' }).select()
  
  if (custErr) {
    console.log('Customer profile error:', custErr.message)
  } else {
    console.log('Customer profile created:', custProfile)
  }
  
  // Verify
  const { data: allProfiles } = await service.from('profiles').select('*')
  console.log('All profiles:', allProfiles)
}

createProfiles().catch(console.error)