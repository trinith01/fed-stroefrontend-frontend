

import { useState } from "react"

import { Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"



export default function BrandMarquee({
  brands = [],
  title = "Trusted by leading brands",
  subtitle = "Join thousands of satisfied customers who rely on our platform",
  speed = "medium",
  direction = "left",
  pauseOnHover = true,
  showControls = true,
  darkMode = false,
}) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate brands array to create seamless loop
  const allBrands = [...brands, ...brands]

  // Map speed string to actual CSS class
  const speedClass = {
    slow: "animate-marquee-slow",
    medium: "animate-marquee-medium",
    fast: "animate-marquee-fast",
  }[speed]

  // Direction class
  const directionClass = direction === "left" ? "" : "flex-row-reverse"

  return (
    <div
      className={`w-full overflow-hidden py-10 px-4 md:px-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
            {subtitle && (
              <p className={`text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{subtitle}</p>
            )}
          </div>
        )}

        <div className="relative">
          {showControls && (
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-12 right-0 z-10"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play animation" : "Pause animation"}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
          )}

          <div
            className="w-full overflow-hidden"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          >
            <div className={`flex ${directionClass} ${isPaused ? "animate-none" : speedClass}`}>
              {allBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex flex-col items-center justify-center mx-8 min-w-[120px] md:min-w-[150px] flex-shrink-0"
                >
                  <div className="relative h-12 w-24 md:h-16 md:w-32 mb-2">
                    <img
                      src={brand.logoUrl || "/placeholder.svg?height=100&width=200"}
                      alt={brand.alt || `${brand.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

