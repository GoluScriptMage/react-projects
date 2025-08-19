import { motion } from 'framer-motion'

/**
 * Reusable Card component with different styles and animations
 * @param {string} variant - Card style variant
 * @param {string} calculatorTheme - Calculator type for theming
 * @param {boolean} hover - Whether card has hover effects
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Card content
 */
const Card = ({
  variant = 'default',
  calculatorTheme = null,
  hover = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  // Base card classes
  const baseClasses = 'bg-gray-800 border border-gray-700 rounded-xl shadow-lg transition-all duration-300'

  // Variant classes
  const variantClasses = {
    default: 'p-6',
    compact: 'p-4',
    large: 'p-8',
    flat: 'p-6 shadow-none border-gray-600'
  }

  // Calculator theme borders
  const themeClasses = calculatorTheme ? {
    love: 'border-love-500/20 hover:border-love-500/40',
    friendship: 'border-friendship-500/20 hover:border-friendship-500/40',
    career: 'border-career-500/20 hover:border-career-500/40',
    personality: 'border-personality-500/20 hover:border-personality-500/40'
  }[calculatorTheme] : ''

  // Hover effects
  const hoverClasses = hover || onClick 
    ? 'hover:shadow-xl hover:scale-105 cursor-pointer' 
    : ''

  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${themeClasses}
    ${hoverClasses}
    ${className}
  `.trim()

  const CardWrapper = onClick ? motion.div : 'div'
  const motionProps = onClick ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    onClick
  } : {}

  return (
    <CardWrapper
      className={cardClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </CardWrapper>
  )
}

/**
 * Card header component
 */
Card.Header = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

/**
 * Card body component
 */
Card.Body = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

/**
 * Card footer component
 */
Card.Footer = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-700 ${className}`}>
    {children}
  </div>
)

/**
 * Card title component
 */
Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-white mb-2 ${className}`}>
    {children}
  </h3>
)

/**
 * Card description component
 */
Card.Description = ({ children, className = '' }) => (
  <p className={`text-gray-300 leading-relaxed ${className}`}>
    {children}
  </p>
)

export default Card
