import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    discount: { type: Number, required: true },
    saleTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export default Coupon;
