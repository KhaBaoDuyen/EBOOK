import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  title: String,
  order: Number,
  href: String
});

export default mongoose.model("Chapter", chapterSchema);
