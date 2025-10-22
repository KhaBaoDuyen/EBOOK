import { Types } from "mongoose";
export default interface ILibrary {
  _id?: string;
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  isSaved?: boolean;      // đã lưu hay chưa
  hasRead?: boolean;
  progress?: number;      // tiến độ đọc  
  isFinished?: boolean;   // đã đọc xong hay chưa
  lastReadAt?: Date;      // lần đọc gần nhất
  updatedAt?: Date;
  isFavorite?: boolean;
}