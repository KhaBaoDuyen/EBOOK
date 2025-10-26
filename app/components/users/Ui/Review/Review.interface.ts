import type { IBook } from "~/interfaces/book.interface";
import { Types } from "mongoose";

export default interface IReview {
    _id?: Types.ObjectId;
    bookInfo?:IBook | null;
    reviews?:any[];
    name: string;
    comment: string;
    date: string;
    rating: number;
    avatar?: string;
}
