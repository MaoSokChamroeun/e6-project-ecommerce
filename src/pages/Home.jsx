import React, { useEffect, useState } from "react";
import Product from "../FrontendFetching/Product/Product";
import Layout from "../layout/Layout";
import axios from "axios";

const Home = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const getCategories = async () => {
    try {

      const res = await axios.get(
        "http://localhost:4000/api/category/public"
      );

      if (res.data.success) {
        setCategories(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {

      const res = await axios.get(
        "http://localhost:4000/api/product/client/public"
      );

      if (res.data.success) {
        setProducts(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const getProductsByCategory = async (slug) => {
    try {

      const res = await axios.get(
        `http://localhost:4000/api/product/products/category/${slug}`
      );

      if (res.data.success) {
        setProducts(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategories();
    getAllProducts();
  }, []);

  const handleCategoryChange = (e) => {

    const slug = e.target.value;
    setSelectedCategory(slug);

    if (slug === "") {
      getAllProducts();
    } else {
      getProductsByCategory(slug);
    }

  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <Layout>

      <div className="bg-gray-50 min-h-screen">

        {/* HERO SECTION */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 text-center">

          <h1 className="text-5xl font-bold mb-4">
            E6 TEAM Online Store
          </h1>

          <p className="text-lg opacity-90 mb-6">
            Discover the best products with amazing prices
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: 500, behavior: "smooth" })
            }
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Shop Now
          </button>

        </div>


        {/* FILTER SECTION */}

        <div className="max-w-7xl mx-auto p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            {/* SEARCH BAR */}

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-3 rounded-lg w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* CATEGORY FILTER */}

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                All Categories
              </option>

              {categories.map((cat) => {

                const slug = cat.slug.replace("/category/", "");

                return (
                  <option key={cat._id} value={slug}>
                    {cat.name}
                  </option>
                );

              })}

            </select>

          </div>


          {/* PRODUCT SECTION */}

          <h2 className="text-2xl font-bold mb-6">
            Featured Products
          </h2>

          <Product products={filteredProducts} />

        </div>

      </div>

    </Layout>

  );

};

export default Home;