import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Layout from "../Layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaLocationDot } from "react-icons/fa6";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const Cart = () => {
  // States
  const [open, setOpen] = useState(true);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Remove Item From Cart
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate Total Price

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-In", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle Payment

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment completed Successfully");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto bg-gray-200 max-w-2xl  mt-12 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
            {`Hello , ${auth?.token && auth?.user?.name} ✋`}
          </h1>
          <p className="capitalize  flex gap-1 items-center">
            <FaLocationDot /> <span>{auth?.user?.address}</span>
          </p>
          <p>
            {cart?.length
              ? `You Have ${cart.length} Items in Your Cart ${
                  auth?.token ? "" : "Please Login To CheckOut "
                }`
              : "Your Cart Is Empty "}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
            Your Cart 👇
          </h2>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.length ? (
                cart.map((product) => (
                  <li key={product._id} className="flex py-6">
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
                          <label htmlFor="quantity" className="mb-1 font-bold">
                            Qty
                          </label>
                          <select className="ml-3">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCartItem(product._id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p className="mt-10"> 🚫 Empty</p>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{totalPrice()}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            {!clientToken || !cart.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: { flow: "vault" },
                  }}
                  onInstance={(ins) => setInstance(ins)}
                />
                {/* <button
                  onClick={handlePayment}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  disabled={!loading || !instance || !auth?.user}
                >
                  {loading ? (
                    " processing ..."
                  ) : (
                    <>
                      Pay & Order <span aria-hidden="true"> &rarr;</span>
                    </>
                  )}
                </button> */}
                <button
                  onClick={handlePayment}
                  className="flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  disabled={loading || !auth?.user.address}
                >
                  {" "}
                  {loading ? (
                    " processing ..."
                  ) : (
                    <>
                      Pay & Order <span aria-hidden="true"> &rarr;</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* <div className="mt-4  "> */}

        {/* <button className="bg-slate-400" onClick={handlePayment}>
          Make Payment
        </button> */}
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default Cart;
