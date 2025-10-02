 import { Types } from "mongoose";

export interface IBook {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  cover: string;
  description: string;
  releaseDate: Date;
  publisher: string;
  filePath: string;
  mimeType?: string;
  categories: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
