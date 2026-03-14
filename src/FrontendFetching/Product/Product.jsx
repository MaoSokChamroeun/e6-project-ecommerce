import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ products }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  return (

    <div className="w-full py-10">

      {/* Product Grid */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {currentProducts?.map((p) => (

          <div
            key={p._id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden group"
          >

            {/* Product Image */}

            <div className="relative overflow-hidden">

              <div className="w-full h-[300px] flex justify-center flex-col p-4">
                <img
                  src={p.image?.[0]}
                  alt={p.name}
                  className="w-full h-auto object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

            </div>

            {/* Product Info */}

            <div className="p-4">

              <h3 className="font-semibold text-lg line-clamp-1">
                {p.name}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                {p.description}
              </p>

              <p className="text-red-600 font-bold text-xl mt-2">
                ${p.price}
              </p>

              <div className="flex gap-2 mt-4">

                <Link
                  to={`/product/detail/${p._id}`}
                  className="w-1/2 text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  View
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Pagination */}

      <div className="flex justify-center mt-10 gap-2 flex-wrap">

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            {index + 1}
          </button>

        ))}

      </div>

    </div>

  );

};

export default Product;