import Link from 'next/link'
import React from 'react'


const about = () => {
  
  return (
    <div className='text-gray-400 text-xl font-semibold flex flex-1 flex-col  p-8 justify-start'>
        <Link href="/" >AGHAJOON MARKET</Link>
     <div className='w-full flex flex-col items-center my-20 h-full '>
        {orders.map(i=>(
          <div>{i.customer.email}</div>
        ))}
     </div>
    </div>
    
  )
      
  
}

export default about

