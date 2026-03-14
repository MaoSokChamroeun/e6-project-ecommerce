import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignupUser = () => {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.BACKEND_API_URL}/api/user/client/signup`,
        {
          username,
          email,
          password
        }
      );

      if (res.data.success) {
        const token = res.data.token;
        if (token) {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("clientEmail", email);
          navigate("/user/signin");
        }

      } else {
        alert(res.data.message || "Signup failed");
      }

    } catch (err) {

      console.error("SIGNUP ERROR:", err);
      alert(err.response?.data?.message || "Server error");

    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    email,
    password,
    setUserName,
    setEmail,
    setPassword,
    loading,
    handleSignup
  };

};

export default useSignupUser;