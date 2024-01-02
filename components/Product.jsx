import React from 'react'
import Link from "next/link"
import { urlFor } from "../lib/client"
import { useStateContext } from '../context/StateContetx'
import toast from 'react-hot-toast'
import { strings } from '@/strings'
import { useRouter } from 'next/router'

const Product = ({ product }) => {
  const router = useRouter();

  const { product_name, slug, product_image, price, _id, arabic_name, persian_name, in_sale, off_price } = product;

  const { onAdd, lang, user } = useStateContext()

  const addProduct = () => {
    if (user) {
      onAdd(product, 1)
    } else {
      toast.error(strings.LOGIN_PLS_MSG[lang], { duration: 3000 })
    }
  }

  return (
    <div className={router.pathname == '/' ? 'bg-gray-100 rounded-md' : 'bg-gray-100 rounded-md w-[140px]'}>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          {product_image &&
            <>
              <img
                src={urlFor(product_image && product_image[0])}
                width={250}
                height={250}
                className={product.available ? 'product-image relative' : 'product-image filter grayscale relative'}
                alt='image'

              />
              {in_sale &&
                <div className='absolute top-3 right-3 flex items-center justify-center p-3 text-xs text-white h-8 w-8 rounded-full bg-red-400'>off%</div>
              }
            </>}

          <p className='product-name'>{lang == 'du' ? product_name : (lang == 'ar' ? arabic_name : persian_name)}</p>


          <div className='flex flex-row justify-start space-x-2'>
            <p className={in_sale ? 'product-price line-through' : 'product-price'}>€ {price}</p>

            {in_sale && <p className='product-price text-teal-400'>€ {off_price}</p>}
          </div>


        </div>
      </Link>
      <div className='flex flex-1 justify-end'>

        <button disabled={!product.available} className='text-red-500 font-semibold px-6 py-3 rounded-xl' onClick={addProduct}>{product.available ? strings.ADD[lang] : strings.NOT_EXIST[lang]}</button>

      </div>


    </div>
  )
}

export default Product
