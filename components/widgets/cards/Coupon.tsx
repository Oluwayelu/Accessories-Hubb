import * as Yup from "yup";
import { Formik } from "formik";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useAppDispatch } from "hooks";
import { getDateLocale } from "utils/date";
import { Button, Input, Modal } from "components";
import { deleteCoupon, editCoupon } from "redux/_actions/couponAction";

import type { ICoupon } from "interface";

interface Props {
  coupon: ICoupon;
}

const CouponCard = ({ coupon }: Props) => {
  const dispatch = useAppDispatch();
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
      <Modal
        size="sm"
        id={`delete-${coupon.title}-coupon`}
        title="Delete Coupon"
      >
        <p>Are you sure you want to delete this coupon?</p>
        <div className="flex items-center justify-between">
          <Button variant="outline" className="border-black text-black">
            Discard
          </Button>
          <Button
            onClick={() => dispatch(deleteCoupon(coupon._id))}
            className="bg-error text-white"
          >
            Delete
          </Button>
        </div>
      </Modal>

      <Modal
        id={`edit-${coupon.title}-coupon`}
        title={`Edit Coupon: ${coupon.title}`}
      >
        <Formik
          initialValues={{
            title: coupon.title,
            discount: coupon.discount,
            saleTime: coupon.saleTime.toString().substring(0, 16),
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Title is required"),
            discount: Yup.number().required("Discount is required"),
            saleTime: Yup.date().required("Sale Time is required"),
          })}
          onSubmit={async (values) => {
            dispatch(editCoupon(coupon._id, values));
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                formik
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
              <Input
                formik
                type="number"
                label="Discount"
                name="discount"
                value={values.discount}
                onChange={handleChange}
                placeholder="Enter discount"
              />
              <Input
                formik
                type="datetime-local"
                label="Sale Time"
                name="saleTime"
                value={values.saleTime}
                onChange={handleChange}
                placeholder="Enter title"
              />
              <Button className="w-full">Edit coupon</Button>
            </form>
          )}
        </Formik>
      </Modal>

      <div className="w-full p-3 md:p-5 bg-white shadow md:shadow-none md:hover:shadow rounded-xl space-y-2 cursor-pointer">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-medium">{coupon.title}</h3>

          <div className="w-full flex justify-end items-center gap-3">
            <button onClick={openEditModal} className="">
              <FaEdit className="w-4 h-4" />
            </button>
            <button onClick={openDeleteModal}>
              <FaTrash className="w-4 h-4 text-error" />
            </button>
          </div>
        </div>
        <div className="">
          <p>
            Discount: <span className="font-medium">{coupon.discount}%</span>
          </p>

          <p>
            Expires:{" "}
            <span className="font-medium">
              {getDateLocale(coupon.saleTime)}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CouponCard;
