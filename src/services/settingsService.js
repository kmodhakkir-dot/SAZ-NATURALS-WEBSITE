import { supabase } from '../lib/supabase'

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'paid', label: 'Paid', color: 'blue' },
  { value: 'processing', label: 'Processing', color: 'purple' },
  { value: 'out-for-delivery', label: 'Out for Delivery', color: 'indigo' },
  { value: 'delivered', label: 'Delivered', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' }
]

export async function changePassword(currentPassword, newPassword) {
  const { data: userData } = await supabase.auth.getUser()
  const email = userData?.user?.email
  if (!email) return { success: false, error: 'Not authenticated' }
  // Re-authenticate first
  const { error: reauthError } = await supabase.auth.signInWithPassword({ email, password: currentPassword })
  if (reauthError) return { success: false, error: 'Current password is incorrect' }
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('key', 'global')
    .single()

  if (error) return { data: getDefaultSettings(), error: null }
  return { data: data || getDefaultSettings(), error: null }
}

export async function saveSettings(settings) {
  const { data, error } = await supabase
    .from('settings')
    .upsert({ key: 'global', ...settings })
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

function getDefaultSettings() {
  return {
    business_name: 'SAZ Naturals',
    business_logo: '/images/pure-growth-oil.jpg',
    whatsapp_number: '255759747338',
    merchant_number: '255759747338',
    merchant_name: 'SAZ Naturals',
    qr_image: '/images/tigo-pesa-qr-v2.jpg',
    contact_phone: '+255 759 747 338',
    contact_email: 'info@saznaturals.com',
    business_address: 'Tanzania',
    facebook: 'https://facebook.com/saznaturals',
    instagram: 'https://instagram.com/saznaturals',
    tiktok: '@saznaturals',
    delivery_fee: '3000',
    min_order: '0'
  }
}

export { TIGO_PESA_MERCHANT } from '../constants'

export const TANZANIA_REGIONS = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera',
  'Katavi', 'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara',
  'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Njombe', 'Pwani',
  'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu', 'Singida', 'Tabora',
  'Tanga', 'Zanzibar'
]