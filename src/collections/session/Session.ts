import { JWT } from "../../bll/JWT";
import { GenericDocumentClass } from "../../dal/mongodb/GenericDocumentClass";
import { ISessionSchema } from "./type";

/**
 * Executes document operations
 * Works with instances of returned documents
 */
export class Session<BLLType> extends GenericDocumentClass<
  ISessionSchema,
  BLLType
> {
  get _id() {
    return this.document._id.toString();
  }
  get userId() {
    return this.document.userId?.toString();
  }
  get remoteAddress() {
    return this.document.remoteAddress;
  }
  get ip() {
    return this.document.ip;
  }
  get userAgent() {
    return this.document.userAgent;
  }

  public async revoke() {
    return await this.document.deleteOne();
  }

  public async generateAccessToken() {
    if (!this.userId || !this.ip) {
      return null;
    }

    return JWT.encodeCookieToken({
      userId: this.userId,
      remoteAddress: this.remoteAddress || "",
      ip: this.ip,
      userAgent: this.userAgent || "",
      sessionId: this._id,
    });
  }
}
