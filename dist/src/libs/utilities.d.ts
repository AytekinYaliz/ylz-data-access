import { Document, DocumentQuery } from "mongoose";
export declare const generateObjectId: () => import("bson").ObjectId;
export declare const isValidObjectId: (id: any) => boolean;
export declare function lean<D extends Document>(document: DocumentQuery<D | null, D>): Promise<D>;
export declare function leanObject<D extends any>(doc: D): D;
