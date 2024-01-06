import React from 'react'
import { urlFor } from "../lib/client"
import { strings } from '../strings'
import { useStateContext } from '../context/StateContetx'


const HeroBanner = ({ heroBanner , offdata}) => {

  const { lang } = useStateContext();

  return (
    <div className=" overflow-hidden  p-2 max-w-[1390px] mx-auto z-10 text-3xl mt-[4px] grid grid-cols-2 rounded-lg max-h-[550px] py-4 w-full bg-gray-200 "  >
      <div className='flex flex-col p-2 items-center justify-around'>
        <p className='text-[20px]'>{heroBanner.smallText}</p>
        <h3 className='mt-3'>{heroBanner.midText}</h3>
        <h1 className='text-white text-8xl lg:text-[200px] font-bold ml-[20px] uppercase'>{heroBanner.largeText}</h1>
         <button className='rounded-md min-w-fit w-[200px] md:w-[300px] px-4 py-3 bg-red-600 text-white border-none text-[18px] font-bold cursor-pointer' onClick={() => offdata()} type="button">{heroBanner.buttonText}</button>
      </div>
      <div className='flex flex-col lg:flex-row p-3'>

        {heroBanner.banner_image &&
          <img src={urlFor(heroBanner.banner_image)} alt="banner image" className=' w-[400px]' />
        }

          {/* <div className='flex flex-col  text-white justify-end space-y-3'>
            <h5 className='mb-[12px] text-center font-bold text-[16px]'>{strings.DESC_LBL[lang]}</h5>
            <p className='text-gray-500 text-end '>{heroBanner.desc}</p>
          </div> */}
        </div>
    
    </div>
  )
}

export default HeroBanner
