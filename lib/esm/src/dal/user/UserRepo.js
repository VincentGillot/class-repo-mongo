import { UserModel } from "./model";
import { MainRepository } from "../mongodb/MainRepository";
import { User } from "./User";
import { SessionRepo } from "../session/SessionRepo";
import { BLL } from "../../bll/BLL";
export class UserRepo extends MainRepository {
    session = new SessionRepo();
    constructor() {
        super(UserModel);
    }
    /**
     *
     * @param options Object: {query}
     * @returns __User__ Class Instance
     */
    async get({ query }) {
        const user = await this.findOne({ query });
        if (!user) {
            return null;
        }
        return new User(user);
    }
    async getAll({ query, sort, }) {
        const users = await this.findMany({
            query,
            sort,
        });
        return [...users.map((user) => new User(user))];
    }
    async register({ email, plainPassword, }) {
        const validPass = BLL.password.isValidPassword(plainPassword);
        if (process.env.NODE_ENV === "production" && !validPass) {
            throw new Error("invalid_password");
        }
        const user = await this.create({
            email,
            password: plainPassword,
            active: true,
            validated: false,
        });
        if (user) {
            user.triggerValidateEmail();
        }
        return user;
    }
    async create(userData) {
        userData.password = await BLL.password.hashPlainPassword(userData.password);
        const document = await this.createDocument(userData);
        return new User(document);
    }
    async authenticate({ email, password, sessionData, masteradmin = false, }) {
        const user = await this.get({
            query: {
                email,
                active: true,
                validated: true,
                masteradmin: masteradmin,
            },
        });
        if (!user) {
            throw new Error("unauthorized");
        }
        const validPass = await BLL.password.isSamePassword(password, user.password);
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
    async authenticateWith2FA({ code, token2FA, sessionData, }) {
        const user = await BLL.user.get({
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
