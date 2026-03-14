import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CardContext";
import Layout from "../layout/Layout";

const Payment = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart, getCart } = useCart();

  const orderId = location.state?.orderId;

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("fakepay");

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePay = async () => {

    try {

      setLoading(true);

      const token = sessionStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.BACKEND_API_URL}/api/payment`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {

        clearCart();
        await getCart();
        navigate("/product/payment/success");

      }

    } catch (error) {

      console.log(error.response?.data || error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <Layout>

      <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10">

        {/* LEFT: PAYMENT METHODS */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Select Payment Method
          </h2>

          <div className="space-y-4">

            <label className={`border p-4 rounded cursor-pointer flex items-center justify-between ${method === "fakepay" ? "border-blue-500 bg-blue-50" : ""}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={method === "fakepay"}
                  onChange={() => setMethod("fakepay")}
                />
                <span>FakePay (Test Payment)</span>
              </div>
              💳
            </label>

            <label className={`border p-4 rounded cursor-pointer flex items-center justify-between ${method === "cod" ? "border-blue-500 bg-blue-50" : ""}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <span>Cash On Delivery</span>
              </div>
              💵
            </label>

            <label className={`border p-4 rounded cursor-pointer flex items-center justify-between ${method === "khqr" ? "border-blue-500 bg-blue-50" : ""}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={method === "khqr"}
                  onChange={() => setMethod("khqr")}
                />
                <span>ABA KHQR</span>
              </div>
              📱
            </label>

          </div>

        </div>


        {/* RIGHT: ORDER SUMMARY */}

        <div className="bg-gray-50 p-6 rounded-lg shadow">

          <h2 className="text-xl font-bold mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              key={item.product._id}
              className="flex justify-between mb-3"
            >

              <span>
                {item.product.name} x {item.quantity}
              </span>

              <span>
                ${item.product.price * item.quantity}
              </span>

            </div>

          ))}

          <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">

            <span>Total</span>

            <span>${total}</span>

          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="bg-blue-600 cursor-pointer text-white w-full py-3 mt-6 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            🔒 Secure payment simulation
          </p>

        </div>

      </div>

    </Layout>

  );

};

export default Payment;