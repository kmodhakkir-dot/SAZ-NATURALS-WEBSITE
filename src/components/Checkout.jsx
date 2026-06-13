import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { createOrder } from '../services/ordersService'
import { getSettings, TANZANIA_REGIONS } from '../services/settingsService'
import { motion } from 'framer-motion'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [paymentProof, setPaymentProof] = useState(null)
  const [proofFileName, setProofFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [settings, setSettings] = useState(null)
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    region: '',
    notes: ''
  })

  // Load settings from Supabase on mount
  useEffect(() => {
    getSettings().then(s => setSettings(s.data))
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProofFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPaymentProof(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitInfo = (e) => {
    e.preventDefault()
    if (!formData.customerName || !formData.phone || !formData.address || !formData.region) {
      alert('Please fill in all required fields')
      return
    }
    setStep(2)
  }

  const handleSubmitPayment = () => {
    setStep(3)
  }

  const handleConfirmOrder = async () => {
    setSubmitting(true)
    try {
      const result = await createOrder({
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        region: formData.region,
        notes: formData.notes,
        items: items,
        total: total,
        paymentProof: paymentProof
      })
      if (result.data) {
        clearCart()
        navigate('/success/' + result.data.id)
      } else {
        alert('Failed to create order: ' + (result.error || 'Unknown error'))
      }
    } catch (err) {
      alert('Error placing order: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-foreground mb-6">Add some products to your cart before checking out.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-foreground hover:text-primary-500 transition-colors"
        >
          <span>←</span> Back to shopping
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {['Information', 'Payment', 'Confirm'].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex items-center gap-2 ${step > i + 1 ? 'text-green-500' : step === i + 1 ? 'text-primary-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > i + 1 ? 'bg-green-500 text-white' :
                  step === i + 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{label}</span>
              </div>
              {i < 2 && <div className={`w-12 h-0.5 mx-2 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.name} × {item.quantity}</span>
                    <span className="text-foreground font-medium">
                      TZS {(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary-500">TZS {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8"
            >
              {step === 1 && (
                <>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Delivery Information</h2>
                  <form onSubmit={handleSubmitInfo} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Amina Hassan"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+255 XXX XXX XXX"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Region *</label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                      >
                        <option value="">Select your region</option>
                        {TANZANIA_REGIONS.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Delivery Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        placeholder="Street, neighborhood, landmarks..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Order Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="Any special instructions?"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Payment</h2>
                  <p className="text-foreground mb-6 text-sm">Scan this QR code using your preferred mobile money application and complete payment.</p>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-6">
                    <div className="grid sm:grid-cols-2 gap-6 items-center">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2">Payment Details</h3>
                        <p className="text-sm text-foreground mb-1"><strong>Merchant Name:</strong> {settings?.merchant_name || 'SAZ Naturals'}</p>
                        <p className="text-sm text-foreground mb-1"><strong>Merchant Number:</strong> <span className="font-mono text-base">{settings?.merchant_number || settings?.whatsapp_number || '255655799575'}</span></p>
                        <p className="text-sm text-foreground mb-3"><strong>Amount:</strong> <span className="text-primary-500 font-bold">TZS {total.toLocaleString()}</span></p>
                        <div className="text-xs text-foreground bg-white dark:bg-card rounded-lg p-3">
                          <strong>Payment Instructions:</strong>
                          <ol className="list-decimal list-inside mt-1 space-y-0.5">
                            <li>Open your mobile money app</li>
                            <li>Scan the QR code or enter the merchant number</li>
                            <li>Enter the amount shown above</li>
                            <li>Confirm the payment</li>
                          </ol>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-white p-3 rounded-2xl inline-block shadow-lg">
                          <img
                            src={settings?.qr_image || '/placeholder.svg'}
                            alt="Payment QR Code"
                            className="w-48 h-48 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextElementSibling.style.display = 'flex'
                            }}
                          />
                          <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center text-4xl hidden rounded">
                            <div className="text-center">
                              <div>📱</div>
                              <p className="text-xs text-gray-600 mt-2">QR Code</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-foreground mt-2">Scan to pay with mobile money</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center mb-6">
                    <input
                      type="file"
                      id="payment-proof"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="payment-proof" className="cursor-pointer">
                      {paymentProof ? (
                        <div>
                          <img src={paymentProof} alt="Payment proof" className="max-h-48 mx-auto rounded-lg mb-2" />
                          <p className="text-sm text-foreground">{proofFileName}</p>
                          <p className="text-xs text-primary-500 mt-1">Click to change</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-5xl mb-2">📤</div>
                          <p className="text-foreground font-medium">Upload Payment Proof</p>
                          <p className="text-sm text-foreground mt-1">Click to select image (screenshot of payment)</p>
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3.5 rounded-full bg-muted text-foreground font-semibold hover:bg-muted/70 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmitPayment}
                      className="flex-1 py-3.5 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Confirm Your Order</h2>
                  <div className="space-y-4 mb-6">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h4 className="font-semibold text-foreground mb-2">Delivery To:</h4>
                      <p className="text-foreground">{formData.customerName}</p>
                      <p className="text-foreground text-sm">{formData.phone}</p>
                      <p className="text-foreground text-sm">{formData.address}</p>
                      <p className="text-foreground text-sm">{formData.region}</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h4 className="font-semibold text-foreground mb-2">Items:</h4>
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm py-1">
                          <span className="text-foreground">{item.name} × {item.quantity}</span>
                          <span className="text-foreground">TZS {(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary-500">TZS {total.toLocaleString()}</span>
                      </div>
                    </div>
                    {paymentProof && (
                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="font-semibold text-foreground mb-2">Payment Proof:</h4>
                        <img src={paymentProof} alt="Payment proof" className="max-h-32 rounded-lg" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-3.5 rounded-full bg-muted text-foreground font-semibold hover:bg-muted/70 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmOrder}
                      disabled={submitting}
                      className="flex-1 py-3.5 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Order'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}