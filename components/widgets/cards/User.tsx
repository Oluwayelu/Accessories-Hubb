import { FaTrash, FaEye } from "react-icons/fa";

import { useAppDispatch } from "hooks";
import { getDateLocale } from "utils/date";
import { Avatar, Badge, Button, Modal } from "components";

import type { IUser } from "interface";
import { deleteUser, makeAdmin } from "redux/_actions/userAction";

interface Props {
  user: IUser;
}

const UserCard = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const openDeleteModal = () => {
    document
      .getElementById(`delete-${user._id}-user-modal`)
      ?.classList.toggle("hidden");
    document
      .getElementById(`delete-${user._id}-user-modal`)
      ?.classList.toggle("block");
  };

  const openviewModal = () => {
    document
      .getElementById(`view-${user._id}-user-modal`)
      ?.classList.toggle("hidden");
    document
      .getElementById(`view-${user._id}-user-modal`)
      ?.classList.toggle("block");
  };
  return (
    <>
      <Modal size="sm" id={`delete-${user._id}-user`} title="Delete user">
        <p>Are you sure you want to delete this user?</p>
        <div className="flex items-center justify-between">
          <Button variant="outline" className="border-black text-black">
            Discard
          </Button>
          <Button
            onClick={() => dispatch(deleteUser(user._id))}
            className="bg-error text-white"
          >
            Delete
          </Button>
        </div>
      </Modal>

      <Modal id={`view-${user._id}-user`} title={user.name}>
        <div className="w-full py-3 border-y flex items-center">
          <div className="w-1/5 flex items-center justify-start">
            <Avatar size="lg" src={user.imgUrl} alt={`${user.name} avatar`} />
          </div>

          <div className="w-4/5">
            <p>
              Name: <span className="font-medium">{user?.name}</span>
            </p>
            <p>
              Email: <span className="font-medium">{user?.email}</span>
            </p>
            {user.phoneNumber && (
              <p>
                Phone Number:{" "}
                <span className="font-medium">{user.phoneNumber}</span>
              </p>
            )}
          </div>
        </div>

        <div className="w-full ">
          <p>
            Firstname: <span className="font-medium">{user.firstname}</span>
          </p>
          <p>
            Lastname: <span className="font-medium">{user.lastname}</span>
          </p>
          <p>
            Gender: <span className="font-medium">{user.gender}</span>
          </p>

          <p>
            Source: <span className="font-medium">{user.source}</span>
          </p>
          {user.referees && (
            <p>
              No. Referalls:{" "}
              <span className="font-medium">{user.referees?.length}</span>
            </p>
          )}
          <p>
            Last visited:{" "}
            <span className="font-medium">
              {getDateLocale(user.lastVisited)}
            </span>
          </p>
        </div>
        {!user.isAdmin && (
          <Button onClick={() => dispatch(makeAdmin(user._id))}>
            Make admin
          </Button>
        )}
      </Modal>

      <div className="w-full p-3 md:p-5 bg-white shadow md:shadow-none md:hover:shadow rounded-xl space-y-2 cursor-pointer">
        <div className="w-full flex justify-between items-center">
          <Badge className="w-20 bg-primary-100">{user.status}</Badge>
          <div className="w-full flex justify-end items-center gap-3">
            <button onClick={openviewModal} className="">
              <FaEye className="w-4 h-4" />
            </button>
            <button onClick={openDeleteModal}>
              <FaTrash className="w-4 h-4 text-error" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-center">
          <div className="w-full md:w-1/3 lg:w-1/4 flex items-center justify-start">
            <Avatar size="lg" src={user.imgUrl} alt={`${user.name} avatar`} />
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <p className="w-full truncate">
              Name: <span className="font-medium">{user?.name}</span>
            </p>
            <p className="w-full truncate">
              Email: <span className="font-medium">{user?.email}</span>
            </p>
            {user.phoneNumber && (
              <p className="w-full truncate">
                Phone Number:{" "}
                <span className="font-medium">{user.phoneNumber}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
