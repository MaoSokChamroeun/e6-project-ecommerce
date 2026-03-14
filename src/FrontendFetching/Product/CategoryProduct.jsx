import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import Product from "../../FrontendFetching/Product/Product";

const CategoryProduct = ({ categorySlug }) => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {

      const res = await axios.get(
        `http://localhost:4000/api/product/products/category/${categorySlug}`
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
    getProducts();
  }, [categorySlug]);

  return (
    <Layout>
      <div className="p-10">
        <Product products={products} />
      </div>
    </Layout>
  );
};

export default CategoryProduct;