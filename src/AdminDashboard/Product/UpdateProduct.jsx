import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";
import axios from "axios";
import useUpdateProduct from "../../hooks/hookAdminProduct/useUpdateProduct";

const UpdateProduct = () => {
  const { id } = useParams();

  const {
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
    handleSubmit,
    loading,
  } = useUpdateProduct();

  const [categories, setCategories] = useState([]);

  // Load categories
  const getCategories = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get("http://localhost:4000/api/category", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("Fetch categories failed:", error);
    }
  };

  // Load product
  const getProduct = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(`http://localhost:4000/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const product = res.data.data;

        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setCategory(product.category?._id || "");
        setStatus(product.status);
        setDescription(product.description);

        // IMPORTANT
        setOldImage(product.image || []);
      }
    } catch (error) {
      console.log("Fetch product failed:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategories();
    getProduct();
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar />

      <AdminHero>
        <div className="w-full mx-auto bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Update Product
          </h2>

          <form onSubmit={(e) => handleSubmit(e, id)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="active">Active</option>
                <option value="close">Close</option>
              </select>
            </div>

            {/* Upload New Images */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Upload Images
              </label>

              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImage((prev) => [...prev, ...files]);
                }}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Old Images */}
            {image.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {image.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    className="w-24 h-24 object-cover rounded"
                    alt="preview"
                  />
                ))}
              </div>
            )}

            {/* Old images */}
            {oldImage?.length > 0 && image.length === 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {oldImage.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      className="w-24 h-24 object-cover rounded"
                      alt="product"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setOldImage((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"
                    >
                      ✕
                    </button>

                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Link
                to="/admin/dashboard/product"
                className="px-5 py-2 rounded-lg border"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </AdminHero>
    </div>
  );
};

export default UpdateProduct;
