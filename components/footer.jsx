import React from 'react'
import { FiPhoneForwarded } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiHome } from "react-icons/fi";

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>
        2023 aghajoonmarket all rights reserved
      </p>
      <p className='icons'>
        <FiHome />
        <FiPhoneForwarded />
        <FiMail />
        <FiInstagram />
      </p>
      
    </div>
  )
}

export default Footer;