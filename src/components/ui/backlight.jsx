export function Backlight({ children, blur = 40, className = '', color = 'from-primary-400/30 via-primary-500/20 to-primary-600/30' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Backlight glow effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl`}
        style={{ filter: `blur(${blur}px)`, transform: 'scale(0.8)' }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}