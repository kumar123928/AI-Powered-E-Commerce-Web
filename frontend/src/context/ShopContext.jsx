import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'

import { userDataContext } from './UserContext'

export const ShopDataContext = createContext()

function ShopContext({children}) {

  let [products, setProducts] = useState([])
  let [search, setSearch] = useState("")
  let [showSearch, setShowSearch] = useState(false)
  let {serverUrl} = useContext(AuthDataContext)

  let {userData} = useContext(userDataContext)

  let [cartItem, setCartItem] = useState({});
  let currency = "Rs.";
  let delivery_fee = 40;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      console.log(result.data)
      setProducts(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async (itemId, size) => {
if(!size){
  console.log("Select Product Size");
  return;
}
let cartData = structuredClone(cartItem); //clone the product

if(cartData[itemId]){
  if(cartData[itemId][size]){
    cartData[itemId][size] += 1;
  }else{
    cartData[itemId][size] = 1;
  }
}else{
  cartData[itemId] = {};
  cartData[itemId][size] = 1;
}


setCartItem(cartData);
console.log(cartData)
if(userData){
  try {
    let result = await axios.post(serverUrl + '/api/cart/add', {itemId, size},{withCredentials:true})
    console.log(result.data)
    
  } catch (error) {
    console.log(error)
  }
 
}
  }


  const getUserCart = async () => {
  try {
    const result = await axios.post(serverUrl + '/api/cart/get', {}, {withCredentials: true})
    setCartItem(result.data)
  } catch (error) {
    console.log(error)
    toast.error(error.message)

  }
}

const updateQuantity = async (itemId, size, quantity) => {
  let cartData = structuredClone(cartItem);
  cartData[itemId][size] = quantity
  setCartItem(cartData)

  if(userData){
    try {
      await axios.post(serverUrl + "/api/cart/update", {itemId, size, quantity}, {withCredentials:true})
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
  }
}
  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItem){
      for(const item in cartItem[items]){
        try{
          if(cartItem[items][item] > 0){
            totalCount += cartItem[items][item]
          }

        }catch(error){

        }
      }
    }
    return totalCount;
  }

const getCartAmount = () => {
  let totalAmount = 0; 
  for(const items in cartItem){
    let itemInfo = products.find((product) => product._id === items);
    for(const item in cartItem[items]){
      try {
        if(cartItem[items][item] > 0){
          totalAmount += itemInfo.price * cartItem[items][item]; 
        }
      } catch (error) {
        
      }
    }
  }
  return totalAmount;
}

  useEffect(()=>{
getProducts()
  },[])

  useEffect(() => {
    getUserCart()
  },[])



let value = {
  products, currency, delivery_fee, getProducts,search, setSearch, showSearch, setShowSearch, cartItem, addToCart, getCartCount, setCartItem, updateQuantity, getCartAmount
}

  return (
    <div>
<ShopDataContext.Provider value={value}>
  {children}
</ShopDataContext.Provider>
    </div>
  )
}

export default ShopContext 