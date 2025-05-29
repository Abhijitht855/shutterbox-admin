// import React from "react";
// import logo from "/src/assets/logo.png"



// const Navbar = ({ setToken }) => {
//   return (
//     <div className="flex justify-between items-center py-2 px-[4%]">
//       <img className='w-[max(10%,180px)]' src={logo} alt="" />

//       {/* <div>
//         <h1 className="text-[#2b2b2b] text-3xl font-bold tracking-widest sm:text-4xl">
//           Glamzy
//         </h1>
//         <span className="text-sm font-semibold text-gray-500 ml-2">Admin panel</span>
//       </div> */}

//       <button
//         onClick={() => setToken("")}
//         className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Navbar;


import React from "react";
import logo from "/src/assets/logo.png"



const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center py-2 px-[4%]">
      <img className='w-[max(10%,180px)]' src={logo} alt="" />

      {/* <div>
        <h1 className="text-[#2b2b2b] text-3xl font-bold tracking-widest sm:text-4xl">
          Glamzy
        </h1>
        <span className="text-sm font-semibold text-gray-500 ml-2">Admin panel</span>
      </div> */}

      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
