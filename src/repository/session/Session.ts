import { BLL } from "../../bll/BLL";
import { GenericDocumentClass } from "../mongodb/GenericDocumentClass";
import { ISessionSchema } from "./type";

export class Session extends GenericDocumentClass<ISessionSchema> {
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

    return BLL.jwt.encodeCookieToken({
      userId: this.userId,
      remoteAddress: this.remoteAddress || "",
      ip: this.ip,
      userAgent: this.userAgent || "",
      sessionId: this._id,
    });
  }
}
