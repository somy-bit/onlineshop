import React from 'react'
import Link from "next/link"
import { urlFor } from "../lib/client"
import { useStateContext } from '../context/StateContetx'
import toast from 'react-hot-toast'

const Product = ({ product }) => {
  const { product_name, slug, product_image, price, persian_name } = product
  const { onAdd, lang, user } = useStateContext()

  const addProduct = () => {
    if (user) {
      onAdd(product, 1)
    } else {
      toast.error(
        lang == 'en'
          ? 'please log in to continue shopping'
      
          : 'لطفا برای ادامه خرید وارد حساب خود شوید',
        { duration: 3000 }
      )
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-64">
      <Link href={`/product/${slug.current}`}>
        <div className="relative w-full h-64">
          <img
            src={urlFor(product_image && product_image[0])}
            alt={product_name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-lg font-medium text-gray-800 mb-1">
          {lang == 'en' ? product_name : persian_name}
        </p>
        <p className="text-gray-500 mb-4">€ {price}</p>

        <button
          onClick={addProduct}
          className="mt-auto bg-black text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          {lang == 'en' ? 'Add to basket' :  'اضافه کن'}
        </button>
      </div>
    </div>
  )
}

export default Product
