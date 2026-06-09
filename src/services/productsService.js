import { supabase } from '../lib/supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) return { data: [], error: error.message }
  return { data: data || [], error: null }
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) return { data: false, error: error.message }
  return { data: true, error: null }
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'hair', label: 'Hair Care' },
  { id: 'skin', label: 'Skin Care' },
  { id: 'oils', label: 'Oils' },
  { id: 'handmade', label: 'Handmade' }
]

export { WHATSAPP_NUMBER, WHATSAPP_URL } from '../constants'
