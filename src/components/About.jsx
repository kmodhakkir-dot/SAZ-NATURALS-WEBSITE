import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Backlight } from './ui/backlight'
import { KineticText } from './ui/kinetic-text'
import { getSettings } from '../services/settingsService'

const values = [
  'Purity — No parabens, sulfates, or synthetic fragrances',
  'Sustainability — Eco-friendly packaging & ethical sourcing',
  'Tradition — Time-tested natural ingredients from Africa',
  'Quality — Every product is handmade in small batches',
]

export default function About() {
  const sectionRef = useScrollAnimation()
  const imageRef = useScrollAnimation()
  const textRef = useScrollAnimation()
  const [aboutImage, setAboutImage] = useState(null)

  useEffect(() => {
    getSettings().then(s => {
      if (s.data?.about_image) setAboutImage(s.data.about_image)
    })
  }, [])

  return (
    <section id="about" className="py-20 sm:py-28 bg-muted/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 fade-in-section" ref={imageRef}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            About Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <KineticText text="The SAZ Naturals Story" className="justify-center" />
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-primary-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 fade-in-section" ref={textRef}>
            <Backlight blur={50} className="rounded-2xl" color="from-primary-400/40 via-primary-500/30 to-primary-600/40">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-100 to-primary-500 flex items-center justify-center">
                {aboutImage ? (
                  <img src={aboutImage} alt="About SAZ Naturals" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <span className="text-8xl mb-4 block">🌿</span>
                    <p className="text-primary-700 font-heading text-xl font-semibold">Natural Beauty</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
              </div>
            </Backlight>
          </div>

          <div className="lg:col-span-3 space-y-6 fade-in-section">
            <p className="text-lg text-foreground leading-relaxed">
              SAZ Naturals was born from a simple belief — that the most effective beauty products come straight from nature. We combine traditional African herbal knowledge with modern skincare science to create products that truly nourish.
            </p>

            <div className="p-6 rounded-xl bg-card border border-border border-l-4 border-l-primary-500 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
                <span className="text-primary-500">🎯</span> Our Mission
              </h3>
              <p className="text-foreground">To provide accessible, natural beauty solutions that enhance your natural glow without harmful chemicals.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border border-l-4 border-l-primary-500 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <span className="text-primary-500">💚</span> Our Values
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {values.map((value, i) => (
                  <span
                    key={i}
                    className="px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/10 text-sm text-foreground hover:bg-primary-500 hover:text-white transition-all duration-200 cursor-default"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <Backlight blur={30} className="rounded-xl" color="from-primary-400/20 via-primary-500/15 to-primary-600/20">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg relative overflow-hidden">
                <span className="absolute -top-4 right-4 text-8xl opacity-10 font-heading leading-none">"</span>
                <div className="flex gap-4 items-start relative z-10">
                  <span className="text-2xl opacity-60 shrink-0">💬</span>
                  <p className="italic text-base leading-relaxed">Why settle for chemicals when nature provides everything you need?</p>
                </div>
              </div>
            </Backlight>
          </div>
        </div>
      </div>
    </section>
  )
}