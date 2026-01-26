import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/razorpay.jpg'
import { ShopDataContext } from '../context/ShopContext'
import { AuthDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from "react-toastify";

import { useNavigate } from 'react-router-dom'


function PlaceOrder() {

 let [method, setMethod] = useState('cod')
 let [loading, setLoading] = useState(false);
 let navigate = useNavigate()
const {cartItem, setCartItem, getCartAmount, delivery_fee, products}= useContext(ShopDataContext)
let {serverUrl} = useContext(AuthDataContext)
let [formData, setFormData] = useState({firstName:'',
  lastName:'',
  email:'',
  street:'',
  city:'',
  state:'',
  pincode:'',
  country:'',
  phone:''
})

const onChangeHandler = (e)=>{
  const name= e.target.name;
  const value = e.target.value;
  setFormData(data=> ({...data, [name]:value}))

}


const initPay = (order) =>{
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      console.log(response)
const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay', response,{withCredentials:true}) 
      if(data){
        toast.success("Payment successful 💸");
        navigate("/order")
        setCartItem({})
      }
    }
  };
  const rzp = new window.Razorpay(options)
      rzp.open()
}

const onSubmitHandler = async (e) => {
  e.preventDefault()
  setLoading(true);
  try {
    let orderItems = []
    for(const items in cartItem){
      for(const item in cartItem[items]){
        if(cartItem[items][item] > 0){
          const itemInfo = structuredClone(products.find(product => product._id === items))
          if(itemInfo){
            itemInfo.size = item
            itemInfo.quantity = cartItem[items][item]
            orderItems.push(itemInfo)
          }
        }
      }
    }
    let orderData = {
    address:formData,
    items:orderItems,
    amount:getCartAmount() + delivery_fee
    // paymentMethod: method
    }
    if (orderItems.length === 0) {
      toast.error("Cart is empty ");
      setLoading(false);
      return;
    }
    switch(method){
      case 'cod' :
        
      const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, {withCredentials:true}) 
      console.log(result.data )
if(result.data){
  toast.success("Order placed 🎉");
  setCartItem({})
  navigate("/order")
}else{
   toast.error("Order failed ❌");
  console.log(result.data.message)
}

      break;
    
case 'razorpay':
  const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, {withCredentials:true});
  console.log(resultRazorpay.data)
  if(resultRazorpay.data){
     toast.success("Redirecting to payment 💳");
    initPay(resultRazorpay.data)
  }

  break;


       default:
    break;

    }
   
  } catch (error) {
    toast.error("Something went wrong ❌");
    console.log(error)
  }finally{
    setLoading(false)
  }
}
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'> 
    <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>
      <form action="" onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>
        <div className='py-[10px] '>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

          <input type="text" placeholder='First name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='firstName' value={formData.firstName}/>

          <input type="text" placeholder='Last name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='lastName' value={formData.lastName}/>
        </div>

<div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

          <input type="email" placeholder='Email address' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='email' value={formData.email}/>
        </div>

<div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

          <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='street' value={formData.street}/>
        </div>

        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

          <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='city' value={formData.city}/>
           <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='state' value={formData.state}/>
        </div>

        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

          <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='pincode' value={formData.pincode}/>
           <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='country' value={formData.country}/>
        </div>

        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

          <input type="text" placeholder='Phone' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required onChange={onChangeHandler} name='phone' value={formData.phone}/>
        </div>

        <div>
          <button type='submit' 
          disabled={loading}
           className={`text-[18px]  cursor-pointer py-[10px] px-[50px] rounded-2xl text-[white] flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px] ${loading ? "bg-gray-500" : "bg-[#3bcee848]"}`} >  {loading ? "Placing Order..." : "PLACE ORDER"} </button>
        </div>

      </form>

       
    </div>
    <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] '>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>
          <CartTotal/>
          <div className='py-[10px] '>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
          </div>
          <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center ga-[50px]'>
<button onClick={() => setMethod('razorpay')} className={`w-[150px] h-[50px] rounded-sm mr-[3px] cursor-pointer ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm ' : ''} `}>
  <img src={razorpay} className='w-[100%] h-[100%] object-fill rounded-sm' alt="" />
</button>

            <button onClick={() => setMethod('cod')} className={`w-[150px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ml-[3px] cursor-pointer ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}>CASH ON DELIVERY </button>
          </div>
        </div>
       </div>
    </div>
  )
}

export default PlaceOrder 