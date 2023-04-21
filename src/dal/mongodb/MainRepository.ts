import { DeleteResult, UpdateResult } from "mongodb";
import { FilterQuery, UpdateQuery } from "mongoose";
import {
  CountArgument,
  FindManyArgument,
  FindOneArgument,
} from "./interfaces/MainRepositoryTypes";
import { GenericModelType } from "./interfaces/Generics";

/**
 * Main static functions for the mongo DB.
 * Read, write with not previous instance.
 * Accepts 2 Generics:
 * @template T Raw object type
 * @template U Schema object type
 *
 */
export abstract class MainRepository<T, U> {
  private _model: GenericModelType<T, U>;

  constructor(schemaModel: GenericModelType<T, U>) {
    this._model = schemaModel;
  }

  protected async findOne({
    query,
    projection,
    populate = [],
  }: FindOneArgument<T>) {
    return this._model
      .findOne(query, projection)
      .populate(populate || [])
      .exec(); // as Promise<GenericDocumentType<T>>;
  }

  protected async findMany({
    query,
    projection,
    page,
    size,
    sort,
    search,
    populate = [],
  }: FindManyArgument<T>) {
    if (search !== undefined) {
      query["$text"] = { $search: search };
    }

    const transaction = this._model.find(query, projection);

    if (sort !== undefined) {
      transaction.collation({ locale: "en" });
      transaction.sort([[sort.key, sort.direction]] as any);
    }

    if (size !== undefined) {
      transaction.limit(size);
      page !== undefined && transaction.skip((page - 1) * size);
    }

    if (populate) {
      transaction.populate(populate);
    }

    return transaction.exec(); // as Promise<GenericDocumentType<T>[]>;
  }

  protected async createDocument(item: T) {
    return this._model.create(item);
  }

  async count({ query }: { query: CountArgument<T> }): Promise<number> {
    return await this._model.countDocuments(query).exec();
  }

  async deleteManyModels({
    query,
  }: {
    query: FilterQuery<U>;
  }): Promise<DeleteResult> {
    return await this._model.deleteMany(query).exec();
  }

  async updateManyModels({
    query,
    item,
  }: {
    query: FilterQuery<U>;
    item: UpdateQuery<T>;
  }): Promise<UpdateResult> {
    return await this._model.updateMany(query, item).exec();
  }
}
