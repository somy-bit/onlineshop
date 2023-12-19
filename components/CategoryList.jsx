import React from 'react'
import { useStateContext } from '../context/StateContetx'

const CategoryList = ({filterData,item}) => {
    const {lang} = useStateContext();
  return (
    <div onClick={() => filterData(item?.category)} className='cursor-pointer flex text-gray-700 w-40 font-semibold items-center justify-center text-center py-2 px-4 bg-red-200 rounded-xl'>
        {lang=='ar'?(item.arabic_cat?item.arabic_cat:''):(lang=='du'?item.category:(item.persian_cat?item.persian_cat:''))}
        </div>

  )
}

export default CategoryList
