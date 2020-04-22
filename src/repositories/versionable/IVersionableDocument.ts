import { IBaseDocument } from "../base/IBaseDocument";

export interface IVersionableDocument extends IBaseDocument {
  createdAt: Date;
  deletedAt: Date;
  originalId: string;
}
