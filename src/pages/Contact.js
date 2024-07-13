import React from "react";
import Layout from "../Layouts/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact Us - Ecommerce App "}>
      <div className="grid place-content-center w-1/2 mx-auto h-[80vh]">
        <div className="flex  mx-auto p-16 ">
          <div className="w-[400px] h-[400px] p-6 overflow-hidden ">
            <img
              className=""
              src="https://png.pngtree.com/background/20210710/original/pngtree-corporate-contact-us-poster-background-picture-image_1041199.jpg"
              alt="contactUs"
            />
          </div>
          <div className="w-[400px] h-[400px] p-6">
            <h1 className="bg-dark text-white text-center text-2xl leading-tight tracking-widest uppercase">
              Contact Us
            </h1>
            <p className="mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              tempore quia, vero error architecto asperiores aut soluta ullam,
              aperiam neque aspernatur eius assumenda quis velit expedita rem
              ipsum. Inventore, voluptas?
            </p>
            <a className="block mt-6" href="tel:+91 9431372784">
              📞 +91 9431372784
            </a>
            <a href="mailto:720003hussainfida@gmail.com">
              📧 720003hussainfida@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
