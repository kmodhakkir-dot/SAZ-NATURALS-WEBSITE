import { useEffect } from 'react'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Privacy Policy — SAZ Naturals'
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-foreground/60 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <Section title="1. Who We Are">
          <p>
            SAZ Naturals ("we", "us", "our") is a Tanzania-based natural beauty brand specialising
            in handcrafted hair oils, body lotions, and skincare products. We are the data controller
            for any personal information you provide when using <a href="/" className="text-primary-500 underline">saznaturals.com</a>.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>When you place an order, contact us, or use our website, we collect:</p>
          <ul>
            <li><strong>Identity & contact data</strong>: full name, phone number, email address.</li>
            <li><strong>Delivery data</strong>: street address, region, city, and any notes you add.</li>
            <li><strong>Order data</strong>: products purchased, quantities, prices, order history, status updates.</li>
            <li><strong>Payment proof data</strong>: a screenshot of your mobile-money transaction. We do <em>not</em> store card numbers or PINs.</li>
            <li><strong>Technical data</strong>: IP address, browser type, device type, pages visited (via cookies and analytics).</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the data we collect to:</p>
          <ul>
            <li>Process and fulfil your orders, including delivery and payment verification.</li>
            <li>Communicate order status, delivery updates, and customer support.</li>
            <li>Detect and prevent fraud, especially around payment proof verification.</li>
            <li>Improve our website, products, and customer experience.</li>
            <li>Comply with legal and tax obligations in Tanzania.</li>
          </ul>
        </Section>

        <Section title="4. Sharing Your Data">
          <p>We do <strong>not sell</strong> your personal data. We share data only with:</p>
          <ul>
            <li><strong>Delivery couriers</strong>: name, phone, address for order fulfilment.</li>
            <li><strong>Mobile money providers</strong>: limited info for payment verification only.</li>
            <li><strong>Supabase</strong>: our secure database and authentication provider (hosted in a SOC 2-compliant environment).</li>
            <li><strong>Authorities</strong>: when required by Tanzania law.</li>
          </ul>
        </Section>

        <Section title="5. Data Storage & Security">
          <p>
            Your data is stored on Supabase servers with row-level security (RLS) enabled.
            All data in transit is encrypted via TLS 1.2+. Access to the admin dashboard is
            protected by authentication and restricted to authorised personnel only.
          </p>
          <p>
            We retain order data for <strong>5 years</strong> to comply with Tanzanian tax law,
            and account data until you request deletion.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> the personal data we hold about you.</li>
            <li><strong>Correct</strong> inaccurate or incomplete data.</li>
            <li><strong>Delete</strong> your account and associated non-essential data.</li>
            <li><strong>Object</strong> to marketing communications.</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:info@saznaturals.com" className="text-primary-500 underline">info@saznaturals.com</a>.</p>
        </Section>

        <Section title="7. Cookies">
          <p>
            We use a minimal number of essential cookies for cart persistence and authentication.
            We do not use third-party advertising or tracking cookies.
          </p>
        </Section>

        <Section title="8. Changes to this Policy">
          <p>
            We may update this policy occasionally. We will post any changes on this page
            with a revised "Last updated" date. Material changes will be communicated
            via email or a banner on our website.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>For any privacy-related questions, please contact:</p>
          <p>
            <strong>SAZ Naturals</strong><br />
            Email: <a href="mailto:info@saznaturals.com" className="text-primary-500 underline">info@saznaturals.com</a><br />
            Phone: +255 655 799 575<br />
            Address: Dar es Salaam, Tanzania
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
      <div className="text-foreground/80 space-y-3 leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1 [&_a]:text-primary-500 [&_a]:underline">
        {children}
      </div>
    </section>
  )
}
