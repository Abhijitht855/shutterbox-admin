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
import { assets } from "../assets/assets";

const Checkout = () => {
    const [checkoutData, setCheckoutData] = useState([]);

    useEffect(() => {
        fetchCheckoutData();
    }, []);

    const fetchCheckoutData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/checkout');
            const reversedData = (response.data || []).reverse(); // reverse the array
            setCheckoutData(reversedData);
        } catch (error) {
            toast.error("Failed to load checkout data");
        }
    };

    useEffect(() => {
        fetchCheckoutData();
    }, []);

    return (
        <div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Checkout Page</h3>
                <div>
                    {checkoutData.length === 0 ? (
                        <p>No checkout data found.</p>
                    ) : (
                        checkoutData.map((item, index) => (
                            <div
                                key={item._id || index}
                                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                            >
                                {/* Product Info */}
                                <div>
                                    <p className="font-semibold mb-2">{item.product_name}</p>
                                    <p>Pages: {item.pages}</p>
                                    <p>Total: ₹{item.total_amount}</p>
                                </div>

                                {/* Shipping Info */}
                                <div>
                                    <p className="mb-2 font-medium">
                                        {item.first_name} {item.last_name}
                                    </p>
                                    <div>
                                        <p>{item.address},</p>
                                        <p>{item.street},</p>
                                        <p>{item.city}, {item.state}, {item.country} - {item.pincode}</p>
                                    </div>
                                    <p>{item.email}, {item.phone}</p>
                                </div>
                                <div>
                                    <h1 className="font-semibold mb-2">Additional:</h1>
                                    <p className="break-words max-w-[300px]">
                                        {item.additional}
                                    </p>

                                </div>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
