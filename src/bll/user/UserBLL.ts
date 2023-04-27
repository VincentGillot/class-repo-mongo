import { Password } from "../Password";
import { UserRepo } from "../../dal/user/UserRepo";
import { IUser } from "../../dal/user/type";

export interface AuthData {
  accessToken?: string | null;
  userId?: string | null;
  sessionId?: string | null;
}

export type AuthenticationResult =
  | AuthData
  | {
      active2FA?: boolean | null;
      token2FA?: string | null;
    };

/**
 * Executes Custom operations for MongoDB
 * Works with models and DB
 */
export class UserBLL<BLLType> extends UserRepo<BLLType> {
  public async register({
    email,
    plainPassword,
    emailValidation,
  }: {
    email: IUser["email"];
    plainPassword: IUser["password"];
    emailValidation?: boolean;
  }) {
    const validPass = Password.isValidPassword(plainPassword);
    if (process.env.NODE_ENV === "production" && !validPass) {
      throw new Error("invalid_password");
    }

    const user = await this.create({
      email,
      password: plainPassword,
      active: true,
      validated: emailValidation ? false : true,
    });

    if (emailValidation && user) {
      user.triggerValidateEmail();
    }

    return user;
  }

  public async authenticate({
    email,
    password,
    sessionData,
  }: {
    email: string;
    password: string;
    sessionData: {
      remoteAddress: string | null;
      ip: string;
      userAgent: string | null;
    };
  }): Promise<AuthenticationResult> {
    const user = await this.get({
      query: {
        email,
        active: true,
        validated: true,
      },
    });

    if (!user) {
      throw new Error("unauthorized");
    }

    const validPass = await Password.isSamePassword(password, user.password);
    if (!validPass) {
      throw new Error("unauthorized");
    }

    if (user.active2FA) {
      const code = Math.floor(100000 + Math.random() * 900000);
      const token2FA = await user.trigger2FAValidation(code);
      return {
        active2FA: true,
        token2FA,
      };
    }

    const session = await user.fetchSession(sessionData);

    if (!session) {
      throw new Error("unauthorized");
    }

    const accessToken = await session.generateAccessToken();

    if (!accessToken) {
      throw new Error("unauthorized");
    }

    return {
      accessToken,
      userId: user._id,
      sessionId: session?._id,
    };
  }

  public async authenticateWith2FA({
    code,
    token2FA,
    sessionData,
  }: {
    code: number;
    token2FA: string;
    sessionData: {
      remoteAddress: string | null;
      ip: string;
      userAgent: string | null;
    };
  }): Promise<AuthenticationResult> {
    const user = await this.get({
      query: {
        validationToken: token2FA,
      },
    });
    if (!user) {
      throw new Error("unauthorized");
    }

    const verifiedCode = await user.verify2FATokenToken(token2FA);
    if (verifiedCode !== code) {
      throw new Error("unauthorized");
    }

    const session = await user.fetchSession(sessionData);

    if (!session) {
      throw new Error("unauthorized");
    }

    const accessToken = await session.generateAccessToken();

    if (!accessToken) {
      throw new Error("unauthorized");
    }

    await user.update({
      $set: {
        validationToken: null,
      },
    });

    return {
      accessToken,
      userId: user._id,
      sessionId: session?._id,
    };
  }
}
