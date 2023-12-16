import React from 'react'
import Head from "next/head"
import Navbar from "./Navbar"
import  Footer  from './footer'
import { useRouter } from 'next/router'


const Layout = ({children}) => {

  const router = useRouter();
const hidNav = router.pathname == "/registerOrder" || router.pathname == "/about" || router.pathname == '/success'

  return (
    <div className='layout'>
      <Head>
        <title>aghajoon afghan market</title>
      </Head>
      <header>
        {!hidNav &&  <Navbar />}
       
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
