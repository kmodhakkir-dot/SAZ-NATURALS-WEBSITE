import { createClient } from '@supabase/supabase-js'

const s = createClient(
  'https://wjcuzgtritigeqwyqhix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
)

async function main() {
  const tables = {
    products: { name: 'test', category: 'test', price: '0', image: '/' },
    orders: { id: 'TEMP', customer_name: 'test', phone: '0', address: 'x', region: 'x', total: 0 },
    gallery: { title: 'test', image: '/' }
  }

  for (const [table, insertData] of Object.entries(tables)) {
    // Try insert to discover schema, then delete
    const { data, error } = await s.from(table).insert([insertData]).select()
    if (error) {
      console.log(`${table}: INSERT ERROR - ${error.message}`)
      continue
    }
    if (data && data.length > 0) {
      const cols = Object.keys(data[0])
      console.log(`${table}: columns = ${cols.join(', ')}`)
      // Cleanup
      if (table === 'orders') await s.from(table).delete().eq('id', 'TEMP')
      else await s.from(table).delete().eq('id', data[0].id)
    }
  }
}

main().catch(e => console.log('FATAL:', e.message))