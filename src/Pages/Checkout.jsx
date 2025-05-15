// import React from 'react'
// import { assets } from "../assets/assets";


// const Checkout = () => {

//   return (
//     <div>
//         <div>
//               <h3 className="text-lg font-semibold mb-4">Checkout Page</h3>
//               <div>

//                   <div
//                     className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"

//                   >
//                     <div>

//                         <p className="" >
//                           product_name <p>pages</p>
//                         </p>
//                         <p>total_amount</p>

//                     </div>

//                     <div>

//                       <p className=" mb-2 font-medium">
//                         firstName lastName
//                       </p>
//                       <div>
//                         <p>address,</p>
//                         <p>street,</p>
//                         <p>
//                         city, state,{" "}
//                         country, pincode
//                         </p>
//                       </div>
//                       <p>mail,phone</p>
//                     </div>




//                   </div>

//               </div>
//             </div>
//     </div>
//   )
// }

// export default Checkout
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/checkout');
      setCheckoutData((response.data || []).reverse());
    } catch (error) {
      toast.error('Failed to load checkout data');
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/signup/${userId}`);
      setSelectedUser(res.data);
      setIsModalOpen(true);
    } catch (error) {
      toast.error('Failed to load user details');
    }
  };

  return (
    <div className=" max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Checkout Page</h3>

      {checkoutData.length === 0 ? (
        <p className="text-gray-500 text-center">No checkout data found.</p>
      ) : (
        checkoutData.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-6 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Product Section */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Product</h4>
                <p><span className="font-medium">Name:</span> {item.product_name}</p>
                <p><span className="font-medium">Pages:</span> {item.pages}</p>
                <p><span className="font-medium">Total:</span> ₹{item.total_amount}</p>
              </div>

              {/* Shipping Section */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                <p><span className="font-medium">Name:</span> {item.first_name} {item.last_name}</p>
                <p><span className="font-medium">Address:</span> {item.address}, {item.street}</p>
                <p>{item.city}, {item.state}, {item.country} - {item.pincode}</p>
                <p><span className="font-medium">Email:</span> {item.email}</p>
                <p><span className="font-medium">Phone:</span> {item.phone}</p>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Additional Notes</h4>
              <p className="text-gray-700 break-words">{item.additional || 'N/A'}</p>
            </div>

            {/* User & Action */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-sm text-gray-600">User ID: {item.user}</p>
              <button
                onClick={() => fetchUserDetails(item.user)}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
              >
                View User Details
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
