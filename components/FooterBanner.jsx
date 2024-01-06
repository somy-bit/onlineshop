import React from 'react'
import Link from "next/link"
import {urlFor} from "../lib/client"

const FooterBanner = ({footerBanner}) => {
  return (
    <div className='px-[100px] py-[40px] bg-red-400 rounded-md relative h-[400px] tetx-white w-full mt-[120px]' >
      <div className='flex justify-between'>
        <div className='left'>
            <p>
                {footerBanner.discount}
            </p>
            <h3>
                {footerBanner.largeText}
            </h3>
            <h3>
                {footerBanner.largeText2}
            </h3>
            <p>
                {footerBanner.saleTime}
            </p>
        </div>
        <div className='leading-5'>
            <p>{footerBanner.smallText}</p>
            <h3>{footerBanner.midText}</h3>

            <p>{footerBanner.desc}</p>
            <Link href={"/"}>
                <button>{footerBanner.buttonText}</button>
            </Link>
        </div>
        {/* <img src={urlFor(footerBanner.banner_image)} className='footer-banner-image'/> */}
      </div>
    </div>
  )
}

export default FooterBanner
