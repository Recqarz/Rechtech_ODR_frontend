import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1b3c7c] rounded-lg shadow dark:bg-gray-900 w-full">
      <div className="w-full mx-auto p-5">
        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
          © 2024 All Rights Reserved.{" "}
          <a href="" className="hover:underline">
            Girma Consulting Pvt. Ltd.
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
