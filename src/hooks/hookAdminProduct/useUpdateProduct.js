import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateProduct = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const [image, setImage] = useState([]);     // new uploaded images
  const [oldImage, setOldImage] = useState([]); // existing images

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const updateProduct = async (id) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("status", status);

      // always send remaining old images
      if (oldImage && oldImage.length > 0) {
        formData.append("oldImage", JSON.stringify(oldImage));
      } else {
        formData.append("oldImage", JSON.stringify([]));
      }

      // send new uploaded images
      image.forEach((img) => {
        formData.append("image", img);
      });

      const res = await axios.put(
        `http://localhost:4000/api/product/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Product updated successfully");
        navigate("/admin/dashboard/product");
      }

    } catch (error) {
      console.error("Update product failed:", error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    updateProduct(id);
  };

  // remove new uploaded preview
  const removeImage = (index) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
  };

  // remove existing image
  const removeOldImage = (index) => {
    setOldImage((prev) => prev.filter((_, i) => i !== index));
  };

  // limit to 5 images
  const addImages = (files) => {
    const selected = Array.from(files);

    setImage((prev) => {
      const updated = [...prev, ...selected];
      return updated.slice(0, 5);
    });
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
    description,
    setDescription,
    status,
    setStatus,
    image,
    setImage,
    oldImage,
    setOldImage,
    removeImage,
    removeOldImage,
    addImages,
    loading,
    handleSubmit,
  };
};

export default useUpdateProduct;