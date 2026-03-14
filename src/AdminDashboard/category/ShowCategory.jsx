import React from "react";
import Sidebar from "../Sidebar";
import AdminHero from "../AdminHero";
import useCategory from "../../hooks/hookAdminCategory/useCategory";
import { Link } from "react-router-dom";
import useDeleteCategory from "../../hooks/hookAdminCategory/useDeleteCategory";
import Loading from '../Loading'
const ShowCategory = () => {
  const {categories , getAllCategory , loading} = useCategory()
  const {handleDelete} = useDeleteCategory();
  return (
    <div className="w-full flex min-h-screen bg-[#f3f4f6] font-khmer">
      <Sidebar />
      <AdminHero>
        <div className="w-full p-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cateogry Management</h1>
              <p className="text-sm text-gray-500">List Of All Category</p>
            </div>
            <button className="bg-blue-600 hover:bg-slate-700 text-white px-5 py-4 pb-4 rounded-lg flex items-center gap-2 transition shadow-md">
              <span className="material-icons-outlined text-sm">
                <Link to={'/admin/dashboard/category/create'}>
                    Create Product
                </Link>
              </span>
              
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Category / Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Slug</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100"> 
                {loading && <Loading />}
                {categories.map((cat , index) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-500">#{index +1}</td>
                    <td className="p-4 text-sm font-medium text-gray-800">{cat.name}</td>
                    <td className="p-4 text-sm text-gray-500">{cat.slug}</td>
             
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cat.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {cat.status === 'open' ? 'open' : 'close'}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                          <Link to={`/admin/category/update/${cat._id}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                          </Link>
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete" onClick={() => handleDelete(cat._id , getAllCategory)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </AdminHero>
    </div>
  );
};

export default ShowCategory;