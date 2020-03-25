import { Document, Query, Model } from "mongoose";
import { customTypes, utilities } from "@ylz/common";
import { debug } from "@ylz/logger";

import { generateObjectId, lean, leanObject } from "../../libs/utilities";
import { IBaseCreateInput, IBaseDeleteInput, IBaseGetInput, IBaseListInput, IBaseUpdateInput } from "../models";

export abstract class BaseRepository<D extends Document> {
  protected model: Model<D>;

  constructor(model: Model<D>) {
    this.model = model;
  }

  public async get(input: IBaseGetInput): Promise<customTypes.Nullable<D>> {
    debug("BaseRepository - get:", JSON.stringify(input));

    return this.getById(input.id);
  }
  public getOne(conditions: any, populate?: any | null): Promise<customTypes.Nullable<D>> {
    debug("BaseRepository - getOne:", JSON.stringify(conditions), JSON.stringify(populate));
    return populate ? lean(this.model.findOne(conditions).populate(populate)) : lean(this.model.findOne(conditions));
  }

  public async list(input: IBaseListInput = {}): Promise<D[]> {
    debug("BaseRepository - list:", JSON.stringify(input));

    const conditions = utilities.clone(input);

    delete conditions.limit;
    delete conditions.skip;

    const options = {
      skip: input.skip || 0,
      limit: input.limit || 0,
      sort: { createdAt: -1 }
    };

    return this.getAll(conditions, null, options);
  }

  public async create(input: IBaseCreateInput): Promise<D> {
    debug("BaseRepository - create:", JSON.stringify(input));

    const id = input.id || String(generateObjectId());

    return await this.model.create({
      _id: id,
      ...input
    });
  }

  public async update(input: IBaseUpdateInput): Promise<customTypes.Nullable<D>> {
    debug("BaseRepository - update:", JSON.stringify(input));

    // @ts-ignore
    return this.model.findOneAndUpdate({ _id: input.id }, input, { new: true });
  }

  public async delete(input: IBaseDeleteInput): Promise<customTypes.Nullable<D>> {
    debug("BaseRepository - delete:", JSON.stringify(input));

    return this.model.findByIdAndRemove(input.id);
  }

  /**
   * Insert Many
   * @returns {Documents[]}
   */
  public async insertMany(input: IBaseCreateInput[], options?: any | null): Promise<D[]> {
    debug("BaseRepository - insertMany:", JSON.stringify(input), JSON.stringify(options));
    const docsToInsert: any = input.map(item => {
      const id = item.id || generateObjectId();
      return { ...item, _id: id };
    });
    return this.model.insertMany(docsToInsert, options);
  }

  public count(criteria: any = {}): Query<number> {
    debug("BaseRepository - count:", JSON.stringify(criteria));
    return this.model.countDocuments(criteria);
  }

  /**
   * Protected methods for internal use
   */
  protected getById(id: string): Promise<D | null> {
    return lean(this.model.findById(id));
  }
  protected getByIds(ids: string[]): Promise<D[]> {
    return this.getAll({ _id: { $in: ids } });
  }
  protected async getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]> {
    debug("BaseRepository - getAll:", JSON.stringify(conditions), JSON.stringify(projection), JSON.stringify(options));

    // @ts-ignore
    return populate
      ? (
          await this.model
            .find(conditions, projection, options)
            .populate(populate)
            .lean()
        ).map(leanObject)
      : (await this.model.find(conditions, projection, options).lean()).map(leanObject);
  }
}
