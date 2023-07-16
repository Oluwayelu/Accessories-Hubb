import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { IoBusiness } from "react-icons/io5";
import { IoIosContact, IoIosDocument } from "react-icons/io";
import { AiOutlineUser, AiFillHeart } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

import {
  ABOUT,
  CONTACT,
  FAVOURITES,
  LOGIN,
  ORDERS,
  PROFILE,
  REGISTER,
} from "routes";
import { Avatar } from "components"
import { logoutUser } from "redux/_actions/authAction";
import { getCategories } from "redux/_actions/productAction";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";

import type { NextPage } from "next";
import { useNoScroll } from "hooks";

type Props = {
  open: boolean;
};

const variants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      staggerDirection: 1,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const items = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Drawer: NextPage<Props> = ({ open }) => {
  useNoScroll();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const { pathname } = useRouter();

  const dispatch = useAppDispatch();
  const { 
    product: {category, loading },
    auth: { userInfo }
} = useAppSelector((state) => state);

  useLayoutEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed md:hidden w-full h-[92vh] top-[8vh] inset-0 z-50 bg-dark/50`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
        className="fixed h-[92vh] bg-white dark:bg-dark-100"
      >
        <motion.ul
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          className="pt-5 pb-16 px-5 w-full h-full flex flex-col justify-between"
        >
          {session?.user && (
            <motion.div variants={items} className="pb-2 space-y-1">
              <Avatar size="md" src={userInfo.imgUrl} alt={userInfo.name} />
              <p className="font-bold">{session?.user?.name}</p>
            </motion.div>
          )}

          <motion.div
            variants={items}
            className="w-full h-fit py-2 space-y-5 overflow-y-auto"
          >
            <div className="w-full inline-flex flex-col space-y-3">
              <Link href={FAVOURITES}>
                <a className="inline-flex items-center space-x-2">
                  <AiFillHeart className="w-5 h-5 text-primary" />{" "}
                  <p>Favourites</p>
                </a>
              </Link>
              <Link href={ABOUT}>
                <a className="inline-flex items-center space-x-2">
                  <IoBusiness className="w-5 h-5 text-primary" /> <p> About</p>
                </a>
              </Link>
              <Link href={CONTACT}>
                <a className="inline-flex items-center space-x-2">
                  <IoIosContact className="w-5 h-5 text-primary" />{" "}
                  <p>Contacts</p>
                </a>
              </Link>
            </div>
            <div className="w-full space-y-5">
              <h2 className="font-bold">Categories</h2>
              <div className="inline-flex flex-col space-y-3">
                {loading ? (
                  <Skeleton circle width={40} height={40} count={3} />
                ) : (
                  category.map(({ category, image }, index) => (
                    <Link key={index} href={`/search?category=${category}`}>
                      <a className="w-full flex items-center capitalize hover:text-primary-100 space-x-2">
                        <div className="bg-primary-100 w-10 h-10 inline-flex flex-none justify-center items-center rounded-full shadow overflow-hidden">
                          <div className="relative w-1/2 h-1/2">
                            <Image
                              alt={category}
                              src={image[0]}
                              layout="fill"
                            />
                          </div>
                        </div>
                        <p>{category}</p>
                      </a>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="w-full space-y-5">
              <h2 className="font-bold">Dashboard</h2>
              <div className="inline-flex flex-col space-y-3">
                <Link href={PROFILE}>
                  <a className="capitalize hover:text-primary-100">Profile</a>
                </Link>
                <Link href={ORDERS}>
                  <a className="capitalize hover:text-primary-100">Orders</a>
                </Link>
              </div>
            </div>

            <div className="w-full space-y-5">
              <h2 className="font-bold">Themes</h2>
              <div
                onClick={changeTheme}
                className="w-full flex items-center space-x-2"
              >
                <div className="w-5 h-5 rounded-full dark:bg-white bg-dark" />
                <div>{theme === "light" ? "Dark" : "Light"}</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={items} className="pt-2">
            {!session?.user ? (
              <div className="w-full flex flex-col space-y-3">
                <Link href={`${LOGIN}?redirect=${pathname}`}>
                  <a className="w-full text-center border-2 border-primary-100 rounded-lg px-5 py-2 ">
                    Login
                  </a>
                </Link>
                <Link href={`${REGISTER}?redirect=${pathname}`}>
                  <a className="w-full text-center bg-primary-100 rounded-lg px-5 py-2">
                    Register
                  </a>
                </Link>
              </div>
            ) : (
              <div
                onClick={() => dispatch(logoutUser())}
                className="w-full flex items-center text-red-500 space-x-2"
              >
                <FiLogOut className="w-5 h-5" />
                <p>Logout</p>
              </div>
            )}
          </motion.div>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Drawer;
