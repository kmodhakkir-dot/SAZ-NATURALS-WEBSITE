import { useEffect } from 'react'

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Refund & Delivery Policy — SAZ Naturals'
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Refund & Delivery Policy</h1>
        <p className="text-foreground/60 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <Section title="1. Delivery Coverage">
          <p>We deliver across mainland Tanzania, including:</p>
          <ul>
            <li>All 26 regions of mainland Tanzania (Dar es Salaam, Arusha, Dodoma, Mwanza, Mbeya, etc.)</li>
            <li>Zanzibar (extra shipping fee applies)</li>
          </ul>
          <p>International shipping is currently not available.</p>
        </Section>

        <Section title="2. Delivery Times">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3">Region</th>
                <th className="text-left p-3">Estimated Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3">Dar es Salaam</td>
                <td className="p-3">1–2 business days</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Other major cities (Arusha, Mwanza, Dodoma, Tanga, Mbeya)</td>
                <td className="p-3">2–4 business days</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Other regions & rural areas</td>
                <td className="p-3">3–7 business days</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Zanzibar</td>
                <td className="p-3">3–5 business days</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-foreground/60 mt-2">
            Delivery times are estimates only and may be affected by weather, public holidays, or courier disruptions.
          </p>
        </Section>

        <Section title="3. Delivery Fees">
          <ul>
            <li>Dar es Salaam: <strong>TZS 3,000</strong> (free for orders over TZS 50,000)</li>
            <li>Other mainland regions: <strong>TZS 5,000 – TZS 10,000</strong> depending on distance</li>
            <li>Zanzibar: <strong>TZS 10,000 – TZS 15,000</strong></li>
          </ul>
          <p>The exact delivery fee is calculated and shown at checkout based on your region.</p>
        </Section>

        <Section title="4. Failed Delivery">
          <p>If we attempt delivery and it fails due to:</p>
          <ul>
            <li><strong>Incorrect address</strong>: customer is responsible for rescheduling and any re-delivery fees.</li>
            <li><strong>Recipient unavailable</strong>: we will contact you to reschedule. After 2 failed attempts, the order is cancelled and a restocking fee of 15% applies.</li>
            <li><strong>Recipient refuses delivery</strong>: order is cancelled, refund issued minus shipping & restocking fee.</li>
          </ul>
        </Section>

        <Section title="5. Order Cancellations">
          <p>You may cancel your order:</p>
          <ul>
            <li><strong>Before shipping</strong>: full refund (minus any mobile-money fees).</li>
            <li><strong>After shipping</strong>: order cannot be cancelled but may be returned per the refund policy below.</li>
          </ul>
        </Section>

        <Section title="6. Refunds & Returns">
          <p>Due to the personal nature of our beauty products, we have a strict return policy:</p>
          <ul>
            <li><strong>Unopened, unused items</strong>: return within <strong>7 days</strong> of delivery for full refund (minus shipping).</li>
            <li><strong>Opened, used, or damaged items</strong>: non-refundable for hygiene reasons.</li>
            <li><strong>Defective or wrong items</strong>: full refund including shipping. Contact us within 48 hours of delivery with photos.</li>
            <li><strong>Allergic reactions</strong>: refunds available only with a medical report confirming the reaction.</li>
          </ul>
          <p>Refunds are processed within 5–10 business days to the original payment method.</p>
        </Section>

        <Section title="7. Return Process">
          <ol>
            <li>Contact us via WhatsApp or email to request a return.</li>
            <li>We will provide a return authorisation number and instructions.</li>
            <li>Ship the item back to us in its original packaging.</li>
            <li>Once received and inspected, your refund will be processed.</li>
          </ol>
          <p>Return shipping costs are the customer's responsibility unless the item is defective or incorrect.</p>
        </Section>

        <Section title="8. Damaged or Wrong Items">
          <p>If you receive a damaged or incorrect item:</p>
          <ul>
            <li>Take a photo within <strong>24 hours</strong> of receiving the order.</li>
            <li>Send the photo + order ID to our WhatsApp or email.</li>
            <li>We will arrange a replacement or full refund at no cost to you.</li>
          </ul>
        </Section>

        <Section title="9. Contact for Delivery Issues">
          <p>For any delivery or refund questions:</p>
          <p>
            <strong>SAZ Naturals</strong><br />
            WhatsApp: <a href="https://wa.me/255655799575" className="text-primary-500 underline">+255 655 799 575</a><br />
            Email: <a href="mailto:info@saznaturals.com" className="text-primary-500 underline">info@saznaturals.com</a>
          </p>
        </Section>

        <div className="mt-12 pt-6 border-t border-border">
          <a href="/" className="text-primary-500 hover:underline">← Back to home</a>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-foreground/80 space-y-3 leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1 [&_a]:text-primary-500 [&_a]:underline [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:p-3 [&_td]:p-3 [&_tr]:border-t [&_tr]:border-border">
        {children}
      </div>
    </section>
  )
}
