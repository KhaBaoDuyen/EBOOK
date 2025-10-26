import mongoose, { Schema, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    bookId: { type: Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, required: true },
    comment: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
