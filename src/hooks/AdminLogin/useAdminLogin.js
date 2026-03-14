import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdminLogin = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        setLoading(true);
      
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/signin`, {
        email,
        password,
      });
      if (res.data.success) {
        setLoading(false)
        const token = res.data.token;
        if (token) {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userEmail", email);
          navigate("/admin/dashboard");
        } else {
          console.error("Token not found in response result");  
          alert("Login successful but token is missing!");
        }
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    setEmail ,
    setPassword,
    loading
  };
};

export default useAdminLogin;