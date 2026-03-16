import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

const FavoriteDetail = () => {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavorites = async () => {
    try {

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/favorite/my",
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
        `http://localhost:4000/api/favorite/remove/${productId}`,
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
        <div className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-2xl font-bold mb-6">
        ❤️ My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {favorites.map((item) => {

            const product = item.product;

            return (

              <div
                key={item._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />

                <h3 className="mt-3 font-semibold">
                  {product.name}
                </h3>

                <p className="text-blue-600 font-bold">
                  ${product.price}
                </p>

                <div className="flex gap-2 mt-3">

                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 text-center bg-blue-500 text-white py-1 rounded"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeFavorite(product._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Remove
                  </button>

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