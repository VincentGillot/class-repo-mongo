import { FilterQuery } from "mongoose";
import { FindManyArgument } from "../../dal/mongodb/interfaces/MainRepositoryTypes";
import { MainRepository } from "../../dal/mongodb/MainRepository";
import { Session } from "../../collections/session/Session";
import { ISession, ISessionSchema, SessionModelType } from "./type";
import { MainBLLType } from "../../API";

/**
 * Executes Mongo DB operations
 * Works with document classes
 */
export class SessionRepo<BLLType> extends MainRepository<
  ISession,
  ISessionSchema
> {
  private bll: MainBLLType<BLLType>;

  constructor(model: SessionModelType, bll: MainBLLType<BLLType>) {
    super(model);
    this.bll = bll;
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
    return new Session(model, this.bll);
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

    return [...models.map((model) => new Session(model, this.bll))];
  }

  public async create(session: Omit<ISession, "active">) {
    const createdSession = await this.createDocument({
      ...session,
      active: true,
    });
    return new Session(createdSession, this.bll);
  }
}
