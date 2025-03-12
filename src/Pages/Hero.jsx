import React from "react";
import { Button } from "@/components/ui/button";
import hero from "../assets/heroPage.jpg";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FlipWords } from "@/components/ui/flip-words";
import { useGetAllCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import BrandMarquee from "@/components/brand-marquee";
const brands = [
  {
    id: "1",
    name: "Acme Inc",
    logoUrl: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "2",
    name: "Globex",
    logoUrl: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "3",
    name: "Soylent Corp",
    logoUrl: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "4",
    name: "Initech",
    logoUrl: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "5",
    name: "Umbrella Corp",
    logoUrl: "/placeholder.svg?height=100&width=200",
  },
]

function Hero() {
  const styleWords = ["Elegant", "Unique"];
  const wardrobeWords = ["Wardrobe", "Collection"];
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        {/* Background Pattern */}

        <div className="absolute inset-0 z-0 opacity-20">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-full">
              <p className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                Discover Your{" "}
                <FlipWords words={styleWords} className="text-orange-500" />
                <br className="hidden md:block" />
                Elevate Your{" "}
                <FlipWords words={wardrobeWords} className="text-orange-500" />
              </p>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Explore our curated collection of trendsetting fashion pieces
                that blend comfort with cutting-edge design.
              </p>
              <div className="mt-8">
                <Button size="lg" className="text-lg px-8 py-3">
                  Shop Now
                </Button>
              </div>
            </div>
            
            <div className="relative lg:row-span-2">
              <div className="aspect-w-5 aspect-h-6">
                <img
                  src={hero}
                  alt="Featured Product"
                  width={500}
                  height={550}
                  className="rounded-lg object-cover shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Featured Item
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Summer Collection 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
