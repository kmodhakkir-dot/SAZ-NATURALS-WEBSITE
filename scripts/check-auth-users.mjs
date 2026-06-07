import { createClient } from '@supabase/supabase-js'

const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const service = createClient(URL, SERVICE_KEY)

async function check() {
  const { data: users } = await service.auth.admin.listUsers()
  console.log('Auth users:', JSON.stringify(users.users.map(u => ({ id: u.id, email: u.email })), null, 2))
  
  const { data: profiles } = await service.from('profiles').select('*')
  console.log('Profiles:', JSON.stringify(profiles, null, 2))
}

check().then(() => console.log('Done')).catch(console.error)