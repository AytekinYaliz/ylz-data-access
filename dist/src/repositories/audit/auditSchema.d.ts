export declare const auditSchema: {
    createdAt: {
        type: DateConstructor;
        default: () => Date;
    };
    createdBy: {
        type: StringConstructor;
        required: (string | boolean)[];
    };
    updatedAt: {
        type: DateConstructor;
        default: () => Date;
    };
    updatedBy: {
        type: StringConstructor;
        required: (string | boolean)[];
    };
};
