/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

import { logoutUser } from "_redux/_actions/authAction";
import { Dropdown, MenuIcon, Avatar } from "components";
import { LOGIN, ORDERS, PROFILE, REGISTER } from "routes";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const AdminHeader = ({ isOpen, toggleOpen }: Props) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const { userInfo } = useAppSelector(state => state.auth)

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
          className="w-full flex items-center justify-end space-x-1"
        >
          {userInfo && (
            <Dropdown
              button={
                <Avatar size="sm" src={userInfo.imgUrl} alt={userInfo.name} />
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
