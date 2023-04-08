import { useState } from "react";

import { FaAngleDown } from "react-icons/fa";

import { Avatar } from "components";
import { getDateLocale } from "utils/date";
import { useAppDispatch, useAppSelector } from "hooks";
import { readNotificationAdmin } from "redux/_actions/notificationAction";

import type { INotification } from "interface";

interface Props {
  notification: INotification;
}

const Notification = ({ notification }: Props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const {
    _id,
    user,
    readBy,
    createdAt,
    note: { title, description },
  } = notification;

  const { userInfo } = useAppSelector((state) => state.auth);
  const read = readBy.includes(userInfo._id);

  const toggle = () => {
    setOpen(!open);

    if (!read) {
      dispatch(readNotificationAdmin(_id));
    }
  };

  return (
    <div
      className={`${
        read ? "bg-white" : "border-2 border-primary"
      } w-full min-h-20 p-5 bg-white shadow rounded-xl`}
    >
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-medium">{title}</h2>

        <button onClick={toggle}>
          <FaAngleDown
            className={`${open && "rotate-180"} transition duration-300`}
          />
        </button>
      </div>

      {open && <div className="py-2">{description}</div>}
      {/* footer */}
      <div className="pt-2 w-full flex items-center justify-between border-t">
        <div className="inline-flex items-center gap-2">
          <Avatar size="sm" src={user.imgUrl} alt={title} />
          <p className="font-medium">{user.name}</p>
        </div>
        <p className="text-sm font-medium">{getDateLocale(createdAt)}</p>
      </div>
    </div>
  );
};

export default Notification;
