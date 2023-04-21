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
import { QueryOptions, UpdateQuery } from "mongoose";
import { GenericDocumentType } from "./interfaces/Generics";
/**
 * Main static functions for the mongo DB.
 * Read, write with not previous instance.
 * Accepts 2 Generics:
 * @template U Schema object type
 *
 */
export declare class GenericDocumentClass<U> {
    protected document: GenericDocumentType<U>;
    constructor(document: GenericDocumentType<U>);
    toObject(): import("mongoose").Require_id<import("mongoose").Require_id<U>>;
    save(): Promise<GenericDocumentType<U>>;
    update(item: UpdateQuery<typeof this.document>, options?: QueryOptions): Promise<any>;
    deleteModel(): Promise<any>;
}
//# sourceMappingURL=GenericDocumentClass.d.ts.map