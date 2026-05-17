import { Link, useNavigate } from "react-router-dom";

import {
  Upload,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-black relative z-50">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-blue-500"
      >
        InterviewAI
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">

        {/* Resume Upload */}
        <Link
          to="/resume-upload"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl transition font-medium"
        >
          <Upload size={18} />

          Resume Upload
        </Link>

        {!token ? (
          <>

            {/* Login */}
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition px-4 py-2"
            >
              <LogIn size={18} />

              Login
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition font-medium"
            >
              <UserPlus size={18} />

              Get Started
            </Link>

          </>
        ) : (

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl transition font-medium"
          >
            <LogOut size={18} />

            Logout
          </button>

        )}

      </div>

    </nav>
  );
}

export default Navbar;