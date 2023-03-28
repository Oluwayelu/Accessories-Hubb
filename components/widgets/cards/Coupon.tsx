import { FaEdit, FaTrash } from "react-icons/fa";

import { Button, Input, Modal } from "components";

import type { ICoupon } from "interface";

interface Props {
  coupon: ICoupon;
}

const CouponCard = ({ coupon }: Props) => {
  const openDeleteModal = () => {
    document
      .getElementById(`delete-${coupon.title}-coupon-modal`)
      ?.classList.toggle("hidden");
    document
      .getElementById(`delete-${coupon.title}-coupon-modal`)
      ?.classList.toggle("block");
  };

  const openEditModal = () => {
    document
      .getElementById(`edit-${coupon.title}-coupon-modal`)
      ?.classList.toggle("hidden");
    document
      .getElementById(`edit-${coupon.title}-coupon-modal`)
      ?.classList.toggle("block");
  };
  return (
    <>
      <Modal id={`delete-${coupon.title}-coupon`} title="Delete Coupon">
        <p>Are you sure you want to delete this coupon?</p>
        <div className="flex items-center justify-between">
          <Button variant="outline" className="border-black text-black">
            Discard
          </Button>
          <Button className="bg-error text-white">Delete</Button>
        </div>
      </Modal>

      <Modal
        id={`edit-${coupon.title}-coupon`}
        title={`Edit Coupon: ${coupon.title}`}
      >
        <p>Are you sure you want to edit this coupon?</p>
        <div className="space-y-2">
          <Input label="Title" name="title" placeholder="Enter title" />
          <Input
            type="number"
            label="Discount"
            name="discount"
            placeholder="Enter discount"
          />
          <Input label="Sale Time" name="saleTime" placeholder="Enter title" />
          <Button className="w-full">Create coupon</Button>
        </div>
      </Modal>

      <div className="w-full p-3 md:p-5 bg-white hover:shadow rounded-xl space-y-2 cursor-pointer">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-medium">{coupon.title}</h3>

          <div className="w-full flex justify-end items-center gap-3">
            <button onClick={openEditModal} className="">
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={openDeleteModal}
              // className="p-3 bg-error text-white shadow rounded-xl"
            >
              <FaTrash className="w-4 h-4 text-error" />
            </button>
          </div>
        </div>
        <div className="">
          <p>
            Discount: <span>{coupon.discount}</span>
          </p>

          <p>
            Expires: <span>30/12/2023</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CouponCard;
