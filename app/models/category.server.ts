import mongoose, { Schema, Model } from "mongoose";
import type { ICategory } from "../interfaces/category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parentId: [{ type: Schema.Types.ObjectId, ref: "Category", default: null }],
    status: { type: Number, enum: [1, 0], default: 1 },
  },
  { timestamps: true, collection:"categories" }
);

const Category: Model<ICategory> = 
  mongoose.models.Category || 
  mongoose.model<ICategory>("Category", categorySchema);

export default Category;