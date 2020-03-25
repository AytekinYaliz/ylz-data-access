export declare const auditSchema: {
    createdAt: {
        type: DateConstructor;
        default: () => Date;
    };
    createdBy: {
        type: StringConstructor;
        default: any;
    };
    updatedAt: {
        type: DateConstructor;
        default: () => Date;
    };
    updatedBy: {
        type: StringConstructor;
        default: any;
    };
};
