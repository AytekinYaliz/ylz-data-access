"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditSchema = {
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    createdBy: {
        type: String,
        required: [true, "createdBy is required!"]
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    },
    updatedBy: {
        type: String,
        required: [true, "updatedBy is required!"]
    }
};
//# sourceMappingURL=auditSchema.js.map