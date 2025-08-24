'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FiShoppingCart } from 'react-icons/fi'
import { useStateContext } from '../context/StateContetx'
import { Cart } from './'
import { BsGlobe } from 'react-icons/bs'

const Navbar = () => {

  const { user, setUser, setLang, lang, totalQuantity, showCart, setShowCart, setCartItems, setTotalQuantity } = useStateContext()

  const handleLogout = () => {
    setUser(null)
    setCartItems([])
    setTotalQuantity(0)
  }

  const toggleLang = () => {
    if (lang === 'en') {
      setLang('fa')
    } else {
      setLang('en')
    }
  }

  return (
    <div className='w-full shadow-md bg-white'>
      <div className='max-w-7xl mx-auto flex justify-between items-center h-20 px-4'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link href='/'>
           <> <img src='/images/logo.png' alt='Logo' width={110} height={90} className='cursor-pointer' /><span className='text-lg font-bold'>My Shop</span></>
          </Link>
        </div>

        {/* Navigation Links & Language */}
        <div className='flex items-center space-x-4'>


          <div className='relative'>
        
          </div>
        </div>

        {/* User & Cart */}
        <div className='flex items-center space-x-4'>
              <button
              type='button'
              onClick={toggleLang}
              className='text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 '
            >
              {lang === 'en' ? (<span className='flex items-center space-x-1'>
                <BsGlobe size={20} /><p>EN</p>
              </span>

              ) : (
                <span className='flex items-center space-x-1'>
                  <BsGlobe size={20} /><p>FA</p>
                </span>

              )}
            </button>
          {user ? (
            <div className='flex items-center space-x-3'>
              <p className='text-sm font-medium text-gray-600 '>Welcome {user.name.length > 10 ? user.name.substring(0, 10) + '...' : user.name} !</p>
              <button onClick={handleLogout} className='text-sm px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'>
                {lang === 'en' ? 'Logout' :  'خروج' }
              </button>
              {user && (
                <button type='button' className='relative' onClick={() => setShowCart(true)}>
                  <FiShoppingCart size={25} />
                  {totalQuantity > 0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>{totalQuantity}</span>}
                </button>
              )}
            </div>
          ) : (
            <Link href='/login'>
              <p className='text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100  cursor-pointer'>
                {lang === 'en' ? 'Login' :  'ورود'}
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
