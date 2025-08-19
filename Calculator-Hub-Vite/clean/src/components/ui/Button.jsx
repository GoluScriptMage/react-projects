import { motion } from 'framer-motion'

/**
 * Reusable Button component with calculator-specific themes
 * @param {string} variant - Button style variant
 * @param {string} size - Button size
 * @param {string} calculatorTheme - Calculator type for theming
 * @param {boolean} disabled - Whether button is disabled
 * @param {boolean} loading - Whether button is in loading state
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Button content
 * @param {function} onClick - Click handler
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  calculatorTheme = 'love',
  disabled = false,
  loading = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  // Base button classes
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  // Theme-specific colors
  const themeClasses = {
    love: {
      primary: 'btn-love focus:ring-love-500',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white border border-love-500/30 hover:border-love-500/50',
      outline: 'border-2 border-love-500 text-love-400 hover:bg-love-500 hover:text-white'
    },
    friendship: {
      primary: 'btn-friendship focus:ring-friendship-500',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white border border-friendship-500/30 hover:border-friendship-500/50',
      outline: 'border-2 border-friendship-500 text-friendship-400 hover:bg-friendship-500 hover:text-white'
    },
    career: {
      primary: 'btn-career focus:ring-career-500',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white border border-career-500/30 hover:border-career-500/50',
      outline: 'border-2 border-career-500 text-career-400 hover:bg-career-500 hover:text-white'
    },
    personality: {
      primary: 'btn-personality focus:ring-personality-500',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white border border-personality-500/30 hover:border-personality-500/50',
      outline: 'border-2 border-personality-500 text-personality-400 hover:bg-personality-500 hover:text-white'
    }
  }

  // Additional variant classes
  const variantClasses = {
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  }

  // Get theme classes
  const currentThemeClasses = themeClasses[calculatorTheme] || themeClasses.love
  const variantClass = currentThemeClasses[variant] || variantClasses[variant] || currentThemeClasses.primary

  // Disabled and loading states
  const stateClasses = disabled || loading 
    ? 'opacity-50 cursor-not-allowed' 
    : 'hover:scale-105 active:scale-95'

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClass}
    ${stateClasses}
    ${className}
  `.trim()

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e)
    }
  }

  return (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : children}
    </motion.button>
  )
}

export default Button
