export const auditSchema = {
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  createdBy: {
    type: String,
    required: [true, "Required!"]
    // default: "-"
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
