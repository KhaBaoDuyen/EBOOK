import { Types } from "mongoose";

export interface IReview { 
  user_id:Types.ObjectId;
  book_id:Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
}