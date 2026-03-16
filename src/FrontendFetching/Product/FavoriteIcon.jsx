import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

const FavoriteIcon = ({ productId }) => {

  const [fav, setFav] = useState(false);
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

      if (exist) {
        setFav(true);
      }

    } catch (error) {
      console.log(error);
    }

  };

  // toggle favorite
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

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkFavorite();
  }, []);

  return (

    <div onClick={toggleFavorite} style={{ cursor: "pointer" }}>
      {fav ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
    </div>

  );

};

export default FavoriteIcon;