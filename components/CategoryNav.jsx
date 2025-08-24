"use client"

import { useState, useEffect } from "react"
import { client } from "@/lib/client"
import { motion } from "framer-motion"

// GROQ Query for all products
const productsQuery = `
  *[_type == "product"]{
    _id,
    title,
    price,
    "image": product_image.asset->url,
    "category": category->title
  }
`

export default function CategoryNav() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [active, setActive] = useState("All")


  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(productsQuery)
      setProducts(data)
      setFiltered(data)

      // Extract unique categories
      const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))]
      setCategories(uniqueCategories)

  console.log("Categories:",data)
    }
    fetchProducts()
  }, [])

  // Handle category filter
  const handleFilter = (cat) => {
    setActive(cat)
    if (cat === "All") {
      setFiltered(products)
    } else {
      setFiltered(products.filter((p) => p.category === cat))
    }
  }

  return (
    <div className="p-6">
      {/* Category Navigation */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              active === cat
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-cover mb-3 rounded-lg"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
