import { Fragment, React, useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import axios from "axios";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
// const filters = [
//   {
//     id: "color",
//     name: "Color",
//     options: [
//       { value: "white", label: "White", checked: false },
//       { value: "beige", label: "Beige", checked: false },
//       { value: "blue", label: "Blue", checked: true },
//       { value: "brown", label: "Brown", checked: false },
//       { value: "green", label: "Green", checked: false },
//       { value: "purple", label: "Purple", checked: false },
//     ],
//   },
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: "new-arrivals", label: "New Arrivals", checked: false },
//       { value: "sale", label: "Sale", checked: false },
//       { value: "travel", label: "Travel", checked: true },
//       { value: "organization", label: "Organization", checked: false },
//       { value: "accessories", label: "Accessories", checked: false },
//     ],
//   },
//   {
//     id: "size",
//     name: "Size",
//     options: [
//       { value: "2l", label: "2L", checked: false },
//       { value: "6l", label: "6L", checked: false },
//       { value: "12l", label: "12L", checked: false },
//       { value: "18l", label: "18L", checked: false },
//       { value: "20l", label: "20L", checked: false },
//       { value: "40l", label: "40L", checked: true },
//     ],
//   },
// ];

function classtitles(...classes) {
  return classes.filter(Boolean).join(" ");
}

const oldproducts = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

// const items = [
//   {
//     id: 1,
//     title: "Back End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 2,
//     title: "Front End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 3,
//     title: "User Interface Designer",
//     department: "Design",
//     type: "Full-time",
//     location: "Remote",
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  // const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all product
  const getAllProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);

      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get Total Count

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load More

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);
  // filter by checkboxes

  const handleFilter = (value, id, filterBy) => {
    console.log(value, "value");
    console.log(id, "id");
    console.log(filterBy, "filterby");
    let allCheckedCategories = [...checkedCategories];
    // let price = [...checkedPrice];

    if (value) {
      if (filterBy == "price") {
        // price.push(id);
        console.log(id, "ippp");
        setCheckedPrice(id);
      } else {
        allCheckedCategories.push(id);
      }
    } else {
      allCheckedCategories = allCheckedCategories.filter((c) => c !== id);
    }
    setCheckedCategories(allCheckedCategories);
    console.log(allCheckedCategories, "checked");
    console.log(checkedPrice, "price");
  };

  // get Filtered Products

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checkedCategories,
        checkedPrice,
      });
      console.log(data, "dataTs");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Reset Filter

  const resetFilter = () => {
    setCheckedCategories([]);
    setCheckedPrice([]);
    window.location.reload();
  };

  useEffect(() => {
    if (checkedCategories.length == 0 && checkedPrice.length == 0)
      getAllProducts();
    getAllCategory();
    getTotalCount();
  }, [checkedCategories, checkedPrice]);

  useEffect(() => {
    if (checkedCategories.length > 0 || checkedPrice.length > 0)
      filterProduct();
  }, [checkedCategories, checkedPrice]);

  // category filter
  const filters = [
    {
      id: "category",
      name: "Category",
      options: [...categories],
    },
    {
      id: "price",
      name: "price",
      options: [
        { value: [0, 1000], name: "₹0 - ₹1000", checked: false },
        { value: [1000, 5000], name: "₹1000 - ₹5000", checked: false },
        { value: [5000, 10000], name: "₹5000 - ₹10000", checked: false },
        { value: [10000, 20000], name: "₹10000 - ₹20000", checked: false },
        { value: [20000, 50000], name: "₹20000 - ₹50000", checked: false },
        { value: [50000, 100000], name: "₹50000 - ₹100000", checked: false },
        {
          value: [100000, 5000000],
          name: "₹100000 - > ₹100000 ",
          checked: false,
        },
      ],
    },
  ];

  return (
    <Layout title={"All Products - Ecommerce App "}>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                          defaultOpen={true}
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.name}
                                      className="flex items-center"
                                    >
                                      {console.log(option, "op")}
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.name}
                                        value={option.value}
                                        type={
                                          `${section.id}[]` == "price[]"
                                            ? "radio"
                                            : "checkbox"
                                        }
                                        defaultChecked={option.checked}
                                        onChange={(e) =>
                                          handleFilter(
                                            e.target.checked,
                                            // option._id,
                                            `${section.id}[]` !== "price[]"
                                              ? option._id
                                              : option.value,
                                            section.id
                                          )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.name}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                      defaultOpen={true}
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.name}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.name}
                                    type={
                                      `${section.id}[]` == "price[]"
                                        ? "radio"
                                        : "checkbox"
                                    }
                                    // checked={
                                    //   checkedCategories.includes(option._id) ||
                                    //   checkedPrice === option.value
                                    //     ? "checked"
                                    //     : false
                                    // }
                                    defaultChecked={false}
                                    onChange={(e) =>
                                      handleFilter(
                                        e.target.checked,
                                        // option._id,
                                        `${section.id}[]` !== "price[]"
                                          ? option._id
                                          : option.value,
                                        section.id
                                      )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}

                  {checkedCategories.length || checkedPrice.length ? (
                    <button
                      onClick={resetFilter}
                      className="rounded border px-3 py-2 text-center mt-4  hover:bg-green-300"
                    >
                      Reset Filters
                    </button>
                  ) : (
                    " "
                  )}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {" "}
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Products
                      </h2>

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.length ? (
                          products.map((product) => (
                            <Link
                              key={product._id}
                              to={`/product/${product.slug}`}
                              className="hover:scale-105 hover:transition ease-in-out duration-500"
                            >
                              <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                  <img
                                    src={`/api/v1/product/product-photo/${product._id}`}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                  />
                                </div>
                                <div className="mt-4 flex justify-between">
                                  <div>
                                    <h3 className="text-sm text-gray-700 font-bold">
                                      <span>
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {product.name}
                                      </span>
                                    </h3>
                                    <p className="text-gray-800">
                                      {product.desc.substring(0, 30)}...
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500  w-fit flex">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar /> <FaStarHalfAlt />{" "}
                                      {/* {product.rating.rate} */}
                                    </p>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <h2 className="text-center text-4xl font-bold mt-10 ml-72  text-nowrap ">
                            😞 Not Found
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Pagination */}
            {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      2
                    </a>

                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </nav>
                </div>
              </div>
            </div> */}

            <div className="mb-10 flex justify-center">
              {products && products.length < total && (
                <button
                  className="rounded border px-8 py-2 hover:bg-gray-800 hover:text-white"
                  onClick={(e) => {
                    setPage(page + 1);
                  }}
                >
                  {" "}
                  {loading ? "Loding..." : "Load More"}
                </button>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  );
};

export default Home;
