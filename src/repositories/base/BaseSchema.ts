import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";

export class BaseSchema extends Schema {
  constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    const baseDefinition = {
      ...definition,
      ...{
        _id: {
          type: String,
          required: true
        }
      }
    };

    super(baseDefinition, options);
  }
}
