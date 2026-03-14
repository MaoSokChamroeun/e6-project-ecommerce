import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const PaymentSuccess = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId;

  return (
    <Layout>

      <div className="min-h-[70vh] flex items-center justify-center p-6">

        <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center">

          <div className="text-green-500 text-6xl mb-4">
            ✅
          </div>

          <h1 className="text-3xl font-bold mb-3">
            Payment Successful
          </h1>

          <p className="text-gray-500 mb-6">
            Thank you for your purchase.
          </p>

          {orderId && (
            <div className="bg-gray-100 p-4 rounded mb-6">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-bold text-lg">{orderId}</p>
            </div>
          )}

          <div className="flex gap-4 justify-center">

            <button
              onClick={() => navigate("/product/orders")}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              View Orders
            </button>

            <button
              onClick={() => navigate("/products")}
              className="border px-6 py-3 rounded hover:bg-gray-100"
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>

    </Layout>
  );

};

export default PaymentSuccess;