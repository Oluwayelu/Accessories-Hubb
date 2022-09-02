/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCycle } from "framer-motion";
import { useSession } from "next-auth/react";
import { SetStateAction, useLayoutEffect, useState } from "react";

import {
  AiOutlineSearch,
  AiOutlineUser,
  AiFillHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";

import { CART, LOGIN, REGISTER } from "routes";
import { logoutUser } from "redux/_actions/userAction";
import { MenuIcon, Drawer, Search } from "./components";
import { getCategories } from "redux/_actions/ProductAction";
import { useAppSelector, useAppDispatch } from "hooks/useReactRedux";

import type { FC } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { Session } from "next-auth";

type Props = {
  session?: Session;
};

const Header: FC<Props> = () => {
  const { data: session } = useSession();
  const { pathname, push } = useRouter();
  const [openSearch, toggleOpenSearch] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const home = pathname === "/";
  const auth = pathname === LOGIN || pathname === REGISTER;

  const dispatch = useAppDispatch();
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const categories = useAppSelector((state) => state.product.category);

  useLayoutEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
    <div className="w-full shadow sticky top-0 left-0 right-0 bg-white py-1 flex flex-col items-center justify-around border-b-2 border-b-dark-500 z-50">
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
            className="relative hidden w-80 lg:flex items-center border-2 border-gray-600 rounded-xl transition-all ease-in-out duration-500 peer overflow-hidden"
          >
            <input
              placeholder="Search For"
              onChange={queryChangeHandler}
              className="w-full px-3 border-none inline"
            />
            <button type="submit" className="p-1 bg-primary rounded-lg">
              <AiOutlineSearch className="w-5 h-5 md:w-7 md:h-7 text-dark" />
            </button>
          </form>

          {session?.user ? (
            <div
              onClick={() => dispatch(logoutUser())}
              className="w-8 h-8 relative flex justify-center items-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white overflow-hidden"
            >
              {" "}
              {session.user.image ? (
                <Image
                  layout="fill"
                  alt={session?.user?.name as string}
                  src={session?.user?.image}
                  className="filter object-cover"
                />
              ) : (
                <AiOutlineUser className="w-5 h-5 " />
              )}
            </div>
          ) : (
            <Link href={`${LOGIN}?redirect=/`}>
              <a className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white">
                <AiOutlineUser className="w-5 h-5 " />
              </a>
            </Link>
          )}
          <p className="font-medium hidden md:block">
            Hello,{" "}
            {session?.user?.name ? (
              <span>{session?.user.name}</span>
            ) : (
              <span>
                <Link href={`${LOGIN}?redirect=/`}>
                  <a className="text-primary">Login</a>
                </Link>{" "}
                or{" "}
                <Link href={`${REGISTER}?redirect=/`}>
                  <a className="text-primary">Register</a>
                </Link>
              </span>
            )}
          </p>
          <Link href={CART}>
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
        } px-3 md:px-5 lg:px-10 w-full flex items-center justify-between md:hidden`}
      >
        <form
          onSubmit={submitHandler}
          className="relative md:hidden w-full flex items-center border-2 border-gray-600 rounded-xl transition-all ease-in-out duration-500 peer overflow-hidden"
        >
          <input
            placeholder="Search For"
            onChange={queryChangeHandler}
            className="w-full pl-3 border-none"
          />
          <button type="submit" className="p-1 bg-primary rounded-lg">
            <AiOutlineSearch className="w-7 h-7 text-dark" />
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
