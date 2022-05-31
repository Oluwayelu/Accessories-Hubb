/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion, useCycle } from "framer-motion";

import { FaOpencart } from "react-icons/fa";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiFillHeart,
  AiOutlineMenu,
} from "react-icons/ai";

import { getError } from "utils/error";
import { MenuIcon, Drawer, Search } from "./components";
import { getCategories } from "redux/_actions/ProductAction";
import { IState } from "interface";

const userInfo = {
  _id: "62888d9632498de19b0adea2",
  email: "admin@ahubb.com",
  isAdmin: true,
  lastname: "Oluwayelu",
  firstname: "Ifeoluwa",
  middlename: "David",
};

const cartItems = {
  totalQuantity: 3,
};

const Header = () => {
  const { pathname, push } = useRouter();
  const [openSearch, toggleOpenSearch] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const home = pathname === "/";
  const auth = pathname === "/login" || pathname === "/register";

  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state: IState) => state.cart);
  // const userInfo = useSelector((state: IState) => state.user.userInfo);
  const categories = useSelector((state: IState) => state.product.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    push(`/search?query=${query}`);
  };

  return (
    <div className="w-full shadow fixed top-0 left-0 right-0 bg-white py-2 flex flex-col items-center justify-around border-b-2 border-b-dark-500 divide-y-2 divide-dark-500 z-50">
      <div className="w-full px-3 md:px-5 lg:px-10 flex items-center md:justify-around">
        <MenuIcon toggle={() => toggleOpen()} />
        {/* <AiOutlineMenu className="w-10 h-10" /> */}
        <Drawer open={isOpen} />
        {openSearch && <Search close={() => toggleOpenSearch(false)} />}
        <Link href="/" passHref>
          <div className="relative w-40 h-12 md:w-60 md:h-20 cursor-pointer">
            <Image priority src="/images/logo/logo.png" layout="fill" alt="" />
          </div>
        </Link>
        <div
          className={`${
            auth && "hidden"
          } w-full flex items-center justify-end space-x-3`}
        >
          <button
            onClick={() => toggleOpenSearch(!openSearch)}
            className={`${home && "hidden"}`}
          >
            <AiOutlineSearch className="w-7 h-7 text-gray-600 lg:hidden" />
          </button>
          <form
            onSubmit={submitHandler}
            className="relative hidden lg:flex items-center px-2 py-1 border-2 border-gray-600 rounded-full transition-all ease-in-out duration-500 peer"
          >
            <input
              placeholder="search..."
              onChange={queryChangeHandler}
              className="pl-3 border-none inline"
            />
            <button type="submit">
              <AiOutlineSearch className="w-5 h-5 md:w-7 md:h-7 text-gray-600" />
            </button>
          </form>
          {userInfo?.firstname ? (
            <div className="w-8 h-8 relative flex justify-center items-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white overflow-hidden">
              <Image
                layout="fill"
                alt={userInfo.firstname}
                src="/images/avatar/guy_4.png"
                className="filter object-cover"
              />
            </div>
          ) : (
            <Link href="/login?redirect=/">
              <a className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white">
                <AiOutlineUser className="w-5 h-5 " />
              </a>
            </Link>
          )}
          <p className="font-medium hidden md:block">
            Hello,{" "}
            {userInfo?.firstname ? (
              <span>{`${userInfo.firstname} ${userInfo.lastname}`}</span>
            ) : (
              <span>
                <Link href="/login?redirect=/">
                  <a className="text-primary">Login</a>
                </Link>{" "}
                or{" "}
                <Link href="/register?redirect=/">
                  <a className="text-primary">Register</a>
                </Link>
              </span>
            )}
          </p>
          <Link href="/cart">
            <a className="relative p-2">
              {totalQuantity > 0 && (
                <div className="absolute w-5 h-5 flex justify-center items-center top-1 right-0 text-white text-xs bg-primary rounded-full z-30">
                  {totalQuantity}
                </div>
              )}
              <FaOpencart className="w-7 h-7" />
            </a>
          </Link>
        </div>
      </div>
      <div
        className={`${
          !home && "hidden"
        } py-1 px-3 md:px-5 lg:px-10 w-full flex items-center justify-between md:hidden`}
      >
        <form
          onSubmit={submitHandler}
          className="relative md:hidden w-full flex items-center px-2 py-1 border-2 border-gray-600 rounded-full transition-all ease-in-out duration-500 peer"
        >
          <input
            placeholder="search..."
            onChange={queryChangeHandler}
            className="w-full pl-3 border-none"
          />
          <button type="submit">
            <AiOutlineSearch className="w-7 h-7 text-gray-600" />
          </button>
        </form>
      </div>
      <div
        className={`${
          auth && "hidden"
        } w-full px-3 md:px-5 lg:px-10 hidden md:flex flex-shrink-0  items-center justify-start overflow-x-auto scroll-p-5 snap-x scroll-smooth md:text-lg font-medium space-x-3`}
      >
        <Link href="/about">
          <a className="hover:text-primary">About</a>
        </Link>
        <Link href="/favourites">
          <a className="inline-flex items-center">
            <AiFillHeart className="w-5 h-5 text-primary" /> <p>Favourites</p>
          </a>
        </Link>
        {categories &&
          categories.map(({ category }, index) => (
            <Link key={index} href={`/search?category=${category}`}>
              <a className="capitalize">{category}</a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Header;
