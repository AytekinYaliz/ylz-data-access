import { Model, Query } from "mongoose";
import { Nullable } from "@ylz/common/src/libs/customTypes";
import { IBaseCreateInput } from "../models";
import { IVersionableCreateInput, IVersionableDeleteInput, IVersionableUpdateInput } from "./models";
import { BaseRepository } from "../base/BaseRepository";
import { IVersionableDocument } from "./IVersionableDocument";
export declare class VersionableRepository<D extends IVersionableDocument> extends BaseRepository<D> {
    constructor(model: Model<D>);
    create(input: IVersionableCreateInput): Promise<D>;
    insertMany(docs: IBaseCreateInput[], options?: any | null): Promise<D[]>;
    update(input: IVersionableUpdateInput): Promise<D>;
    delete(input: IVersionableDeleteInput): Promise<D>;
    count(conditions: any): Query<number>;
    protected getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]>;
    protected getById(originalId: string, populate?: any | null): Promise<Nullable<D>>;
    protected getByIds(originalIds: string[]): Promise<D[]>;
    protected invalidate(originalId: string): Promise<D>;
}
