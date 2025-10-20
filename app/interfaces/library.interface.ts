export default interface ILibrary {
  _id?: string;
  userId: string;        
  bookId: string;        
  isSaved?: boolean;      // đã lưu hay chưa
  progress?: number;      // tiến độ đọc  
  isFinished?: boolean;   // đã đọc xong hay chưa
  lastReadAt?: Date;      // lần đọc gần nhất
  updatedAt?: Date;        
}