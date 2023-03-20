import Link from "next/link";
import { useRouter } from "next/router";
import { FaAngleDown } from "react-icons/fa";

import type { ISidebarRoutes } from "interface";
import { useState } from "react";

interface Props {
  open: boolean;
  routes: ISidebarRoutes;
}
const Item = ({ open, routes }: Props) => {
  const [view, setView] = useState(false);
  const { pathname } = useRouter();
  const { name, Icon, link, dropdown } = routes;

  if (link) {
    return (
      <Link passHref href={link}>
        <a
          className={` w-full p-2 hover:bg-primary-100 flex justify-center items-center rounded-xl gap-2`}
        >
          <div className="w-5">
            <Icon size={20} />
          </div>
          <div className={`${open ? "block" : "hidden lg:block"} w-full`}>
            <span className="text-lg">{name}</span>
          </div>
        </a>
      </Link>
    );
  } else {
    return (
      <div className="w-full flex flex-col">
        <button
          onClick={() => setView(!view)}
          className={`${
            open ? "justify-between" : "hidden lg:flex justify-center"
          } w-full p-2 hover:bg-primary-100 flex items-center rounded-xl`}
        >
          <div
            className={`${
              open ? "w-4/5 justify-start" : "w-full justify-center"
            } flex lg:justify-start items-center gap-2`}
          >
            <div className="w-5">
              <Icon size={20} />
            </div>
            <div className={`${open ? "block" : "hidden lg:block"}`}>
              <span className="text-lg">{name}</span>
            </div>
          </div>

          <div
            className={`${
              open ? "flex" : "hidden lg:flex"
            } w-full lg:w-1/5 justify-end`}
          >
            <FaAngleDown
              className={`${view && "rotate-180"} transition duration-300`}
            />
          </div>
        </button>
        {view && (
          <div className={`${!open && "hidden lg:block"} pl-5 space-y-2`}>
            {dropdown?.map(({ name, Icon, link }, key) => (
              <Link key={key} passHref href={link}>
                <a
                  className={`${
                    pathname === link && "bg-primary-100"
                  } w-full p-2 hover:bg-primary-100 flex justify-center items-center rounded-xl gap-2`}
                >
                  <div className="w-5">
                    <Icon size={20} />
                  </div>
                  <div
                    className={`${open ? "block" : "hidden lg:block"} w-full`}
                  >
                    <span className="text-lg">{name}</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default Item;
