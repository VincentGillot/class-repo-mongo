import { MainRepository } from "../mongodb/MainRepository";
import { SessionModel } from "./model";
import { Session } from "./Session";
export class SessionRepo extends MainRepository {
    constructor() {
        super(SessionModel);
    }
    async get({ query, }) {
        const model = await this.findOne({ query });
        if (!model) {
            return null;
        }
        return new Session(model);
    }
    async getAll({ query, sort, populate = [], size, }) {
        const models = await this.findMany({
            query,
            sort,
            populate,
            size,
        });
        return [...models.map(model => new Session(model))];
    }
    async create(session) {
        const createdSession = await this.createDocument({
            ...session,
            active: true,
        });
        return new Session(createdSession);
    }
}
