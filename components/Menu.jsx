import React from 'react'
import CatSelect from './CatSelect'
import { useStateContext } from '../context/StateContetx'
import { FiUser, FiLogIn, FiGlobe, FiLogOut,FiChevronRight } from 'react-icons/fi'
import { strings } from '../strings'
import { useRouter } from 'next/router'
const Menu = () => {

    const { user, setLang, lang, category, setShowMenu, logout } = useStateContext();

    const setCategory = () => {
        setShowMenu(false)
    }

    const router = useRouter();
    return (
        <div className='cart-wrapper'>
            <div className='h-full w-3/4 relative float-left bg-white  z-1200 px-4 py-3'>
                <div className='flex flex-col items-start justify-start  px-2 py-3 space-y-3'>
                    <div className='flex flex-row w-full justify-between items-start'>
                    <img src='/images/logo.jpeg' className='h-24 w-24 ' />
                    <FiChevronRight size={25} onClick={()=>setShowMenu(false)} />
                    </div>
                
                    <div className='grid grid-cols-3 min-w-full gap-3'>
                        {user ?
                            <>
                                <FiUser size={25} className='col-span-1 text-green-400' />
                                <p className='col-span-2 cursor-pointer  text-lg text-gray-600 truncate'>{user.name}</p>


                                <FiLogOut size={25} className='col-span-1 text-green-400' />
                                <p onClick={() => logout()} className='col-span-2 cursor-pointer text-lg text-gray-600 truncate'>{strings.LOGUOT_LBL[lang]}</p>

                            </>
                            :
                            <>
                                <FiLogIn size={25} className='col-span-1 text-green-400' />
                                <p onClick={() => router.push('/login')} className='col-span-2 cursor-pointer  text-lg text-gray-600'>{strings.LOGIN[lang]}</p>
                            </>
                        }

                        <FiGlobe size={25} className='col-span-1 text-green-400' />

                        <p className='col-span-2 cursor-pointer text-lg text-gray-600 '>{strings.LNAGUAGE_LBL[lang]}</p>
                        <div className='px-3 col-span-3 py-4 space-y-2 bg-slate-200 rounded-md shadow-inner '>
                            <p onClick={() => setLang('ar')} className='col-span-2  hover:bg-gray-300 cursor-pointer text-center text-lg text-gray-600 '>عربي</p>
                            <p onClick={() => setLang('fa')} className='col-span-2  hover:bg-gray-300 cursor-pointer text-center text-lg text-gray-600 '>فارسی</p>
                            <p onClick={() => setLang('du')} className='col-span-2  hover:bg-gray-300 cursor-pointer text-center text-lg text-gray-600 '>Deutsch</p>

                        </div>


                        <h3 className='font-semibold ml-8 mt-6 text-center col-span-3 text-gray-500'>{strings.CATEGORY_LBL[lang]}</h3>
                        <div className='col-span-3 w-full'>
                            <CatSelect />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Menu
