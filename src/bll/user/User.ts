import { JWT } from "../JWT";
import { Password } from "../Password";
import { GenericDocumentClass } from "../../dal/mongodb/GenericDocumentClass";
import { ISession } from "../../dal/session/type";
import { IUserSchema } from "../../dal/user/type";

/**
 * Executes document operations
 * Works with instances of returned documents
 */
export class User extends GenericDocumentClass<IUserSchema> {
  get _id() {
    return this.document._id.toString();
  }
  get email() {
    return this.document.email;
  }
  get password() {
    return this.document.password;
  }
  get validated() {
    return this.document.validated;
  }
  get validationToken() {
    return this.document.validationToken;
  }
  get active() {
    return this.document.active;
  }
  get active2FA() {
    return this.document.active2FA;
  }

  public async fetchSession({
    remoteAddress,
    ip,
    userAgent,
  }: Partial<ISession>) {
    const session = await this.sessionRepo.get({
      query: {
        userId: this._id,
        remoteAddress,
        ip,
        userAgent,
      },
    });

    if (session) {
      return session;
    }

    return await this.sessionRepo.create({
      userId: this._id,
      remoteAddress,
      ip,
      userAgent,
    });
  }

  public async trigger2FAValidation(code: number) {
    const token2FA = await this.assign2FAToken(code);
    this.mailer.send2FACode({
      code: code,
      email: this.email,
    });
    return token2FA;
  }

  public async assign2FAToken(code: number) {
    const TwoFAToken = JWT.encode2FAToken(code);
    await this.update({
      $set: {
        validationToken: TwoFAToken,
      },
    });
    return TwoFAToken;
  }

  public async verify2FATokenToken(token2FA: string) {
    if (this.validationToken !== token2FA) {
      throw new Error("invalid_token");
    }
    const { code } = JWT.verify2FAToken(token2FA);
    return code;
  }

  public async assignValidationToken() {
    const validationToken = JWT.encodeValidationToken(this.email);
    await this.update({
      $set: {
        validationToken: validationToken,
      },
    });
    return validationToken;
  }

  public async verifyValidationToken(validationToken: string) {
    if (this.validationToken !== validationToken) {
      throw new Error("invalid_token");
    }
    const { email: tokenEmail } = JWT.verifyValidationToken(validationToken);
    if (this.email !== tokenEmail) {
      throw new Error("invalid_token");
    }

    return tokenEmail;
  }

  public async validate(validationToken: string) {
    await this.verifyValidationToken(validationToken);
    await this.update({
      $set: {
        validationToken: null,
        validated: true,
      },
    });
  }

  public async triggerValidateEmail() {
    const validationToken = await this.assignValidationToken();
    await this.mailer.emailValidation({
      email: this.email,
      token: validationToken,
    });
    return validationToken;
  }

  public async triggerForgotPasswordEmail() {
    const validationToken = await this.assignValidationToken();
    await this.mailer.forgotPassword({
      email: this.email,
      token: validationToken,
    });
  }

  public async changePassword(
    options:
      | {
          oldPlainPassword: string;
          newPlainPassword: string;
        }
      | {
          token: string;
          newPlainPassword: string;
        }
  ) {
    if ("token" in options) {
      const validToken = await this.verifyValidationToken(options.token);
      if (!validToken) {
        throw new Error("invalid_input");
      }
      await this.update({
        $set: {
          validationToken: null,
          validated: true,
        },
      });
    }
    if ("oldPlainPassword" in options) {
      const isCorrectOldPassword = await Password.isSamePassword(
        options.oldPlainPassword,
        this.password
      );

      const isReplacingSamePassword = await Password.isSamePassword(
        options.newPlainPassword,
        this.password
      );

      if (!isCorrectOldPassword || isReplacingSamePassword) {
        throw new Error("invalid_input");
      }
    }
    const password = await Password.hashPlainPassword(options.newPlainPassword);
    await this.update({
      $set: {
        password: password,
      },
    });
  }

  public async handle2FA(active: boolean) {
    await this.update({
      $set: {
        active2FA: active,
      },
    });
  }

  public async getSessions() {
    return await this.sessionRepo.getAll({
      query: {
        userId: this._id,
      },
    });
  }

  public async deleteAllSessions() {
    return await this.sessionRepo.deleteManyModels({
      query: {
        userId: this._id,
      },
    });
  }

  public async delete(hard?: boolean) {
    await this.deleteAllSessions();
    if (hard) {
      await this.deleteModel();
      // Delete related database models, if need be
    } else {
      await this.update({
        $set: {
          active: false,
        },
      });
    }
  }
}
