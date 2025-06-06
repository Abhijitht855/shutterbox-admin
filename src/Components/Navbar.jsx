import React from "react";
import logo from "/src/assets/logo.png";

const Navbar = ({ setToken }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-2 px-[4%] bg-white shadow-md border-b-2 border-black">
      <img className="w-[max(10%,180px)]" src={logo} alt="Logo" />

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
