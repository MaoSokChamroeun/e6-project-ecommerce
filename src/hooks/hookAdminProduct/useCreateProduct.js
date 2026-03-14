import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description , setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const createProduct = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("status", status);
      formData.append("description" , description)
      image.forEach((img) => {
      formData.append("image", img);
    });

      const res = await axios.post(
        `${import.meta.env.BACKEND_API_URL}/api/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        alert("Product created successfully");

        setName("");
        setPrice("");
        setStock("");
        setCategory("");
        setDescription("")
        setStatus("active");
        setImage(null);
        navigate('/admin/dashboard/product')
      }
    } catch (error) {
      console.log("Create product failed:", error);
      alert("Create product failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct();
  };

  const removeImage = (index) => {
  setImage((prev) => prev.filter((_, i) => i !== index));
};

  return {
    name,
    setName,
    price,
    setPrice,
    stock,
    setStock,
    category,
    setCategory,
    status,
    setStatus,
    description,
    setDescription,
    image,
    setImage,
    loading,
    handleSubmit,
    removeImage
  };
};

export default useCreateProduct;