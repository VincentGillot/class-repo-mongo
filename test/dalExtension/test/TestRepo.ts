import { FilterQuery } from "mongoose";
import { ITest, ITestSchema } from "./type";
import { TestModel } from "./model";
import { Test } from "./Test";
import { MainRepository } from "class-repo-mongo";

export class TestRepo extends MainRepository<ITest, ITestSchema> {
  public session = new TestRepo();

  constructor() {
    super(TestModel);
  }

  /**
   *
   * @param options Object: {query}
   * @returns __User__ Class Instance
   */
  public async get({ query }: { query: FilterQuery<ITestSchema> }) {
    const document = await this.findOne({ query });
    if (!document) {
      return null;
    }
    return new Test(document);
  }

  public async getAll({
    query,
    sort,
  }: {
    query: FilterQuery<ITestSchema>;
    sort?: any;
  }) {
    const documents = await this.findMany({
      query,
      sort,
    });
    return [...documents.map((user) => new Test(user))];
  }

  public async create(docData: ITest) {
    const document = await this.createDocument(docData);
    return new Test(document);
  }
}
