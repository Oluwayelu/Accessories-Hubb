import { useEffect } from "react";

import { auth } from "utils/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { Admin, Loader, NotificationCard } from "components";
import { getNotificationAdmin } from "redux/_actions/notificationAction";

import type { GetServerSideProps } from "next";

const Notification = () => {
  const dispatch = useAppDispatch();
  const { loading, notifications } = useAppSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(getNotificationAdmin());
  }, [dispatch]);

  return (
    <Admin title="Notification">
      {loading ? (
        <Loader color="#F5BD10" className="w-full h-[50vh]" />
      ) : (
        <div className="md:px-10 space-y-5">
          {notifications.map((notification, key) => (
            <NotificationCard key={key} notification={notification} />
          ))}
        </div>
      )}
    </Admin>
  );
};

export default Notification;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth({
    admin: true,
    redirect: context.resolvedUrl,
    token: context.req.cookies.token,
  });
};
