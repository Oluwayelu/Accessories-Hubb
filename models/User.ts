import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    middlename: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imgUrl: { type: String },
    phoneNumber: { type: String },
    verified: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
