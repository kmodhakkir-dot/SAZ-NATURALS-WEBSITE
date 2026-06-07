import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ScrollVelocityContainer, ScrollVelocityRow } from './ui/scroll-velocity'
import { KineticText } from './ui/kinetic-text'

const benefits = [
  {
    icon: '🌱',
    title: '100% Natural Ingredients',
    desc: 'Every ingredient is carefully selected from nature. No synthetic additives, just pure botanical goodness.',
  },
  {
    icon: '🤲',
    title: 'Handmade with Care',
    desc: 'Each product is crafted in small batches with love and attention to detail, ensuring the highest quality.',
  },
  {
    icon: '👩🏾‍🦱',
    title: 'Suitable for All Hair Types',
    desc: 'Whether your hair is curly, coily, straight, or transitioning — our products are formulated for everyone.',
  },
  {
    icon: '🧪',
    title: 'Chemical-Free Formulas',
    desc: 'No parabens, sulfates, silicones, or synthetic fragrances. Just pure, safe ingredients you can trust.',
  },
]

export default function Benefits() {
  const sectionRef = useScrollAnimation()

  return (
    <section id="benefits" className="py-20 sm:py-28 bg-muted/30" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 fade-in-section">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <KineticText text="Nature's Best for Your Beauty" className="justify-center" />
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-primary-400 mx-auto rounded-full" />
        </div>

        {/* Scrolling velocity text */}
        <div className="mb-16 fade-in-section">
          <ScrollVelocityContainer className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground/80">
            <ScrollVelocityRow baseVelocity={25} direction={1}>
              Natural - Organic - Handmade - Pure - Chemical-Free - Trusted
            </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={25} direction={-1}>
              Healthy Hair - Glowing Skin - African Heritage - Quality - Safe Ingredients
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-card border border-border text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 fade-in-section"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center text-3xl group-hover:bg-primary-500 group-hover:rounded-full group-hover:rotate-3 group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-center text-white relative overflow-hidden fade-in-section">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
          <p className="text-xl font-semibold mb-5 relative">Ready to transform your beauty routine?</p>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-600 font-semibold hover:bg-primary-50 hover:-translate-y-0.5 transition-all duration-300 shadow-lg relative"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </section>
  )
}