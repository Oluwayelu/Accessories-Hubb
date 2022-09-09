import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    buttonText: { type: String, required: true },
    description: { type: String, required: true },
    discount: { type: Number },
    saleTime: { type: Number },
    color: { type: String },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
export default Banner;
