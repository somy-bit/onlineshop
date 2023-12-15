import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import {useRouter} from 'next/router'

import { useStateContext } from '../context/StateContetx'
import {runFireWorks} from '../lib/utils'

const Success = () => {
    const{setTotalPrice,setTotalQuantity,setCartItems} = useStateContext(); 

    const [order,setOrder] = useState(null);

    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantity(0);
        runFireWorks();
    },[])

  return (
    <div className='success-wrapper'> 
      <div className='success'>
        <p className='icon'>
            <BsBagCheckFill />
        </p>
        <h2>Thank You For Your Order </h2>
        <Link href='/'>
            <button type='button' className='btn' width="300px">Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Success;
