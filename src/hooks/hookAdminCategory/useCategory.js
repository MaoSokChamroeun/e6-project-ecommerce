import axios from "axios";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const getAllCategory = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      if (!token) {
        console.log("Token not found");
        return;
      }

      const res = await axios.get("http://localhost:4000/api/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("Fetching Failed:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return { categories, loading, error, getAllCategory };
};

export default useCategory;