/**
 * Main static functions for the mongo DB.
 * Read, write with not previous instance.
 * Accepts 2 Generics:
 * @template T Raw object type
 * @template U Schema object type
 *
 */
export class MainRepository {
    _model;
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    async findOne({ query, projection, populate = [], }) {
        return this._model
            .findOne(query, projection)
            .populate(populate || [])
            .exec(); // as Promise<GenericDocumentType<T>>;
    }
    async findMany({ query, projection, page, size, sort, search, populate = [], }) {
        if (search !== undefined) {
            query["$text"] = { $search: search };
        }
        const transaction = this._model.find(query, projection);
        if (sort !== undefined) {
            transaction.collation({ locale: "en" });
            transaction.sort([[sort.key, sort.direction]]);
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
    async createDocument(item) {
        return this._model.create(item);
    }
    async count({ query }) {
        return await this._model.countDocuments(query).exec();
    }
    async deleteManyModels({ query, }) {
        return await this._model.deleteMany(query).exec();
    }
    async updateManyModels({ query, item, }) {
        return await this._model.updateMany(query, item).exec();
    }
}
