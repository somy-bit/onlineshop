import React, { useState } from 'react'
import Link from "next/link"
import { FiShoppingCart,FiMenu} from "react-icons/fi";
import { Cart } from './'
import { useStateContext } from '../context/StateContetx';
import Menu from './Menu';



const Navbar = () => {




  const { totalQuantity, showCart, setShowCart, user ,showMenu ,setShowMenu} = useStateContext();
  return (
    <div>

      <div className='flex flex-row justify-between p-1 relative shadow-sm border-b border-gray-200 rounded-sm'>
        <div className='flex flex-row items-center justify-around space-x-4'>
          <p className='text-gray-400 text-[18px]'>
            <Link href="/">
              <img src='/images/logo.jpeg' className='cursor-pointer bg-transparent' width={80} height={80} />
            </Link>
          </p>
          <FiMenu size={25} onClick={()=>setShowMenu(!showMenu)} className='cursor-pointer md:hidden'/>
        </div>

        <div className='flex flex-row space-x-4 mr-2 items-center'>

          {user &&
            <button type="button" className='text-[25px] text-gray-500 cursor-pointer relative hover:transition-transform hover:scale-110  hover:duration-400 hover:ease-linear border-none bg-transparentz-100' onClick={() => setShowCart(true)}>
              <FiShoppingCart size={25} />
              <span className='absolute -right-[4px] -top-[4px] text-[12px] text-gray-50 bg-red-500 w-[18px] h-[18px] rounded-full text-center font-bold'>{totalQuantity}</span>
            </button>
          }


        </div>


        {showCart && <Cart />}
        {showMenu && <Menu />}

      </div>


    </div>

  )
}

export default Navbar
