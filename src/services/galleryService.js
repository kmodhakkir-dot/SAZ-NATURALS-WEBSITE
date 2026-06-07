import { supabase } from '../lib/supabase'

export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching gallery:', error)
    return []
  }
  return data || []
}

export async function addGalleryItem(item) {
  const { data, error } = await supabase
    .from('gallery')
    .insert([item])
    .select()

  if (error) {
    console.error('Error adding gallery item:', error)
    return null
  }
  return data?.[0] || null
}

export async function updateGalleryItem(id, updates) {
  const { data, error } = await supabase
    .from('gallery')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating gallery item:', error)
    return null
  }
  return data?.[0] || null
}

export async function deleteGalleryItem(id) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting gallery item:', error)
    return false
  }
  return true
}