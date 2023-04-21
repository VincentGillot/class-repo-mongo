import { BLL } from "../../bll/BLL";
import { GenericDocumentClass } from "../mongodb/GenericDocumentClass";
export class User extends GenericDocumentClass {
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
    async fetchSession({ remoteAddress, ip, userAgent, }) {
        const session = await BLL.user.session.get({
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
        return await BLL.user.session.create({
            userId: this._id,
            remoteAddress,
            ip,
            userAgent,
        });
    }
    async trigger2FAValidation(code) {
        const token2FA = await this.assign2FAToken(code);
        BLL.mailer.send2FACode({
            code: code,
            email: this.email,
        });
        return token2FA;
    }
    async assign2FAToken(code) {
        const TwoFAToken = BLL.jwt.encode2FAToken(code);
        await this.update({
            $set: {
                validationToken: TwoFAToken,
            },
        });
        return TwoFAToken;
    }
    async verify2FATokenToken(token2FA) {
        if (this.validationToken !== token2FA) {
            throw new Error("invalid_token");
        }
        const { code } = BLL.jwt.verify2FAToken(token2FA);
        return code;
    }
    async assignValidationToken() {
        const validationToken = BLL.jwt.encodeValidationToken(this.email);
        await this.update({
            $set: {
                validationToken: validationToken,
            },
        });
        return validationToken;
    }
    async verifyValidationToken(validationToken) {
        if (this.validationToken !== validationToken) {
            throw new Error("invalid_token");
        }
        const { email: tokenEmail } = BLL.jwt.verifyValidationToken(validationToken);
        if (this.email !== tokenEmail) {
            throw new Error("invalid_token");
        }
        return tokenEmail;
    }
    async validate(validationToken) {
        await this.verifyValidationToken(validationToken);
        await this.update({
            $set: {
                validationToken: null,
                validated: true,
            },
        });
    }
    async triggerValidateEmail() {
        const validationToken = await this.assignValidationToken();
        await BLL.mailer.emailValidation({
            email: this.email,
            token: validationToken,
        });
    }
    async triggerForgotPassword() {
        const validationToken = await this.assignValidationToken();
        await BLL.mailer.forgotPassword({
            email: this.email,
            token: validationToken,
        });
    }
    async changePassword(options) {
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
            const isCorrectOldPassword = await BLL.password.isSamePassword(options.oldPlainPassword, this.password);
            const isReplacingSamePassword = await BLL.password.isSamePassword(options.newPlainPassword, this.password);
            if (!isCorrectOldPassword || isReplacingSamePassword) {
                throw new Error("invalid_input");
            }
        }
        const password = await BLL.password.hashPlainPassword(options.newPlainPassword);
        await this.update({
            $set: {
                password: password,
            },
        });
    }
    async handle2FA(active) {
        await this.update({
            $set: {
                active2FA: active,
            },
        });
    }
    async getSessions() {
        return await BLL.user.session.getAll({
            query: {
                userId: this._id,
            },
        });
    }
    async deleteAllSessions() {
        return await BLL.user.session.deleteManyModels({
            query: {
                userId: this._id,
            },
        });
    }
    async delete(hard) {
        await this.deleteAllSessions();
        if (hard) {
            await this.deleteModel();
            // Delete related database models, if need be
        }
        else {
            await this.update({
                $set: {
                    active: false,
                },
            });
        }
    }
}
