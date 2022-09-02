import React from "react";
import { MdEmail, MdCall } from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaStripe,
  FaPaypal,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-dark-400 text-gray-200 px-3 md:px-5 lg:px-10 py-3 md:py-10 w-full flex flex-col md:flex-row justify-between items-start">
        <div className="w-full space-y-1">
          <h1 className="text-xl md:text-2xl text-white font-medium">
            Contact Us
          </h1>

          <div className="inline-flex flex-col xl:flex-row xl:items-center space-y-1 xl:space-y-0 xl:space-x-3">
            <div className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white inline-flex justify-center items-center">
                <MdCall className="w-7 h-7 text-dark-400" />
              </div>
              <p className="text-sm md:text-base">+234 905 315 6229</p>
            </div>

            <div className="inline-flex justify-end items-center text-right space-x-3">
              <div className="w-12 h-12 rounded-full bg-white inline-flex justify-center items-center">
                <MdEmail className="w-7 h-7 text-dark-400" />
              </div>
              <p className="text-sm md:text-base">help@accessorieshubb.com</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:items-end space-y-1">
          <h1 className="text-xl lg:text-2xl text-white font-medium">
            New to <span className="text-primary">Accessories Hubb</span>
          </h1>

          <p className="text-sm lg:text-base">
            Subscribe to our newsletter to get updates on our latest offers
          </p>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <input
              type="text"
              name="email"
              placeholder="Enter email address"
              className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
            />

            <button className="w-full md:w-auto px-3 py-2 bg-primary text-white rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="bg-dark-100 text-gray-200 px-3 md:px-5 lg:px-10 py-3 md:py-10 w-full flex flex-col justify-start items-start">
        <div className="w-full xl:w-2/3 flex flex-col md:flex-row justify-start items-start">
          <div className="w-1/2 space-y-1">
            <h1 className="text-xl lg:text-2xl text-white font-medium">
              Join Us On
            </h1>

            <div className="inline-flex space-x-3">
              <FaFacebook className="w-7 h-7 text-white" />
              <FaTwitter className="w-7 h-7 text-white" />
              <FaInstagram className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="w-full space-y-1">
            <h1 className="text-xl lg:text-2xl text-white font-medium">
              About Accessoriess Hubb
            </h1>

            <div className="inline-flex flex-col">
              <Link href="/about/faqs">
                <a>FAQs</a>
              </Link>

              <Link href="/about/return-policy">
                <a>Return policy</a>
              </Link>

              <Link href="/about/terms&condition">
                <a>Terms and Condition</a>
              </Link>

              <Link href="/about/privacy">
                <a>Privacy and Cookies policy</a>
              </Link>
            </div>
          </div>

          <div className="w-full space-y-1">
            <h1 className="text-xl lg:text-2xl text-white font-medium">
              Community
            </h1>

            <div className="inline-flex flex-col">
              <Link href="/community">
                <a>FAQs</a>
              </Link>

              <Link href="/about/return-policy">
                <a>Return policy</a>
              </Link>

              <Link href="/about/terms&condition">
                <a>Terms and Condition</a>
              </Link>

              <Link href="/about/privacy">
                <a>Privacy and Cookies policy</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-xl lg:text-2xl text-white font-medium">
            Payment methods and Delivery partners
          </h1>

          <div className="inline-flex space-x-3">
            <FaStripe className="w-14 h-14 md:w-20 md:h-20 text-white" />
            <FaCcPaypal className="w-14 h-14 md:w-20 md:h-20 text-white" />
            <FaCcMastercard className="w-14 h-14 md:w-20 md:h-20 text-white" />
          </div>
        </div>

        <div className="w-full flex items-center space-x-2">
          <div className="w-full h-px rounded-full bg-white" />
          <p className="whitespace-nowrap text-sm lg:text-lg font-medium italic">
            &copy; 2019 - {new Date().getFullYear()}, Accessories Hubb
          </p>
          <div className="w-full h-px rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
