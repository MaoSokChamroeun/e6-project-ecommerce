import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

const FavoriteIcon = ({ productId }) => {

  const [fav, setFav] = useState(false);

  // Check if product is already favorite
  const checkFavorite = async () => {
    try {

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/favorite/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const exist = res.data.data.find(
        (item) => item.product._id === productId
      );

      setFav(!!exist);

    } catch (error) {
      console.log(error);
    }
  };

  // Toggle favorite
  const toggleFavorite = async () => {

    try {

      const token = sessionStorage.getItem("token");

      if (fav) {

        await axios.delete(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/favorite/remove/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFav(false);

      } else {

        await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/favorite/add`,
          { productId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFav(true);

      }

      // 🔥 notify header to update favorite count
      window.dispatchEvent(new Event("favoriteUpdated"));

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkFavorite();
  }, [productId]);

  return (
    <div
      onClick={toggleFavorite}
      style={{ cursor: "pointer" }}
      title="Toggle Favorite"
    >
      {fav ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
    </div>
  );
};

export default FavoriteIcon;