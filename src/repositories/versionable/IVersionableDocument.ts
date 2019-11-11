import { Document } from "mongoose";

export interface IVersionableDocument extends Document {
  createdAt: Date;
  deletedAt: Date;
  originalId: string;
}
