import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-gray-600 mt-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <ShoppingCart className="w-16 h-16" />
      </motion.div>
      <motion.p
        className="text-center text-xl font-medium"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Your cart is feeling a bit lonely
      </motion.p>
      <motion.p
        className="text-center text-sm max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Why not add some items and give it some company? Your perfect picks are
        just a click away!
      </motion.p>
      <motion.button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Shopping
      </motion.button>
    </div>
  );
}
