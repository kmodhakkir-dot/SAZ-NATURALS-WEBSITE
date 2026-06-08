import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Privacy Policy — SAZ Naturals'
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-foreground/60 text-sm mb-8">Last updated: June 2026</p>
        <S title="1. What We Collect">
          <p>We collect the following information when you place an order:</p>
          <ul>
            <li>Full name</li>
            <li>Phone number</li>
            <li>Delivery address & region</li>
            <li>Payment proof screenshot (mobile money transaction)</li>
          </ul>
        </S>
        <S title="2. Why We Collect It">
          <p>We use this data solely to process, fulfil and deliver your order. We never sell your data or share it with third parties for marketing.</p>
        </S>
        <S title="3. Payment Screenshots">
          <p>Payment proof images are stored securely. We do not store card numbers, PINs, or any banking credentials.</p>
        </S>
        <S title="4. Data Deletion">
          <p>You may request deletion of your data at any time by contacting us on WhatsApp: 0655 799 575. We will process your request within 7 working days.</p>
        </S>
        <S title="5. Policy Updates">
          <p>This policy may be updated occasionally. Continued use of the site constitutes acceptance of any changes.</p>
        </S>
        <div className="mt-10 pt-6 border-t border-border">
          <Link to="/" className="text-primary-500 hover:underline">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
function S({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-foreground/80 space-y-2 leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1">{children}</div>
    </section>
  )
}