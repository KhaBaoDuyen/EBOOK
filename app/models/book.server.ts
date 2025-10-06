import mongoose, { Schema, Model } from "mongoose";
import type { IBook } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    cover: { type: String, required: true },
    description: { type: String, required: true },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    releaseDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    filePath: { type: String, required: true },
    mimeType: { type: String },
    status: { type: Number, enum: [1, 0], default: 1 },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: "Category"
    }]
  },
  {
    timestamps: true,
  }
);

const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);

export default Book;
