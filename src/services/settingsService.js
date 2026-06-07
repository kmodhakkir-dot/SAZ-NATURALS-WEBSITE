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
  // Use Supabase auth updateUser to change password
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return false
  return true
}

export async function getSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Error fetching settings:', error)
    return getDefaultSettings()
  }
  return data || getDefaultSettings()
}

export async function saveSettings(settings) {
  const { data, error } = await supabase
    .from('settings')
    .upsert({ id: 1, ...settings })
    .select()

  if (error) {
    console.error('Error saving settings:', error)
    return null
  }
  return data?.[0] || null
}

function getDefaultSettings() {
  return {
    business_name: 'SAZ Naturals',
    business_logo: '/images/pure-growth-oil.jpg',
    whatsapp_number: '255655799575',
    merchant_number: '255655799575',
    merchant_name: 'SAZ Naturals',
    qr_image: '/images/tigopesa-qr.jpg',
    contact_phone: '+255 655 799 575',
    contact_email: '',
    business_address: 'Tanzania',
    facebook: '',
    instagram: '',
    tiktok: '@sazorganicss',
    delivery_fee: '3000',
    min_order: '0'
  }
}

export const TIGO_PESA_MERCHANT = {
  name: 'SAZ Naturals',
  number: '255655799575',
  qrImage: '/images/tigopesa-qr.jpg'
}

export const TANZANIA_REGIONS = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera',
  'Katavi', 'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara',
  'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Njombe', 'Pwani',
  'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu', 'Singida', 'Tabora',
  'Tanga', 'Zanzibar'
]