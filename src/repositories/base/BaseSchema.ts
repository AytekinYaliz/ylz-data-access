import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";
import { generateObjectId } from "../../libs/utilities";

export class BaseSchema extends Schema {
  constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    const baseDefinition = {
      ...definition,
      ...{
        _id: {
          type: String,
          // required: true,
          default: String(generateObjectId())
        }
      }
    };

    super(baseDefinition, options);
  }
}
