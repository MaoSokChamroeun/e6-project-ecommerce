import axios from "axios";
import { useCart } from "../../context/CardContext";

const useUserSignout = () => {
  const { clearCart } = useCart();

  const userSignout = async () => {

    try {
      const token = sessionStorage.getItem("token");

      if (token) {
        await axios.post(
          `${import.meta.env.BACKEND_API_URL}/api/user/client/signout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );
      }
    } catch (error) {
      console.log("Logout API failed:", error);
    }

    // 🔥 VERY IMPORTANT
    clearCart();

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("clientEmail");

     window.location.href = "/user/signin";
  };

  return { userSignout };
};

export default useUserSignout;