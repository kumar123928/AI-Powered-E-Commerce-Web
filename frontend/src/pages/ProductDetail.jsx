

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import { toast } from "react-toastify";


function ProductDetail() {
  let {productId} = useParams()
  let {products, currency,addToCart } = useContext(ShopDataContext)
  let [productData, setProductData] = useState(false)

   const [images, setImages] = useState([])
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [cartLoading, setCartLoading] = useState(false);

  const handleAddToCart = async () => {
  if (!size) {
    toast.error("Please select a size ❗");
    return;
  }

  try {
    setCartLoading(true);

    await addToCart(productData._id, size);

    toast.success("Item added to cart 🛒");
  } catch (error) {
    toast.error("Failed to add item");
  } finally {
    setCartLoading(false);
  }
};


  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productId){
        setProductData(item)
        console.log(productData)
        setImages(item.images)
      setImage(item.images[0])
      
      return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
toast.success("Toast is alive")
  }, [productId, products])

  return productData ? (
    <div>
<div className=' w-[99vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px] '>
  <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row'>
    <div className='lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap'>
      <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
        <img src={images[0]} alt="product" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(images[0])}/>
      </div>
      <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
        <img src={images[1]} alt="product" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(images[1])}/>
      </div>
      <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
        <img src={images[2]} alt="product" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(images[2])}/>
      </div>
      <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
        <img src={images[3]} alt="product" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(images[3])}/>
      </div>

    </div>
    <div className='lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
      <img src={image} alt="" className='w-[100%] lg:h-[100%] text-[30px] text-[white] text-center rounded-md object-fill' />
    </div>
  </div>

  <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px]'>
    <h1 className='text-[40px] font-semibold text-[aliceblue]'> {productData.name.toUpperCase()}</h1>
    <div className='flex items-center gap-1'>
      <FaStar className='text-[20px] fill-[#FFD700]'/>
       <FaStar className='text-[20px] fill-[#FFD700]'/>
        <FaStar className='text-[20px] fill-[#FFD700]'/>
         <FaStar className='text-[20px] fill-[#FFD700]'/>
          <FaStarHalfAlt className='text-[20px] fill-[#FFD700]'/>
          <p className='text-[18px] font-semibold pl-[5px] text-[white] '>(124)</p>
    </div>
    <p className='text-[30px] font-semibold pl-[5px] text-[white]'>{currency} {productData.price}</p>

    <p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white] '>{productData.description }</p>
    <div className='flex felx-col gap-[10px] my-[10px]'>
      <p className='text-[25px] font-semibold pl-[5px] text-[white]'>Select Size</p>
      <div className='flex gap-2'>
        {
          productData.sizes.map((item, index) => (
            <button key={index} className={`cursor-pointer border py-2 px-4 bg-slate-300 rounded-md
             ${item === size ? 'bg-black text-[#08508f] text-[20px] ' : ''}`} onClick={() => setSize(item)}>{item}</button>
          )) 
        }
      </div>
     
      
    </div>

      <button disabled={cartLoading} onClick={handleAddToCart}
       className='w-[180px] text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-[white] shadow-md shadow-black' >  {cartLoading ? (
    <>
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Adding...
    </>
  ) : (
    "Add To Cart"
  )} </button> 

       <div className='w-[90%] h-[1px] bg-slate-700'></div>
       <div className='w-[80%] text-[16px] text-[white]'>
        <p>100% Orignal Product</p>
        <p>Cash On Delivery is available on this product</p>
        <p>Easy return and exchange policy within 7 days</p>
       </div>
  </div>
</div>

<div className='w-[99vw] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col overflow-x-hidden'>
  <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
    <p className='border px-5 py-3 text-sm text-white'>Description</p>
    <p className='border px-5 py-3 text-sm text-white'>Review (124)</p>
  </div>
  <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
    <p className='w-[95%] h-[90%] flex items-center justify-center'>
      Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.</p>
  </div>
  <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
</div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default ProductDetail
