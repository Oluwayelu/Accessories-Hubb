import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { accountSourceEnum, accountStatusEnum } from "utils/enums";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    middlename: { type: String },
    name: { type: String },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imgUrl: { type: String },
    gender: { type: String },
    phoneNumber: { type: String },
    confirmationCode: { type: String },
    status: {
      type: String,
      enum: [...Object.values(accountStatusEnum)],
      default: accountStatusEnum.PENDING,
    },
    source: {
      type: String,
      enum: [...Object.values(accountSourceEnum)],
      default: accountSourceEnum.LOCAL,
    },
    isAdmin: { type: Boolean, required: true, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: {
      type: Date,
    },
    lastVisited: { type: Date, default: new Date() },
    refId: {
      type: String,
      required: [true, "referral ID required"],
    },
    referees: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    next();
  }

  this.name = `${this.firstname} ${this.lastname}`;
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = Date.now();

  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
