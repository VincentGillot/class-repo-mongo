/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { DeleteResult, UpdateResult } from "mongodb";
import { FilterQuery, UpdateQuery } from "mongoose";
import { CountArgument, FindManyArgument, FindOneArgument } from "./interfaces/MainRepositoryTypes";
import { GenericModelType } from "./interfaces/Generics";
/**
 * Main static functions for the mongo DB.
 * Read, write with not previous instance.
 * Accepts 2 Generics:
 * @template T Raw object type
 * @template U Schema object type
 *
 */
export declare abstract class MainRepository<T, U> {
    private _model;
    constructor(schemaModel: GenericModelType<T, U>);
    protected findOne({ query, projection, populate, }: FindOneArgument<T>): Promise<import("mongoose").UnpackedIntersection<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, Record<string, any>, T> & Omit<import("mongoose").Require_id<T>, keyof ({} & U extends infer T_1 ? T_1 extends {} & U ? T_1 extends Record<string, never> ? {} : import("mongoose").IfAny<T_1, {}, T_1> : never : never)> & ({} & U extends infer T_2 ? T_2 extends {} & U ? T_2 extends Record<string, never> ? {} : import("mongoose").IfAny<T_2, {}, T_2> : never : never)>, {}> | null>;
    protected findMany({ query, projection, page, size, sort, search, populate, }: FindManyArgument<T>): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, Record<string, any>, T> & Omit<import("mongoose").Require_id<T>, keyof ({} & U extends infer T_1 ? T_1 extends {} & U ? T_1 extends Record<string, never> ? {} : import("mongoose").IfAny<T_1, {}, T_1> : never : never)> & ({} & U extends infer T_2 ? T_2 extends {} & U ? T_2 extends Record<string, never> ? {} : import("mongoose").IfAny<T_2, {}, T_2> : never : never)>[]>;
    protected createDocument(item: T): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, Record<string, any>, T> & Omit<import("mongoose").Require_id<T>, keyof ({} & U extends infer T_1 ? T_1 extends {} & U ? T_1 extends Record<string, never> ? {} : import("mongoose").IfAny<T_1, {}, T_1> : never : never)> & ({} & U extends infer T_2 ? T_2 extends {} & U ? T_2 extends Record<string, never> ? {} : import("mongoose").IfAny<T_2, {}, T_2> : never : never)>>;
    count({ query }: {
        query: CountArgument<T>;
    }): Promise<number>;
    deleteManyModels({ query, }: {
        query: FilterQuery<U>;
    }): Promise<DeleteResult>;
    updateManyModels({ query, item, }: {
        query: FilterQuery<U>;
        item: UpdateQuery<T>;
    }): Promise<UpdateResult>;
}
//# sourceMappingURL=MainRepository.d.ts.map