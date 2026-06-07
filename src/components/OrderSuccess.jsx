import { useCart } from '../hooks/useCart'
import { motion } from 'framer-motion'

export default function OrderSuccess({ order, onBack }) {
  const { clearCart } = useCart()
  
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-muted/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-4xl mb-4"
        >
          ✓
        </motion.div>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Order Submitted!</h1>
        <p className="text-foreground mb-4">Thank you for your order, {order?.customerName}!</p>
        <p className="text-sm text-foreground mb-6">Order ID: <span className="font-mono font-bold">{order?.id}</span></p>
        
        <div className="bg-muted/50 rounded-xl p-4 text-left mb-6">
          <p className="text-sm text-foreground mb-2"><strong>What's next?</strong></p>
          <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
            <li>We'll verify your payment</li>
            <li>Process and pack your order</li>
            <li>Contact you for delivery to {order?.region}</li>
          </ul>
        </div>
        
        <button
          onClick={onBack}
          className="w-full py-3 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
        >
          Continue Shopping
        </button>
      </motion.div>
    </div>
  )
}