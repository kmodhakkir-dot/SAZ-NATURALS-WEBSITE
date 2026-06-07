import { supabase } from '../lib/supabase'

export async function createOrder(orderData) {
  const newOrder = {
    id: `ORD-${Date.now()}`,
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

  if (error) {
    console.error('Error creating order:', error)
    return null
  }
  return data?.[0] || null
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }
  return data || []
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()

  if (error) {
    console.error('Error updating order:', error)
    return null
  }
  return data?.[0] || null
}

export async function updateOrderPaymentProof(orderId, proofImage) {
  const { data, error } = await supabase
    .from('orders')
    .update({ payment_proof: proofImage, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()

  if (error) {
    console.error('Error updating payment proof:', error)
    return null
  }
  return data?.[0] || null
}