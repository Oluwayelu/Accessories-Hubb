import Link from "next/link";

import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut, FiSettings } from "react-icons/fi";

import Item from "./Item";
import { ADMIN_SETTINGS, sidebar } from "routes";
import { useAppDispatch, useAppSelector } from "hooks";
import { logoutUser } from "redux/_actions/authAction";

interface Props {
  open: boolean;
}

const Sidebar = ({ open }: Props) => {
  const dispatch = useAppDispatch();
  const { firstname, lastname } = useAppSelector(
    (state) => state.auth.userInfo
  );

  return (
    <div
      className={`${open && "bg-dark/50 z-50"} fixed w-full h-[92vh] top-[8vh]`}
    >
      <div
        className={`${
          open ? "w-3/5 md:w-1/3" : "w-1/6 md:w-1/12"
        }  lg:w-1/4 xl:w-1/5 fixed h-[92vh] bg-white`}
      >
        <div className="w-full h-full pt-5 lg:pt-8 pb-16 px-3 lg:px-5 xl:px-8 flex flex-col items-center md:items-start">
          <div
            className={`${
              !open && "hidden lg:flex"
            } w-full pb-2 flex items-center gap-2`}
          >
            <div className="w-16 h-16 relative flex justify-center items-center rounded-full bg-gray-200 text-gray-600 overflow-hidden">
              <AiOutlineUser className="w-6 h-6 lg:w-8 lg:h-8 " />
            </div>
            <div className="flex flex-col font-medium">
              <span>{firstname}</span> <span>{lastname}</span>
            </div>
          </div>

          <div className="w-full h-fit py-2 space-y-1 overflow-y-auto">
            {sidebar.map((routes, key) => (
              <Item key={key} open={open} routes={routes} />
            ))}
          </div>

          <div className="w-full pt-2 space-y-1">
            <Link href={ADMIN_SETTINGS}>
              <a className="w-full p-2 flex justify-center items-center space-x-2">
                <FiSettings className="w-5 h-5" />
                <div className={`${open ? "block" : "hidden lg:block"} w-full`}>
                  <span className="text-lg">Settings</span>
                </div>
              </a>
            </Link>

            <div
              onClick={() => dispatch(logoutUser())}
              className="w-full p-2 flex justify-center items-center text-red-500 space-x-2"
            >
              <FiLogOut className="w-5 h-5" />
              <div className={`${open ? "block" : "hidden lg:block"} w-full`}>
                <span className="text-lg">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
