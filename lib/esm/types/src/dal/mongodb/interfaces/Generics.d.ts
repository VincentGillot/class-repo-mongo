import { Document, Model, Types, ObjectId } from "mongoose";
/**
 * Generic document type with preset ID type
 * @template U Schema object type
 *
 */
export type GenericDocumentType<U> = Document<ObjectId, any, U> & U;
/**
 * Generic model type
 * @template T Raw object type
 * @template U Schema object type
 *
 */
export type GenericModelType<T, U> = Model<T, Record<string, any>, U>;
/**
 * Generic Subdocument type
 * @template U Schema object type
 *
 */
export type GenericSubDocumentType<U> = Types.Subdocument<ObjectId> & U;
/**
 * Generic Subdocument type
 * @template U Schema object type
 *
 */
export type GenericSubDocumentArrayType<U> = Types.DocumentArray<U>;
//# sourceMappingURL=Generics.d.ts.map