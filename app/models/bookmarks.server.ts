
import mongoose from "mongoose";
const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  cfi: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Bookmark", bookmarkSchema);
