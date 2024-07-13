import React from "react";
import Layout from "../../Layouts/Layout";
import AuthMenu from "../../components/AuthMenu";

const Users = () => {
  return (
    <Layout title={"DashBoard- All Users  - Ecommerce App"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
          <div className="col-span-2 bg-gray-200 text-gray-950 p-3">
            <AuthMenu />
          </div>
          <div className="col-span-3 bg-gray-200 text-gray-950 p-3">
            <h1 className="">Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
