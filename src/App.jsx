// import React from 'react'
// import './App.css'
// import { BrowserRouter , Navigate, Route, Router , Routes } from 'react-router-dom'
// import AdminDashboard from './AdminDashboard/AdminDashboard'
// import Login from './components/Login'
// import Signup from './components/Signup'
// import ShowCategory from './AdminDashboard/category/ShowCategory'
// import CreateCategory from './AdminDashboard/category/CreateCategory'
// import UpdateCategory from './AdminDashboard/category/UpdateCategory'
// import ShowProduct from './AdminDashboard/Product/ShowProduct'
// import CreateProduct from './AdminDashboard/Product/CreateProduct'
// import UpdateProduct from './AdminDashboard/Product/UpdateProduct'
// import ProtectedRoute from './AdminDashboard/ProtectedRoute'
// import Inventory from './AdminDashboard/Ventory/Inventory'
// import CreateInventory from './AdminDashboard/Ventory/CreateInventory'
// import Home from './pages/Home'
// import UserLogin from './User/UserLogin/UserLogin'
// import UserSignup from './User/UserLogin/UserSignup'
// import UserProtect from './User/UserProtect'

// function App() {
//   return (
//     <>
//      <BrowserRouter>
//           <Routes>

//             <Route path='/user/signin' element = {<UserLogin />} />
//             <Route path='/user/signup' element = {<UserSignup />} />
//             <Route path='/admin/login' element = {<Login />} />
//             <Route path='/admin/signup' element = {<Signup />} />

//             <Route path='/admin/dashboard/category' element = {<ShowCategory />} />
//             <Route path='/admin/dashboard/create' element = {<CreateCategory />} />
//             <Route path="/admin/category/update/:id" element={<UpdateCategory />} />

//             <Route path="/admin/dashboard/product" element = {<ShowProduct />} />
//             <Route path="/admin/dashboard/product/create" element = {<CreateProduct />} />
//             <Route path="/admin/dashboard/product/update/:id" element={<UpdateProduct />} />
//             <Route path='/admin/dashboard/inventory' element = {<Inventory />} />
//             <Route path='/admin/dashboard/inventory/create' element = {<CreateInventory />} />
//              <Route path="/"
//               element={
//                 <UserProtect>
//                   <Home />
//                 </UserProtect>
//               }
//             />
//              <Route path="/admin/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             {/* <Route path="*" element={<NotFound />} /> */}
//           </Routes>
//      </BrowserRouter>
//     </>
//   )
// }

// export default App
import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

import ShowCategory from "./AdminDashboard/category/ShowCategory";
import CreateCategory from "./AdminDashboard/category/CreateCategory";
import UpdateCategory from "./AdminDashboard/category/UpdateCategory";

import ShowProduct from "./AdminDashboard/Product/ShowProduct";
import CreateProduct from "./AdminDashboard/Product/CreateProduct";
import UpdateProduct from "./AdminDashboard/Product/UpdateProduct";

import Inventory from "./AdminDashboard/Ventory/Inventory";
import CreateInventory from "./AdminDashboard/Ventory/CreateInventory";

import ProtectedRoute from "./AdminDashboard/ProtectedRoute";

import Home from "./pages/Home";
import UserLogin from "./User/UserLogin/UserLogin";
import UserSignup from "./User/UserLogin/UserSignup";
import UserProtect from "./User/UserProtect";
import ProductDetail from "./FrontendFetching/Product/ProductDetail";
import CategoryProduct from "./FrontendFetching/Product/CategoryProduct";
import Card from "./pages/Card";
import Checkout from "./payemnt/Checkout";
import UserOrder from "./payemnt/UserOrder";
import Payment from "./payemnt/Payment";
import ShowAllOrders from "./AdminDashboard/Order/ShowAllOrder";
import PaymentSuccess from "./payemnt/PaymentSuccess";
import FavoriteDetail from "./FrontendFetching/Product/FavoriteDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/user/signin" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element ={<Card />} />
        <Route path="/product/checkout" element ={<Checkout />} />
        <Route path="/product/orders" element = {<UserOrder />} />
        <Route path="/product/favorites" element = {<FavoriteDetail />} />
        <Route path="/product/payment" element = {<Payment />} />
        <Route path="/product/payment/success" element = {<PaymentSuccess />} />
        {/* ADMIN AUTH */}
        <Route path="/admin/signin" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* CATEGORY */}
        <Route path="/admin/dashboard/category" element={<ShowCategory />} />
        <Route
          path="/admin/dashboard/category/create"
          element={<CreateCategory />}
        />
        <Route path="/admin/category/update/:id" element={<UpdateCategory />} />

        {/* PRODUCT */}
        <Route path="/admin/dashboard/product" element={<ShowProduct />} />
        <Route
          path="/admin/dashboard/product/create"
          element={<CreateProduct />}
        />
        <Route
          path="/admin/dashboard/product/update/:id"
          element={<UpdateProduct />}
        />

        {/* INVENTORY */}
        <Route path="/admin/dashboard/inventory" element={<Inventory />} />
        <Route
          path="/admin/dashboard/inventory/create"
          element={<CreateInventory />}
        />
        <Route path="/admin/dashboard/orders" element={<ShowAllOrders />} />

        {/* NOT FOUND */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
