import { useEffect } from 'react'

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Terms of Service — SAZ Naturals'
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-foreground/60 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using <a href="/" className="text-primary-500 underline">saznaturals.com</a>,
            you agree to be bound by these Terms of Service. If you do not agree, please do not
            use the website or place any orders.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>
            You must be at least <strong>18 years old</strong> to place an order. By placing an order,
            you confirm that you are of legal age and have the capacity to enter into a binding contract.
          </p>
        </Section>

        <Section title="3. Products & Pricing">
          <ul>
            <li>All prices are listed in <strong>Tanzanian Shillings (TZS)</strong> and are inclusive of product cost only.</li>
            <li>Delivery fees are calculated separately and shown at checkout.</li>
            <li>We reserve the right to correct pricing errors and cancel orders placed at incorrect prices.</li>
            <li>Product images are illustrative; the actual product may vary slightly in color and texture due to natural ingredients.</li>
          </ul>
        </Section>

        <Section title="4. Orders & Payment">
          <ol>
            <li>Orders are placed through the website and confirmed via WhatsApp or phone.</li>
            <li>Payment is made via <strong>Tigo Pesa</strong> (or other supported mobile money providers) before shipment.</li>
            <li>Customers must upload a valid payment screenshot as proof. Orders without verified payment will not be shipped.</li>
            <li>We reserve the right to reject orders suspected of fraud or abuse.</li>
          </ol>
        </Section>

        <Section title="5. Delivery">
          <p>Delivery is available within mainland Tanzania. By placing an order you confirm:</p>
          <ul>
            <li>You will provide an accurate, reachable address and phone number.</li>
            <li>Someone will be available to receive the order at the agreed time.</li>
            <li>If delivery fails due to incorrect address or unavailability, re-delivery fees apply.</li>
          </ul>
          <p>For more details, see our <a href="#/refund-policy" className="text-primary-500 underline">Refund & Delivery Policy</a>.</p>
        </Section>

        <Section title="6. Returns & Refunds">
          <p>
            Due to the personal nature of beauty products, opened items cannot be returned.
            Unopened items may be returned within 7 days for store credit.
            See our <a href="#/refund-policy" className="text-primary-500 underline">Refund & Delivery Policy</a> for full details.
          </p>
        </Section>

        <Section title="7. Product Safety">
          <p>
            Our products are made with natural ingredients. Please review the ingredient list
            on each product page before use. If you experience any allergic reaction,
            discontinue use immediately and contact us. SAZ Naturals is not liable for
            reactions arising from undisclosed allergies.
          </p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            All content on this website — including text, images, logos, and product formulations —
            is the property of SAZ Naturals and is protected by Tanzanian and international
            copyright law. You may not reproduce, distribute, or sell any content without
            our written consent.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            SAZ Naturals is not liable for indirect, incidental, or consequential damages
            arising from your use of this website or our products. Our total liability
            for any claim is limited to the value of your most recent order.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These terms are governed by the laws of the United Republic of Tanzania.
            Any disputes will be resolved in Tanzanian courts.
          </p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>
            We may revise these terms occasionally. Continued use of the site after
            changes constitutes acceptance of the new terms.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            <strong>SAZ Naturals</strong><br />
            Email: <a href="mailto:info@saznaturals.com" className="text-primary-500 underline">info@saznaturals.com</a><br />
            Phone: +255 655 799 575
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
      <div className="text-foreground/80 space-y-3 leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-1 [&_a]:text-primary-500 [&_a]:underline">
        {children}
      </div>
    </section>
  )
}
