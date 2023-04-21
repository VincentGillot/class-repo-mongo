import * as jwt from "jsonwebtoken";
const config = {
    key: process.env.JWT_SECRET_KEY,
    expiration: "30d",
};
export class JWT {
    static encodeCookieToken(jwtBody) {
        if (!config.key) {
            throw new jwt.JsonWebTokenError("no_jwt_key");
        }
        return jwt.sign(jwtBody, config.key, {
            expiresIn: config.expiration,
        });
    }
    static encodeValidationToken(email) {
        if (!config.key) {
            throw new jwt.JsonWebTokenError("no_jwt_key");
        }
        return jwt.sign({ email }, config.key, { expiresIn: "1h" });
    }
    static encode2FAToken(code) {
        if (!config.key) {
            throw new jwt.JsonWebTokenError("no_jwt_key");
        }
        return jwt.sign({ code }, config.key, { expiresIn: "10m" });
    }
    static decode(token) {
        return jwt.decode(token);
    }
    static verifyCookieToken(token) {
        if (!config.key) {
            throw new jwt.JsonWebTokenError("no_jwt_key");
        }
        return jwt.verify(token, config.key);
    }
    static verifyValidationToken(token) {
        if (!config.key) {
            throw new jwt.JsonWebTokenError("no_jwt_key");
        }
        return jwt.verify(token, config.key);
    }
    static verify2FAToken(token2FA) {
        if (!config.key) {
            throw new jwt.JsonWebTokenError("no_jwt_key");
        }
        return jwt.verify(token2FA, config.key);
    }
    static extractFromHeaders(headers) {
        const temp = headers?.cookie?.split("slsessiontoken=")[1];
        if (!temp)
            return null;
        const token = temp.split(";")[0];
        if (!token)
            return null;
        return token;
    }
}
