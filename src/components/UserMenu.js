import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold tracking-widest ">
        DashBoard
      </h1>
      <div className="hover:bg-gray-800 hover:text-white my-1 text-center">
        <Link to="/dashboard/user/profile" className="text-lg  font-semibold ">
          Profile
        </Link>
      </div>
      <div className="hover:bg-gray-800 hover:text-white my-1 text-center">
        <Link to="/dashboard/user/orders" className="text-lg  font-semibold ">
          Orders
        </Link>
      </div>
    </div>
  );
};

export default UserMenu;
