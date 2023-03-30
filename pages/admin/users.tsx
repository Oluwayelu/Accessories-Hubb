import { useEffect } from "react";

import { getSession } from "next-auth/react";

import { LOGIN } from "routes";
import { Admin, Loader, UserCard } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import { getUsers } from "redux/_actions/userAction";

import type { GetServerSideProps } from "next";

const Customers = () => {
  const dispatch = useAppDispatch();
  const { loading, users, admins, customers } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Admin title="Users">
      {loading || !users ? (
        <Loader color="#F5BD10" className="w-full h-[50vh]" />
      ) : (
        <div className="md:px-5 space-y-5">
          <div className="w-full space-y-2">
            <h3 className="text-lg md:text-xl font-bold">Admins</h3>
            <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
              {admins.map((user, key) => (
                <UserCard key={key} user={user} />
              ))}
            </div>
          </div>
          <div className="w-full space-y-2">
            <h3 className="text-lg md:text-xl font-bold">Customers</h3>
            <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
              {customers.map((user, key) => (
                <UserCard key={key} user={user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Admin>
  );
};

export default Customers;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: LOGIN + "?redirect=/admin/users",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
