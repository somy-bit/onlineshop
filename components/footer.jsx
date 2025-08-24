import React, { useState } from 'react'
import { FiPhoneForwarded } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Footer = () => {

  const router = useRouter();

  const [showIcon, setShowIcon] = useState('home')
  return (
    <div className='footer-container bg-gray-100 shadow-lg border-t mt-10'>
      {router.pathname == '/' &&
        <p className='font-extralight'>
          2023 myshop all rights reserved
        </p>
      }
      <p className='icons'>
        <FiHome onClick={() => setShowIcon('home')} className='cursor-pointer ' />
        <FiInstagram onClick={() => setShowIcon('instagram')} className='cursor-pointer  ' />
        <FiMail onClick={() => setShowIcon('email')} className='cursor-pointer  ' />
        <FiPhoneForwarded onClick={() => setShowIcon('phone')} className='cursor-pointer  ' />

      </p>
      <div className='text-green-500 p-6 mb-4'>

        {
          showIcon == 'home' ?
            <div>adresse:bridgeport rd richmond bc canada</div>
            :
            showIcon == 'instagram' ?
              <Link href="/" >@myshop</Link>
              :
              showIcon == 'email' ?
                <div>myshop@test.com</div>
                :
                <div>+1-999888222</div>

        }
      </div>

    </div>
  )
}

export default Footer;