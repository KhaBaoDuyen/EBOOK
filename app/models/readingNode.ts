import mongoose, { Schema, Model } from "mongoose";
import type { IReadingNode } from "~/interfaces/readingNotes.interface";

const readingJournalSchema = new Schema<IReadingNode>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    title: { type: String },
    content: { type: String, required: true },
    page: { type: Number },
    quote: { type: String },
    mood: { type: Number },
  },
  { timestamps: true }
);

export const ReadingNode: Model<IReadingNode> =
  mongoose.models.ReadingJournal ||
  mongoose.model<IReadingNode>("Reading Node", readingJournalSchema);
