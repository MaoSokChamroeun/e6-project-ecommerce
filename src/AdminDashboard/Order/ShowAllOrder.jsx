import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";

const ShowAllOrders = () => {

  const [orders, setOrders] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const getAllOrders = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setOrders(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAllOrders();
  }, []);

  // pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (

    <div className="flex w-full">

      <Sidebar />

      <AdminHero>

        <div className="max-w-7xl mx-auto p-8">

          <h2 className="text-3xl font-bold mb-8">
            All User Orders
          </h2>

          {orders.length === 0 ? (

            <div className="text-gray-500 text-center">
              No orders found
            </div>

          ) : (

            <>
              <div className="space-y-8">

                {currentOrders.map((order) => (

                  <div
                    key={order._id}
                    className="bg-white shadow-lg rounded-xl p-6"
                  >

                    {/* Order Header */}

                    <div className="flex justify-between border-b pb-4 mb-4">

                      <div>

                        <p className="font-semibold text-gray-700">
                          User Email
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.user?.email}
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="font-bold text-blue-600 text-xl">
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

                    {/* Products */}

                    <div className="space-y-4">

                      {order.items.map((item) => (

                        <div
                          key={item.product._id}
                          className="flex justify-between items-center border p-3 rounded-lg"
                        >

                          <div className="flex items-center gap-4">

                            <img
                              src={item.product.image?.[0]}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />

                            <div>

                              <p className="font-semibold">
                                {item.product.name}
                              </p>

                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>

                            </div>

                          </div>

                          <div className="font-semibold">
                            ${item.product.price * item.quantity}
                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                ))}

              </div>


              {/* Pagination */}

              <div className="flex justify-center mt-10 gap-4">

                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span className="px-4 py-2 font-semibold">
                  Page {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>

              </div>

            </>

          )}

        </div>

      </AdminHero>

    </div>

  );

};

export default ShowAllOrders;