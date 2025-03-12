"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const FlipWords = ({ words, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className={`inline-block h-[calc(1.2em)] overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="inline-block"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

