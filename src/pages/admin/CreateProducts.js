import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import AuthMenu from "../../components/AuthMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [data, setData] = useState({
    name: "",
    desc: "",
    price: "",
    quantity: "",
    shipping: "",
  });

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data, categories, category, photo);
    console.log("submited");
    console.log(data, "data");
    try {
      const productData = new FormData();
      productData.append("name", data.name);
      productData.append("desc", data.desc);
      productData.append("price", data.price);
      productData.append("quantity", data.quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      console.log(productData, "pd");
      const { response } = await axios.post(
        "/api/v1/product/create-product",
        //   {
        //   name: data.name,
        //   desc: data.desc,
        //   price: data.price,
        //   category: category,
        //   quantity: data.quantity,
        //   photo: photo,
        //   shipping: data.shipping,
        // }
        productData
      );
      if (response?.success) {
        toast.error(response?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while creating product");
    }

    setData({
      name: "",
      desc: "",
      price: "",
      quantity: "",
      shipping: "",
    });
    setPhoto("");
    setCategory("");
    setCategories([]);
  };

  return (
    <Layout title={"DashBoard- Create Products - Ecommerce App"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
          <div className="col-span-2 bg-gray-200 text-gray-950 p-3">
            <AuthMenu />
          </div>
          <div className="col-span-3 bg-gray-200 text-gray-950 p-3">
            <h1 className="font-bold uppercase">create Products</h1>
            <div className="m-2 w-full">
              <form onSubmit={handleSubmit}>
                <Select
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  className="w-full   "
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div>
                  <label
                    htmlFor="upload-image"
                    className="bg-gray-800  py-2 text-white rounded cursor-pointer w-full text-center  my-3"
                  >
                    {photo ? photo.name : " Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      id="upload-image"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div>
                  {photo && (
                    <div>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product_Photo"
                        className="h-[200px] mx-auto"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="name" className="block my-2 font-bold">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    placeholder="Write product name"
                    className="w-full"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="desc" className="block my-2 font-bold">
                    Description of Product
                  </label>
                  <textarea
                    type="text"
                    name="desc"
                    id="desc"
                    value={data.desc}
                    placeholder="Write product description"
                    className="w-full"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block my-2 font-bold">
                    Product price
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0"
                    id="price"
                    value={data.price}
                    className="w-full"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="block my-2 font-bold">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={data.quantity}
                    id="quantity"
                    placeholder="0"
                    min={0}
                    max={50}
                    className="w-full"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Select
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    onChange={(e) => setData({ ...data, shipping: e })}
                    className="my-2 placeholder:text-white!important"
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="my-2 text-right">
                  <input
                    type="submit"
                    value="Create Product"
                    className=" bg-blue-500 py-2 px-3 font-bold rounded"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
