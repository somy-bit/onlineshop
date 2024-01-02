import React, { useState } from 'react'
import Link from 'next/link'
import { useStateContext } from '../context/StateContetx';
import { strings } from '../strings';

const Headnav = () => {

    const [showLang, setShowLang] = useState(false);


    const { user, setLang, lang ,logout} = useStateContext();

    return (
        <div className='flex flex-row items-center justify-between h-20 w-full'>
            <div className='flex flex-row items-center justify-between flex-grow'>
                <p className='text-xs w-20 p-3 rounded-md font-bold text-gray-500 hover:text-gray-600 hover:shadow-lg'>
                    <Link href="/about" >{strings.ABOUT_US_LBL[lang]}</Link>
                </p>
                <div className='relative flex items-center justify-end w-full'>
                    <p onClick={() => setShowLang(!showLang)} className='w-20  text-center px-3 py-2 hover:bg-gray-50 hover:shadow-lg shadow-sm cursor-pointer rounded-md'>{strings.LNAGUAGE_LBL[lang]}</p>
                    {showLang && <div className='absolute right-0 flex flex-row justify-center items-center p-2 rounded-md  space-x-3 bg-white '>
                        <bottun type='button' className='cursor-pointer' onClick={() => { setLang('ar'); setShowLang(false) }}>عربي</bottun>
                        <bottun type='button' className='cursor-pointer' onClick={() => { setLang('du'); setShowLang(false) }}>dutch</bottun>
                        <bottun type='button' className='cursor-pointer' onClick={() => { setLang('fa'); setShowLang(false) }}>فارسی</bottun>
                    </div>
                    }
                </div>
            </div>
            <div>
                {user ?
                    <div className='flex flex-row justify-around items-center space-x-3 text-gray-500 font-semibold text-md'>
                        <p className='cursor-pointer p-3' onClick={() => logout()}>{strings.LOGUOT_LBL[lang]}</p>
                        <p >{user.name.length>10?user.name.substring(0,9):user.name}</p>
                    </div>
                    :
                    <Link href='/login' >
                        <p className='text-gray-500 font-semibold text-md cursor-pointer shadow-sm py-2 px-3 rounded-md hover:bg-gray-50 hover:shadow-lg' >{strings.LOGIN[lang]}</p></Link >

                }
            </div>
        </div>
    )
}

export default Headnav
