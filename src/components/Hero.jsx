import { motion } from 'framer-motion'
import { TextAnimate } from './ui/text-animate'
import heroImage from '../images/hero-woman-products.jpg'
import { AnimatedBackground } from './ui/AnimatedBackground'

export default function Hero({ isDark }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background System */}
      <AnimatedBackground isDark={isDark} />

      {/* Hero Image Layer - Static (no continuous animation) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        <img
          src={heroImage}
          alt="SAZ Naturals"
          className="w-full h-full object-cover opacity-50"
          onError={(e) => { e.target.style.display = 'none' }}
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 via-primary-800/40 to-primary-900/60" />
      </div>

      {/* Ambient Glow Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary-500/10 to-transparent opacity-50" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-emerald-500/10 to-transparent opacity-50" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
        {/* Brand Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary-500/20 to-emerald-500/20 border border-primary-500/30 backdrop-blur-sm text-5xl sm:text-6xl">
            🌿
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          <TextAnimate animation="blurInUp" by="character" once>
            SAZ Naturals
          </TextAnimate>
        </motion.h1>

        {/* Divider Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-emerald-400 mx-auto mb-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 font-light tracking-[0.25em] uppercase mb-6 max-w-2xl mx-auto"
        >
          <TextAnimate animation="blurInUp" by="word" once>
            Natural Beauty Starts Here
          </TextAnimate>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          className="text-white/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-light mb-12"
        >
          <TextAnimate animation="blurInUp" by="word" once>
            Handcrafted with love. Powered by nature.
          </TextAnimate>
        </motion.p>

        {/* CTA Buttons - Use CSS hover only (no whileHover to prevent conflict) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
            href="#products"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-base shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Shop Collection</span>
            <svg
              className="w-5 h-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-emerald-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            href="https://wa.me/255655799575?text=Hi%20SAZ%20Naturals!%20I'd%20like%20to%20know%20more%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white/5 text-white border-2 border-white/20 font-semibold text-base hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="relative z-10">WhatsApp Us</span>
          </motion.a>
        </div>

      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
