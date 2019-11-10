import { Document, Query, Model } from "mongoose";
import { Nullable } from "@ylz/common/src/libs/customTypes";
import { IBaseCreateInput, IBaseDeleteInput, IBaseGetInput, IBaseListInput, IBaseUpdateInput } from "../models";
export declare abstract class BaseRepository<D extends Document> {
    protected model: Model<D>;
    constructor(model: Model<D>);
    get(input: IBaseGetInput): Promise<Nullable<D>>;
    getOne(conditions: any, populate?: any | null): Promise<Nullable<D>>;
    list(input: IBaseListInput): Promise<D[]>;
    create(input: IBaseCreateInput): Promise<D>;
    update(input: IBaseUpdateInput): Promise<Nullable<D>>;
    delete(input: IBaseDeleteInput): Promise<Nullable<D>>;
    insertMany(input: IBaseCreateInput[], options?: any | null): Promise<D[]>;
    count(conditions?: any): Query<number>;
    protected getById(id: string): Promise<D | null>;
    protected getByIds(ids: string[]): Promise<D[]>;
    protected getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]>;
}
