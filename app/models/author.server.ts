import mongoose, { Schema, Model } from "mongoose";
import type { IAuthor } from "~/interfaces/author.interface";

const authorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    avatar: { type: String },
    bio: { type: String },
    nationality: { type: String },
    birthDate: { type: Date },
  },
  { timestamps: true , collection:"authors" }
);

const Author: Model<IAuthor> =
  mongoose.models.Author || 
  mongoose.model<IAuthor>("Author", authorSchema, "authors");

export default Author;