import React, { useState } from "react";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";
import useProduct from "../../hooks/hookAdminProduct/useProduct";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import useDeleteProduct from "../../hooks/hookAdminProduct/useDeleteProduct";

const ShowProduct = () => {

  const { products, loading, getProducts } = useProduct();
  const { handleDelete } = useDeleteProduct();

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (

    <div className="flex w-full">

      <Sidebar />

      <AdminHero>

        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full p-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Product Management
              </h1>
              <p className="text-sm text-gray-500">
                List Of All Products
              </p>
            </div>

            <Link
              to="/admin/dashboard/product/create"
              className="bg-blue-600 hover:bg-slate-700 text-white px-5 py-3 rounded-lg shadow-md"
            >
              Create Product
            </Link>

          </div>


          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">#</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Stock</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Description</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="p-4 text-sm font-semibold text-center text-gray-600">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {loading && <Loading />}

                {currentProducts.map((product, index) => (

                  <tr key={product._id} className="hover:bg-gray-50">

                    <td className="p-4 text-sm text-gray-500">
                      #{startIndex + index + 1}
                    </td>

                    <td className="p-4">
                      {product?.image?.length > 0 ? (
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No Image
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-sm font-medium text-gray-800">
                      {product.name}
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {product.category?.name || "N/A"}
                    </td>

                    <td className="p-4 text-sm text-gray-600">
                      ${product.price}
                    </td>

                    <td className="p-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} In Stock`
                          : "Out Stock"}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-gray-800 line-clamp-2 max-w-xs">
                      {product.description}
                    </td>

                    <td className="p-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status === "active" ? "Active" : "Closed"}
                      </span>
                    </td>

                    <td className="p-4 text-sm">

                      <div className="flex justify-center gap-2">

                        <Link
                          to={`/admin/dashboard/product/update/${product._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          ✏️
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id, getProducts)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          🗑
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>

            ))}

          </div>

        </div>

      </AdminHero>

    </div>

  );

};

export default ShowProduct;