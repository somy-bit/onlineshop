import React, { useState, useEffect } from 'react'
import Head from "next/head"
import Navbar from "./Navbar"
import Footer from './footer'
import { useRouter } from 'next/router'
import SplashScreen from './SplashScreen'


const Layout = ({ children }) => {

  const router = useRouter();
  const hidNav = router.pathname == "/registerOrder" || router.pathname == "/about" || router.pathname == '/success' || router.pathname == '/login' || router.pathname == '/registerNewUser' || router.pathname == '/admin';
  const isHome = router.pathname == '/'
  const hideFooter = router.pathname == '/admin'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading])


  return (
    <>
      {isLoading && isHome ?
        <SplashScreen finishLoading={()=>setIsLoading(false)} />
        :
        <div className='layout'>
          <Head>
            <title>aghajoon afghan market</title>
          </Head>
          <header>
            {!hidNav && <Navbar />}

          </header>
          <main className='main-container'>
            {children}
          </main>

          <footer>

            {!hideFooter && <Footer />}
            
          </footer>
        </div>
      }

    </>
  )
}

export default Layout
