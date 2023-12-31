import React from 'react'
import Link from "next/link"
import { urlFor } from "../lib/client"
import { useStateContext } from '../context/StateContetx'
import toast from 'react-hot-toast'
import { strings } from '@/strings'

const Product = ({ product}) => {

  const { product_name, slug, product_image, price,_id,arabic_name,persian_name} = product;

  const { onAdd,lang,user } = useStateContext()

  const addProduct =()=>{
    if(user){
      onAdd(product,1)
    }else{
      toast.error(strings.LOGIN_PLS_MSG[lang],{duration:3000})
    }
  }

  return (
    <div className='bg-gray-100 rounded-md'>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(product_image && product_image[0])}
            width={250}
            height={250}
            className={product.available ?'product-image':'product-image filter grayscale'}
            alt='image'
          />
          <p className='product-name'>{lang == 'du'?product_name:(lang=='ar'?arabic_name:persian_name )}</p>
          


          <p className='product-price'>€ {price}</p>



        </div>
      </Link>
      <div className='flex flex-1 justify-end'>

        <button disabled={!product.available} className='text-red-500 font-semibold px-6 py-3 rounded-xl' onClick={addProduct}>{product.available?strings.ADD[lang]:strings.NOT_EXIST[lang]}</button>

      </div>


    </div>
  )
}

export default Product
