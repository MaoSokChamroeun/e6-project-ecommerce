import React from "react";
import { Link } from "react-router-dom";
import useAdminSignup from "../hooks/AdminLogin/useAdminSignup";

const Signup = () => {
  const {
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setRole,
    handleSignup,
    loading,
    error,
  } = useAdminSignup();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-[500px] shadow-xl rounded-xl p-8 bg-gray-900 text-white">

        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Sign up to get started
        </p>

        <form className="space-y-4" onSubmit={handleSignup}>

          {/* First Name */}
          <div>
            <label className="text-sm text-gray-300">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Enter first name"
              className="w-full mt-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-300">Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Enter last name"
              className="w-full mt-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-300">Role</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;