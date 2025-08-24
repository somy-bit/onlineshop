import React from "react"
import { motion } from "framer-motion"

const FooterBanner = () => {
  return (
    <div className="w-full bg-gray-50 mt-16 py-12 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 rounded-xl shadow-inner">
      
      {/* Static Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1606788075761-6e41c4b6a9a1?auto=format&fit=crop&w=300&q=80"
        alt="Promo"
        className="w-40 h-40 object-cover rounded-lg mb-4 md:mb-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Static Text */}
      <div className="flex flex-col text-center md:text-left md:ml-6">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Free Shipping on Orders Over €50
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          Enjoy quick delivery on all your favorite products
        </motion.p>
      </div>
    </div>
  )
}

export default FooterBanner
