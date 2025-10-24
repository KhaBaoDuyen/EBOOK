import { Types } from "mongoose";

export default interface INote {
  _id?: string;
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  pageIndex: number;
  text: string;            
  highlight: string;
  color: string;             
  createdAt?: Date;
  updatedAt?: Date;
}
