import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-category" className="font-bold block">
          Create new Category
        </label>
        <input
          className="w-2/3"
          type="text"
          id="new-category"
          onChange={(e) => setName(e.target.value)}
          placeholder="create new category"
          value={name}
        />
        <input
          type="submit"
          value="Add"
          className="border border-black p-2 m-2"
        />
      </form>
    </>
  );
};

export default CategoryForm;
