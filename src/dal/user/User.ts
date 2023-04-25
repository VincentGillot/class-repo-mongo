import { BLL } from "../../bll/BLL";
import { GenericDocumentClass } from "../mongodb/GenericDocumentClass";
import { ISession } from "../session/type";
import { IUserSchema } from "./type";

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
    const session = await new BLL().user.session.get({
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

    return await new BLL().user.session.create({
      userId: this._id,
      remoteAddress,
      ip,
      userAgent,
    });
  }

  public async trigger2FAValidation(code: number) {
    const token2FA = await this.assign2FAToken(code);
    new BLL().mailer.send2FACode({
      code: code,
      email: this.email,
    });
    return token2FA;
  }

  public async assign2FAToken(code: number) {
    const TwoFAToken = new BLL().jwt.encode2FAToken(code);
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
    const { code } = new BLL().jwt.verify2FAToken(token2FA);
    return code;
  }

  public async assignValidationToken() {
    const validationToken = new BLL().jwt.encodeValidationToken(this.email);
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
    const { email: tokenEmail } = new BLL().jwt.verifyValidationToken(
      validationToken
    );
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
    await new BLL().mailer.emailValidation({
      email: this.email,
      token: validationToken,
    });
    return validationToken;
  }

  public async triggerForgotPasswordEmail() {
    const validationToken = await this.assignValidationToken();
    await new BLL().mailer.forgotPassword({
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
      const isCorrectOldPassword = await new BLL().password.isSamePassword(
        options.oldPlainPassword,
        this.password
      );

      const isReplacingSamePassword = await new BLL().password.isSamePassword(
        options.newPlainPassword,
        this.password
      );

      if (!isCorrectOldPassword || isReplacingSamePassword) {
        throw new Error("invalid_input");
      }
    }
    const password = await new BLL().password.hashPlainPassword(
      options.newPlainPassword
    );
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
    return await new BLL().user.session.getAll({
      query: {
        userId: this._id,
      },
    });
  }

  public async deleteAllSessions() {
    return await new BLL().user.session.deleteManyModels({
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
