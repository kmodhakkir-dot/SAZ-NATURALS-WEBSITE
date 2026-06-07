import { supabase } from '../lib/supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data || []
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) {
    console.error('Error adding product:', error)
    return null
  }
  return data?.[0] || null
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating product:', error)
    return null
  }
  return data?.[0] || null
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    return false
  }
  return true
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'hair', label: 'Hair Care' },
  { id: 'skin', label: 'Skin Care' },
  { id: 'oils', label: 'Oils' },
  { id: 'handmade', label: 'Handmade' }
]

export const WHATSAPP_NUMBER = '255655799575'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`