import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../layout/Layout";
import { useCart } from "../../context/CardContext";

const ProductDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const getProduct = async () => {

    try {

      const res = await axios.get(
        `http://localhost:4000/api/product/client/public/${id}`
      );

      if (res.data.success) {
        setProduct(res.data.data);
        setMainImage(res.data.data.image?.[0]);
      }

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProduct();
  }, []);

  const handleAddToCart = async () => {

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/user/signin");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:4000/api/user/cart/add",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        addToCart(product);
      }

    } catch (error) {
      console.log(error);
    }

  };

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (

    <Layout>

      <div className="max-w-7xl mx-auto p-10 grid md:grid-cols-2 gap-12 h-screen justify-center mt-20">

        {/* IMAGE GALLERY */}

        <div>

          <div className="bg-white rounded-xl shadow p-4">

           <div className="w-full h-[300px] p-6 flex justify-center flex-col">
             <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[auto] object-cover rounded-lg"
            />
           </div>

          </div>

          {/* Thumbnails */}

          <div className="flex mt-4">

            {product.image?.map((img, index) => (

              <div className="w-full h-[150px]">
                <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className="w-[150px] shadow-md bg-white p-2 h-auto object-cover rounded cursor-pointer hover:border-blue-500"
              />
              </div>

            ))}

          </div>

        </div>


        {/* PRODUCT INFO */}

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          {/* Price */}

          <p className="text-3xl font-bold text-red-600 mb-4">
            ${product.price}
          </p>

          {/* Stock Badge */}

          <span className={`px-3 py-1 rounded-full text-sm ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

          {/* Description */}

          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* Category */}

          <p className="text-gray-500 mt-4">
            Category: <span className="font-medium">{product.category?.name}</span>
          </p>


          {/* ACTION BUTTONS */}

          <div className="flex gap-4 mt-8">

            <button
              onClick={handleAddToCart}
              className="bg-red-600 cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add To Cart
            </button>

           

          </div>

        </div>

      </div>

    </Layout>

  );

};

export default ProductDetail;