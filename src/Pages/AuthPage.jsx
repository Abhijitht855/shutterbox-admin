import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ import

const AuthPage = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ for redirect

  // ✅ Redirect if token and role = Admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "Admin") {
      navigate("/add"); // or your dashboard route
    }
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      let res;

      if (isLogin) {
        // LOGIN API
        res = await axios.post("http://localhost:4000/api/login", {
          email,
          password,
        });

        const user = res.data.user;

        if (user.role !== "Admin") {
          toast.error("Access denied: You are not an admin.");
          return;
        }

        const token = res.data.token;

        // ✅ Save token and role to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        setToken(token);
        toast.success("Login successful!");
        navigate("/add"); // ✅ redirect after login
      } else {
        // SIGNUP API
        res = await axios.post("http://localhost:4000/api/signup", {
          name,
          email,
          password,
        });

        const token = res.data.token;
        const user = res.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        setToken(token);
        toast.success("Signup successful!");
        navigate("/add"); // ✅ redirect after signup
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mb-4"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg mb-6"
          />

          <button
            type="submit"
            className={`w-full ${isLogin ? "bg-green-600" : "bg-blue-600"
              } text-white p-3 rounded-lg hover:opacity-90 transition`}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
