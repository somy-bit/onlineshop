"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const promotions = [
  {
    title: "Fresh Fruits & Vegetables",
    subtitle: "Farm to your table",
    img: "/images/grocery.jpeg",
  },
  {
    title: "Snacks & Beverages",
    subtitle: "Stock up for movie nights",
    img: "/images/gro3.jpeg",
  },
  {
    title: "Everyday Essentials",
    subtitle: "Delivered in minutes",
    img: "/images/gorcery2.jpeg",
  },
]

export default function HeroBanner({heroBanner}) {
  const [current, setCurrent] = useState(0)
 

  useEffect(() => {
     console.log("HeroBanner",heroBanner)
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBanner.promotions.length)
    }, 4000)
    return () => clearInterval(timer)
  })

  return (
    <div className="relative mt-10 w-full  h-72 md:h-96 overflow-hidden  shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBanner.promotions[current].img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <motion.div
        key={`text-${current}`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-10 left-6 text-white"
      >
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
          {heroBanner.promotions[current].title}
        </h1>
        <p className="text-lg md:text-2xl mt-2 opacity-90">
          {heroBanner.promotions[current].subtitle}
        </p>
      </motion.div>
    </div>
  )
}
