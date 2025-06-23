// components/animated-text.tsx
'use client'

import { motion } from 'framer-motion'

export const AnimatedText = ({ text, className, splitBy = ' ' }) => {
  const words = text.split(splitBy)

  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
            ease: 'easeInOut'
          }}
          className="mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}