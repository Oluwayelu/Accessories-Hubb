import Link from "next/link";

import { FiLogOut, FiSettings } from "react-icons/fi";

import Item from "./Item";
import { Avatar } from "components/widgets";
import { ADMIN_SETTINGS, sidebar } from "routes";
import { useAppDispatch, useAppSelector } from "hooks";
import { logoutUser } from "redux/_actions/authAction";

interface Props {
  open: boolean;
}

const Sidebar = ({ open }: Props) => {
  const dispatch = useAppDispatch();
  const { firstname, lastname, imgUrl } = useAppSelector(
    (state) => state.auth.userInfo
  );

  return (
    <div
      className={`${open && "bg-dark/50 z-50"} fixed w-full h-[92vh] top-[8vh]`}
    >
      <div
        className={`${
          open ? "w-3/5 md:w-1/3" : "pt-5 lg:pt-0 w-1/6 md:w-1/12"
        }  lg:w-1/4 xl:w-1/5 fixed h-[92vh] bg-white shadow-lg`}
      >
        <div className="w-full h-full px-3 lg:px-5 xl:px-8 flex flex-col justify-between items-center md:items-start">
          <div
            className={`${
              !open && "hidden lg:flex"
            } w-full h-1/6 flex items-center gap-2`}
          >
            <Avatar size="md" src={imgUrl} alt={firstname} />
            <div className="flex flex-col font-medium">
              <span>{firstname}</span> <span>{lastname}</span>
            </div>
          </div>

          <div className="w-full h-4/6 space-y-1 overflow-y-auto">
            {sidebar.map((routes, key) => (
              <Item key={key} open={open} routes={routes} />
            ))}
          </div>

          <div className="w-full h-1/6 space-y-1">
            <Link href={ADMIN_SETTINGS}>
              <a className="w-full p-2 hover:bg-primary-100 flex justify-center items-center rounded-xl gap-2">
                <FiSettings className="w-5 h-5" />
                <div className={`${open ? "block" : "hidden lg:block"} w-full`}>
                  <span className="text-lg">Settings</span>
                </div>
              </a>
            </Link>

            <div
              onClick={() => dispatch(logoutUser())}
              className="w-full p-2 flex justify-center items-center text-error hover:text-white hover:bg-error rounded-xl gap-2 cursor-pointer"
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
