// src/pages/Login.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { saveToken } from "../utils/token";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await loginUser({
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", response);

      saveToken(response.token);

      navigate("/dashboard");

    } catch (error) {

      console.error("LOGIN FAILED:", error);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full" />

      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6 border-b border-white/10">

        <h1 className="text-4xl font-bold text-blue-500">
          InterviewAI
        </h1>

        <div className="flex items-center gap-5">

          <button className="text-lg hover:text-blue-400 transition-all">
            Login
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-xl font-semibold">
            Get Started
          </button>

        </div>

      </nav>

      {/* Login Section */}
      <div className="relative z-10 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">

          <h1 className="text-6xl font-bold mb-4">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-lg mb-10">
            Login to continue your interview preparation
          </p>

          <div className="space-y-7">

            {/* Email */}
            <div>

              <label className="block mb-3 text-gray-300 text-lg">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-all"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block mb-3 text-gray-300 text-lg">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-all"
              />

            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all rounded-2xl py-4 text-xl font-semibold shadow-lg shadow-blue-600/20"
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;