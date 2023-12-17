import React,{useEffect} from 'react'
import { useStateContext } from "../context/StateContetx";
import { useRouter } from 'next/router';

export default function WithAuth(Component){
    
  return function WithAuth(){
    const router = useRouter();
    const{admin}=useStateContext();
    useEffect(()=>{
        if(!admin){
            router.replace('/')
        }
    },[])

    if(!admin){
    return null;}

    return <Component />

  }
}





