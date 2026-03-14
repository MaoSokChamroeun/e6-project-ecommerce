import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAdminLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.post(
        `http://localhost:4000/api/user/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, 
        }
      );

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("admin");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data || error.message
      );
      sessionStorage.clear();
      navigate("/admin/login", { replace: true });
    }
  };

  return { logout };
};

export default useAdminLogout;
