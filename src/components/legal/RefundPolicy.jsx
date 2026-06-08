import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RefundPolicy() {
  useEffect(() => { window.scrollTo(0,0); document.title = 'Refund Policy — SAZ Naturals' }, [])
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Refund & Delivery Policy</h1>
        <p className="text-foreground/60 text-sm mb-8">Last updated: June 2026</p>
        <S title="Delivery">Available across all Tanzania regions. Customer arranges delivery via Bolt ~ same day possible in Dar es Salaam, 1–2 days for other regions.</S>
        <S title="Order Processing">Orders are processed after payment is confirmed via mobile money proof screenshot.</S>
        <S title="Refunds">Accepted within 24 hours of delivery if product is damaged or wrong item received. Customer must send a WhatsApp message with photo evidence to 0655 799 575.</S>
        <S title="No Refunds">No refunds for change of mind. Refund is replacement or store credit, not cash.</S>
        <S title="Contact">WhatsApp: <a href="https://wa.me/255759747338" className="text-primary-500 underline">0655 799 575</a></S>
        <div className="mt-10 pt-6 border-t border-border"><Link to="/" className="text-primary-500 hover:underline">← Back to home</Link></div>
      </div>
    </div>
  )
}
function S({ title, children }) { return <section className="mb-6"><h2 className="font-heading text-xl font-semibold text-foreground mb-2">{title}</h2><p className="text-foreground/80 leading-relaxed">{children}</p></section> }