import { useState, useEffect, createContext, useContext } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('saz-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('saz-cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? Object.assign({}, item, { quantity: item.quantity + quantity })
            : item
        )
      }
      return [...prev, Object.assign({}, product, { quantity })]
    })
  }

  const removeItem = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? Object.assign({}, item, { quantity }) : item
      )
    )
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, item) => {
    const priceNum = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0
    return sum + priceNum * item.quantity
  }, 0)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}