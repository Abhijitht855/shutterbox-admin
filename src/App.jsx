// import React from 'react'
// import Navbar from './Components/Navbar'
// import Slidebar from './Components/Slidebar'
// import Add from './Pages/Add'
// import List from './Pages/List'
// import Orders from './Pages/Orders'
// import { Route, Routes } from 'react-router-dom'





// const App = () => {
//   return (
//     <div>
//       <Navbar/>
//       <Slidebar/>
//       <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
//               <Routes>
//                 <Route path="/add" element={<Add/>} />
//                 <Route path="/list" element={<List/>} />
//                 <Route path="/orders" element={<Orders/>} />
//               </Routes> 
//             </div>
//     </div>
//   )
// }

// export default App


import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import Category from "./Pages/Category";
import Checkout from "./Pages/Checkout";
import User from "./Pages/User";
// import Login from "./Components/Login";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const backendURL=import.meta.env.VITE_BACKEND_URL
// export const currency = '₹'

const App = () => {
  // const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  // useEffect(()=>{
  //   localStorage.setItem('token',token)
  // },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <ToastContainer/> */}
       
        {/* <Login/> */}
       
        <div>
          <Navbar/>
          <hr />
          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add/>} />
                <Route path="/list" element={<List/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path="/category" element={<Category/>} />
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/user" element={<User/>} />

              </Routes> 
            </div>
          </div>
        </div>
      

        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
