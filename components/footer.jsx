import React,{useState} from 'react'
import { FiPhoneForwarded } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiHome } from "react-icons/fi";

const Footer = () => {
  const[showIcon,setShowIcon]=useState('home')
  return (
    <div className='footer-container'>
      <p>
        2023 aghajoonmarket all rights reserved
      </p>
      <p className='icons'>
      <FiHome onClick={()=>setShowIcon('home')} className='cursor-pointer ' />
      <FiInstagram onClick={()=>setShowIcon('instagram')} className='cursor-pointer  ' />
      <FiMail onClick={()=>setShowIcon('email')} className='cursor-pointer  ' />
      <FiPhoneForwarded onClick={()=>setShowIcon('phone')} className='cursor-pointer  ' />
 
      </p>
      <div className='text-green-500 p-6 mb-4'>

      {
            showIcon == 'home'?
              <div>adress:hamburg-16st.no78</div>
              :
              showIcon == 'instagram'?
              <a href="/" >@aghajoonmarket</a>
              :
              showIcon=='email'?
              <div>aghajonmarket@gmail.com</div>
              :
              <div>+46-77-8799-762</div>

          }
      </div>
      
    </div>
  )
}

export default Footer;