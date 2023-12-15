import React from 'react'
import Link from "next/link"
import { FiShoppingCart } from "react-icons/fi";
import { Cart } from './'
import { useStateContext } from '../context/StateContetx';


const Navbar = () => {

  const { totalQuantity, showCart, setShowCart } = useStateContext();
  return (
    <div className='navbar-container'>
      <div className='flex flex-row items-center justify-around space-x-4'>
        <p className='logo'>
          <Link href="/">AGHAJOON MARKET</Link>
        </p>
        <p className='text-xs font-bold text-gray-500 hover:text-gray-600 hover:shadow-lg'>
          <Link href="/about" >ABOUT US</Link>
        </p>

      </div>

      <button type="button" className='cart-icon' onClick={() => setShowCart(true)}>
        <FiShoppingCart size={35} />
        <span className='cart-item-qty'>{totalQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
