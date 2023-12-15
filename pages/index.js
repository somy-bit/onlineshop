import React, { useState } from 'react'
import { Product, FooterBanner, HeroBanner } from "../components"
import { client } from "../lib/client"



const Home = ({ products, bannerData, categories }) => {

  const [filters, setFilter] = useState();
 

  const filterData = (category)=>{
      setFilter(category);
  }
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h1 className='text-gray-800 shadow-sm text-3xl pb-8 font-semibold'>AghaJoon Market Products</h1>
        <div className='flex flex-row space-x-8  justify-around mt-10 overflow-x-scroll s-contain '>
        <div onClick={()=>filterData()} className='cursor-pointer text-gray-700 font-semibold align-center text-center w-24 p-4 bg-red-200 rounded-xl'>All</div>
          
          {categories?.map((item, i) => (
            <div onClick={()=>filterData(item?.category)} className='cursor-pointer text-gray-700 font-semibold align-center text-center p-4 bg-red-200 rounded-xl' key={i}>{item.category}</div>
          ))}
        </div>

      </div>

      <div className='products-container'>
        {filters?
        products.filter((item)=>(item.category.category == filters)).map((pro)=><Product key={pro._id}
        product={pro} />)
        :
         products?.map((product) => <Product key={product._id}
          product={product}  />
        )}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}


export const getServerSideProps = async () => {

  const query = '*[_type == "product"]{_id,product_name,product_image,price,slug,description,category->{category}}'
  const bannerQuery = '*[_type == "banner"]{banner_image,buttonText,smallText,desc,midText,largeText,largeText2,saleTime,discount,product->}'
  const catQuery = '*[_type == "category"]'



  const products = await client.fetch(query)
  const bannerData = await client.fetch(bannerQuery)
  const categories = await client.fetch(catQuery)

  
  products.map(item=>{
    if(!item.category.category)
    item.category.category = '';
  })


  return {
    props: { products, bannerData, categories }
  }

}

export default Home
