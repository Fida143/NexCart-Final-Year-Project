import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const FrogotPassword = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    newPassword: "",
    answer: "",
  };

  const [forgotInput, setForgotInput] = useState(initialState);

  const handleChange = (e) => {
    e.stopPropagation();
    setForgotInput({ ...forgotInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(forgotInput);
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email: forgotInput.email,
        newPassword: forgotInput.newPassword,
        answer: forgotInput.answer,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
    setForgotInput(initialState);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[90vh]">
        <div className=" w-full sm:max-w-[400px]   h-3/4 p-3 md:p-8 ">
          <h1 className="text-xl text-black text-center font-bold mb-2">
            Forgot Password
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center flex-col"
          >
            <div className="mb-2">
              <label htmlFor="email" className="mb-2 font-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={forgotInput.email}
                placeholder="Enter your Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="answer" className="mb-2 font-bold">
                What Is Your Best Friend Name ?
              </label>
              <input
                type="text"
                className="form-control"
                id="answer"
                name="answer"
                value={forgotInput.answer}
                placeholder="Enter your best friend name"
                onChange={handleChange}
                required
              />
            </div>
            <label htmlFor="newPassword" className="mb-2 font-bold">
              New Password
            </label>
            <div className="mb-2">
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={forgotInput.newPassword}
                placeholder="Enter your new Password"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="p-1 rounded-lg border-2 hover:bg-slate-200 border-gray-800 text-gray-800 w-fit mx-auto mt-1 font-bold"
            >
              Reset
            </button>
            <span className="mt-3 text-center">
              Already have an account ?{" "}
              <NavLink className="text-sky-700" to="/login">
                Login
              </NavLink>
            </span>
            <span className="mt-3 text-center">
              Don't have an account ?{" "}
              <NavLink className="text-sky-700" to="/register">
                Sign Up
              </NavLink>
            </span>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FrogotPassword;
