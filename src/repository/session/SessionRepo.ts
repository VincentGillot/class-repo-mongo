import { FilterQuery } from "mongoose";
import { FindManyArgument } from "../mongodb/interfaces/MainRepositoryTypes";
import { MainRepository } from "../mongodb/MainRepository";
import { SessionModel } from "./model";
import { Session } from "./Session";
import { ISession, ISessionSchema } from "./type";

export class SessionRepo extends MainRepository<ISession, ISessionSchema> {
  constructor() {
    super(SessionModel);
  }

  public async get({
    query,
  }: {
    query: FilterQuery<ISession & { _id: string }>;
  }) {
    const model = await this.findOne({ query });
    if (!model) {
      return null;
    }
    return new Session(model);
  }

  public async getAll({
    query,
    sort,
    populate = [],
    size,
  }: FindManyArgument<ISession>) {
    const models = await this.findMany({
      query,
      sort,
      populate,
      size,
    });

    return [...models.map(model => new Session(model))];
  }

  public async create(session: Omit<ISession, "active">) {
    const createdSession = await this.createDocument({
      ...session,
      active: true,
    });
    return new Session(createdSession);
  }
}
