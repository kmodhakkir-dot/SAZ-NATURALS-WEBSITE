import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { signIn, signOut, getCurrentUser, getUserProfile, isAdmin } from '../services/authService'
import { getOrders, updateOrderStatus } from '../services/ordersService'
import { getProducts, addProduct, updateProduct, deleteProduct, categories } from '../services/productsService'
import { getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '../services/galleryService'
import { getSettings, saveSettings, changePassword, ORDER_STATUSES } from '../services/settingsService'
import { motion, AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
const RevenueLineChart = lazy(() => import('./ui/RevenueChart').then(m => ({ default: m.RevenueLineChart })))
const OrdersBarChart = lazy(() => import('./ui/RevenueChart').then(m => ({ default: m.OrdersBarChart })))
const CategoryPieChart = lazy(() => import('./ui/RevenueChart').then(m => ({ default: m.CategoryPieChart })))

const fmt = (n) => 'TZS ' + Number(n).toLocaleString()
function todayStr() { return new Date().toISOString().slice(0,10) }
function weekAgo() { const d=new Date(); d.setDate(d.getDate()-7); return d.toISOString() }
function monthStart() { return new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString() }
function yearStart() { return new Date(new Date().getFullYear(), 0, 1).toISOString() }
function ordersInRange(orders, from, to) { return orders.filter(o => o.created_at && o.created_at >= from && (!to || o.created_at <= to)) }

function SettingsTab() {
  const [settings, setSettings] = useState(null)
  const [saved, setSaved] = useState(false)
  const [pwdCurrent, setPwdCurrent] = useState('')
  const [pwdNew, setPwdNew] = useState('')
  const [pwdConfirm, setPwdConfirm] = useState('')
  const [pwdMsg, setPwdMsg] = useState('')
  const [pwdErr, setPwdErr] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings().then(s => { setSettings(s.data); setLoading(false) })
  }, [])

  const handleSave = async () => {
    if (!settings) return
    await saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div className="text-center py-8 text-gray-500">Loading settings...</div>
  if (!settings) return <div className="text-center py-8 text-red-500">Failed to load settings</div>

  const fields = [
    {key:'business_name',label:'Business Name',type:'text'},{key:'business_logo',label:'Logo URL',type:'text'},
    {key:'merchant_name',label:'Merchant Name',type:'text'},{key:'merchant_number',label:'Merchant Number',type:'text'},
    {key:'qr_image',label:'QR Code Image URL',type:'text'},{key:'contact_phone',label:'Contact Phone',type:'text'},
    {key:'contact_email',label:'Contact Email',type:'email'},{key:'whatsapp_number',label:'WhatsApp',type:'text'},
    {key:'business_address',label:'Address',type:'text'},
    {key:'instagram',label:'Instagram URL',type:'text'},{key:'tiktok',label:'TikTok',type:'text'},
    {key:'delivery_fee',label:'Delivery Fee (TZS)',type:'number'},{key:'min_order',label:'Min Order (TZS)',type:'number'},
    {key:'about_image',label:'About Section Image URL',type:'text'},
    {key:'about_heading',label:'About Section Heading',type:'text'}
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Business Settings</h2>
        {saved && <span className="text-green-600 text-sm font-medium">Saved</span>}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                type={f.type}
                value={settings[f.key] || ''}
                onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none text-sm"
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('dashboard')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [gallery, setGallery] = useState([])
  const [settingUp, setSettingUp] = useState(false)

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      const admin = await isAdmin()
      if (admin) {
        setIsLoggedIn(true)
        loadData()
      }
      setCheckingAuth(false)
      setLoading(false)
    }
    checkAuth()
  }, [])

  async function loadData() {
    try {
      const [o, p, g] = await Promise.all([
        getOrders(),
        getProducts(),
        getGallery()
      ])
      setOrders(o.data || [])
      setProducts(p.data || [])
      setGallery(g.data || [])
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password) {
      setError('Please enter email and password')
      setLoading(false)
      return
    }

    const { user, error: signInError } = await signIn(email, password)
    if (signInError) {
      setError(signInError)
      setLoading(false)
      return
    }

    if (!user) {
      setError('Login failed')
      setLoading(false)
      return
    }

    const profile = await getUserProfile(user.id)
    if (!profile || profile.role !== 'admin') {
      await supabase.auth.signOut()
      setError('Access denied. Admin privileges required.')
      setLoading(false)
      return
    }

    setIsLoggedIn(true)
    setLoading(false)
    loadData()
  }

  const handleLogout = async () => {
    await signOut()
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
    navigate('/')
  }

  const [pForm, setPForm] = useState({ name:'', category:'hair', price:'', description:'', image:'', badge:'', stock:0 })
  const [editingP, setEditingP] = useState(null)
  const [showPForm, setShowPForm] = useState(false)

  const [gForm, setGForm] = useState({ title:'', description:'', image:'' })
  const [editingG, setEditingG] = useState(null)
  const [showGForm, setShowGForm] = useState(false)

  const [orderSearch, setOrderSearch] = useState('')
  const [orderFilter, setOrderFilter] = useState('all')
  const [selOrder, setSelOrder] = useState(null)
  const [selCust, setSelCust] = useState(null)

  const openNewP = () => {
    setPForm({ name:'', category:'hair', price:'', description:'', image:'', badge:'', stock:0 })
    setEditingP(null)
    setShowPForm(true)
  }

  const openEditP = (p) => {
    setPForm({
      name: p.name, category: p.category,
      price: String(p.price).replace(/[^0-9]/g, ''),
      description: p.description || '',
      image: p.image || '',
      badge: p.badge || '',
      stock: p.stock || 0
    })
    setEditingP(p)
    setShowPForm(true)
  }

  const saveP = async () => {
    const data = {
      name: pForm.name,
      category: pForm.category,
      price: 'TZS ' + Number(pForm.price).toLocaleString(),
      description: pForm.description,
      stock: Number(pForm.stock),
      badge: pForm.badge || null,
      image: pForm.image || '/placeholder.svg',
      icon: '🌿'
    }

    if (editingP) {
      await updateProduct(editingP.id, data)
    } else {
      await addProduct(data)
    }

    const updated = await getProducts()
    setProducts(updated.data || [])
    setShowPForm(false)
  }

  const deleteP = async (id) => {
    if (!confirm('Delete product?')) return
    await deleteProduct(id)
    const updated = await getProducts()
    setProducts(updated.data || [])
  }

  const openNewG = () => {
    setGForm({ title:'', description:'', image:'' })
    setEditingG(null)
    setShowGForm(true)
  }

  const openEditG = (g) => {
    setGForm({ title:g.title, description:g.description, image:g.image })
    setEditingG(g)
    setShowGForm(true)
  }

  const saveG = async () => {
    const data = {
      title: gForm.title,
      description: gForm.description,
      image: gForm.image || '/placeholder.svg'
    }

    if (editingG) {
      await updateGalleryItem(editingG.id, data)
    } else {
      await addGalleryItem(data)
    }

    const updated = await getGallery()
    setGallery(updated.data || [])
    setShowGForm(false)
  }

  const deleteG = async (id) => {
    if (!confirm('Delete?')) return
    await deleteGalleryItem(id)
    const updated = await getGallery()
    setGallery(updated.data || [])
  }

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatus(orderId, status)
    const updated = await getOrders()
    setOrders(updated.data || [])
  }

  const customers = useMemo(() => {
    const map = new Map()
    orders.forEach(o => {
      if (!map.has(o.phone)) {
        map.set(o.phone, { name: o.customer_name, phone: o.phone, address: o.address, region: o.region, orders: [] })
      }
      map.get(o.phone).orders.push(o)
    })
    return Array.from(map.values())
  }, [orders])

  const filteredOrders = useMemo(() => {
    let list = orders
    if (orderFilter !== 'all') list = list.filter(o => o.status === orderFilter)
    if (orderSearch) {
      const q = orderSearch.toLowerCase()
      list = list.filter(o =>
        (o.id || '').toLowerCase().includes(q) ||
        (o.customer_name || '').toLowerCase().includes(q) ||
        (o.phone || '').includes(q)
      )
    }
    return list
  }, [orders, orderFilter, orderSearch])

  const fin = useMemo(() => {
    const today = todayStr(), wkAgoStr = weekAgo(), mStart = monthStart(), yStart = yearStart()
    const statusMap = {}
    ORDER_STATUSES.forEach(s => statusMap[s.value] = 0)
    orders.forEach(o => { if (statusMap[o.status] !== undefined) statusMap[o.status]++ })

    const completed = orders.filter(o => o.status === 'delivered').length
    const pending = orders.filter(o => o.status === 'pending').length
    const totalRev = orders.reduce((s, o) => s + (o.total || 0), 0)
    const todayO = ordersInRange(orders, today)
    const weekO = ordersInRange(orders, wkAgoStr)
    const monthO = ordersInRange(orders, mStart)
    const yearO = ordersInRange(orders, yStart)
    const revToday = todayO.reduce((s, o) => s + (o.total || 0), 0)
    const revWeek = weekO.reduce((s, o) => s + (o.total || 0), 0)
    const revMonth = monthO.reduce((s, o) => s + (o.total || 0), 0)
    const revYear = yearO.reduce((s, o) => s + (o.total || 0), 0)
    const avgOrder = orders.length > 0 ? Math.round(totalRev / orders.length) : 0
    const monthlyRev = {}
    const monthlyOrd = {}
    const catRev = {}
    const prodSales = {}

    orders.forEach(o => {
      const m = o.created_at ? new Date(o.created_at).toLocaleString('default', { month: 'short', year: '2-digit' }) : 'N/A'
      monthlyRev[m] = (monthlyRev[m] || 0) + (o.total || 0)
      monthlyOrd[m] = (monthlyOrd[m] || 0) + 1
      if (o.items) {
        o.items.forEach(item => {
          prodSales[item.name] = (prodSales[item.name] || 0) + (item.quantity || 1)
          const cat = products.find(p => p.name === item.name)?.category || 'other'
          catRev[cat] = (catRev[cat] || 0) + (parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0) * (item.quantity || 1)
        })
      }
    })

    return {
      totalRev, totalOrders: orders.length, completed, pending, avgOrder,
      revToday, revWeek, revMonth, revYear,
      monthlyRev: Object.entries(monthlyRev).map(([m, v]) => ({ label: m, value: v })).slice(-8),
      monthlyOrd: Object.entries(monthlyOrd).map(([m, v]) => ({ label: m, value: v })).slice(-8),
      catRev: Object.entries(catRev).map(([c, v]) => ({ label: c, value: v })).sort((a, b) => b.value - a.value),
      prodSales: Object.entries(prodSales).map(([n, q]) => ({ name: n, qty: q })).sort((a, b) => b.qty - a.qty).slice(0, 8),
      statusMap
    }
  }, [orders, products])

  const exportCSV = (rows, filename) => {
    if (!rows.length) return alert('No data')
    const keys = Object.keys(rows[0])
    const csv = [keys.join(','), ...rows.map(r => keys.map(k => '"' + String(r[k] || '').replace(/"/g, '""') + '"').join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const ORDER_STATUSES_LIST = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'paid', label: 'Paid', color: 'blue' },
    { value: 'processing', label: 'Processing', color: 'purple' },
    { value: 'out-for-delivery', label: 'Out for Delivery', color: 'indigo' },
    { value: 'delivered', label: 'Delivered', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ]

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          🌿
        </motion.div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in with your admin account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Admin email address"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none"
              autoFocus
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
            >
              Back to Website
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'customers', label: 'Customers' },
    { id: 'finance', label: 'Finance' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <span className="text-xl">🌿</span>
            <span className="font-bold text-gray-900 hidden sm:inline">SAZ Naturals CMS</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-1 mb-6 bg-white rounded-xl p-1.5 shadow-sm border border-gray-200">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-700">{fin.totalOrders}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-700">{fmt(fin.totalRev)}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">{fin.pending}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-emerald-600">Delivered</p>
                <p className="text-2xl font-bold text-emerald-700">{fin.completed}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Products ({products.length})</h2>
              <button
                onClick={openNewP}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
              >
                + Add Product
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-center p-3">Stock</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-3">{p.name}</td>
                      <td className="p-3 text-gray-600">{categories.find(c => c.id === p.category)?.label || p.category}</td>
                      <td className="p-3">{p.price}</td>
                      <td className="p-3 text-center">{p.stock || 0}</td>
                      <td className="p-3 text-right">
                        <button onClick={() => openEditP(p)} className="text-blue-600 text-sm mr-2">Edit</button>
                        <button onClick={() => deleteP(p.id)} className="text-red-600 text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showPForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPForm(false)}>
                <div className="bg-white rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4">{editingP ? 'Edit' : 'Add'} Product</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" value={pForm.name} onChange={e => setPForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select value={pForm.category} onChange={e => setPForm(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none">
                          {categories.filter(c => c.id !== 'all').map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (TZS)</label>
                        <input type="number" value={pForm.price} onChange={e => setPForm(p => ({ ...p, price: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea rows="3" value={pForm.description} onChange={e => setPForm(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <input type="number" value={pForm.stock} onChange={e => setPForm(p => ({ ...p, stock: Number(e.target.value) }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                        <input type="text" value={pForm.badge} onChange={e => setPForm(p => ({ ...p, badge: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                      <div className="flex gap-2">
                        <input type="text" value={pForm.image} onChange={e => setPForm(p => ({ ...p, image: e.target.value }))} placeholder="Image URL" className="flex-1 px-3 py-2 rounded-lg border border-gray-300 outline-none text-sm" />
                        <label className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-200">
                          <span>📁</span>
                          <span className="hidden sm:inline">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              const reader = new FileReader()
                              reader.onload = (ev) => {
                                if (typeof ev.target?.result === 'string') {
                                  setPForm(p => ({ ...p, image: ev.target.result }))
                                }
                              }
                              reader.readAsDataURL(file)
                            }}
                          />
                        </label>
                      </div>
                      {pForm.image && (
                        <div className="mt-2">
                          <img src={pForm.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" onError={e => e.target.style.display = 'none'} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button onClick={() => setShowPForm(false)} className="flex-1 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium">Cancel</button>
                    <button onClick={saveP} disabled={!pForm.name || !pForm.price} className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white font-medium disabled:opacity-50">Save</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Orders ({orders.length})</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Search..."
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-48 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              <button
                onClick={() => setOrderFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm ${orderFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200'}`}
              >
                All ({orders.length})
              </button>
              {ORDER_STATUSES_LIST.map(s => {
                const c = orders.filter(o => o.status === s.value).length
                return (
                  <button
                    key={s.value}
                    onClick={() => setOrderFilter(s.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${orderFilter === s.value ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200'}`}
                  >
                    {s.label} ({c})
                  </button>
                )
              })}
            </div>
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500">No orders</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(o => (
                  <div key={o.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-mono text-xs text-gray-400">{o.id}</p>
                        <p className="font-semibold text-gray-900">{o.customer_name}</p>
                        <p className="text-sm text-gray-500">{o.phone} · {o.region}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{fmt(o.total)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <button onClick={() => setSelOrder(o)} className="text-sm text-emerald-600 hover:underline">View</button>
                      <select
                        value={o.status}
                        onChange={e => handleStatusChange(o.id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-200 text-sm"
                      >
                        {ORDER_STATUSES_LIST.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Order Detail Modal */}
        {selOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelOrder(null)}>
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Order #{selOrder.id}</h3>
                <button onClick={() => setSelOrder(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-gray-900">{selOrder.customer_name}</p>
                  <p className="text-sm text-gray-600">{selOrder.phone}</p>
                  <p className="text-sm text-gray-600">{selOrder.region} · {selOrder.address}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Items</p>
                  {selOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <span className="text-gray-700">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-gray-900">TZS {(parseInt(String(item.price).replace(/[^0-9]/g, '')) * (item.quantity || 1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center bg-emerald-50 rounded-xl p-4">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-emerald-600">{fmt(selOrder.total)}</span>
                </div>
                {selOrder.payment_proof && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Payment Proof</p>
                    <img src={selOrder.payment_proof} alt="Payment proof" className="max-h-48 rounded-lg" onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
                {selOrder.notes && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Notes</p>
                    <p className="text-sm text-gray-600">{selOrder.notes}</p>
                  </div>
                )}
                <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <select
                    value={selOrder.status}
                    onChange={e => { handleStatusChange(selOrder.id, e.target.value); setSelOrder({...selOrder, status: e.target.value}) }}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium"
                  >
                    {ORDER_STATUSES_LIST.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'gallery' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Gallery ({gallery.length})</h2>
              <button onClick={openNewG} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">+ Add Image</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map(g => (
                <div key={g.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group relative">
                  <img src={g.image} alt={g.title} className="w-full h-40 object-cover bg-gray-100" onError={e => e.target.style.display = 'none'} />
                  <div className="p-3"><p className="font-medium text-gray-900 text-sm">{g.title}</p></div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button onClick={() => openEditG(g)} className="p-1.5 bg-white rounded-lg shadow text-blue-600 text-xs">Edit</button>
                    <button onClick={() => deleteG(g.id)} className="p-1.5 bg-white rounded-lg shadow text-red-600 text-xs">Del</button>
                  </div>
                </div>
              ))}
            </div>

            {showGForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowGForm(false)}>
                <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4">{editingG ? 'Edit' : 'Add'} Image</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input type="text" value={gForm.title} onChange={e => setGForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea rows="2" value={gForm.description} onChange={e => setGForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input type="text" value={gForm.image} onChange={e => setGForm(f => ({ ...f, image: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button onClick={() => setShowGForm(false)} className="flex-1 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium">Cancel</button>
                    <button onClick={saveG} disabled={!gForm.title} className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white font-medium disabled:opacity-50">Save</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'customers' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customers ({customers.length})</h2>
            {customers.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500">No customers yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Phone</th>
                      <th className="text-left p-3">Region</th>
                      <th className="text-center p-3">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {customers.map(c => (
                      <tr key={c.phone} className="hover:bg-gray-50">
                        <td className="p-3 font-medium">{c.name}</td>
                        <td className="p-3 text-gray-600">{c.phone}</td>
                        <td className="p-3 text-gray-600">{c.region}</td>
                        <td className="p-3 text-center">{c.orders.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'finance' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-gray-900">Revenue Analytics</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportCSV(fin.monthlyRev.map(r => ({ month: r.label, revenue: r.value })), 'revenue-report.csv')}
                  className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500">Today</p>
                <p className="text-lg font-bold text-gray-900">{fmt(fin.revToday)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500">This Week</p>
                <p className="text-lg font-bold text-gray-900">{fmt(fin.revWeek)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500">This Month</p>
                <p className="text-lg font-bold text-gray-900">{fmt(fin.revMonth)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500">This Year</p>
                <p className="text-lg font-bold text-gray-900">{fmt(fin.revYear)}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Revenue by Month</h3>
                <RevenueLineChart data={fin.monthlyRev} />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Orders by Month</h3>
                <OrdersBarChart data={fin.monthlyOrd} />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Revenue by Category</h3>
                <CategoryPieChart data={fin.catRev} />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Top Products</h3>
                <div className="space-y-2">
                  {fin.prodSales.length > 0 ? fin.prodSales.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-5 text-gray-400 text-xs">#{i+1}</span>
                      <span className="flex-1 text-gray-700 truncate">{p.name}</span>
                      <span className="font-medium text-gray-900">{p.qty} sold</span>
                    </div>
                  )) : <p className="text-gray-400 text-sm">No sales data</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && <SettingsTab />}
      </div>
    </div>
  )
}