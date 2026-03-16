import React, { useEffect, useState } from "react";
import userUserSignout from "../User/hooks/useUserSignout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CardContext";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Header = () => {

  const { userSignout } = userUserSignout();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart = [], getCart } = useCart();

  const [userClientEmail, setUserClientEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const email = sessionStorage.getItem("clientEmail");
    setUserClientEmail(email);

    const token = sessionStorage.getItem("token");

    if (token) {
      getCart();
      // eslint-disable-next-line react-hooks/immutability
      getFavorites();
    }

  }, [location]);

  const getFavorites = async () => {
    try {

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/favorite/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFavorites(res.data.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  const cartCount = cart?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const favoriteCount = favorites?.length || 0;

  return (

    <header className="bg-white shadow-md px-6 py-4 max-w-7xl mx-auto">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          <Link to="/">E6TEAM</Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">

          {/* Favorite */}
          <Link to="/product/favorites" className="relative">
            <FaRegHeart />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
                {favoriteCount}
              </span>
            )}

          </Link>

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

          {/* Favorite */}
          <Link to="/product/favorites" onClick={() => setMenuOpen(false)} className="relative">

            <FaRegHeart />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {favoriteCount}
              </span>
            )}

          </Link>

          {/* Cart */}
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative">

            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 bg-red-500 text-white text-xs px-2 rounded-full">
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