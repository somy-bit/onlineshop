import React, { useState } from 'react'
import { Product, FooterBanner, HeroBanner } from "../components"
import { client } from "../lib/client"
import { FaAngleDown } from 'react-icons/fa'
import { sliceStartAtom, sliceEndAtom, currentPageAtom } from '../storage/atoms'
import { useAtom } from 'jotai'
import CategoryList from '@/components/CategoryList'
import { useStateContext } from '../context/StateContetx'




const Home = ({ products, bannerData, categories }) => {

  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom)
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom)
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  // the number that is added to the states specifies how many posts are displayed per page
  const nextPage = () => {
    setCurrentSliceStart(currentSliceStart + 4)
    setCurrentSliceEnd(currentSliceEnd + 4)
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    setCurrentSliceStart(currentSliceStart - 4)
    setCurrentSliceEnd(currentSliceEnd - 4)
    setCurrentPage(currentPage - 1)
  }

const entries=products.slice(currentSliceStart,currentSliceEnd)

const {lang} = useStateContext();

  const [filters, setFilter] = useState();
  const [showlist, setShowlist] = useState(false)

  


  const filterData = (category) => {
    setFilter(category);
  }
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h1 className='text-gray-800 shadow-sm text-3xl pb-8 font-semibold'>{lang=='ar'?'آقاجون مارکت':(lang=='du'?'AghaJoon Market Produce':'')}</h1>
        <div className='sm:hidden xs:hidden md:block max-w-5xl relative px-4 mx-auto'>
          <div className='flex flex-row space-x-8  justify-start mt-10 overflow-x-scroll  '>

            <div onClick={() => filterData()} className='cursor-pointer text-gray-700 font-semibold align-center text-center w-24 p-4 bg-red-200 rounded-xl'>{lang=='fa'?'همه':(lang=='du'?'Alle':'')}</div>

            {categories?.slice(0, 6).map((item, i) => (
              <CategoryList filterData={filterData} item={item} key={i}/>))
            }
            {categories.length > 6 &&
              <>

                <button onClick={() => setShowlist(!showlist)} className="font-medium rounded-lg" type="button">
                  <FaAngleDown />
                </button>

                {showlist &&
                  <div className="z-50 absolute top-14 -right-4  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-500">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                      {categories?.slice(6, categories.length).map((item, i) =>
                      (<li key={i}>
                        <p onClick={() => filterData(item?.category)} className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{lang=='du'?item.category:(lang=='ar'?item.arabic_name:item.persian_name)}</p>
                      </li>

                      ))
                      }

                    </ul>


                  </div>
                }

              </>
            }
          </div>
        </div>
      </div>

      <div className='products-container'>
        {filters ?
          products.filter((item) => (item.category.category == filters)).slice(currentSliceStart,currentSliceEnd).map((pro) => <Product key={pro._id}
            product={pro} />)
          :
          entries?.map((product) => <Product key={product._id}
            product={product} />
          )}
      </div>
      <div className='my-16 w-full flex flex-row '>
        {currentSliceStart >= 4 && <button className='mx-auto  px-4 py-2 text-white rounded-lg bg-gradient-to-br from-blue-300 to-rose-400' onClick={previousPage}>{lang=='du'?'vorig':(lang=='ar'?'':'')}</button>}
        {currentSliceEnd < products.length && <button className='mx-auto  px-4 py-2 rounded-lg text-white  bg-gradient-to-br from-blue-300 to-rose-400' onClick={nextPage}>{lang=='du'?'volgende':(lang=='ar'?'':'')}</button>}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}


export const getServerSideProps = async () => {

  const query = '*[_type == "product"]{_id,product_name,product_image,price,slug,description,category->{category},arabic_name}'
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
