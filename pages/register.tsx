import { motion } from "framer-motion";
import type { NextPage } from "next";

import { Landing } from "layout";
import Link from "next/link";

const Register: NextPage = () => {
  return (
    <Landing screen title="Register | Accessories Hubb">
      <div className="w-full h-full px-3 md:px-5 lg:px-10 flex flex-col justify-center items-center ">
        <motion.div
          whileInView={{ y: [100, 0], opacity: [0, 1], scale: [0, 1] }}
          className="w-full md:w-1/2 xl:w-1/3 space-y-5"
        >
          <div className="w-full p-2 md:p-5 rounded-xl md:shadow-lg space-y-5">
            <h1 className="text-3xl font-medium">Create account</h1>
            <form className="flex flex-col items-start space-y-3">
              <div className="w-full flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-2">
                <div className="w-full flex flex-col-reverse ">
                  <input
                    placeholder="example@gmail.com"
                    className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
                  />
                  <label className=" text-sm font-semibold">Firstname</label>
                </div>

                <div className="w-full flex flex-col-reverse ">
                  <input
                    placeholder="example@gmail.com"
                    className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
                  />
                  <label className=" text-sm font-semibold">Lastname</label>
                </div>
              </div>

              <div className="w-full flex flex-col-reverse ">
                <input
                  placeholder="example@gmail.com"
                  className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
                />
                <label className=" text-sm font-semibold">
                  Email or mobile phone number
                </label>
              </div>

              <div className="w-full flex items-start flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-2">
                <div className="w-full flex flex-col-reverse ">
                  <p className="text-xs">
                    password most be at least 6 characters
                  </p>
                  <input
                    type="password"
                    placeholder="password"
                    className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
                  />
                  <label className=" text-sm font-semibold">Password</label>
                </div>

                <div className="w-full flex flex-col-reverse ">
                  <input
                    type="password"
                    placeholder="password"
                    className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
                  />
                  <label className=" text-sm font-semibold">
                    Confirm Password
                  </label>
                </div>
              </div>

              <button className="py-2 w-full font-medium bg-primary rounded">
                Continue
              </button>

              <p className="text-sm">
                By creating account, you agree to Accessories Hubb{" "}
                <span className="text-primary">Terms & Condition</span> and{" "}
                <span className="text-primary">Privacy Notice</span>
              </p>
            </form>
          </div>

          <div className="w-full flex justify-center items-center space-x-2">
            <div className="w-full h-0.5 rounded-full bg-gray-500" />
            <div className="w-full whitespace-nowrap">
              Already have an account?
            </div>
            <div className="w-full h-0.5 rounded-full bg-gray-500" />
          </div>

          <Link href="/login" passHref>
            <button className="py-2 w-full font-medium bg-gray-300 rounded">
              Login to account
            </button>
          </Link>
        </motion.div>
      </div>
    </Landing>
  );
};

export default Register;
