import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSearch } from "../context/searh";
import Layout from "../Layouts/Layout";
import React from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Searched Results"}>
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
        <h1>Searched Results</h1>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h6>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {values.results.length ? (
            values.results.map((product) => (
              <Link
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
                        <a href={product.image}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="text-gray-800">
                        {product.desc.substring(0, 30)}...
                      </p>
                      <p className="mt-1 text-sm text-gray-500 flex">
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
    </Layout>
  );
};

export default Search;
