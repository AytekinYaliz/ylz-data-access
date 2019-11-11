"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSchema_1 = require("../base/BaseSchema");
class VersionableSchema extends BaseSchema_1.BaseSchema {
    constructor(options, collections) {
        const versionedOptions = Object.assign({
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
        }, options);
        super(versionedOptions, collections);
    }
}
exports.VersionableSchema = VersionableSchema;
//# sourceMappingURL=VersionableSchema.js.map