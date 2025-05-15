import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/signup");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="font-semibold text-gray-800">Name: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600 capitalize">Role: {user.role}</p>
              <p className="text-gray-500 text-xs mt-2">ID: {user._id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
