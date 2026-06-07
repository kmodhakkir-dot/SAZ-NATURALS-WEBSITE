import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export function ScrollVelocityContainer({ children, className = '' }) {
  return (
    <div className={`relative flex w-full flex-col items-center justify-center overflow-hidden ${className}`}>
      {children}
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
    </div>
  )
}

export function ScrollVelocityRow({ baseVelocity = 20, direction = 1, children, className = '' }) {
  const [windowWidth, setWindowWidth] = useState(1000)
  
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const text = typeof children === 'string' ? children : ''
  const repeatedText = `${text} \u00A0\u00A0\u2022\u00A0\u00A0 ${text} \u00A0\u00A0\u2022\u00A0\u00A0 ${text} \u00A0\u00A0\u2022\u00A0\u00A0 ${text} \u00A0\u00A0\u2022\u00A0\u00A0 `

  return (
    <div className={`whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: direction > 0 ? [0, -50 * baseVelocity] : [-50 * baseVelocity, 0]
        }}
        transition={{
          x: {
            duration: 30 / (baseVelocity / 20),
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <span className="inline-block pr-8">{repeatedText}</span>
        <span className="inline-block pr-8">{repeatedText}</span>
      </motion.div>
    </div>
  )
}