import { Document } from "mongoose";
export interface IBaseDocument extends Document {
    id: string;
}
