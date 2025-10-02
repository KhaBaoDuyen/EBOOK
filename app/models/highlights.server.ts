import mongoose from "mongoose";
const highlightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  cfi: String,
  text: String,
  note: String,
  color: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Highlight", highlightSchema);
