import { GenericDocumentClass } from "../mongodb/GenericDocumentClass";
import { ISession } from "../session/type";
import { IUserSchema } from "./type";
export declare class User extends GenericDocumentClass<IUserSchema> {
    get _id(): string;
    get email(): string;
    get password(): string;
    get validated(): boolean;
    get validationToken(): string | null | undefined;
    get active(): boolean;
    get active2FA(): boolean | null | undefined;
    fetchSession({ remoteAddress, ip, userAgent, }: Partial<ISession>): Promise<import("../session/Session").Session>;
    trigger2FAValidation(code: number): Promise<string>;
    assign2FAToken(code: number): Promise<string>;
    verify2FATokenToken(token2FA: string): Promise<number>;
    assignValidationToken(): Promise<string>;
    verifyValidationToken(validationToken: string): Promise<string>;
    validate(validationToken: string): Promise<void>;
    triggerValidateEmail(): Promise<void>;
    triggerForgotPassword(): Promise<void>;
    changePassword(options: {
        oldPlainPassword: string;
        newPlainPassword: string;
    } | {
        token: string;
        newPlainPassword: string;
    }): Promise<void>;
    handle2FA(active: boolean): Promise<void>;
    getSessions(): Promise<import("../session/Session").Session[]>;
    deleteAllSessions(): Promise<import("mongodb").DeleteResult>;
    delete(hard?: boolean): Promise<void>;
}
//# sourceMappingURL=User.d.ts.map