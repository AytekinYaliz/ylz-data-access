"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utilities_1 = require("../../libs/utilities");
class BaseSchema extends mongoose_1.Schema {
    constructor(definition, options) {
        const baseDefinition = Object.assign({}, definition, {
            _id: {
                type: String,
                default: String(utilities_1.generateObjectId())
            }
        });
        super(baseDefinition, options);
    }
}
exports.BaseSchema = BaseSchema;
//# sourceMappingURL=BaseSchema.js.map