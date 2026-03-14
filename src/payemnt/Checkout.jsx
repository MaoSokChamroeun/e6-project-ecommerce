import React, { useState } from "react";


import axios from "axios";
import { useCart } from "../context/CardContext";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const { cart } = useCart();
const navigate = useNavigate()
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("fakepay");

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

const handleCheckout = async () => {

  try {

    const token = sessionStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/order/create`,
      {
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        address,
        phone,
        paymentMethod
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data.success) {

      const orderId = res.data.data._id;

      navigate("/product/payment", {
        state: { orderId }
      });

    }

  } catch (error) {

    console.log(error.response?.data || error);

  }

};

  return (

    <Layout>

      <div className="max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10">

        {/* LEFT: SHIPPING */}
        <div>

          <h2 className="text-2xl font-bold mb-6">
            Shipping Information
          </h2>

          <input
            type="text"
            placeholder="Phone Number"
            className="border p-3 w-full mb-4 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Shipping Address"
            className="border p-3 w-full mb-4 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <h3 className="font-semibold mt-6 mb-2">
            Payment Method
          </h3>

          <div className="space-y-2">

            <label className="flex gap-2">
              <input
                type="radio"
                checked={paymentMethod === "fakepay"}
                onChange={() => setPaymentMethod("fakepay")}
              />
              FakePay
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash On Delivery
            </label>

          </div>

        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-gray-50 p-6 rounded-lg">

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

          <div className="border-t pt-4 mt-4 flex justify-between font-bold">

            <span>Total</span>

            <span>${total}</span>

          </div>

          <button
            onClick={handleCheckout}
            className="bg-blue-600 cursor-pointer text-white w-full py-3 mt-6 rounded hover:bg-blue-700"
          >
            Place Order
          </button>

        </div>

      </div>

    </Layout>

  );

};

export default Checkout;