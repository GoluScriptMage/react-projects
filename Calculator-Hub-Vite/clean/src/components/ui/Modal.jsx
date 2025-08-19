import { motion } from 'framer-motion'

/**
 * Reusable Modal component with Framer Motion animations
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Function to close modal
 * @param {ReactNode} children - Modal content
 * @param {string} size - Modal size ('sm', 'md', 'lg', 'xl')
 * @param {boolean} closeOnBackdrop - Whether clicking backdrop closes modal
 * @param {boolean} showCloseButton - Whether to show X close button
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  className = ''
}) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  // Add escape key listener
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`
          relative w-full ${sizeClasses[size]} bg-gray-800 
          rounded-xl shadow-2xl border border-gray-700
          ${className}
        `}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg 
                     text-gray-400 hover:text-white hover:bg-gray-700 
                     transition-colors z-10"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal
