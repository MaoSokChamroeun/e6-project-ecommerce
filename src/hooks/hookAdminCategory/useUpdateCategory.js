import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const updateCategory = async (id) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:4000/api/category/${id}`,
        {
          name,
          slug,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        console.log("Category updated:", res.data.data);
        navigate('/admin/dashboard/category')
      }
    } catch (error) {
      console.log("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    updateCategory(id);
  };

  return {
    name,
    setName,
    slug,
    setSlug,
    status,
    setStatus,
    loading,
    updateCategory,
    handleSubmit,
  };
};

export default useUpdateCategory;