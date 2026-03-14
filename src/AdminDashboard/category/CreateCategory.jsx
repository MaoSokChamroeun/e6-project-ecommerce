import React from "react";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";
import useCreateCategory from "../../hooks/hookAdminCategory/useCreateCategory";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const {
    name,
    setName,
    slug,
    setSlug,
    status,
    setStatus,
    createCategory,
    loading,
  } = useCreateCategory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <AdminHero>
        <div className="w-full p-5 mx-auto mt-10">
          
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Category
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Add a new category for your products
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Name
                </label>

                <input
                  type="text"
                  placeholder="Example: Iphone"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(
                      "/category/" +
                        e.target.value.toLowerCase().replace(/\s+/g, "-")
                    );
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  <Link to={'/admin/dashboard/category'}>
                  Cancel
                  </Link>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow cursor-pointer"
                >
                  {loading ? "Creating..." : "Create Category"}
                </button>

              </div>

            </form>
          </div>
        </div>
      </AdminHero>
    </div>
  );
};

export default CreateCategory;