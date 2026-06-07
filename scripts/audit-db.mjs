import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://wjcuzgtritigeqwyqhix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
)

async function audit() {
  for (const t of ['products', 'orders', 'gallery', 'settings', 'profiles']) {
    const { data, error } = await supabase.from(t).select('*').limit(1)
    if (error) {
      console.log(`${t}: ERROR - ${error.message}`)
    } else {
      console.log(`${t}: OK (${data?.length || 0} rows)`)
      if (data && data.length > 0) {
        console.log(`  Columns: ${Object.keys(data[0]).join(', ')}`)
      }
    }
  }
}

audit().catch(e => console.log('FATAL:', e))