// import React from 'react'
// import Nav from '../components/Nav'
// import Sidebar from '../components/Sidebar'
// import { useState } from 'react'
// import { useContext } from 'react'
// import { AuthDataContext } from '../context/AuthContext'
// import axios from 'axios'
// import { useEffect } from 'react'

// function List() {
//   const [list, setList] = useState([]);
//   let { serverUrl } = useContext(AuthDataContext)


//   const fetchList = async () => {
//     try {

//       let result = await axios.delete(serverUrl + "/api/product/list", { withCredentials: true })


//       setList(result.data)
//       console.log(result.data)


//     } catch (error) {
//       console.log(error)

//     }
//   }

//   const removeList = async (id) => {
//     try {
//       let result = await axios.post(`${serverUrl}/api/product/remove/${id}`,{}, {withCredentials:true} )
//       if(result.data){
//         fetchList()
//       }
//       else{
//         console.log("Failed to remove Product")
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])
//   return (
//     <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]'>
//       <Nav />
//       <div className='w-[100%] h-[100%] flex items-center justify-start'>
//         <Sidebar />
//         <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px] '>
//           <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-[white]'>
//             All Listed Products
//           </div>
//           {
//             list?.length > 0 ?(
//               list.map(( item,index) => (
// <div className='w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[10px] md:gap-[30px] p-[10px] md:px-[30px]' key={index}>
//   <img src={item.images[0]} className='w-[30px] md:w-[120px] h-[90%] rounded-lg' alt="" />
  
// <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]'>

//   <div className=' w-[100%] md:text-[20px] text-[15px] text-[#3ab0b7]'>{item.name}</div>
//   <div className='md:text-[17px] text-[15px] text-[#bef3da]'> {item.category}</div>
// <div className='md:text-[17px] text-[15px] text-[#bef3da]'>Rs. {item.price}</div>
// </div>
// <div className='w-[10%] h-[100%] bg-transparent flex items-center justify-center'>
//   <span className='w-[30px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300' onClick={()=> removeList(item._id)}> X </span>
// </div>
// </div>
//               )
//             ))
//            : (
// <div className='text-[white] text-lg '>No Products available</div>
//             )
//           }
//         </div>
//       </div>

//     </div>
//   )
// }

// export default List



import React, { useState, useContext, useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";

function List() {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      console.log("FETCH LIST RESPONSE:", res);
      setList(res.data || []);
    } catch (err) {
      console.log("FETCH LIST ERROR:", err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeList = async (id) => {
    // optional confirmation
    // const ok = window.confirm("Are you sure you want to delete this product?");
    // if (!ok) return;

    try {
      // Use DELETE (not POST). axios.delete takes (url, config)
      const res = await axios.delete(`${serverUrl}/api/product/remove/${id}`, {
        withCredentials: true,
      });
      console.log("DELETE RESPONSE:", res);

      // if backend returns deleted document or success flag, check it
      if (res.status === 200) {
        // refresh the list
        fetchList();
      } else {
        console.log("Failed to remove product, server returned:", res.status, res.data);
      }
    } catch (err) {
      // axios error object contains useful info
      console.log("DELETE ERROR:", err);
      if (err.response) {
        console.log("Server responded:", err.response.status, err.response.data);
      } else if (err.request) {
        console.log("No response received, request:", err.request);
      } else {
        console.log("Error setting up request:", err.message);
      }
    }
  };

  return (
    <div className="w-[98.8vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="w-full h-full flex items-center justify-start">
        <Sidebar />
        <div className="w-[82%] h-full lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]">
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px]">
            All Listed Products
          </div>

          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className="w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[10px] md:gap-[30px] p-[10px] md:px-[30px]"
                key={item._id || index}
              >
                <img
                  src={item.images ? item.images[0] : item.image1}
                  className="w-[30px] md:w-[120px] h-[90%] rounded-lg object-cover"
                  alt=""
                />

                <div className="w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]">
                  <div className="w-[100%] md:text-[20px] text-[15px] text-[#3ab0b7]">
                    {item.name}
                  </div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]"> {item.category}</div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">Rs. {item.price}</div>
                </div>

                <div className="w-[10%] h-[100%] bg-transparent flex items-center justify-center">
                  <button
                    onClick={() => removeList(item._id)}
                    className="w-[30px] h-[30px] flex items-center justify-center rounded-md hover:bg-red-300 hover:text-black cursor-pointer text-red-300"
                    title="Delete product"
                  >
                    X
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg">No Products available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;

