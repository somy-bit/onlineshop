import React, { useEffect, useState } from 'react'
import { Product, FooterBanner, HeroBanner } from "../components"
import { client } from "../lib/client"
import { FaAngleDown } from 'react-icons/fa'
import { sliceStartAtom, sliceEndAtom, currentPageAtom } from '../storage/atoms'
import { useAtom } from 'jotai'
import CategoryList from '@/components/CategoryList'
import { useStateContext } from '../context/StateContetx'
import Headnav from '../components/Headnav'
import category from '@/aghajoonmarkets/schemas/category'



const Home = ({ products, bannerData, categories }) => {

const {lang,setCategory,setCategorys,categorys} = useStateContext();

useEffect(()=>{
  let ncat =[{category:'All',arabic_cat:'الجميع',persian_cat:'همه',_id:1 },...categories]
  setCategory(ncat)
},[categor])



  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom)
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom)
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const [categor,setCategories] = useState(categories)
  const[data,setdata] = useState(products)
  
  // the number that is added to the states specifies how many posts are displayed per page
  const nextPage = () => {
    setCurrentSliceStart(currentSliceStart + 15)
    setCurrentSliceEnd(currentSliceEnd + 15)
    setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    setCurrentSliceStart(currentSliceStart - 15)
    setCurrentSliceEnd(currentSliceEnd - 15)
    setCurrentPage(currentPage - 1)
  }




  const [showlist, setShowlist] = useState(false)

  


  const filterData = (category) => {
    //setFilter(category);
    setdata(products?.filter((item) => (item.category.category == category)));
    setShowlist(false);
    setCurrentSliceStart(0);
    setCurrentSliceEnd(15);
    setCurrentPage(1)
  
  }
  const setSaleData=()=>{
    setdata(products?.filter((item) => (item.in_sale == true))); 
    setCurrentSliceStart(0);
    setCurrentSliceEnd(15);
    setCurrentPage(1)
  }

useEffect(()=>{
  if(categorys.category !== 'All'){
    filterData(categorys.category)
  }else{
    setdata(products)
  }
},[categorys])



 
  return (
    <div >
  
      <HeroBanner offdata={setSaleData} heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h1 className='text-gray-800 shadow-sm text-3xl pb-8 font-semibold'>{lang=='ar'?'سوبر ماركت اغاجون':(lang=='du'?'AghaJoon Supermarkt':'سوپرمارکت آقاجون')}</h1>
        <div className=' max-w-5xl relative px-4 mx-auto'>
          <div className='hidden md:flex flex-row space-x-8  justify-start mt-10 overflow-x-scroll  '>

            <div onClick={() => setdata(products)} className='cursor-pointer text-gray-700 flex justify-center items-center font-semibold align-center text-center w-24 p-4 bg-red-200 rounded-md'>{lang=='fa'?'همه':(lang=='du'?'Alle':'الجميع')}</div>

            {categories?.slice(0, 5).map((item, i) => (
              <CategoryList filterData={filterData} item={item} key={i}/>))
            }
            {categories?.length > 5 &&
              <>

                <button onClick={() => setShowlist(!showlist)} className="font-medium rounded-lg" type="button">
                  <FaAngleDown />
                </button>

                {showlist &&
                  <div className="z-50 absolute top-14 -right-4  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-500">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                      {categories?.slice(6, categories.length).map((item, i) =>
                      (<li key={i}>
                        <p onClick={() => {filterData(item?.category);setCategorys(item)}} className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{lang=='du'?item.category:(lang=='ar'?item.arabic_cat:item.persian_cat)}</p>
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
        {
          data.slice(currentSliceStart,currentSliceEnd).map((pro) => <Product key={pro._id}
            product={pro} />)
       }
      </div>
      <div className='my-16 w-full flex flex-row '>
        {currentSliceStart >= 4 && <button className='mx-auto  px-4 py-2 text-white rounded-lg bg-gradient-to-br from-blue-300 to-rose-400' onClick={previousPage}>{lang=='du'?'vorherige':(lang=='ar'?'سابق':'قبلی')}</button>}
        {currentSliceEnd <data.length && <button className='mx-auto  px-4 py-2 rounded-lg text-white  bg-gradient-to-br from-blue-300 to-rose-400' onClick={nextPage}>{lang=='du'?'nächste':(lang=='ar'?'التالي':'بعد')}</button>}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}


export const getServerSideProps = async () => {

  const query = '*[_type == "product"]{_id,product_name,product_image,price,slug,description,category->{category},arabic_name,persian_name,arabic_desc,persian_desc,available,in_sale,off_price}'
  const bannerQuery = '*[_type == "banner"]{banner_image,buttonText,smallText,desc,midText,largeText,largeText2,saleTime,discount,product->}'
  const catQuery = '*[_type == "category"]'

///give a start empty to those might be null

  const fproduct = await client.fetch(query)
  const bannerData = await client.fetch(bannerQuery)
  const fcategorie = await client.fetch(catQuery)

 
  

  const products = fproduct.filter(item=>!Object.values(item).includes(null))
  const categories = fcategorie.filter(item=>!Object.values(item).includes(null))
  console.log('filted---------------------->',products)
  if(bannerData){
    Object.values(bannerData[0]).map(i=>{
      if(!i)
      i=''
    })
  }  


  return {
    props: { products, bannerData, categories }
  }

}

export default Home
