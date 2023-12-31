import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'


import { useStateContext } from '../context/StateContetx'
import {runFireWorks} from '../lib/utils'
import { strings } from '../strings'

const Success = () => {
    const{setTotalPrice,setTotalQuantity,setCartItems,lang} = useStateContext(); 

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
        <h2>{strings.SUCCESS_PAGE_MSG[lang]} </h2>
        <Link href='/'>
            <button type='button' className='btn' width="300px">{strings.CONTINUE_SHOP[lang]}</button>
        </Link>
      </div>
    </div>
  )
}

export default Success;
