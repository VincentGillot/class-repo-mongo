import { FilterQuery } from "mongoose";
import { IUser, IUserSchema } from "./type";
import { MainRepository } from "../mongodb/MainRepository";
import { User } from "./User";
import { SessionRepo } from "../session/SessionRepo";
import { Session } from "../session/Session";
export interface AuthData {
    accessToken?: string | null;
    userId?: User["_id"] | null;
    sessionId?: Session["_id"] | null;
}
export type AuthenticationResult = AuthData | {
    active2FA?: boolean | null;
    token2FA?: string | null;
};
export declare class UserRepo extends MainRepository<IUser, IUserSchema> {
    session: SessionRepo;
    constructor();
    /**
     *
     * @param options Object: {query}
     * @returns __User__ Class Instance
     */
    get({ query }: {
        query: FilterQuery<IUserSchema>;
    }): Promise<User | null>;
    getAll({ query, sort, }: {
        query: FilterQuery<IUserSchema>;
        sort?: any;
    }): Promise<User[]>;
    register({ email, plainPassword, }: {
        email: User["email"];
        plainPassword: User["password"];
    }): Promise<User>;
    create(userData: IUser): Promise<User>;
    authenticate({ email, password, sessionData, masteradmin, }: {
        email: string;
        password: string;
        sessionData: {
            remoteAddress: string | null;
            ip: string;
            userAgent: string | null;
        };
        masteradmin?: boolean;
    }): Promise<AuthenticationResult>;
    authenticateWith2FA({ code, token2FA, sessionData, }: {
        code: number;
        token2FA: string;
        sessionData: {
            remoteAddress: string | null;
            ip: string;
            userAgent: string | null;
        };
    }): Promise<AuthenticationResult>;
}
//# sourceMappingURL=UserRepo.d.ts.map