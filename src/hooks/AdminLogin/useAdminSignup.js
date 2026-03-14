import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdminSignup = () => {
  const [fistName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.BACKEND_API_URL}/api/user/signup`,
        {
          fistName,
          lastName,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("User created successfully");

        navigate("/admin/dashboard");
      }

    } catch (error) {
      console.error("Signup Failed:", error);

      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setRole,
    handleSignup,
    loading,
    error,
  };
};

export default useAdminSignup;