import { Types } from "mongoose";

export interface IReadingNode {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;       // người tạo ghi chú
  bookId: Types.ObjectId;       // sách tương ứng
  title?: string;               // tiêu đề ghi chú
  content: string;              // nội dung chính
  page?: number;                // trang/chương ghi chú
  quote?: string;               // trích dẫn tâm đắc
  mood?: number;                // tâm trạng
  createdAt?: Date;
  updatedAt?: Date;
}
