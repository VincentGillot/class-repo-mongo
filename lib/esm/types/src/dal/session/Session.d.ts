import { GenericDocumentClass } from "../mongodb/GenericDocumentClass";
import { ISessionSchema } from "./type";
export declare class Session extends GenericDocumentClass<ISessionSchema> {
    get _id(): string;
    get userId(): string | undefined;
    get remoteAddress(): string | null | undefined;
    get ip(): string | null | undefined;
    get userAgent(): string | null | undefined;
    revoke(): Promise<any>;
    generateAccessToken(): Promise<string | null>;
}
//# sourceMappingURL=Session.d.ts.map