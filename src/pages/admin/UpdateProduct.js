import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import AuthMenu from "../../components/AuthMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [initialData, setInitialData] = useState({
    name: "",
    desc: "",
    price: "",
    quantity: "",
    shipping: "",
  });
  const [id, setId] = useState("");

  //  get initial product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      console.log(data, "da");
      setInitialData({
        ...initialData,
        name: data.product.name,
        desc: data.product.desc,
        price: data.product.price,
        quantity: data.product.quantity,
        shipping: data.product.shipping,
      });
      setId(data.product._id);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  //   get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log(data);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(data, categories, category, photo);
    console.log("submited");
    console.log(initialData, "data");
    try {
      const productData = new FormData();
      productData.append("name", initialData.name);
      productData.append("desc", initialData.desc);
      productData.append("price", initialData.price);
      productData.append("quantity", initialData.quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      console.log(productData, "pd");
      const { response } = await axios.put(
        `/api/v1/product/update-product/${id}`,
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
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while Updating product");
    }

    setInitialData({
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
  const handleDelete = async (e) => {
    e.preventDefault();
    // console.log(data, categories, category, photo);
    console.log(initialData, "data");
    try {
      let answer = window.prompt("Are you sure You want to Delete this Produt");
      if (!answer) return;
      const { response } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (response?.success) {
        toast.error(response?.message);
      } else {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong while Deleting product");
    }
  };

  return (
    <Layout title={"DashBoard- Update Products - Ecommerce App"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
          <div className="col-span-2 bg-gray-200 text-gray-950 p-3">
            <AuthMenu />
          </div>
          <div className="col-span-3 bg-gray-200 text-gray-950 p-3">
            <h1 className="font-bold uppercase">Update Products</h1>
            <div className="m-2 w-full">
              <form onSubmit={handleUpdate}>
                <Select
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
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
                  {photo ? (
                    <div>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product_Photo"
                        className="h-[200px] mx-auto"
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
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
                    value={initialData.name}
                    placeholder="Write product name"
                    className="w-full"
                    onChange={(e) =>
                      setInitialData({
                        ...initialData,
                        [e.target.name]: e.target.value,
                      })
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
                    value={initialData.desc}
                    placeholder="Write product description"
                    className="w-full"
                    onChange={(e) =>
                      setInitialData({
                        ...initialData,
                        [e.target.name]: e.target.value,
                      })
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
                    value={initialData.price}
                    className="w-full"
                    onChange={(e) =>
                      setInitialData({
                        ...initialData,
                        [e.target.name]: e.target.value,
                      })
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
                    value={initialData.quantity}
                    id="quantity"
                    placeholder="0"
                    min={0}
                    max={50}
                    className="w-full"
                    onChange={(e) =>
                      setInitialData({
                        ...initialData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Select
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    onChange={(e) =>
                      setInitialData({ ...initialData, shipping: e })
                    }
                    value={initialData.shipping ? "yes" : "No"}
                    className="my-2 placeholder:text-white!important"
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="my-2 text-right flex gap-2">
                  <input
                    type="submit"
                    value="Update Product"
                    className=" bg-blue-500 py-2 px-3 font-bold rounded"
                  />
                  <input
                    type="submit"
                    value="Delete Product"
                    onClick={handleDelete}
                    className=" bg-red-500 py-2 px-3 font-bold rounded"
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

export default UpdateProduct;
