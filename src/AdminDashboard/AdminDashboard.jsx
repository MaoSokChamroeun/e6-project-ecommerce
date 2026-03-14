import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminHero from "./AdminHero";

// Dummy analytics data
const data = [
  { name: "Jan", revenue: 400, orders: 24 },
  { name: "Feb", revenue: 300, orders: 13 },
  { name: "Mar", revenue: 600, orders: 38 },
  { name: "Apr", revenue: 800, orders: 39 },
  { name: "May", revenue: 500, orders: 48 },
  { name: "Jun", revenue: 900, orders: 38 },
  { name: "Jul", revenue: 1068, orders: 28 },
];

const DashboardCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
    <div className="text-sm text-gray-700 mb-2">{title}</div>
    <div className="text-3xl font-bold text-black">{value}</div>
  </div>
);

const AdminDashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  const getOrderCount = async () => {
    const res = await fetch("http://localhost:4000/api/order/count");
    const data = await res.json();

    if (data.success) {
      setTotalOrders(data.totalOrders);
    }
  };

  const getPendingCount = async () => {
    const res = await fetch("http://localhost:4000/api/order/count");
    const data = await res.json();

    if (data.success) {
      setTotalPending(data.pendingOrders);
    }
  };
  const getProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        setProducts(result.data);

        const stockCount = result.data.reduce(
          (total, product) => total + product.stock,
          0,
        );

        setTotalStock(stockCount);
      }
    } catch (error) {
      console.log("Fetch products failed:", error);
    }
  };

  const getRevenue = async () => {
    const token = sessionStorage.getItem("token");
    const res = await fetch("http://localhost:4000/api/payment/revenue/total", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data.success) {
      setTotalRevenue(data.totalRevenue);
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserEmail(email);
    getOrderCount();
    getProducts();
    getRevenue();
    getPendingCount();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-200 w-full font-khmer">
      <Sidebar />

      <AdminHero>
        <div className="flex-1 w-full">
          {/* Header */}
          <header className="bg-gray-200 p-4 flex justify-end items-center shadow-md w-full">
            <div className="flex items-center gap-4">
              <button className="relative">
                <span className="material-icons-outlined text-gray-400">
                  Notifications
                </span>
              </button>

              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488
                      7.488 0 0 0-5.982 2.975m11.963 0a9 9 0
                      1 0-11.963 0m11.963 0A8.966 8.966 0
                      0 1 12 21a8.966 8.966 0 0
                      1-5.982-2.275M15 9.75a3 3 0
                      1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {userEmail || "Admin User"}
                </span>
              </div>
            </div>
          </header>

          {/* Dashboard Cards */}
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DashboardCard title="Total Revenue" value={`$ ${totalRevenue}`} />
            <DashboardCard title="Total Orders" value={totalOrders} />
            <DashboardCard title="Order Pending" value={totalPending} />
            <DashboardCard title="Total Stock" value={totalStock} />
          </div>

          {/* Revenue Graph */}
          <div className="px-10 pb-10">
            <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Revenue Analytics (Monthly)
              </h2>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#566068"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#566068"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#566068"
                      fillOpacity={1}
                      fill="url(#colorRev)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </AdminHero>
    </div>
  );
};

export default AdminDashboard;
