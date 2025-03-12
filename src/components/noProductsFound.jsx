import { motion } from "framer-motion"

export const NoProductsFound = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100, 
        damping: 25 
      }}
      className="text-center text-gray-500 mt-8"
    >
      No products found matching your criteria.
    </motion.p>
  )
}
