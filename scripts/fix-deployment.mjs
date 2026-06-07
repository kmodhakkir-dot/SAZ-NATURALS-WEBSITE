import { createClient } from '@supabase/supabase-js'

const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const svc = createClient(URL, SERVICE_KEY)

async function fix() {
  console.log('=== FIXING DEPLOYMENT BLOCKERS ===\n')

  // 1. Reset admin password
  console.log('--- 1. Admin Password Reset ---')
  const { data: pwdData, error: pwdErr } = await svc.auth.admin.updateUserById(
    '54c7617f-a2c0-454e-b150-b076bd482d40',
    { password: 'admin1234' }
  )
  if (pwdErr) {
    console.log('Password reset failed:', pwdErr.message)
  } else {
    console.log('Admin password reset to: admin1234')
    console.log('Admin email: kmodhakkir@gmail.com')
  }

  // Verify login works
  const anon = createClient(URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI')
  const { data: login, error: loginErr } = await anon.auth.signInWithPassword({
    email: 'kmodhakkir@gmail.com',
    password: 'admin1234'
  })
  console.log('Login test:', login?.user?.email || 'FAILED: ' + loginErr?.message)

  // 2. Seed settings
  console.log('\n--- 2. Seed Settings ---')
  const { data: existing } = await svc.from('settings').select('id').limit(1)
  console.log('Existing settings:', existing?.length || 0)
  
  if (!existing?.length) {
    const { data: inserted, error: insErr } = await svc.from('settings').insert({
      business_name: 'SAZ Naturals',
      business_logo: '/placeholder.svg',
      merchant_name: 'SAZ Naturals Merchant',
      merchant_number: '000000',
      delivery_fee: 5000,
      min_order: 10000,
      contact_phone: '+255712345678',
      contact_email: 'info@saznaturals.com',
      whatsapp_number: '+255712345678',
      business_address: 'Dar es Salaam, Tanzania',
      facebook: '',
      instagram: '',
      tiktok: ''
    }).select().single()
    console.log('Inserted:', insErr?.message || 'OK - ID: ' + inserted?.id)
  }

  // Verify settings
  const { data: verify } = await svc.from('settings').select('*').limit(1)
  console.log('Verify settings:', verify?.length ? '✅ ' + verify.length + ' row(s)' : '❌ Empty')

  // Start dev server
  console.log('\n--- 3. Starting Dev Server ---')
  console.log('Dev server: npm run dev')
}

fix()