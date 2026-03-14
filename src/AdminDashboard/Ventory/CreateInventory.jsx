import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";
import { useNavigate } from "react-router-dom";

const CreateInventory = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productId: "",
    type: "in",
    quantity: "",
    note: ""
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/product",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setProducts(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4000/api/inventory/stock-in",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {

        toast.success("Inventory added successfully 📦");

        navigate("/admin/dashboard/inventory");

        setForm({
          productId: "",
          type: "in",
          quantity: "",
          note: ""
        });

      }

    } catch (error) {
      toast.error("Failed to add inventory ❌");
      console.log(error);
    }
  };

  const selectedProduct = products.find(
    (p) => p._id === form.productId
  );

  return (
    <div className="flex min-h-screen bg-gray-200 w-full font-khmer">

      <Sidebar />

      <AdminHero>

        <div className="p-6 bg-gray-50 min-h-screen w-full">

          <div className="w-full mx-auto bg-white p-6 rounded-lg shadow">

            <h2 className="text-xl font-semibold mb-6">
              Add Inventory
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Product */}
              <div>
                <label className="block text-sm mb-1">
                  Product
                </label>

                <select
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select product</option>

                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}

                </select>

                {selectedProduct && (
                  <p className="text-sm text-gray-500 mt-1">
                    Current Stock: {selectedProduct.stock}
                  </p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm mb-1">
                  Type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="in">Stock In</option>
                  <option value="out">Stock Out</option>
                  <option value="adjustment">Adjustment</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm mb-1">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm mb-1">
                  Note
                </label>

                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows="3"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add Inventory
              </button>

            </form>

          </div>

        </div>

      </AdminHero>

    </div>
  );
};

export default CreateInventory;