import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const FavoriteIcon= ({ productId }) => {
  const [fav, setFav] = useState(false);

  const addFavorite = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/favorite/add`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFav(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={addFavorite}>
      {fav ? <FaHeart color="red" /> : <FaRegHeart />}
    </div>
  );
};

export default FavoriteIcon;