import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const SpinnerPage = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);

    if (count === 0)
      navigate(`/${path}`, {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      {/* <Spinner className="w-12 h-12 " /> */}
      <h1>
        {" "}
        You are redicting to login page in <b>{count}</b> seconds
      </h1>
    </div>
  );
};

export default SpinnerPage;
