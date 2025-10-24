import mongoose, { Schema, model } from "mongoose";
import type ILibrary from "~/interfaces/library.interface";

const librarySchema = new Schema<ILibrary>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    isSaved: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    hasRead: { type: Boolean, default: false },
    isFinished: { type: Boolean, default: false },
    lastReadAt: { type: Date, default: null },
    isFavorite: { type: Boolean, default: false },
    bookmarks: [
      {
        pageIndex: Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],

  },
  {
    timestamps: true,
  }
);

librarySchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Library =
  mongoose.models.Library || model<ILibrary>("Library", librarySchema);

export default Library;
