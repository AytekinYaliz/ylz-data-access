import { Query } from "mongoose";
import { IBaseCreateInput } from "../models";
import { IVersionableCreateInput, IVersionableDeleteInput, IVersionableUpdateInput } from "./models";
import { Nullable } from "../../libs/customTypes";
import BaseRepository from "../BaseRepository";
import IVersionableDocument from "./IVersionableDocument";
export default class VersionableRepository<D extends IVersionableDocument> extends BaseRepository<D> {
    constructor(model: any);
    create(input: IVersionableCreateInput): Promise<D>;
    insertMany(docs: IBaseCreateInput[], options?: any | null): Promise<D[]>;
    update(input: IVersionableUpdateInput): Promise<D>;
    delete(input: IVersionableDeleteInput): Promise<D>;
    protected getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]>;
    protected getById(originalId: string, populate?: any | null): Promise<Nullable<D>>;
    protected getByIds(originalIds: string[]): Promise<D[]>;
    count(conditions: any): Query<number>;
    protected invalidate(originalId: string): Promise<D>;
}
