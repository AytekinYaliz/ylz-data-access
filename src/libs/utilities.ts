import * as mongoose from "mongoose";
import { Document, DocumentQuery } from "mongoose";

/****************************************************************************************
 * MONGODB VALIDATIONS*
 ****************************************************************************************/
export const generateObjectId = () => mongoose.Types.ObjectId();

export const isValidObjectId = (id: any): boolean => new RegExp("^[0-9a-fA-F]{24}$").test(id);

export async function lean<D extends Document>(document: DocumentQuery<D | null, D>) {
  //: Promise<D> {
  try {
    return leanObject(await document.lean());
  } catch (err) {
    return err;
  }
}

export function leanObject<D extends any>(doc: D): D {
  try {
    if (doc && doc._id) {
      doc.id = doc._id;
      delete doc._id;
      delete doc.__v;
    }

    return doc;
  } catch (err) {
    return err;
  }
}
