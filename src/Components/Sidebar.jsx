// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Sidebar = () => {
//     return (
//         <div className='w-[18%] min-h-screen border-r-2'>
//             <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/category">
//                     <img className='w-5 h-5' src={assets.add_icon} alt="" />
//                     <p className='hidden md:block'>Category</p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
//                     <img className='w-5 h-5' src={assets.add_icon} alt="" />
//                     <p className='hidden md:block'>Add Items</p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/checkout">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>Checkout</p>
//                 </NavLink>


//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>Orders</p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/user">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>User List </p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>List Items</p>
//                 </NavLink>
//             </div>
//         </div>
//     )
// }

// export default Sidebar

//Sidebar.jsx

// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Sidebar = () => {
//     return (
//         <div className='w-[18%] min-h-screen border-r-2'>
//             <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/category">
//                     <img className='w-5 h-5' src={assets.add_icon} alt="" />
//                     <p className='hidden md:block'>Category</p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
//                     <img className='w-5 h-5' src={assets.add_icon} alt="" />
//                     <p className='hidden md:block'>Add Items</p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/checkout">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>Checkout</p>
//                 </NavLink>


//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>Orders</p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/user">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>User List </p>
//                 </NavLink>

//                 <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
//                     <img className='w-5 h-5' src={assets.order_icon} alt="" />
//                     <p className='hidden md:block'>List Items</p>
//                 </NavLink>
//             </div>
//         </div>
//     )
// }

// export default Sidebar


import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="fixed top-[56px] left-0 bottom-0 w-[18%] bg-white border-r border-black shadow-sm overflow-auto">
      <div className="flex flex-col gap-3 pt-6 pl-[20%] text-[15px] text-gray-800">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-lg transition-colors duration-200 border border-r-0 ${
              isActive
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "hover:bg-gray-100"
            }`
          }
          to="/category"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Category" />
          <p className="hidden md:block font-semibold">Category</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-lg transition-colors duration-200 border border-r-0 ${
              isActive
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "hover:bg-gray-100"
            }`
          }
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Items" />
          <p className="hidden md:block font-semibold">Add Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-lg transition-colors duration-200 border border-r-0 ${
              isActive
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "hover:bg-gray-100"
            }`
          }
          to="/checkout"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Checkout" />
          <p className="hidden md:block font-semibold">Checkout</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-lg transition-colors duration-200 border border-r-0 ${
              isActive
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "hover:bg-gray-100"
            }`
          }
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
          <p className="hidden md:block font-semibold">Orders</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-l-lg transition-colors duration-200 border border-r-0 ${
              isActive
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "hover:bg-gray-100"
            }`
          }
          to="/user"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="User List" />
          <p className="hidden md:block font-semibold">User List</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;