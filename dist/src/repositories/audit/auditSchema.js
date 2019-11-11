"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditSchema = {
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    createdBy: {
        type: String,
        default: "-"
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    },
    updatedBy: {
        type: String,
        default: "-"
    }
};
//# sourceMappingURL=auditSchema.js.map