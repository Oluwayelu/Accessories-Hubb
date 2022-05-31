import type { NextPage } from "next";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Landing } from "layout";
import { IState } from "interface";
import { loginUser } from "redux/_actions/userAction";

type Props = {
  loginUser: Function;
};

const Login: NextPage<Props> = () => {
  const { query, push } = useRouter();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state: IState) => state);
  const [details, setDetails] = useState({ email: "", password: "" });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: any }) => {
    e.preventDefault();
    dispatch(loginUser(details));
  };

  useEffect(() => {
    if (user.userInfo) {
      push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Landing screen title="Login | Accessories Hubb">
      <div className="w-full h-full px-3 md:px-5 lg:px-10 flex flex-col justify-center items-center ">
        <motion.div
          whileInView={{ y: [100, 0], opacity: [0, 1], scale: [0, 1] }}
          className="w-full md:w-1/2 lg:w-1/3 space-y-5"
        >
          {error && (
            <motion.div
              whileInView={{ y: [-100, 0], opacity: [0, 1] }}
              className="w-full py-2 text-center bg-[#fd1b1b] text-white font-medium"
            >
              {error}
            </motion.div>
          )}
          <div className="w-full p-2 md:p-5 rounded-xl md:shadow-lg space-y-5">
            <h1 className="text-3xl font-medium">Login</h1>
            <form className="flex flex-col items-start space-y-3">
              <div className="w-full flex flex-col-reverse ">
                <input
                  required
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
                />
                <label className=" text-sm font-semibold">
                  Email or mobile phone number
                </label>
              </div>

              <div className="w-full flex flex-col-reverse ">
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
                />
                <label className=" text-sm font-semibold">Password</label>
              </div>

              <button
                onClick={handleSubmit}
                className="py-2 w-full font-medium bg-primary rounded"
              >
                {details.email && details.password
                  ? "Login"
                  : loading
                  ? "Loading..."
                  : "Continue"}
              </button>

              <p className="text-sm">
                By continuing you agree to Accessories Hubb{" "}
                <span className="text-primary">Terms & Condition</span> and{" "}
                <span className="text-primary">Privacy Notice</span>
              </p>
            </form>
          </div>

          <div className="w-full flex justify-center items-center space-x-2">
            <div className="w-full h-0.5 rounded-full bg-gray-500" />
            <div className="w-full whitespace-nowrap">
              New to Accessories Hubb?
            </div>
            <div className="w-full h-0.5 rounded-full bg-gray-500" />
          </div>

          <Link href="/register" passHref>
            <button className="py-2 w-full font-medium bg-gray-300 rounded">
              Create an account
            </button>
          </Link>
        </motion.div>
      </div>
    </Landing>
  );
};

export default Login;
