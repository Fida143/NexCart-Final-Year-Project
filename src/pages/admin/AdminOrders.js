import React, { useState, useEffect } from "react";
import AuthMenu from "../../components/AuthMenu";
import Layout from "../../Layouts/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // get Orders

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Admin Orders - Ecommerce App"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
          <div className="col-span-2 bg-gray-200 text-gray-950 p-3">
            <AuthMenu />
          </div>
          <div className="col-span-3 bg-gray-200 text-gray-950 p-3">
            <h1>All Orders</h1>
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="min-w-full shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {orders.map((order, index) => {
                    return (
                      <div key={index}>
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-2 py-3 border-b-2 font-bold border-gray-200 bg-gray-100 text-left text-xs  text-gray-600 uppercase tracking-wider">
                                #
                              </th>
                              <th className="px-3 py-3 border-b-2 font-bold border-gray-200 bg-gray-100 text-left text-xs  text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-3 py-3 border-b-2 font-bold border-gray-200 bg-gray-100 text-left text-xs  text-gray-600 uppercase tracking-wider">
                                Buyer
                              </th>
                              <th className="px-3 py-3 border-b-2 font-bold border-gray-200 bg-gray-100 text-left text-xs  text-gray-600 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-3 py-3 border-b-2 font-bold border-gray-200 bg-gray-100 text-left text-xs  text-gray-600 uppercase tracking-wider">
                                Payment
                              </th>
                              <th className="px-3 py-3 border-b-2 font-bold border-gray-200 bg-gray-100 text-left text-xs  text-gray-600 uppercase tracking-wider">
                                Quantity
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <>
                              <tr key={index}>
                                <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap font-bold">
                                        {index + 1}.
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="text-gray-900 whitespace-no-wrap">
                                    {/* {order?.status} */}
                                    <Select
                                      bordered={false}
                                      onChange={(value) =>
                                        handleChange(order._id, value)
                                      }
                                      defaultValue={order?.status}
                                    >
                                      {status.map((s, i) => (
                                        <Select.Option key={i} value={s}>
                                          {s}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </div>
                                </td>
                                <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {order?.buyer?.name}
                                  </p>
                                </td>
                                <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {moment(order?.createdAt).fromNow()}
                                  </p>
                                </td>
                                <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {order?.payment.success ? (
                                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Success
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        Failed
                                      </span>
                                    )}
                                  </p>
                                </td>
                                <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {order?.products?.length}
                                  </p>
                                </td>
                                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                                  order.role === "Admin"
                                  ? "text-green-900"
                                  : order.role === "Owner"
                                  ? "text-purple-900"
                                  : "text-gray-900"
                                  }`}
                                  >
                                  <span
                                  aria-hidden
                                    className={`absolute inset-0 ${
                                      order.role === "Admin"
                                        ? "bg-green-200"
                                        : order.role === "Owner"
                                        ? "bg-purple-200"
                                        : "bg-gray-200"
                                    } rounded-full`}
                                  ></span>
                                  <span className="relative">{order.role}</span>
                                  </span>
                                  </td> */}
                              </tr>
                            </>
                          </tbody>
                        </table>
                        <div className="px-8">
                          {order?.products?.map((product) => {
                            return (
                              <div key={product._id}>
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Link to={`/product/${product.slug}`}>
                                      <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </Link>
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.name}</h3>
                                        <p className="ml-4">₹{product.price}</p>
                                      </div>
                                      <p>{product.desc.substring(0, 30)}</p>
                                      {/* <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p> */}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-500">
                                        <label
                                          htmlFor="quantity"
                                          className="mb-1 font-bold"
                                        >
                                          Qty
                                        </label>
                                        <select className="ml-3" disabled>
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
