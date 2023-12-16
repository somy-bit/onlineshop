import React from 'react'
import Link from "next/link"
import { urlFor } from "../lib/client"
import { useStateContext } from '../context/StateContetx'


const Product = ({ product}) => {

  const { product_name, slug, product_image, price,_id} = product;

  const { onAdd } = useStateContext()

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(product_image && product_image[0])}
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{product_name}</p>

          <p className='product-price'>$ {price}</p>



        </div>
      </Link>
      <div className='flex flex-1 justify-end'>

        <button className='bg-red-500  text-white font-semibold px-6 py-3 rounded-xl' onClick={()=>onAdd(product,1)}>Toevoegen</button>

      </div>


    </div>
  )
}

export default Product
