/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { FiLogOut } from "react-icons/fi";
import { AiOutlineSearch, AiOutlineUser, AiFillHeart } from "react-icons/ai";

import { useAppDispatch } from "hooks/useReactRedux";
import { logoutUser } from "redux/_actions/userAction";
import { LOGIN, ORDERS, PROFILE, REGISTER } from "routes";
import { Dropdown, MenuIcon, SearchMobile } from "components";

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const AdminHeader = ({ isOpen, toggleOpen }: Props) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const [openSearch, toggleOpenSearch] = useState(false);

  const home = pathname === "/";
  const auth = pathname === LOGIN || pathname === REGISTER;

  const dispatch = useAppDispatch();
  return (
    <div className="w-full h-[8vh] shadow sticky top-0 left-0 right-0 bg-white py-1 flex flex-col items-center justify-around border-b-2 border-b-dark-500 z-50">
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="w-full h-full px-3 md:px-5 lg:px-10 flex items-center md:justify-around"
      >
        <div className="w-full h-full inline-flex">
          <MenuIcon size="lg" toggle={() => toggleOpen()} />
          {openSearch && <SearchMobile close={() => toggleOpenSearch(false)} />}
          <Link href="/" passHref>
            <div className="relative w-44 h-full cursor-pointer">
              <Image
                priority
                src="/images/logo/logo.png"
                layout="fill"
                alt=""
              />
            </div>
          </Link>
        </div>

        <div
          className={`${
            auth && "hidden"
          } w-full hidden lg:flex items-center justify-center gap-5`}
        >
          <Link href="/favourites">
            <a className="inline-flex items-center">
              <AiFillHeart className="w-5 h-5 text-primary" /> <p>Favourites</p>
            </a>
          </Link>
          <Link href="/about">
            <a className="hover:text-primary">About</a>
          </Link>
          <Link href="/contact">
            <a className="hover:text-primary">Contacts</a>
          </Link>
          <Link href="/search?category=all">
            <a className="hover:text-primary">Categories</a>
          </Link>
        </div>

        <div
          className={`${
            auth && "hidden"
          } w-full flex items-center justify-end space-x-1`}
        >
          <button
            onClick={() => toggleOpenSearch(!openSearch)}
            className={`${home && "hidden"}`}
          >
            <AiOutlineSearch className="w-7 h-7 text-gray-600 lg:hidden" />
          </button>

          {session?.user && (
            <Dropdown
              button={
                <div className="w-8 h-8 relative flex justify-center items-center rounded-full bg-gray-200 text-gray-600 cursor-pointer overflow-hidden">
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
              }
            >
              <div className="w-full pb-2 flex flex-col space-y-1">
                <Link href={PROFILE}>
                  <a className="text-sm">Profile</a>
                </Link>
                <Link href={ORDERS}>
                  <a className="text-sm">Orders</a>
                </Link>
              </div>

              <button
                onClick={() => dispatch(logoutUser())}
                className="w-full mt-2 px-3 py-1 rounded-lg flex items-center bg-error text-white text-sm space-x-1"
              >
                <FiLogOut />
                <p>Logout</p>
              </button>
            </Dropdown>
          )}

          <div className="font-medium hidden md:block">
            {session?.user?.name ? (
              <span>Hello, {session?.user.name}</span>
            ) : (
              <div className="space-x-3">
                <Link href={`${LOGIN}?redirect=${pathname}`}>
                  <a className="py-2 ">Login</a>
                </Link>
                <Link href={`${REGISTER}?redirect=${pathname}`}>
                  <a className="w-28 inline-flex justify-center bg-primary-100 hover:bg-primary py-2 rounded-full">
                    Register
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHeader;
