"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"


export function OrderSuccessAnimation({
  show,
  orderNumber = "12345",
  successMessage = "Order Placed!",
  subtitleMessage = "Thank you for your purchase. Your order has been confirmed.",
  emailMessage = "You will receive an email confirmation shortly.",
  buttonText = "Continue Shopping",
  onContinue,
  showConfetti = true,
  className = "",
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative mx-4 flex max-w-md flex-col items-center gap-8 rounded-lg bg-background p-8 text-center shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <SuccessCheckmark />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold">{successMessage}</h1>
              <p className="mt-2 text-muted-foreground">{subtitleMessage}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
              <p className="font-medium">Order #{orderNumber}</p>
              <p className="text-sm text-muted-foreground">{emailMessage}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <Button size="lg" onClick={onContinue}>
                {buttonText}
              </Button>
            </motion.div>

            {showConfetti && <Confetti />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SuccessCheckmark() {
  return (
    <motion.div
      className="relative flex h-24 w-24 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute h-full w-full rounded-full border-4 border-green-500"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.2,
        }}
      />
      <motion.div
        className="absolute flex h-full w-full items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.5,
        }}
      >
        <Check className="h-12 w-12 text-green-500" strokeWidth={3} />
      </motion.div>
    </motion.div>
  )
}

function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 0,
          }}
          animate={{
            opacity: 0,
            x: Math.random() * 500 - 250,
            y: Math.random() * 500 - 150,
            scale: Math.random() * 0.8 + 0.2,
          }}
          transition={{
            duration: Math.random() * 1 + 1.5,
            delay: 0.8,
            ease: "easeOut",
          }}
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            backgroundColor: [
              "#FF5252",
              "#FF4081",
              "#E040FB",
              "#7C4DFF",
              "#536DFE",
              "#448AFF",
              "#40C4FF",
              "#18FFFF",
              "#64FFDA",
              "#69F0AE",
              "#B2FF59",
              "#EEFF41",
              "#FFFF00",
              "#FFD740",
              "#FFAB40",
              "#FF6E40",
            ][Math.floor(Math.random() * 16)],
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  )
}

