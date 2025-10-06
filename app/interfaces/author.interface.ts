import { Types } from "mongoose";

export interface IAuthor {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  avatar?: string;
  bio?: string;
  nationality?: string;
  birthDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
