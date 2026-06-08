import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { ORDER_STATUSES } from '../services/settingsService'
import { WHATSAPP_URL } from '../constants'

export default function OrderTracking() {
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const intervalRef = useRef(null)

  const fetchOrders = useCallback(async (phoneNumber) => {
    if (!phoneNumber) return
    setLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('phone', phoneNumber)
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
    setSearched(true)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (intervalRef.current) clearInterval(intervalRef.current)
    fetchOrders(phone)
    intervalRef.current = setInterval(() => fetchOrders(phone), 30000)
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const statusColor = (status) => {
    const s = ORDER_STATUSES.find(o => o.value === status)
    return s?.color || 'gray'
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Track Your Order</h1>
        <p className="text-foreground/60 mb-6">Enter the phone number you used when ordering.</p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+255 XXX XXX XXX"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none"
            required
          />
          <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50">
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {searched && !loading && orders.length === 0 && (
          <div className="text-center py-12 text-foreground/60">No orders found for this number.</div>
        )}

        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-mono text-gray-400">{o.id}</span>
                  <p className="font-semibold text-gray-900">{o.customer_name}</p>
                  <p className="text-sm text-gray-500">{new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor(o.status)}-100 text-${statusColor(o.status)}-700`}>
                  {ORDER_STATUSES.find(s => s.value === o.status)?.label || o.status}
                </span>
              </div>

              {o.items && (
                <div className="text-sm text-gray-700 mb-3">
                  {o.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-0.5">
                      <span>{item.name} × {item.quantity}</span>
                      <span>TZS {item.price?.replace('TZS ', '')}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between border-t border-gray-100 pt-2 font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-emerald-600">TZS {o.total?.toLocaleString()}</span>
              </div>

              {o.status === 'out-for-delivery' && o.driver_name && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="font-semibold text-blue-800 mb-2">🚚 Your order is on the way!</p>
                  <p className="text-sm text-blue-700">Driver: {o.driver_name}</p>
                  <p className="text-sm text-blue-700">Driver Phone: {o.driver_phone}</p>
                  {o.dispatch_note && <p className="text-sm text-blue-700 mt-1">{o.dispatch_note}</p>}
                  {o.notified_at && <p className="text-xs text-blue-500 mt-1">Last updated: {new Date(o.notified_at).toLocaleTimeString()}</p>}
                  <a
                    href={o.driver_phone ? `https://wa.me/${o.driver_phone.replace(/[^0-9]/g, '')}` : WHATSAPP_URL}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                  >
                    📞 Call Driver
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}