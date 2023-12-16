import React, { useState } from 'react'
import Link from "next/link"
import { FiShoppingCart } from "react-icons/fi";
import { Cart } from './'
import { useStateContext } from '../context/StateContetx';


const Navbar = () => {

  const [showLogout, setShowLogout] = useState(false);

  const { totalQuantity, showCart, setShowCart, user, setUser } = useStateContext();
  return (
    <div className='navbar-container '>
      <div className='flex flex-row items-center justify-around space-x-4'>
        <p className='logo'>
          <Link href="/">
            <img src='/images/logo.jpeg' className='cursor-pointer' width={80} height={80}/>
          </Link>
        </p>
        <p className='text-xs font-bold text-gray-500 hover:text-gray-600 hover:shadow-lg'>
          <Link href="/about" >OVER ONS</Link>

        </p>

      </div>

      <div className='flex flex-row space-x-4 items-center'>
        {user ?
          <div className='flex flex-row justify-around items-center space-x-3 text-gray-500 font-semibold text-md'>
            <p className='cursor-pointer' onClick={()=>setUser(null)}>Uitloggen</p>
            <p >{user.name}</p>
          </div>
          :
          <Link  href='/login' >
            <p className='text-gray-500 font-semibold text-md cursor-pointer' >Log in</p></Link >

        }

        <button type="button" className='cart-icon' onClick={() => setShowCart(true)}>
          <FiShoppingCart size={35} />
          <span className='cart-item-qty'>{totalQuantity}</span>
        </button>

      </div>


      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
