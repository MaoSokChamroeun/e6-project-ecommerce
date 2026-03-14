import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";

const UserOrder = () => {

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/order/client/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setOrders(res.data.data);
      }

    } catch (error) {

      console.log("Fetch orders failed", error);

    }

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getOrders();
  }, []);

  return (

    <Layout>

  <div className="max-w-7xl mx-auto p-8">

    <h2 className="text-3xl font-bold mb-8">
      My Orders
    </h2>

    {orders.length === 0 ? (

      <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow">
        You have no orders yet 🛒
      </div>

    ) : (

      <div className="space-y-8">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-6"
          >

            {/* ORDER HEADER */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4">

              <div>

                <p className="font-semibold text-gray-700">
                  Order ID
                </p>

                <p className="text-sm text-gray-500">
                  {order._id}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

              <div className="mt-4 md:mt-0 text-right">

                <p className="text-xl font-bold text-red-600">
                  ${order.totalAmount}
                </p>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>

              </div>

            </div>


            {/* ORDER ITEMS */}

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.product._id}
                  className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50"
                >

                  {/* Product Info */}

                  <div className="flex items-center gap-4">

                   <div className="w-[150px] h-[150px] flex flex-col">
                     <img
                      src={item.product.image?.[0]}
                      alt={item.product.name}
                      className="w-full h-auto object-cover rounded"
                    />
                   </div>

                    <div>

                      <p className="font-semibold">
                        {item.product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                  </div>

                  {/* Price */}

                  <div className="text-right  font-semibold">

                    ${item.product.price * item.quantity}

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    )}

  </div>

</Layout>

  );

};

export default UserOrder;