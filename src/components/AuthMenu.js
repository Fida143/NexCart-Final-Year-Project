import React from "react";
import { Link } from "react-router-dom";
const AuthMenu = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold tracking-widest ">
        Admin Panel
      </h1>
      <Link
        to="/dashboard/admin/create-categories"
        className="text-lg  font-semibold "
      >
        <div className="hover:bg-gray-800 hover:text-white my-1 text-center">
          Create-Categories
        </div>
      </Link>
      <Link
        to="/dashboard/admin/create-product"
        className="text-lg  font-semibold "
      >
        <div className="hover:bg-gray-800 hover:text-white my-1 text-center">
          Create-Product
        </div>
      </Link>
      <Link to="/dashboard/admin/products" className="text-lg  font-semibold ">
        <div className="hover:bg-gray-800 hover:text-white my-1 text-center">
          Products
        </div>
      </Link>
      <Link to="/dashboard/admin/orders" className="text-lg  font-semibold ">
        <div className="hover:bg-gray-800 hover:text-white my-1 text-center">
          Orders
        </div>
      </Link>
      <Link to="/dashboard/admin/users" className="text-lg  font-semibold ">
        <div className="hover:bg-gray-800 hover:text-white my-1 text-center">
          Users
        </div>
      </Link>
    </div>
  );
};

export default AuthMenu;
