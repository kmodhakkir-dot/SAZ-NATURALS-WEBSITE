import { supabase } from '../lib/supabase'

export async function createOrder(orderData) {
  const newOrder = {
    id: `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    customer_name: orderData.customerName,
    phone: orderData.phone,
    address: orderData.address,
    region: orderData.region,
    items: orderData.items,
    total: orderData.total,
    delivery_fee: orderData.deliveryFee || 0,
    payment_proof: orderData.paymentProof || null,
    status: 'pending',
    created_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

export async function getOrderById(id) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return { data: null, error: error.message }
  return { data, error: null }
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return { data: [], error: error.message }
  return { data: data || [], error: null }
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

export async function uploadPaymentProof(file) {
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `proofs/${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from('payment-proofs')
    .upload(path, file, { contentType: file.type, upsert: true })
  if (error) return null
  return path
}

export async function updateOrderPaymentProof(orderId, file) {
  const path = await uploadPaymentProof(file)
  if (!path) return { data: null, error: 'Upload failed' }
  const { data, error } = await supabase
    .from('orders')
    .update({ payment_proof: path, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}

export async function getPaymentProofUrl(path) {
  if (!path) return null
  const { data } = await supabase.storage
    .from('payment-proofs')
    .createSignedUrl(path, 3600)
  return data?.signedUrl || null
}

export async function dispatchOrder(orderId, { driverName, driverPhone, note }) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status: 'out-for-delivery',
      driver_name: driverName,
      driver_phone: driverPhone,
      dispatch_note: note,
      notified_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', orderId)
    .select()

  if (error) return { data: null, error: error.message }
  return { data: data?.[0] || null, error: null }
}