import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminHero from "./AdminHero";
import axios from "axios";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { DollarSign, ShoppingCart, Package, Clock } from "lucide-react";

const data = [
  { name: "Jan", revenue: 400, orders: 24 },
  { name: "Feb", revenue: 300, orders: 13 },
  { name: "Mar", revenue: 600, orders: 38 },
  { name: "Apr", revenue: 800, orders: 39 },
  { name: "May", revenue: 500, orders: 48 },
  { name: "Jun", revenue: 900, orders: 38 },
  { name: "Jul", revenue: 1068, orders: 28 },
];

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm text-gray-500">{title}</h4>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
    </div>
  );
};

const AdminDashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [totalStock, setTotalStock] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [orders, setOrders] = useState([]);

  /* ===========================
     FETCH ALL ORDERS (ADMIN)
  =========================== */

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
        console.log('ALl User order' , res.data.data)
      }
    } catch (error) {
      console.log("Fetch orders error:", error);
    }
  };

  /* ===========================
     FETCH PRODUCTS
  =========================== */

  const getProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const stockCount = res.data.data.reduce(
          (total, product) => total + product.stock,
          0
        );

        setTotalStock(stockCount);
      }
    } catch (error) {
      console.log("Fetch products failed:", error);
    }
  };

  /* ===========================
     FETCH ORDER COUNT
  =========================== */

  const getOrderCount = async () => {
    try {
      const token = sessionStorage.getItem("token")
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/order/count` ,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setTotalOrders(res.data.totalOrders);
        setTotalPending(res.data.pendingOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ===========================
     FETCH TOTAL REVENUE
  =========================== */

  const getRevenue = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/payment/revenue/total`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setTotalRevenue(res.data.totalRevenue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    setUserEmail(email);

    getAllOrders();
    getProducts();
    getOrderCount();
    getRevenue();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <Sidebar />

      <AdminHero>
        <div className="flex-1 w-full">
          {/* HEADER */}

          <header className="bg-white p-4 flex justify-end items-center shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                A
              </div>

              <span className="text-sm font-medium text-gray-700">
                {userEmail || "Admin"}
              </span>
            </div>
          </header>

          {/* DASHBOARD CARDS */}

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Revenue"
              value={`$${totalRevenue}`}
              icon={<DollarSign size={20} />}
              color="bg-green-100 text-green-600"
            />

            <DashboardCard
              title="Total Orders"
              value={totalOrders}
              icon={<ShoppingCart size={20} />}
              color="bg-blue-100 text-blue-600"
            />

            <DashboardCard
              title="Pending Orders"
              value={totalPending}
              icon={<Clock size={20} />}
              color="bg-yellow-100 text-yellow-600"
            />

            <DashboardCard
              title="Total Stock"
              value={totalStock}
              icon={<Package size={20} />}
              color="bg-purple-100 text-purple-600"
            />
          </div>

          {/* CHART */}

          <div className="px-8 pb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">
                Revenue & Orders Analytics
              </h2>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4f46e5"
                      fill="#c7d2fe"
                      strokeWidth={3}
                    />

                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="#16a34a"
                      fill="#bbf7d0"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}

          <div className="px-8 pb-12">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="py-3 text-left">Order ID</th>
                    <th className="text-left">Customer</th>
                    <th className="text-left">Order Status</th>
                    <th className="text-left">Amount</th>
                    <th className="text-left">Order Date</th>
                    <th className="text-left">Payment Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.slice(0, 10).map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 font-medium">
                        #{order._id.slice(-5)}
                      </td>

                      <td>{order.user?.username || "Guest"}</td>

                      <td
                        className={
                          order.orderStatus === "pending"
                            ? "text-yellow-500"
                            : order.orderStatus === "processing"
                            ? "text-blue-500"
                            : order.orderStatus === "completed"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {order.orderStatus}
                      </td>

                      <td>${order.totalAmount}</td>

                      <td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td
                        className={
                          order.paymentStatus === "pending"
                            ? "text-yellow-500"
                            : order.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {order.paymentStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminHero>
    </div>
  );
};

export default AdminDashboard;