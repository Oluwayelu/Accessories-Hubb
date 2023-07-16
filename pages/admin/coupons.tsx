import { useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { FaPlus } from "react-icons/fa";

import { auth } from "utils/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { createCoupon, getCoupons } from "_redux/_actions/couponAction";
import { Admin, Button, CouponCard, Input, Loader, Modal } from "components";

import type { GetServerSideProps } from "next";

const Coupons = () => {
  const dispatch = useAppDispatch();
  const { loading, coupons } = useAppSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const createCouponModal = () => {
    document.getElementById("create-coupon-modal")?.classList.toggle("hidden");
    document.getElementById("create-coupon-modal")?.classList.toggle("block");
  };

  return (
    <Admin title="Coupons" goBack="/admin/dashboard">
      {loading || !coupons ? (
        <Loader color="#F5BD10" className="w-full h-[50vh]" />
      ) : (
        <div className="space-y-5">
          <Modal id="create-coupon" title="Create Coupon">
            <Formik
              initialValues={{
                title: "",
                discount: "",
                saleTime: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required("Title is required"),
                discount: Yup.number().required("Discount is required"),
                saleTime: Yup.date().required("Sale Time is required"),
              })}
              onSubmit={async (values) => {
                dispatch(createCoupon(values));
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
                  <Button type="submit" className="w-full">
                    Create coupon
                  </Button>
                </form>
              )}
            </Formik>
          </Modal>
          <div className="w-full flex justify-end">
            <Button
              onClick={createCouponModal}
              className="flex items-center p-3 bg-primary-100 rounded-xl shadow space-x-2"
            >
              <FaPlus className="w-5 h-5" />
              <p className="font-medium">Create coupon</p>
            </Button>
          </div>
          <div className="w-full grid md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-5">
            {coupons.map((coupon, key) => (
              <CouponCard key={key} coupon={coupon} />
            ))}
          </div>
        </div>
      )}
    </Admin>
  );
};

export default Coupons;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth({
    admin: true,
    redirect: context.resolvedUrl,
    token: context.req.cookies.token,
  });
};
