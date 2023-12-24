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
    <div className='footer-container'>
      {router.pathname == '/' &&
        <p className='font-extralight'>
          2023 aghajoonmarket all rights reserved
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
            <div>adresse:Carl von Linde Str 20,
              Wiesbaden 65197 West Center</div>
            :
            showIcon == 'instagram' ?
              <Link href="/" >@aghajoon_supermarket</Link>
              :
              showIcon == 'email' ?
                <div>agha-joon@web.de</div>
                :
                <div>+49-1590-6849527</div>

        }
      </div>

    </div>
  )
}

export default Footer;