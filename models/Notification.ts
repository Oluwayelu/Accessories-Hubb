import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    note: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    readBy: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
