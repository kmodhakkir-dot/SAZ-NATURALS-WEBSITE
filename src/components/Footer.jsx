import { Link, useNavigate } from 'react-router-dom'

export default function Footer({ onAdminClick }) {
  const year = new Date().getFullYear()
  const navigate = useNavigate()

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault()
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    }
  }

  return (
    <footer className="bg-card border-t border-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xl font-heading font-bold text-foreground mb-3">
              <img src="/images/saz-naturals.jpg" alt="SAZ Naturals" className="w-9 h-9 rounded-full object-cover" />
              <span>SAZ Naturals</span>
            </div>
            <p className="text-sm text-foreground/70 mb-4">Natural Beauty Starts Here. Handcrafted in Tanzania.</p>
            <div className="flex gap-3">
              <a href="https://wa.me/255759747338" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@saznaturals" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-full bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.3 0 .6.04.88.12V9.45a6.36 6.36 0 00-.88-.05A6.34 6.34 0 002.6 15.74a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.31-2.5v-3.9a4.87 4.87 0 01-4.2 4.4z" /></svg>
              </a>
              <a href="https://instagram.com/saznaturals" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" onClick={e => handleSectionClick(e, 'products')} className="text-foreground/70 hover:text-primary-500 transition-colors">All Products</a></li>
              <li><a href="#about" onClick={e => handleSectionClick(e, 'about')} className="text-foreground/70 hover:text-primary-500 transition-colors">About Us</a></li>
              <li><a href="#gallery" onClick={e => handleSectionClick(e, 'gallery')} className="text-foreground/70 hover:text-primary-500 transition-colors">Gallery</a></li>
              <li><a href="#contact" onClick={e => handleSectionClick(e, 'contact')} className="text-foreground/70 hover:text-primary-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/refund" className="text-foreground/70 hover:text-primary-500 transition-colors">Refund & Delivery</Link></li>
              <li><Link to="/track" className="text-foreground/70 hover:text-primary-500 transition-colors">Track My Order</Link></li>
              <li><a href="https://wa.me/255759747338" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary-500 transition-colors">WhatsApp Support</a></li>
              <li><a href="mailto:info@saznaturals.com" className="text-foreground/70 hover:text-primary-500 transition-colors">Email Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-foreground/70 hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-foreground/70 hover:text-primary-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund" className="text-foreground/70 hover:text-primary-500 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-foreground/60">&copy; {year} SAZ Naturals. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onAdminClick} className="text-foreground/40 hover:text-foreground/70 text-xs transition-colors">
              Admin
            </button>
            <span className="text-foreground/30">&bull;</span>
            <a href="/sitemap.xml" target="_blank" className="text-foreground/40 hover:text-foreground/70 text-xs transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}