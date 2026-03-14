import axios from "axios";
import { useState } from "react";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (id, refresh) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Product deleted successfully");

        if (refresh) {
          refresh(); // reload product list
        }
      }
    } catch (error) {
      console.log("Delete product failed:", error);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, refresh) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      deleteProduct(id, refresh);
    }
  };

  return {
    handleDelete,
    loading,
  };
};

export default useDeleteProduct;