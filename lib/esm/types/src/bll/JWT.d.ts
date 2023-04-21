import * as jwt from "jsonwebtoken";
import { Session } from "../dal/session/Session";
import { User } from "../dal/user/User";
interface ICookieToken {
    userId: User["_id"];
    remoteAddress: Session["remoteAddress"];
    ip: Session["ip"];
    userAgent: Session["userAgent"];
    sessionId: Session["_id"];
}
interface IValidationToken {
    email: User["email"];
}
interface I2FAToken {
    code: number;
}
export declare abstract class JWT {
    static encodeCookieToken(jwtBody: ICookieToken): string;
    static encodeValidationToken(email: IValidationToken["email"]): string;
    static encode2FAToken(code: I2FAToken["code"]): string;
    static decode(token: string): string | jwt.JwtPayload | null;
    static verifyCookieToken(token: string): ICookieToken;
    static verifyValidationToken(token: string): IValidationToken;
    static verify2FAToken(token2FA: string): I2FAToken;
    static extractFromHeaders(headers: {
        cookie?: string;
    }): string | null;
}
export {};
//# sourceMappingURL=JWT.d.ts.map