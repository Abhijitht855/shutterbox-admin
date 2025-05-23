
//orders.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { assets } from "../assets/assets";
// import { toast } from "react-toastify";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [courierModalOpen, setCourierModalOpen] = useState(false);
//   const [courierCompany, setCourierCompany] = useState("");
//   const [trackingCode, setTrackingCode] = useState("");
//   const [currentOrderId, setCurrentOrderId] = useState(null);
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:4000/api/order");
//       setOrders(res.data.reverse());
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleStatusChange = (orderId, newStatus) => {
//     if (newStatus === "dispatched") {
//       setCurrentOrderId(orderId);
//       setCourierModalOpen(true);
//     } else {
//       updateOrderStatus(orderId, newStatus);
//     }
//   };

//   const updateOrderStatus = async (orderId, status, courier = "", tracking = "") => {
//     try {
//       const payload = { order_status: status };
//       if (status === "dispatched") {
//         payload.courier_company = courier;
//         payload.tracking_code = tracking;
//       }

//       await axios.put(`http://localhost:4000/api/order/${orderId}`, payload);
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
//     <div className="max-w-6xl mx-auto">
//       <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Orders</h3>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading orders...</p>
//       ) : orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (

//         orders.map((order, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6"
//           >
//             <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
//               <img
//                 src={order.product_image || assets.parcel_icon}
//                 alt="product"
//                 className="w-16 h-16 object-contain"
//               />

//               <div className="flex-1">
//                 <p className="font-semibold text-base sm:text-lg mb-1">{order.product}</p>
//                 <p className="text-sm">Pages: {order.pages}</p>
//                 <p className="text-sm">Amount: ₹{order.amount}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
//               <div>
//                 <h4 className="font-semibold mb-1">Shipping Info</h4>
//                 <p><strong>Courier:</strong> {order.courier_company || "N/A"}</p>
//                 <p><strong>Tracking:</strong> {order.tracking_code || "N/A"}</p>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-1">Order Details</h4>
//                 <p><strong>Order ID:</strong> {order.order_id}</p>
//                 <p><strong>User ID:</strong> {order.user}</p>
//                 <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-2">Actions</h4>
//                 <select
//                   className="w-full border p-2 rounded mb-2"
//                   value={order.status}
//                   onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
//                 >
//                   <option value="placed">Placed</option>
//                   <option value="printing">Printing</option>
//                   <option value="dispatched">Dispatched</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//                 <button
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
//                   onClick={() => fetchUserDetails(order.user)}
//                 >
//                   View User Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {/* User Details Modal */}
//       {isModalOpen && selectedUser && (
//         <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center px-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
//             <h2 className="text-lg font-semibold mb-4">User Information</h2>
//             <div className="space-y-2 text-sm">
//               <p><strong>Name:</strong> {selectedUser.name}</p>
//               <p><strong>Email:</strong> {selectedUser.email}</p>
//               <p><strong>Phone:</strong> {selectedUser.phone}</p>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Courier Details Modal */}
//       {courierModalOpen && (
//         <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center px-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
//             <h2 className="text-lg font-semibold">Courier Details</h2>
//             <div>
//               <label className="block text-sm mb-1">Courier Company</label>
//               <input
//                 type="text"
//                 className="w-full border p-2 rounded"
//                 value={courierCompany}
//                 onChange={(e) => setCourierCompany(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm mb-1">Tracking Code</label>
//               <input
//                 type="text"
//                 className="w-full border p-2 rounded"
//                 value={trackingCode}
//                 onChange={(e) => setTrackingCode(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2 mt-4">
//               <button
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded"
//                 onClick={() => {
//                   updateOrderStatus(currentOrderId, "dispatched", courierCompany, trackingCode);
//                   setCourierModalOpen(false);
//                   setCourierCompany("");
//                   setTrackingCode("");
//                   setCurrentOrderId(null);
//                 }}
//               >
//                 Submit
//               </button>

//               <button
//                 className="flex-1 bg-gray-300 hover:bg-gray-400 text-black p-2 rounded"
//                 onClick={() => {
//                   setCourierModalOpen(false);
//                   setCourierCompany("");
//                   setTrackingCode("");
//                   setCurrentOrderId(null);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
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
import { useLocation } from "react-router-dom";

// Helper to extract query params
const useQuery = () => new URLSearchParams(useLocation().search);

const Orders = () => {
  const query = useQuery();
  const userId = query.get("user"); // ?user=<id>

  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courierModalOpen, setCourierModalOpen] = useState(false);
  const [courierCompany, setCourierCompany] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/order");
      const allOrders = res.data.reverse();
      const filteredOrders = userId
        ? allOrders.filter((order) => order.user === userId)
        : allOrders;
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === "dispatched") {
      setCurrentOrderId(orderId);
      setCourierModalOpen(true);
    } else {
      updateOrderStatus(orderId, newStatus);
    }
  };

  const updateOrderStatus = async (orderId, status, courier = "", tracking = "") => {
    try {
      const payload = { order_status: status };
      if (status === "dispatched") {
        payload.courier_company = courier;
        payload.tracking_code = tracking;
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
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        {userId ? `Orders for User ID: ${userId}` : "All Orders"}
      </h3>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <img
                src={order.product_image || assets.parcel_icon}
                alt="product"
                className="w-16 h-16 object-contain"
              />

              <div className="flex-1">
                <p className="font-semibold text-base sm:text-lg mb-1">{order.product}</p>
                <p className="text-sm">Pages: {order.pages}</p>
                <p className="text-sm">Amount: ₹{order.amount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Shipping Info</h4>
                <p><strong>Courier:</strong> {order.courier_company || "N/A"}</p>
                <p><strong>Tracking:</strong> {order.tracking_code || "N/A"}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Order Details</h4>
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>User ID:</strong> {order.user}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              </div>

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

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
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

      {/* Courier Details Modal */}
      {courierModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Courier Details</h2>
            <div>
              <label className="block text-sm mb-1">Courier Company</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={courierCompany}
                onChange={(e) => setCourierCompany(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tracking Code</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                onClick={() => {
                  updateOrderStatus(currentOrderId, "dispatched", courierCompany, trackingCode);
                  setCourierModalOpen(false);
                  setCourierCompany("");
                  setTrackingCode("");
                  setCurrentOrderId(null);
                }}
              >
                Submit
              </button>

              <button
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black p-2 rounded"
                onClick={() => {
                  setCourierModalOpen(false);
                  setCourierCompany("");
                  setTrackingCode("");
                  setCurrentOrderId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
