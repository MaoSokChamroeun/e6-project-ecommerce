import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCreateCategory = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const createCategory = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/category`,
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
        console.log("Category created:", res.data.data);
        // reset form
        setName("");
        setSlug("");
        setStatus("open");
        toast.success(res.data.message)
        navigate('/admin/dashboard/category')
      }
    } catch (error) {
      console.log("Create fails", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory();
  };

  return {
    name,
    setName,
    slug,
    setSlug,
    status,
    setStatus,
    createCategory,
    handleSubmit,
    loading,
  };
};

export default useCreateCategory;