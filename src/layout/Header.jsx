import React, { useEffect, useState } from "react";
import userUserSignout from "../User/hooks/useUserSignout";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";

const Header = () => {

  const { userSignout } = userUserSignout();
  const navigate = useNavigate();
  const { cart = [], getCart } = useCart();

  const [userClientEmail, setUserClientEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    const email = sessionStorage.getItem("clientEmail");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserClientEmail(email);

    const token = sessionStorage.getItem("token");

    if (token) {
      getCart();
    }

  }, []);

  const cartCount = cart?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (

    <header className="bg-white shadow-md px-6 py-4 max-w-7xl mx-auto">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          <Link to="/">E6TEAM</Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">

          {/* <Link to="/products" className="hover:text-blue-600">
            Products
          </Link> */}

          {/* Cart */}
          <Link to="/cart" className="relative">

            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}

          </Link>

          {userClientEmail ? (
            <>
              <Link to="/product/orders" className="hover:text-blue-600">
                My Orders
              </Link>

              <span className="text-sm text-gray-600">
                {userClientEmail}
              </span>

              <button
                onClick={userSignout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/user/signin")}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Sign In
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>


      {/* Mobile Navigation */}
      {menuOpen && (

        <div className="md:hidden mt-4 flex flex-col gap-4 border-t pt-4">

          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>

            <Link to="/cart" className="relative">

            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2  bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}

          </Link>

          {userClientEmail ? (
            <>
              <Link to="/product/orders" onClick={() => setMenuOpen(false)}>
                My Orders
              </Link>

              <span className="text-sm text-gray-600">
                {userClientEmail}
              </span>

              <button
                onClick={userSignout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/user/signin")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
          )}

        </div>

      )}

    </header>

  );

};

export default Header;