import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/inventory");

      if (res.data.success) {
        setInventories(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-200 w-full font-khmer">
        <Sidebar />
        <AdminHero>
          <div className="p-6 bg-gray-50 min-h-screen p-4">
            <h1 className="text-2xl font-semibold mb-6">
              Inventory Management
            </h1>
            <button className="bg-blue-600 hover:bg-slate-700 text-white px-5 py-4 pb-4 rounded-lg flex  items-center gap-2 transition shadow-md">
              <span className="material-icons-outlined text-sm">
                <Link to={"/admin/dashboard/inventory/create"}>
                  Create Product
                </Link>
              </span>
            </button>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Note</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="5" className="text-center p-6">
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!loading && inventories.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center p-6">
                        No inventory data
                      </td>
                    </tr>
                  )}

                  {inventories.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="p-4">{item.product?.name}</td>

                      <td className="p-4 capitalize">
                        <span
                          className={`px-2 py-1 rounded text-sm
                    ${
                      item.type === "in"
                        ? "bg-green-100 text-green-700"
                        : item.type === "out"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                        >
                          {item.type}
                        </span>
                      </td>

                      <td className="p-4 font-medium">{item.quantity}</td>

                      <td className="p-4">{item.note || "-"}</td>

                      <td className="p-4 text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AdminHero>
      </div>
    </>
  );
};

export default Inventory;
