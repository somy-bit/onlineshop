import React from 'react'
import Link from "next/link"
import {urlFor} from "../lib/client"

const FooterBanner = ({footerBanner}) => {
  return (
    <div className=' bg-red-400 rounded-md text-white w-full mt-[120px]' >
      
      <img src='/images/footer.jpeg' alt='footer banner'/>
     
    </div>
  )
}

export default FooterBanner
