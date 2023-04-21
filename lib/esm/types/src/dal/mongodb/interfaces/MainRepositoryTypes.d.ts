import { FilterQuery, HydratedDocument, ProjectionFields, SortOrder } from "mongoose";
import { NestedKeyOf } from "../../../types/NestedKeyOf";
export interface FindOneArgument<T> {
    query: FilterQuery<T & {
        _id: string;
    }>;
    projection?: string | ProjectionFields<HydratedDocument<T>> | undefined;
    populate?: NestedKeyOf<T>[];
}
export type FindManyArgument<T> = {
    query: FilterQuery<T & {
        _id: string;
    }>;
    projection?: string | ProjectionFields<HydratedDocument<T>> | undefined;
    page?: number;
    size?: number;
    sort?: {
        key: string;
        direction: SortOrder;
    };
    search?: string;
    populate?: NestedKeyOf<T>[];
};
export type CountArgument<T> = FilterQuery<T & {
    _id: string;
}>;
//# sourceMappingURL=MainRepositoryTypes.d.ts.map