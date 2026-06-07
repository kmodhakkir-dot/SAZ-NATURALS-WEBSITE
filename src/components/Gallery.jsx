import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { getGallery } from '../services/galleryService'

export default function Gallery() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const sectionRef = useScrollAnimation()

  useEffect(() => {
    getGallery().then(data => {
      setGallery(data)
      setLoading(false)
    })
  }, [])

  if (loading) return null

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-muted/30 relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Our Gallery
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Visual Stories
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore the beauty of nature through our curated gallery
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelected(item)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={e => { e.target.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selected.image || '/placeholder.svg'}
              alt={selected.title}
              className="w-full h-80 object-cover"
              onError={e => { e.target.style.display = 'none' }}
            />
            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold text-foreground">{selected.title}</h3>
              <p className="text-foreground/70 mt-2">{selected.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}