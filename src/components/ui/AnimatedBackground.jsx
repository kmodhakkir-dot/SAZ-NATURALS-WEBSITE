import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function AnimatedBackground({ className = '', isDark }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    const newParticles = Array.from({ length: isDark ? 60 : 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (isDark ? 2.5 : 1.5) + (isDark ? 1 : 0.5),
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * (isDark ? 0.4 : 0.2) + (isDark ? 0.1 : 0.05),
      color: isDark
        ? `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.1})`
        : `rgba(45, 122, 58, ${Math.random() * 0.4 + 0.05})`,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      newParticles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })

      if (isDark) {
        for (let i = 0; i < newParticles.length; i++) {
          for (let j = i + 1; j < newParticles.length; j++) {
            const dx = newParticles[i].x - newParticles[j].x
            const dy = newParticles[i].y - newParticles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 120) {
              ctx.beginPath()
              ctx.moveTo(newParticles[i].x, newParticles[i].y)
              ctx.lineTo(newParticles[j].x, newParticles[j].y)
              ctx.strokeStyle = `rgba(16, 185, 129, ${0.05 * (1 - dist / 120)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()
    resize()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [isDark])

  const orbs = [
    { x: '10%', y: '10%', size: '400px', color: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(45, 122, 58, 0.06)' },
    { x: '80%', y: '20%', size: '300px', color: isDark ? 'rgba(34, 197, 94, 0.06)' : 'rgba(74, 159, 90, 0.05)' },
    { x: '20%', y: '80%', size: '350px', color: isDark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(45, 122, 58, 0.04)' },
    { x: '90%', y: '80%', size: '250px', color: isDark ? 'rgba(34, 197, 94, 0.04)' : 'rgba(74, 159, 90, 0.03)' },
  ]

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: orb.color,
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: isDark
            ? 'inset 0 0 200px rgba(0,0,0,0.6), inset 0 0 100px rgba(0,0,0,0.4)'
            : 'inset 0 0 150px rgba(0,0,0,0.1), inset 0 0 80px rgba(0,0,0,0.05)',
        }}
      />
    </div>
  )
}