import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TermsOfService() {
  useEffect(() => { window.scrollTo(0,0); document.title = 'Terms of Service — SAZ Naturals' }, [])
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-foreground/60 text-sm mb-8">Last updated: June 2026</p>
        <S title="1. Business">SAZ Naturals is a Tanzanian natural beauty products business operating in Dar es Salaam, Tanzania.</S>
        <S title="2. Orders">Orders are confirmed only after payment proof is received and verified. All prices are in Tanzanian Shillings (TZS).</S>
        <S title="3. Payment">Payment is via Tigo Pesa or other mobile money. SAZ Naturals reserves the right to cancel any order at any time.</S>
        <S title="4. Use">Products are for personal use only. Resale is not permitted without written consent.</S>
        <S title="5. Liability">SAZ Naturals is not liable for delays caused by courier or delivery services. By placing an order, you agree to these terms.</S>
        <div className="mt-10 pt-6 border-t border-border"><Link to="/" className="text-primary-500 hover:underline">← Back to home</Link></div>
      </div>
    </div>
  )
}
function S({ title, children }) { return <section className="mb-6"><h2 className="font-heading text-xl font-semibold text-foreground mb-2">{title}</h2><p className="text-foreground/80 leading-relaxed">{children}</p></section> }