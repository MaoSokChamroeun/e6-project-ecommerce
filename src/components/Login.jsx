import React from "react";
import { Link } from "react-router-dom";
import useAdminLogin from "../hooks/AdminLogin/useAdminLogin";

const Login = () => {
  const { handleLogin, setEmail, setPassword, loading, error } = useAdminLogin();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-5xl w-full">
        <h1 className="text-center text-2xl font-bold mb-6">Admin Login</h1>

        <div
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          }}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden w-[500px] mx-auto"
        >
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Welcome Back
            </h2>

            <p className="mt-4 text-center text-gray-400">
              Sign in to continue
            </p>

            {/* FORM */}
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">

                {/* EMAIL */}
                <input
                  placeholder="Email address"
                  className="block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  autoComplete="email"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* PASSWORD */}
                <input
                  placeholder="Password"
                  className="mt-4 block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="text-red-400 text-sm text-center">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Don't have an account?</span>{" "}
            <Link
              to="/admin/signup"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;