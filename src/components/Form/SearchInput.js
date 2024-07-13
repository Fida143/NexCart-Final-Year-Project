import React from "react";
import { useSearch } from "../../context/searh";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
const SearchInput = () => {
  const [values, setValues] = useSearch(" ");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center "
      >
        <input
          className="shadow  appearance-none border rounded-s  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="search"
          value={values.keyword}
          placeholder="Search Here ..."
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          type="submit"
          className="text-white text-2xl bg-red-500 p-[7px] rounded-e "
        >
          <IoSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
