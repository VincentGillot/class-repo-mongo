import { FilterQuery } from "mongoose";
import { IUser, IUserSchema, UserModelType } from "./type";
import { MainRepository } from "../../dal/mongodb/MainRepository";
import { User } from "../../collections/user/User";
import { MainBLLType } from "../../API";

/**
 * Executes Mongo DB operations
 * Works with document classes
 */
export class UserRepo<BLLType> extends MainRepository<IUser, IUserSchema> {
  private bll: MainBLLType<BLLType>;

  constructor(model: UserModelType, bll: MainBLLType<BLLType>) {
    super(model);
    this.bll = bll;
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
    return new User(document, this.bll);
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
    return [...documents.map((document) => new User(document, this.bll))];
  }

  /**
   * With Unhashed Password
   */
  public async create(userData: IUser) {
    // userData.password = await BLL.password.hashPlainPassword(userData.password);
    const document = await this.createDocument(userData);
    return new User(document, this.bll);
  }
}
