import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { FiLogOut } from "react-icons/fi";

import { dashboard } from "routes";
import { logoutUser } from "_redux/_actions/authAction";
import { Button, Landing, Avatar, PageLoader  } from "components";
import { useAppSelector, useAppDispatch } from "hooks/useReactRedux";

import type { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

const Dashboard = ({ title, description, children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector((state) => state.auth);

  const { pathname } = router
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      // setTimeout(() => setLoading(false), 5000);
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteComplete);
    };
  }, [router.events]);

  return (
    <Landing
      title={title}
      description={description}
      className="p-3"
    >
      <div className="max-w-7xl mx-auto p-2 space-y-5 md:space-y-10">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-medium">{title}</h1>

          <Button onClick={() => dispatch(logoutUser())} className="w-fit flex justify-center items-center text-white bg-error rounded-xl gap-1">
            <FiLogOut className="w-5 h-5" />
            <p className="hidden md:block md:text-lg">Logout</p>
          </Button>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-3 lg:space-y-0 lg:space-x-5">
          <div className="w-full lg:w-1/4 flex lg:flex-col justify-center border-b-2 border-b-black lg:border-b-0 space-y-3">
            <div className="w-1/2 lg:w-full inline-flex flex-col justify-center py-3 lg:border-b-2 lg:border-b-black space-y-5">
              <Avatar size="lg" src={userInfo.imgUrl} alt={userInfo.name} />
              <div>
                <h1 className="text-2xl md:text-3xl font-medium">{userInfo.name}</h1>
                <p>{userInfo.email}</p>
              </div>
            </div>

            <div className="w-1/2 lg:w-full flex flex-col lg:items-start items-end space-y-3">
              {
                dashboard.map(({name, link}, key) => (
                  <Link key={key} href={link}>
                    <a className={`${
                        pathname === link && "text-primary font-medium"
                      } text-sm md:text-lg lg:text-2xl hover:font-medium`}>{name}</a>
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="relative w-full lg:w-2/3 h-full space-y-3">{loading ? <PageLoader /> : children}</div>
        </div>
      </div>
    </Landing>
  );
};

export default Dashboard;
