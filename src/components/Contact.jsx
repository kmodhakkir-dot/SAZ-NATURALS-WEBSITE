import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { WHATSAPP_URL } from '../services/productsService'
import { KineticText } from './ui/kinetic-text'

export default function Contact() {
  const sectionRef = useScrollAnimation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const subject = form.subject.value.trim()
    const message = form.message.value.trim()

    const text = [
      `*New Inquiry from SAZ Naturals Website*`,
      ``,
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      `*Subject:* ${subject || 'N/A'}`,
      ``,
      `*Message:*`,
      `${message}`
    ].join('\n')

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank')
    form.reset()
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-muted/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 fade-in-section">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <KineticText text="We'd Love to Hear From You" className="justify-center" />
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-primary-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-4 fade-in-section">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">Contact Us</h3>

            <a href="https://wa.me/255655799575" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center text-xl text-primary-500 group-hover:bg-primary-500 group-hover:text-white group-hover:rounded-full transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <div className="text-xs text-foreground mb-0.5 font-medium">WhatsApp</div>
                <div className="text-sm font-medium text-foreground">+255 655 799 575</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center text-xl text-primary-500 group-hover:bg-primary-500 group-hover:text-white group-hover:rounded-full transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <div className="text-xs text-foreground mb-0.5 font-medium">Phone</div>
                <div className="text-sm font-medium text-foreground">+255 655 799 575</div>
              </div>
            </div>

            <a href="https://www.tiktok.com/@sazorganicss?_r=1&_t=ZS-96uQXfKAqg6" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center text-xl text-primary-500 group-hover:bg-primary-500 group-hover:text-white group-hover:rounded-full transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </div>
              <div>
                <div className="text-xs text-foreground mb-0.5 font-medium">TikTok</div>
                <div className="text-sm font-medium text-foreground">@sazorganicss</div>
              </div>
            </a>

            <div className="flex gap-3 pt-2">
              <a href="https://wa.me/255655799575" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@sazorganicss?_r=1&_t=ZS-96uQXfKAqg6" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-foreground flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.instagram.com/saz_naturals?igsh=Z2g4dHdhY2ZweWJ5" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-900/10 text-pink-600 dark:text-pink-400 flex items-center justify-center hover:bg-pink-600 hover:text-white hover:rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h8zm0 2H8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2zm-4 3a3 3 0 110 6 3 3 0 010-6zm0 2a1 1 0 100 2 1 1 0 000-2zm4-3a1 1 0 110 2 1 1 0 010-2z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border shadow-sm fade-in-section">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">Send a Message</h3>
            <div className="space-y-4">
              <input
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground text-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground text-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
              />
              <input
                name="subject"
                placeholder="Subject"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground text-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message..."
                required
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground text-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1da85c] hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}