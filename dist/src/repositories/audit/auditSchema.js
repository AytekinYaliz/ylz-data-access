"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditSchema = {
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    createdBy: {
        type: String,
        required: [true, "Required!"]
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    },
    updatedBy: {
        type: String,
        required: [true, "Required!"]
    }
};
//# sourceMappingURL=auditSchema.js.map