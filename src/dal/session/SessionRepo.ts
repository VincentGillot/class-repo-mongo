import mongoose, { FilterQuery } from "mongoose";
import { FindManyArgument } from "../mongodb/interfaces/MainRepositoryTypes";
import { MainRepository } from "../mongodb/MainRepository";
import { Session } from "../../bll/session/Session";
import { ISession, ISessionSchema, SessionModelType } from "./type";

/**
 * Executes Mongo DB operations
 * Works with document classes
 */
export class SessionRepo extends MainRepository<ISession, ISessionSchema> {
  private conn: mongoose.Connection;

  constructor(model: SessionModelType, conn: mongoose.Connection) {
    super(model);
    this.conn = conn;
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
    return new Session(model, this.conn);
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

    return [...models.map((model) => new Session(model, this.conn))];
  }

  public async create(session: Omit<ISession, "active">) {
    const createdSession = await this.createDocument({
      ...session,
      active: true,
    });
    return new Session(createdSession, this.conn);
  }
}
