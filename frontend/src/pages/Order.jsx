import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { ShopDataContext } from '../context/ShopContext'
import { AuthDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {

    let [orderData, setOrderData] = useState([])
    let {currency} = useContext(ShopDataContext)
    let {serverUrl} = useContext(AuthDataContext)

    const loadOrderData= async () => {
        try {
            const result = await axios.post(serverUrl + '/api/order/userorder', {}, {withCredentials:true})
            if(result.data){
                let allOrdersItem = []
                result.data.map((order) => {
                    order.items.map((item)=>{
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)

                    })
                
            })
            setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

//     const loadOrderData = async () => {
//   try {
//     const result = await axios.post(
//       serverUrl + '/api/order/userorder',
//       {},
//       { withCredentials: true }
//     )
// console.log("FIRST ORDER:", result.data[0])


//     if (result.data) {
//       let allOrdersItem = []

//       result.data.forEach((order) => {
//         order.items.forEach((item) => {
//           allOrdersItem.push({
//             ...item,                    // ✅ copy item
//             status: order.status,       // ✅ now safe
//             payment: order.payment,     // ✅ spelling fixed
//             paymentMethod: order.paymentMethod,
//             date: order.date,
//           })
//         })
//       })

//       setOrderData(allOrdersItem.reverse())
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }


    useEffect(() =>{
loadOrderData()
    },[])

  return (

    <div className='w-[97vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <div className='h-[8%] w-[100%] text-center mt-[80px] '>
            <Title text1={'MY'} text2={'ORDER'} />
        </div>
        <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
            {
orderData.map((item, index) =>{
    // console.log("STATUS:", item.status)
   return(
    <div key={index} className='w-[100%] h-[10%] border-t border-b'>
     <div className='w-[100%] h-[80%] flex items-center gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative ' >
        <img src={item.images?.[0]} alt="" className='w-[130px] h-[130px] rounded-md' />

        <div className='flex items-start justify-center flex-col gap-[5px]'>
            <p className=' md:text-[25px] text-[20px] text-[#f3f9fc]' >{item.name}</p>

            <div className='flex items-center gap-[8px] md:gap-[20px]'>
                <p className='md:text-[18px] text-[12px] text-[#aaf4e7] '>{currency}{item.price}</p>

                <p className='md:text-[18px] text-[12px] text-[#aaf4e7] '>Quantity: {item.quantity}</p>

                <p className='md:text-[18px] text-[12px] text-[#aaf4e7] '>Sizes: {item.size}</p>
            </div>

            <div className='flex items-center'>
                <p className='md:text-[18px] text-[12px] text-[#aaf4e7] '>Date:<span className='text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px] '>{new Date(item.date).toDateString()}</span></p>
            </div>
            <div className='felx items-start'>
                <p className='md:text-[16px] text-[12px] text-[#aaf4e7]'>Payment Method : {item.paymentMethod}</p>
            </div>

            <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]'>
                <div className='flex items-center gap-[5px] '>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='md:text-[17px] text-[10px] text-[#f3f9fc]'>{item.status} </p>
                </div>
            </div>

            <div className='absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]'>
                <button className='md:px-[15px] md:py-[7px] px-[5px] py-[3px] rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500' onClick={loadOrderData}>Track Order</button>
            </div>
        </div>
     </div>
     </div>
   )
})
            }
        </div>
    </div>
  )
}

export default Order