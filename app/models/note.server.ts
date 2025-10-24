import mongoose, { Schema, model } from "mongoose";
import type INote from "~/interfaces/note.interface";

const noteSchema = new Schema<INote>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        pageIndex: { type: Number, default: 0 },
        text: { type: String, required: true  },
        highlight: { type: String, required: true  },
        color: { type: String, default: "#FFF59D" },
    }, {
    timestamps: true,
}
);

const Note = mongoose.models.Note || model<INote>("Note", noteSchema);

export default Note;