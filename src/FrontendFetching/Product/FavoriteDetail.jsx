import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteDetail = () => {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const removeFavorite = async (productId) => {
    try {

      const token = sessionStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/favorite/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // update UI after removing
      setFavorites((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFavorites();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">
        Loading favorites...
      </div>
    );
  }

  return (

    <Layout>
  <div className="max-w-7xl mx-auto px-6 py-10">

    {/* Page Title */}
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
         My Favorite Products
      </h1>

      <span className="text-sm text-gray-500">
        {favorites.length} items
      </span>
    </div>

    {favorites.length === 0 ? (

      <div className="text-center py-20">

        <h2 className="text-xl font-semibold text-gray-600 mb-3">
          Your wishlist is empty
        </h2>

        <p className="text-gray-400 mb-6">
          Start adding products you love 
        </p>

        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>

      </div>

    ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {favorites.map((item) => {

          const product = item.product;

          return (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden group"
            >

              {/* Image */}
              <div className="relative">

                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Favorite badge */}
                <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                  <FaHeart className="text-red-500" />
                </div>

              </div>

              {/* Content */}
              <div className="p-4">

                <h3 className="font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-lg font-bold text-blue-600 mt-2">
                  ${product.price}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">

                  <Link
                    to={`/product/detail/${product._id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeFavorite(product._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    )}

  </div>
</Layout>   

  );

};

export default FavoriteDetail;