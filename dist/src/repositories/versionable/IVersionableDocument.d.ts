import { Document } from "mongoose";
export interface IVersionableDocument extends Document {
    deletedAt: Date;
    originalId: string;
}
