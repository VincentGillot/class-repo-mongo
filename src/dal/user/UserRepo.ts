import mongoose, { FilterQuery } from "mongoose";
import { IUser, IUserSchema, UserModelType } from "./type";
import { MainRepository } from "../mongodb/MainRepository";
import { User } from "../../bll/user/User";

/**
 * Executes Mongo DB operations
 * Works with document classes
 */
export class UserRepo extends MainRepository<IUser, IUserSchema> {
  private conn: mongoose.Connection;

  constructor(model: UserModelType, conn: mongoose.Connection) {
    super(model);
    this.conn = conn;
  }

  /**
   *
   * @param options Object: {query}
   * @returns __User__ Class Instance
   */
  public async get({ query }: { query: FilterQuery<IUserSchema> }) {
    const document = await this.findOne({ query });
    if (!document) {
      return null;
    }
    return new User(document, this.conn);
  }

  public async getAll({
    query,
    sort,
  }: {
    query: FilterQuery<IUserSchema>;
    sort?: any;
  }) {
    const documents = await this.findMany({
      query,
      sort,
    });
    return [...documents.map((document) => new User(document, this.conn))];
  }

  /**
   * With Unhashed Password
   */
  public async create(userData: IUser) {
    // userData.password = await BLL.password.hashPlainPassword(userData.password);
    const document = await this.createDocument(userData);
    return new User(document, this.conn);
  }
}
