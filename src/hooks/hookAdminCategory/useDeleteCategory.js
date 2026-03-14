import axios from "axios";
import { useState } from "react";

const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);

  const deleteCategory = async (id, refresh) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Category deleted successfully");

        if (refresh) {
          refresh(); // reload categories
        }
      }
    } catch (error) {
      console.log("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, refresh) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id, refresh);
    }
  };

  return { handleDelete, loading };
};

export default useDeleteCategory;