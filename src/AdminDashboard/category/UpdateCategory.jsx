import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";
import useUpdateCategory from "../../hooks/hookAdminCategory/useUpdateCategory";
import axios from "axios";

const UpdateCategory = () => {
  const { id } = useParams();
  const {
    name,
    setName,
    slug,
    setSlug,
    status,
    setStatus,
    loading,
    handleSubmit,
  } = useUpdateCategory();
  // Load category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:4000/api/category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          const cat = res.data.data;
          setName(cat.name);
          setSlug(cat.slug);
          setStatus(cat.status);
        }
      } catch (error) {
        console.log("Fetch category failed:", error);
      }
    };

    fetchCategory();
  }, [id, setName, setSlug, setStatus]);

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <Sidebar />

      <AdminHero>
        <div className="w-full p-4 mx-auto mt-10">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Update Category
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Edit category information
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100">
            <form
              onSubmit={(e) => handleSubmit(e, id)}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(
                      "/category/" +
                        e.target.value.toLowerCase().replace(/\s+/g, "-")
                    );
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Link to={'/admin/dashboard/category'}>
                  Cancel
                  </Link>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {loading ? "Updating..." : "Update Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminHero>
    </div>
  );
};

export default UpdateCategory;