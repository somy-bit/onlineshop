import Link from 'next/link'
import React from 'react'


const about = () => {
  
  return (
    <div className='text-gray-800  font-semibold flex flex-1 flex-col   md:p-8 justify-start'>
        <div>
            <Link className='text-xl' href="/" >AGHAJOON MARKET</Link>
        </div>
        <div className='flex text-lg flex-col md:flex-row  justify-center items-start'>
          <div className='w-full flex-1 rounded-lg shadow-sm' >
            <img className='rounded-lg' src='/images/bilbpard.jpeg' />
          </div>
          <div className='w-full flex-1 px-4 py-5'>
            <div className='flex flex-col  py-8 px-4 border-l-2 border-gray-400'>
            <div className='grid gap-10 grid-cols-4'>
            <p className='col-span-1'>Address:</p>
            <p className='col-span-3 text-md font-normal'>Carl von Linde Str 20,
              Wiesbaden 65197 West Center</p>
              <p className='col-span-1'>Instagram:</p>
            <p className='col-span-3 text-md font-normal'>@aghajoon_supermarket</p>
            <p className='col-span-1'>Email:</p>
            <p className='col-span-3 text-md font-normal'>agha-joon@web.de</p>
            <p className='col-span-1'>Tel:</p>
            <p className='col-span-3 text-md font-normal'>+49-1590-6849527</p>
            </div>
           
         
            </div>
          
          </div>
        </div>
    
    </div>
    
  )
      
  
}

export default about

