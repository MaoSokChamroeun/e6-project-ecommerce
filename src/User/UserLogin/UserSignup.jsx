import { Link } from "react-router-dom";
import useSignupUser from "../hooks/useUserSignup";
import Layout from "../../layout/Layout";


const UserSignup = () => {

  const {
    username,
    email,
    password,
    setUserName,
    setEmail,
    setPassword,
    loading,
    handleSignup
  } = useSignupUser();

  return (
      <Layout>
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-[500px] shadow-xl rounded-xl p-8 bg-gray-900 text-white">

        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Sign up to get started
        </p>

        <form className="space-y-4" onSubmit={handleSignup}>

       

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-300">Last Name</label>
            <input
            value={username}
              onChange={(e) => setUserName(e.target.value)}
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
            value={email}
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
            value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

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
            to="/user/signin"
            className="text-indigo-400 hover:underline"
          >
            Signin
          </Link>
        </p>
      </div>
    </div>
      </Layout>
  );
};

export default UserSignup;