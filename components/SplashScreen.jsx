import React,{useState,useEffect} from 'react'
import anime from 'animejs'

const SplashScreen = ({finishLoading}) => {

    const[isMounted,setIsMounted]=useState(false);

    const animate =()=>{
        const loader = anime.timeline({
            complete : ()=>finishLoading(),
        })
        loader.add({
            targets:'#logo',
            delay:0,
            scale:1,
            duration:500,
            easing:'easeInOutExpo'
        })
        loader.add({
            targets:'#logo',
            delay:0,
            scale:1.25,
            duration:500,
            easing:'easeInOutExpo'
        })
        loader.add({
            targets:'#logo',
            delay:0,
            scale:1,
            duration:500,
            easing:'easeInOutExpo'
        })
        loader.add({
            targets:'#logo',
            delay:0,
            scale:1.25,
            duration:500,
            easing:'easeInOutExpo'
        })
        loader.add({
            targets:'#logo',
            delay:0,
            scale:1,
            duration:500,
            easing:'easeInOutExpo'
        })
        loader.add({
            targets:'#logo',
            delay:0,
            scale:1.25,
            duration:500,
            easing:'easeInOutExpo'
        })
    }

    useEffect(()=>{
        const timeOut = setTimeout(()=>setIsMounted(true),10);
        animate();
        return()=>clearTimeout(timeOut)
    })

  return (
    <div className='flex h-screen justify-center items-center' ismounted='isMounted'>
      <img id='logo' width={100} height={100} src='/images/logo.jpeg'/>
    </div>
  )
}

export default SplashScreen
