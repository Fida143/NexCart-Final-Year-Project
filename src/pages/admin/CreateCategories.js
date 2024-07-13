import React, { useState, useEffect } from "react";
import Layout from "../../Layouts/Layout";
import AuthMenu from "../../components/AuthMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { Modal, Button } from "antd";
import Footer from "../../Layouts/Footer";

const CreateCategories = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState(" ");
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState(" ");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data.success) {
        setCategory(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is successfully added `);
        getAllCategory();
        setName(" ");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in form category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update Category

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is Updated Successfully`);
        setSelected(null);
        setUpdatedName(" ");
        setIsVisible(false);
        getAllCategory();
      } else {
        toast.error(`Error on updating category`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating category");
    }
  };

  // Delete Category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data?.success) {
        toast.success(`Category is Deleted Successfully`);
        getAllCategory();
      } else {
        toast.error(`Error on Deleting category`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while Deleting category");
    }
  };
  return (
    <Layout title={"DashBoard- Create Categories - Ecommerce App"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
          <div className="col-span-2 bg-gray-200 text-gray-950 p-3">
            <AuthMenu />
          </div>
          <div className="col-span-3 bg-gray-200 text-gray-950 p-3">
            <h1 className="">Manage Categories</h1>
            <div>
              <div className="m-2 w-full">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                />
              </div>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => {
                    return (
                      <tr key={c._id}>
                        <td className="my-3">{c.name}</td>

                        <td className="text-center">
                          <button
                            className="p-1  rounded-md my-2 hover:bg-gray-500"
                            onClick={() => {
                              setIsVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            <BiSolidEdit />
                          </button>
                          <button
                            className="p-1  rounded-md my-2 ml-4 hover:bg-red-600"
                            onClick={() => handleDelete(c._id)}
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Modal
                onCancel={() => setIsVisible(false)}
                footer={null}
                open={isVisible}
              >
                <CategoryForm
                  name={updatedName}
                  setName={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategories;
