import React from 'react'
import Link from "next/link"
import { urlFor } from "../lib/client"
import { useStateContext } from '../context/StateContetx'
import toast from 'react-hot-toast'

const Product = ({ product}) => {

  const { product_name, slug, product_image, price,_id,arabic_name,persian_name} = product;

  const { onAdd,lang,user } = useStateContext()

  const addProduct =()=>{
    if(user){
      onAdd(product,1)
    }else{
      toast.error(lang=='du'?'Log in om verder te winkelen':(lang=='ar'?'يرجى تسجيل الدخول لمواصلة التسوق':'لطفا برای ادامه خرید وارد حساب خود شوید'),{duration:3000})
    }
  }

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
          <p className='product-name'>{lang == 'du'?product_name:(lang=='ar'?arabic_name:persian_name)}</p>
          


          <p className='product-price'>€ {price}</p>



        </div>
      </Link>
      <div className='flex flex-1 justify-end'>

        <button className='bg-red-500  text-white font-semibold px-6 py-3 rounded-xl' onClick={addProduct}>{lang == 'ar'?'إضافته':(lang=='du'?'voeg het toe':'اضافه کن')}</button>

      </div>


    </div>
  )
}

export default Product
