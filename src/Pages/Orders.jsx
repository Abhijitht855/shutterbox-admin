// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import {backendURL, currency} from '../App' 
// import {toast} from 'react-toastify'
// import { assets } from '../assets/assets'

// const Orders = ({token}) => {

//   const [orders,setOrders]=useState([])

//   const fetchAllOrders=async()=>{
   
//     if (!token) {
//       return null
//     }

//     try {
//       const response = await axios.post(backendURL + '/api/order/list',{},{headers:{token}})
      

      
//       if(response.data.success){
//         setOrders(response.data.orders.reverse())
//       }else{
//         toast.error(response.data.message)
//       }
      
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const statusHandler=async (event,orderId)=>{
//     try {
//       const response = await axios.post(backendURL+ '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
//       if (response.data.success) {
//         await fetchAllOrders()
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(response.data.message)
      
//     }
//   }

//   useEffect(()=>{
//     fetchAllOrders()
//   },[token])

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {
//           orders.map((order,index)=>(
//             <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
//               <img className='w-12' src={assets.parcel_icon} alt="" />
//               <div>
//               <div>
//                 {order.items.map((item,index)=>{
//                   if (index === order.items.length - 1) {
//                     return <p className='p-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
//                   }
//                   else{
//                     return <p className='p-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
//                   }
//                 })}
//               </div>
//               <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
//               <div>
//                 <p>{order.address.street + ","}</p>
//                 <p>{order.address.city + ", " + order.address.state + ", " + order.address.country+ ", " + order.address.zipcode}</p>
//               </div>
//               <p>{order.address.phone}</p>
//             </div>
//             <div>
//               <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
//               <p className='mt-3'>Method: {order.paymentMethod}</p>
//               <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
//               <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
//             <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
//               <option value="Order Placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders

// import React from "react";
// import { assets } from "../assets/assets";

// const Orders = () => {
//   const dummyOrders = [
//     {
//       _id: "order1",
//       items: [
//         { name: "T-Shirt", quantity: 2, size: "M" },
//         { name: "Jeans", quantity: 1, size: "32" }
//       ],
//       address: {
//         firstName: "John",
//         lastName: "Doe",
//         street: "123 Street Name",
//         city: "CityName",
//         state: "StateName",
//         country: "Country",
//         zipcode: "123456",
//         phone: "9876543210"
//       },
//       paymentMethod: "Online",
//       payment: true,
//       amount: "1999",
//       status: "Shipped",
//       date: new Date().toISOString()
//     }
//   ];

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-4">Order Page</h3>
//       <div>
//         {dummyOrders.map((order, index) => (
//           <div
//             className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
//             key={index}
//           >
//             <img className="w-12" src={assets.parcel_icon} alt="parcel" />
//             <div>
//               <div>
//                 {order.items.map((item, idx) => (
//                   <p className="p-0.5" key={idx}>
//                     {item.name} X {item.quantity} <span>{item.size}</span>
//                   </p>
//                 ))}
//               </div>
//               <p className="mt-3 mb-2 font-medium">
//                 {order.address.firstName + " " + order.address.lastName}
//               </p>
//               <div>
//                 <p>{order.address.street},</p>
//                 <p>
//                   {order.address.city}, {order.address.state},{" "}
//                   {order.address.country}, {order.address.zipcode}
//                 </p>
//               </div>
//               <p>{order.address.phone}</p>
//             </div>
//             <div>
//               <p className="text-sm sm:text-[15px]">
//                 Items: {order.items.length}
//               </p>
//               <p className="mt-3">Method: {order.paymentMethod}</p>
//               <p>Payment: {order.payment ? "Done" : "Pending"}</p>
//               <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             <p className="text-sm sm:text-[15px]">₹{order.amount}</p>
//             <select
//               className="p-2 font-semibold"
//               value={order.status}
//               readOnly
//             >
//               <option value="Order Placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { assets } from "../assets/assets";
// import { toast } from "react-toastify"; // optional for feedback

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/order");
//       setOrders(res.data.reverse());
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const payload = { order_status: newStatus };

//       if (newStatus === "dispatched") {
//         payload.courier_company = prompt("Enter courier company:");
//         payload.tracking_code = prompt("Enter tracking code:");
//       }

//       await axios.put(
//         `http://localhost:4000/api/order/${orderId}`,
//         payload
//       );

//       toast.success("Order updated");
//       fetchOrders();
//     } catch (error) {
//       console.error("Failed to update order:", error);
//       toast.error("Failed to update order");
//     }
//   };

//   const fetchUserDetails = async (userId) => {
//     try {
//       const res = await axios.get(`http://localhost:4000/api/signup/${userId}`);
//       setSelectedUser(res.data);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch user details:", error);
//       toast.error("Failed to load user details");
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-4">Order Page</h3>
//       <div>
//         {orders.map((order, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
//           >
//             <img
//               className="w-12 object-contain"
//               src={order.product_image || assets.parcel_icon}
//               alt="product"
//             />

//             <div>
//               <p className="font-medium mb-1">{order.product}</p>
//               <p>Pages: {order.pages}</p>
//               <p className="mt-3 mb-2 font-medium">Shipping Info:</p>
//               <p>{order.courier_company || "N/A"}</p>
//               <p>{order.tracking_code || "N/A"}</p>
//             </div>

//             <div>
//               <p>Order ID: {order.order_id}</p>
//               <p>User ID: {order.user}</p>
//               <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//               <p>Payment: ₹{order.amount}</p>
//             </div>

//             <p className="text-sm sm:text-[15px] font-semibold">
//               ₹{order.amount}
//             </p>

//             <div>
//               <select
//                 className="p-2 font-semibold bg-white border"
//                 value={order.status}
//                 onChange={(e) =>
//                   handleStatusChange(order.order_id, e.target.value)
//                 }
//               >
//                 <option value="placed">placed</option>
//                 <option value="printing">printing</option>
//                 <option value="dispatched">dispatched</option>
//                 <option value="cancelled">cancelled</option>
//               </select>
//               <button
//                 onClick={() => fetchUserDetails(order.user)}
//                 className="mt-10 p-1 w-25 font-semibold bg-white border"
//               >
//                 User Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {isModalOpen && selectedUser && (
//         <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-xl">
//             <h2 className="text-lg font-semibold mb-4">User Information</h2>
//             <p><strong>Name:</strong> {selectedUser.name}</p>
//             <p><strong>Email:</strong> {selectedUser.email}</p>
//             <p><strong>Phone:</strong> {selectedUser.phone}</p>
//             {/* Add more fields as needed */}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/order");
      setOrders(res.data.reverse());
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const payload = { order_status: newStatus };

      if (newStatus === "dispatched") {
        payload.courier_company = prompt("Enter courier company:");
        payload.tracking_code = prompt("Enter tracking code:");
      }

      await axios.put(`http://localhost:4000/api/order/${orderId}`, payload);
      toast.success("Order updated");
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error("Failed to update order");
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/signup/${userId}`);
      setSelectedUser(res.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      toast.error("Failed to load user details");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              {/* Product image */}
              <img
                src={order.product_image || assets.parcel_icon}
                alt="product"
                className="w-16 h-16 object-contain "
              />

              {/* Product info */}
              <div className="flex-1">
                <p className="font-semibold text-base sm:text-lg mb-1">{order.product}</p>
                <p className="text-sm">Pages: {order.pages}</p>
                <p className="text-sm">Amount: ₹{order.amount}</p>
              </div>
            </div>

            {/* Grid section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
              {/* Shipping info */}
              <div>
                <h4 className="font-semibold mb-1">Shipping Info</h4>
                <p><strong>Courier:</strong> {order.courier_company || "N/A"}</p>
                <p><strong>Tracking:</strong> {order.tracking_code || "N/A"}</p>
              </div>

              {/* Order info */}
              <div>
                <h4 className="font-semibold mb-1">Order Details</h4>
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>User ID:</strong> {order.user}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Action buttons */}
              <div>
                <h4 className="font-semibold mb-2">Actions</h4>
                <select
                  className="w-full border p-2 rounded mb-2"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                >
                  <option value="placed">Placed</option>
                  <option value="printing">Printing</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                  onClick={() => fetchUserDetails(order.user)}
                >
                  View User Details
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              {/* Add more user fields as needed */}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
