import React from 'react'
import Link from "next/link"
import { FiShoppingCart } from "react-icons/fi";
import {Cart} from './'
import { useStateContext } from '../context/StateContetx';


const Navbar = () => {

  const {totalQuantity,showCart,setShowCart} = useStateContext();
  return (
    <div className='navbar-container'>
        <p className='logo'> 
            <Link href="/">AghaJoon</Link>
        </p>
      <button type="button" className='cart-icon' onClick={()=>setShowCart(true)}>
       <FiShoppingCart size={35}/> 
      <span className='cart-item-qty'>{totalQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
