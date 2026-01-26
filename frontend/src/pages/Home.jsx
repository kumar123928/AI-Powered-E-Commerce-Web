import React, { useEffect, useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Nav from '../component/Nav' 
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {
  let heroData=[
    {text1 : "30% OFF Limited offer", text2:"Style that "},
    {text1: "Discover the Best of Bold Fashion", text2:"Limited Time Only!"},
    {text1:"Explore Our Best Collection ", text2: "Shop Now"},
    {text1:"Choose your Perfect Fashion Fit", text2:"Now on Sale!"}
  ]

  let [heroCount, setHeroCount] =useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(preCount => (preCount === 3 ? 0 : preCount + 1))
    },3000)
    return ()=> clearInterval(interval)
  },[])

  return (
    <div className='overflow-x-hidden relative top-[70px ]'>
    <div className='w-[100vw] lg:h-[105vh] md:h-[50vh] sm:h-[40vh] bg-gradient-to-l from-[#141414] to-[#15373f]'>

      <Background heroCount={heroCount}/>
      <Hero 
      heroCount={heroCount}
      setHeroCount={setHeroCount}
      heroData={heroData[heroCount]}
      />

      {/* <Nav/> */}
      </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
      </div>
  )
}

export default Home