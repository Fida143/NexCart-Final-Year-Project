import React, { useState, useEffect } from "react";
import Layout from "../../Layouts/Layout";
import UserMenu from "../../components/UserMenu";
import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth } from "../../context/auth";

const Profile = () => {
  //  context

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    answer: "",
  };
  // states
  const [regInput, setRegInput] = useState(initialState);
  const [view, setView] = useState(false);
  const [confirmView, setConfirmView] = useState(false);

  const handleChange = (e) => {
    e.stopPropagation();
    setRegInput({ ...regInput, [e.target.name]: e.target.value });
  };

  // *****************    View Password    ****************8888888

  const handleView = (e) => {
    e.stopPropagation();
    setView(!view);
  };
  const handleConfirmView = (e) => {
    e.stopPropagation();
    setConfirmView(!confirmView);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(regInput);
    if (regInput.password !== regInput.confirmPassword) {
      toast.error("Confirm Password should be equal to password  ");
    } else {
      try {
        const { data } = await axios.put("/api/v1/auth/profile", {
          name: regInput.name,
          email: regInput.email,
          password: regInput.password,
          confirmPassword: regInput.confirmPassword,
          address: regInput.address,
          answer: regInput.answer,
        });
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("profile updated Successfully");
        }

        // if (res.data.success) {
        //   toast.success(res.data.message);
        //   navigate("/login");
        // } else {
        //   toast.error(res.data.message);
        // }
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong");
      }
    }
    setRegInput(initialState);
  };

  // get user Data

  useEffect(() => {
    const { email, name } = auth?.user;
    setRegInput({ ...initialState, email: email, name: name });
  }, [auth?.user]);

  return (
    <Layout title={"DashBoard- All Users  - Ecommerce App"}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="grid  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
          <div className="col-span-2 bg-gray-200 text-gray-950 p-3">
            <UserMenu />
          </div>
          <div className="col-span-3 bg-gray-200 text-gray-950 p-3">
            <h1 className="font-bold">My Profile</h1>
            <div className="flex justify-center items-center h-[90vh]">
              <div className=" w-full sm:max-w-[400px]   h-3/4 p-3 md:p-8 ">
                {/* <nav className="flex  w-full mb-3 ">
                  <nav className="nav nav-pills flex-column flex-sm-row mb-3">
                  <NavLink
                    to="/register"
                    className="  p-1 basis-1/2 text-center "
                  >
                    SignUp
                  </NavLink>
                  <NavLink to="/login" className="p-1 basis-1/2 text-center">
                    LogIn
                  </NavLink>
                </nav> */}

                <form
                  onSubmit={handleSubmit}
                  className="w-full flex justify-center flex-col"
                >
                  <div className="mb-1">
                    <label htmlFor="name" className="mb-1 font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={regInput.name}
                      placeholder="Enter your Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="email" className="mb-1 font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={regInput.email}
                      placeholder="Enter your Email"
                      onChange={handleChange}
                      disabled
                    />
                  </div>

                  <div className="mb-1 relative ">
                    <label htmlFor="password" className="mb-1 font-bold">
                      Password
                    </label>
                    <input
                      type={view ? "text" : "password"}
                      className="form-control relative"
                      id="password"
                      name="password"
                      value={regInput.password}
                      placeholder="Enter your Password"
                      onChange={handleChange}
                    />
                    <span
                      className="absolute right-3 top-9 cursor-pointer"
                      onClick={handleView}
                    >
                      {view ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                  </div>
                  <button className="absolute -top-2">hide</button>
                  <div className="mb-1 relative">
                    <label htmlFor="confirmPassword" className="mb-1 font-bold">
                      Confirm Password
                    </label>
                    <input
                      type={confirmView ? "text" : "password"}
                      className="form-control "
                      id="confirmPassword"
                      name="confirmPassword"
                      value={regInput.confirmPassword}
                      placeholder="Enter your Confirm Password"
                      onChange={handleChange}
                    />
                    <span
                      className="absolute right-3 top-9 cursor-pointer"
                      onClick={handleConfirmView}
                    >
                      {confirmView ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="address" className="mb-1 font-bold">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={regInput.address}
                      placeholder="Enter your address complete address"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="name" className="mb-1 font-bold">
                      what is your best friend name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="answer"
                      name="answer"
                      value={regInput.answer}
                      placeholder="Enter your best friend Name"
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="p-1 rounded-lg border-2 hover:bg-slate-200 border-gray-800 text-gray-800 w-fit mx-auto mt-1 font-bold"
                  >
                    Update Profile
                  </button>
                  {/* <span className="mt-3 text-center">
                    Already have an account ?{" "}
                    <NavLink className="text-sky-700" to="/login">
                      Login
                    </NavLink>
                  </span> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
