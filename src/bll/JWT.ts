import * as jwt from "jsonwebtoken";
import { IUser } from "../dal/user/type";
import { ISession } from "../dal/session/type";

const config = {
  key: process.env.JWT_SECRET_KEY,
  expiration: "30d",
};

interface ICookieToken {
  userId: string;
  remoteAddress: ISession["remoteAddress"];
  ip: ISession["ip"];
  userAgent: ISession["userAgent"];
  sessionId: string;
}

interface IValidationToken {
  email: IUser["email"];
}

interface I2FAToken {
  code: number;
}

export abstract class JWT {
  static encodeCookieToken(jwtBody: ICookieToken) {
    if (!config.key) {
      throw new jwt.JsonWebTokenError("no_jwt_key");
    }
    return jwt.sign(jwtBody, config.key, {
      expiresIn: config.expiration,
    });
  }

  static encodeValidationToken(email: IValidationToken["email"]) {
    if (!config.key) {
      throw new jwt.JsonWebTokenError("no_jwt_key");
    }
    return jwt.sign({ email }, config.key, { expiresIn: "1h" });
  }

  static encode2FAToken(code: I2FAToken["code"]) {
    if (!config.key) {
      throw new jwt.JsonWebTokenError("no_jwt_key");
    }
    return jwt.sign({ code }, config.key, { expiresIn: "10m" });
  }

  static decode(token: string) {
    return jwt.decode(token);
  }

  static verifyCookieToken(token: string) {
    if (!config.key) {
      throw new jwt.JsonWebTokenError("no_jwt_key");
    }
    return jwt.verify(token, config.key) as ICookieToken;
  }

  static verifyValidationToken(token: string) {
    if (!config.key) {
      throw new jwt.JsonWebTokenError("no_jwt_key");
    }
    return jwt.verify(token, config.key) as IValidationToken;
  }

  static verify2FAToken(token2FA: string) {
    if (!config.key) {
      throw new jwt.JsonWebTokenError("no_jwt_key");
    }
    return jwt.verify(token2FA, config.key) as I2FAToken;
  }

  static extractFromHeaders(headers: { cookie?: string }) {
    const temp = headers?.cookie?.split("slsessiontoken=")[1];
    if (!temp) return null;
    const token = temp.split(";")[0];
    if (!token) return null;

    return token;
  }
}
