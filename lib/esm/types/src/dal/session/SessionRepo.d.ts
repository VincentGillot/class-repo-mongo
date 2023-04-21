import { FilterQuery } from "mongoose";
import { FindManyArgument } from "../mongodb/interfaces/MainRepositoryTypes";
import { MainRepository } from "../mongodb/MainRepository";
import { Session } from "./Session";
import { ISession, ISessionSchema } from "./type";
export declare class SessionRepo extends MainRepository<ISession, ISessionSchema> {
    constructor();
    get({ query, }: {
        query: FilterQuery<ISession & {
            _id: string;
        }>;
    }): Promise<Session | null>;
    getAll({ query, sort, populate, size, }: FindManyArgument<ISession>): Promise<Session[]>;
    create(session: Omit<ISession, "active">): Promise<Session>;
}
//# sourceMappingURL=SessionRepo.d.ts.map