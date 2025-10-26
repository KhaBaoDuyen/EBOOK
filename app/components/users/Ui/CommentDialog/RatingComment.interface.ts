import { Types } from "mongoose";

export default interface IRatingComment {
    open: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
    bookId?: Types.ObjectId;
}
