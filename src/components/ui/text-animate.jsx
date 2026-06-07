import { motion } from 'framer-motion'

export function TextAnimate({ children, animation = 'blurInUp', by = 'character', once = true, className = '' }) {
  const text = typeof children === 'string' ? children : ''

  if (by === 'character') {
    const words = text.split(' ')

    return (
      <span className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => {
              const globalIndex = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndex
              return (
                <motion.span
                  key={charIndex}
                  className="inline-block"
                  style={{ willChange: 'transform' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: globalIndex * 0.03,
                    ease: 'easeOut'
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    )
  }

  if (by === 'word') {
    const words = text.split(' ')
    return (
      <span className={className}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{ willChange: 'transform' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: 'easeOut'
            }}
          >
            {word}{index < words.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      className={className}
      style={{ willChange: 'transform' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  )
}