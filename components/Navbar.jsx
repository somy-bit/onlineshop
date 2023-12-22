import React, { useState } from 'react'
import Link from "next/link"
import { FiShoppingCart } from "react-icons/fi";
import { Cart } from './'
import { useStateContext } from '../context/StateContetx';


const Navbar = () => {

  const [showLogout, setShowLogout] = useState(false);
  const [showLang, setShowLang] = useState(false);


  const { totalQuantity, showCart, setShowCart, user, setUser, setLang, lang } = useStateContext();
  return (
    <div className='navbar-container '>
      <div className='flex flex-row items-center justify-around space-x-4'>
        <p className='logo'>
          <Link href="/">
            <img src='/images/logo.jpeg' className='cursor-pointer' width={80} height={80} />
          </Link>
        </p>
        <p className='text-xs font-bold text-gray-500 hover:text-gray-600 hover:shadow-lg'>
          <Link href="/about" >{lang == 'du' ? 'OVER ONS' : (lang == 'ar' ? 'معلومات عنا' : 'درباره ما')}</Link>

        </p>
        <p onClick={() => setShowLang(!showLang)} className='relative w-20  text-center px-3 py-2 hover:bg-gray-50 hover:shadow-lg shadow-sm cursor-pointer rounded-md'>{lang == 'du' ? 'sprache' : (lang == 'ar' ? 'لغة' : 'فارسی')}</p>

        {showLang && <div className='absolute w-24 left-5 bottom-0 flex flex-col justify-center items-center space-y-3 bg-white z-200 overflow-visible'>
          <bottun type='button' className='cursor-pointer' onClick={() => { setLang('ar'); setShowLang(false) }}>عربي</bottun>
          <bottun type='button' className='cursor-pointer' onClick={() => { setLang('du'); setShowLang(false) }}>dutch</bottun>
          <bottun type='button' className='cursor-pointer' onClick={() => { setLang('fa'); setShowLang(false) }}>فارسی</bottun>

        </div>
        }

      </div>

      <div className='flex flex-row space-x-4 items-center'>
        {user ?
          <div className='flex flex-row justify-around items-center space-x-3 text-gray-500 font-semibold text-md'>
            <p className='cursor-pointer' onClick={() => setUser(null)}>{lang == 'du' ? 'Uitloggen' : (lang == 'ar' ?' خروج' : 'خروج')}</p>
            <p >{user.name}</p>
          </div>
          :
          <Link href='/login' >
            <p className='text-gray-500 font-semibold text-md cursor-pointer shadow-sm py-2 px-3 rounded-md hover:bg-gray-50 hover:shadow-lg' >{lang=='du'?'Log in':(lang=='ar'?'الدخول':'ورود')}</p></Link >

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
