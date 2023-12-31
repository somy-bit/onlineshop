import React from 'react'
import { urlFor } from "../lib/client"
import { strings } from '../strings'
import { useStateContext } from '../context/StateContetx'


const HeroBanner = ({ heroBanner }) => {

  const { lang } = useStateContext();

  return (
    <div className="hero-banner-container"  >
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText}</h1>
        {heroBanner.banner_image &&
          <img src={urlFor(heroBanner.banner_image)} alt="banner image" className='hero-banner-image' />
        }
        <div>

          <button onClick={() => { }} type="button">{heroBanner.buttonText}</button>


          <div className='desc'>
            <h5>{strings.DESC_LBL[lang]}</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
