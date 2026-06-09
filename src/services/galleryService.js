import { supabase } from '../lib/supabase'

export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('id', { ascending: true })

  if (error) return { data: [], error: error.message }
  return { data: data || [], error: null }
}

export async function addGalleryItem(item) {
  const { data, error } = await supabase
    .from('gallery')
    .insert([item])
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

export async function updateGalleryItem(id, updates) {
  const { data, error } = await supabase
    .from('gallery')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

export async function deleteGalleryItem(id) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)

  if (error) return { data: false, error: error.message }
  return { data: true, error: null }
}
