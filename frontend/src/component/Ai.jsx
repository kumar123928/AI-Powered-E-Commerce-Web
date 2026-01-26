import React, { useContext, useState } from "react";
import ai from "../assets/ai.jpg"
import {ShopDataContext} from '../context/ShopContext'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

function Ai(){
let {showSearch, setShowSearch} = useContext(ShopDataContext)
let navigate = useNavigate()
let [activeAi, setActiveAi] = useState(false)

function speak(message){
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
}

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition =new speechRecognition()
if(!recognition){
    console.log("not supported")
}

recognition.onresult = (e) => {
   const transcript = e.results[0][0].transcript.trim();
   if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
    speak("opening search")
    setShowSearch(true)
    navigate("/collection")
   }
   else if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch){
    speak("closing search")
    setShowSearch(false)
   }
   else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")){
    speak("opening collection page")
    navigate("/collection")
   }
   else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")){
    speak("opening about page")
    navigate("/about")
    setShowSearch(false)
   }
   else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage") ){
    speak("opening home page")
    navigate("/")
    setShowSearch(false)
   }
   else if(transcript.toLowerCase().includes("my cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("open cart") ||  transcript.toLowerCase().includes("cart")){
    speak("opening your cart")
    navigate("/cart")
    setShowSearch(false)
   }
   else if(transcript.toLowerCase().includes("contact")){
    speak("opening contact page")
    navigate("/contact")
    setShowSearch(false)
   }
   else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")){
    speak("opening your orders page")
    navigate("/order")
    setShowSearch(false)
   }
   else{
    toast.error("Try Again")
   }
}
recognition.onend=()=>{
    setActiveAi(false)
}
    return(
        <div className="fixed lg:bottom-[40px] md:bottom-[40px] bottom-[80px] letf-[5%] ml-[13px]" onClick={()=>{recognition.start();
            setActiveAi(true);
        }}>

            <img src={ai} alt="" className={`
    w-[140px] cursor-pointer rounded-full
    transition-all duration-300
    ${activeAi
      ? "scale-125 translate-x-[10%] translate-y-[-10%] drop-shadow-[0_0_30px_#00d2fc]"
      : "scale-100 drop-shadow-[0_0_20px_black]"
    }
  `}/>
        </div>
    )
}

export default Ai