import React from 'react'
import { useStateContext } from '../context/StateContetx'

const CategoryList = ({ filterData, item, activeCategory }) => {
  const { lang } = useStateContext()
  const isActive = activeCategory === item?.category

  return (
    <div
      onClick={() => filterData(item?.category)}
      className={`
        cursor-pointer
        px-3 py-1
        text-gray-700
        text-lg
        font-medium
        transition
        ${isActive ? "text-black underline underline-offset-4" : "hover:text-gray-900"}
      `}
    >
      {lang === 'en' ? item.category : item.persian_cat}
    </div>
  )
}

export default CategoryList
