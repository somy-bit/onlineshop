import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Navbar from "./Navbar"
import Footer from './footer'
import { useRouter } from 'next/router'



const Layout = ({ children }) => {

  const router = useRouter();
  const hidNav = router.pathname == "/registerOrder" || router.pathname == "/about" || router.pathname == '/success' || router.pathname == '/login' || router.pathname == '/registerNewUser' || router.pathname == '/admin';

  const showFooter = router.pathname == '/'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading])


  return (
    <>
      
       
        <div className='w-full h-full'>
          <Head>
            <title>aghajoon supermarket</title>
          </Head>
          <header>
            {!hidNav && <Navbar />}

          </header>
          <main className=''>
            {children}
          </main>

          <footer>

            {showFooter? <Footer />:<div className='h-24'></div>}
            
          </footer>
        </div>
   
    </>
  )
}

export default Layout
