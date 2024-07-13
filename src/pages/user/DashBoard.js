import React from "react";
import Layout from "../../Layouts/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";

const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"DashBoard - Ecommerce App"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
          <div className="col-span-2 bg-gray-200 text-gray-950 p-3">
            <UserMenu />
          </div>
          <div className="col-span-3 bg-gray-200 text-gray-950 p-3">
            <h1 className="">User Name : {auth?.user?.name}</h1>
            <h1>User Email :{auth?.user.email}</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
