import { createContext, useContext } from 'react'

const OrdersContext = createContext()

export function OrdersProvider({ children }) {
  // Stub provider for backward compatibility
  // Real order data is now managed by Supabase via src/services/ordersService.js
  // and fetched directly in components (Checkout, AdminDashboard)
  const value = {
    orders: [],
    notifications: [],
    unreadCount: 0,
    createOrder: () => null,
    updateOrderStatus: () => null,
    updateOrderPaymentProof: () => null,
    markNotificationRead: () => null,
    markAllNotificationsRead: () => null
  }
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider')
  }
  return context
}