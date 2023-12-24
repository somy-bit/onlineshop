import React, { useState } from 'react'
import Link from "next/link"
import { FiShoppingCart, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Cart } from './'
import { useStateContext } from '../context/StateContetx';



const Navbar = () => {




  const { totalQuantity, showCart, setShowCart, setCartItems } = useStateContext();
  return (
    <div>

      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center justify-around space-x-4'>
          <p className='logo'>
            <Link href="/">
              <img src='/images/logo.jpeg' className='cursor-pointer' width={80} height={80} />
            </Link>
          </p>
        </div>

        <div className='flex flex-row space-x-4 items-center'>
   

          <button type="button" className='cart-icon' onClick={() => setShowCart(true)}>
            <FiShoppingCart size={25} />
            <span className='cart-item-qty'>{totalQuantity}</span>
          </button>

        </div>


        {showCart && <Cart />}

      </div>
   
  
    </div>

  )
}

export default Navbar
