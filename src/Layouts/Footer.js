import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All right reserved &copy; NexCart 2024</h4>
      <p className="text-center mt-4">
        <Link to="/about">About</Link>|<Link to="/policy">Policy</Link>|
        <Link to="/contact">Contact</Link>|
      </p>
    </div>
  );
};

export default Footer;
