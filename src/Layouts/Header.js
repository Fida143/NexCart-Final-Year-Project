import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { FaShoppingCart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiSettings5Fill, RiLogoutBoxRLine } from "react-icons/ri";

import { useAuth } from "../context/auth";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import SearchInput from "../components/Form/SearchInput";
import { useCart } from "../context/cart";

const navigation = [
  { name: "Dashboard", to: "/", current: false },
  { name: "Team", to: "/team", current: false },
  { name: "Projects", to: "/projects", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = (e) => {
    e.stopPropagation();
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center mr-6 ">
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    /> */}
                    <h1 className=" font-extrabold text-lg sm:text-xl text-white sm:tracking-widest">
                      🛒NexCart
                    </h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:border-b-2 border-white hover:text-white",
                            " px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      <SearchInput />
                    </div>
                  </div>
                </div>
                <div className="absolute hidden inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!auth.user ? (
                    <>
                      <Link
                        to="/login"
                        className="
                    bg-gray-800
                    p-2
                    text-gray-400
                    hover:text-white
                    focus:outline-none
                    focus:ring-offset-2
                    focus:ring-offset-gray-800"
                      >
                        Login/SignUp
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="relative  rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Menu as="div" className="relative m-1 md:m-3">
                        <div>
                          <Menu.Button className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-12 w-12 rounded-full"
                              // src="../public/images/avatarImg.png"
                              src="../../images/image.png"
                              alt="Avatar Image"
                            />
                            <span className="text-gray-400  font-bold mr-2">
                              {auth?.user?.name}
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/dashboard/user/profile"
                                  className={classNames(
                                    active ? "bg-gray-300" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RxAvatar className="inline mr-3" />
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to={`/dashboard/${
                                    auth?.user?.role === 1 ? "admin" : "user"
                                  }`}
                                  className={classNames(
                                    active ? "bg-gray-300" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RxAvatar className="inline mr-3" />
                                  DashBoard
                                </NavLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RiSettings5Fill className="inline mr-3" />
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  onClick={handleLogout}
                                  to="/login"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RiLogoutBoxRLine className="inline mr-3" />
                                  Sign out
                                </NavLink>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      {/* Profile dropdown */}

                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full m-1  sm:m-3 bg-gray-800  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                          <FaShoppingCart
                            className="h-6 w-6 relative cursor-pointer "
                            aria-hidden="true"
                          ></FaShoppingCart>

                          <span className=" absolute -top-2 left-4 inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-bold text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {cart?.length}
                          </span>
                        </button>
                      </Link>
                    </>
                  )}
                </div>
                <div className="absolute flex  inset-y-0 right-0 sm:hidden items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!auth.user ? (
                    <>
                      <Link
                        to="/login"
                        className="
                    bg-gray-800
                    p-2
                    text-gray-400
                    hover:text-white
                    focus:outline-none
                    focus:ring-offset-2
                    focus:ring-offset-gray-800"
                      >
                        Login/SignUp
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full m-1  sm:m-3 bg-gray-800  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                          <FaShoppingCart
                            className="h-6 w-6 relative cursor-pointer "
                            aria-hidden="true"
                          ></FaShoppingCart>

                          <span className=" absolute -top-2 left-4 inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-bold text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {cart?.length}
                          </span>
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    // as="a"
                    // to={item.to}
                    // className={classNames(
                    //   item.current
                    //     ? "bg-gray-900 text-white"
                    //     : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    //   "block rounded-md px-3 py-2 text-base font-medium"
                    // )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:border-b-2 border-white hover:text-white",
                        "  px-1 ml-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </NavLink>
                  </Disclosure.Button>
                ))}
                <div className="space-y-1 px-3 pb-3 pt-4">
                  <SearchInput />
                </div>
                <div className="px-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!auth.user ? (
                    <>
                      <Link
                        to="/login"
                        className="
                    bg-gray-800
                    p-2
                    text-gray-400
                    hover:text-white
                    focus:outline-none
                    focus:ring-offset-2
                    focus:ring-offset-gray-800"
                      >
                        Login/SignUp
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="relative  rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Menu as="div" className="relative m-1 md:m-3">
                        <div>
                          <Menu.Button className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-12 w-12 rounded-full"
                              // src="../public/images/avatarImg.png"
                              src="../../images/image.png"
                              alt="Avatar Image"
                            />
                            <span className="text-gray-400  font-bold mr-2">
                              {auth?.user?.name}
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/dashboard/user/profile"
                                  className={classNames(
                                    active ? "bg-gray-300" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RxAvatar className="inline mr-3" />
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to={`/dashboard/${
                                    auth?.user?.role === 1 ? "admin" : "user"
                                  }`}
                                  className={classNames(
                                    active ? "bg-gray-300" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RxAvatar className="inline mr-3" />
                                  DashBoard
                                </NavLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RiSettings5Fill className="inline mr-3" />
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  onClick={handleLogout}
                                  to="/login"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <RiLogoutBoxRLine className="inline mr-3" />
                                  Sign out
                                </NavLink>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      {/* Profile dropdown */}
                    </>
                  )}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Header;
