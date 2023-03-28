import { useEffect } from "react";

import { FaPlus } from "react-icons/fa";

import { Admin, Button, CouponCard, Input, Loader, Modal } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import { createCoupon, getCoupons } from "redux/_actions/couponAction";

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
            <div className="space-y-2">
              <Input label="Title" name="title" placeholder="Enter title" />
              <Input
                type="number"
                label="Discount"
                name="discount"
                placeholder="Enter discount"
              />
              <Input
                label="Sale Time"
                name="saleTime"
                placeholder="Enter title"
              />
              <Button className="w-full">Create coupon</Button>
            </div>
          </Modal>
          {/* <button
            onClick={() =>
              dispatch(
                createCoupon({
                  title: "NEW",
                  discount: 5,
                  saleTime: new Date(2023, 3, 30),
                })
              )
            }
          >
            send
          </button> */}
          <div className="w-full flex justify-end">
            <button
              onClick={createCouponModal}
              className="flex items-center p-3 bg-primary-100 rounded-xl shadow space-x-2"
            >
              <FaPlus className="w-5 h-5" />
              <p className="font-medium">Create coupon</p>
            </button>
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
