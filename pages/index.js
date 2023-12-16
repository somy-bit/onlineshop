import React, { useState } from 'react'
import { Product, FooterBanner, HeroBanner } from "../components"
import { client } from "../lib/client"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'



const Home = ({ products, bannerData, categories }) => {

  const [filters, setFilter] = useState();
  const [showlist, setShowlist] = useState(false)


  const filterData = (category) => {
    setFilter(category);
  }
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h1 className='text-gray-800 shadow-sm text-3xl pb-8 font-semibold'>AghaJoon Markets Products</h1>
        <div className='sm:hidden xs:hidden md:block max-w-5xl relative px-4 mx-auto'>
          <div className='flex flex-row space-x-8  justify-start mt-10 overflow-x-scroll  '>

            <div onClick={() => filterData()} className='cursor-pointer text-gray-700 font-semibold align-center text-center w-24 p-4 bg-red-200 rounded-xl'>All</div>

            {categories?.slice(0, 6).map((item, i) => (
              <div onClick={() => filterData(item?.category)} className='cursor-pointer text-gray-700 font-semibold align-center text-center p-4 bg-red-200 rounded-xl' key={i}>{item.category}</div>
            ))

            }

            {categories.length > 4 &&
              <>

                <button onClick={() => setShowlist(!showlist)} className="font-medium rounded-lg" type="button">
                  <FaAngleDown />
                </button>

                {showlist &&
                  <div className="z-50 absolute top-14 -right-4  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-500">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                      {categories?.slice(2, categories.length - 1).map((item, i) =>
                      (<li >
                        <p onClick={() => filterData(item?.category)} className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.category}</p>
                      </li>

                      ))
                      }

                    </ul>
                  </div>
                }







                {/* <div className='flex justify-center items-center cursor-pointer' onClick={() => setShowlist(true)}>
                <FaAngleDown className='' size={20} />
                <div className='absolute z-50 right-2 top-12 rounded-md flex-col p-4 space-y-4 bg-gray-200 max-w-xs'>
                  {categories?.slice(2, categories.length - 1).map((item,i) =>
                    (<div onClick={() => filterData(item?.category)} className='cursor-pointer text-gray-700 font-semibold align-center text-center ' key={i}>{item.category}</div>)

                  )}

                </div>
              </div> */}
              </>
            }
          </div>
        </div>
      </div>

      <div className='products-container'>
        {filters ?
          products.filter((item) => (item.category.category == filters)).map((pro) => <Product key={pro._id}
            product={pro} />)
          :
          products?.map((product) => <Product key={product._id}
            product={product} />
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


  products.map(item => {
    if (!item.category.category)
      item.category.category = '';
  })


  return {
    props: { products, bannerData, categories }
  }

}

export default Home
