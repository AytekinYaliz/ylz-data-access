import { BaseSchema } from "../base/BaseSchema";

export class VersionableSchema extends BaseSchema {
  constructor(options: any, collections: any) {
    const versionedOptions = Object.assign(
      {
        createdAt: {
          type: Date,
          required: true,
          default: Date.now
        },
        deletedAt: {
          type: Date,
          default: null
        },
        originalId: {
          type: String,
          required: true
        }
      },
      options
    );

    super(versionedOptions, collections);
  }
}
