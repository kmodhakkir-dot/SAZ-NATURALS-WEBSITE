import { createClient } from '@supabase/supabase-js'

const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const svc = createClient(URL, SERVICE_KEY)

async function main() {
  console.log('=== UPDATING SETTINGS WITH QR IMAGE ===\n')

  // Update existing settings row with qr_image and merchant_name
  const { data, error } = await svc.from('settings').update({
    qr_image: '/images/tigopesa-qr.jpg',
    merchant_name: 'SAZ Naturals',
    merchant_number: '255655799575',
    business_name: 'SAZ Naturals'
  }).eq('id', 1).select()

  if (error) {
    console.log('Error:', error.message)
  } else {
    console.log('Updated settings:', JSON.stringify(data[0], null, 2))
  }

  // Verify
  const { data: verify } = await svc.from('settings').select('id, qr_image, merchant_name, merchant_number, business_name').eq('id', 1).single()
  console.log('\n=== VERIFICATION ===')
  console.log('ID:', verify?.id)
  console.log('qr_image:', verify?.qr_image)
  console.log('merchant_name:', verify?.merchant_name)
  console.log('merchant_number:', verify?.merchant_number)
  console.log('business_name:', verify?.business_name)
}

main().catch(console.error)