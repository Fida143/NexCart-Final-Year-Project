import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = {
    email: "",
    password: "",
  };

  const [logInput, setLogInput] = useState(initialState);
  const [auth, setAuth] = useAuth();

  const handleChange = (e) => {
    e.stopPropagation();
    setLogInput({ ...logInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email: logInput.email,
        password: logInput.password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
    setLogInput(initialState);
  };
  return (
    <Layout title={"Login"}>
      <div className="flex justify-center items-center h-[90vh]">
        <div className=" w-full sm:max-w-[400px]   h-3/4 p-3 md:p-8 ">
          <nav className="nav mb-3 ">
            <NavLink to="/register" className="p-1 basis-1/2 text-center">
              SignUp
            </NavLink>
            <NavLink to="/login" className="p-1 basis-1/2 text-center">
              LogIn
            </NavLink>
          </nav>

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
                value={logInput.email}
                placeholder="Enter your Email"
                onChange={handleChange}
                required
              />
            </div>
            <label htmlFor="password" className="mb-2 font-bold">
              Password
            </label>
            <div className="mb-2">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={logInput.password}
                placeholder="Enter your Password"
                onChange={handleChange}
                required
              />
            </div>
            <span className="mt-3 ">
              <NavLink className="text-sky-700" to="/forgot-password">
                Forgot Password ?
              </NavLink>
            </span>

            <button
              type="submit"
              className="p-1 rounded-lg border-2 hover:bg-slate-200 border-gray-800 text-gray-800 w-fit mx-auto mt-1 font-bold"
            >
              Login
            </button>
            <span className="mt-3 text-center">
              Don't have an account ?{" "}
              <NavLink className="text-sky-700" to="/register">
                Sign Up
              </NavLink>
            </span>
          </form>
        </div>
      </div>

      {/* <div className="authentication ">
        <div className="container w-50 h-100 bg-black">
          <nav className="nav nav-pills flex-column flex-sm-row mb-3">
            <NavLink
              to="/register"
              className="flex-sm-fill text-sm-center nav-link "
            >
              SignUp
            </NavLink>
            <NavLink
              to="/login"
              className="flex-sm-fill text-sm-center nav-link"
              href="#"
            >
              LogIn
            </NavLink>
          </nav>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-3">
              <label htmlFor="email " className="mb-3">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={logInput.email}
                placeholder="Enter your Email"
                onChange={handleChange}
                required
              />
            </div>
            <label htmlFor="password " className="mb-3 ">
              Password
            </label>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={logInput.password}
                placeholder="Enter your Password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              LogIn
            </button>
          </form>
        </div>
      </div> */}
    </Layout>
  );
};

export default Login;
