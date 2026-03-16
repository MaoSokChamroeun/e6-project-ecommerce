import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const FavoriteIcon = ({ productId }) => {
  const [fav, setFav] = useState(false);

  const addFavorite = async () => {
    try {
      const token = sessionStorage.getItem("token");

      console.log("PRODUCT ID:", productId);

      await axios.post(
        "http://localhost:4000/api/favorite/add",
        { productId }, // send directly
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
    <div onClick={addFavorite} style={{ cursor: "pointer" }}>
      {fav ? <FaHeart color="red" /> : <FaRegHeart />}
    </div>
  );
};

export default FavoriteIcon;