import mongoose, { FilterQuery } from "mongoose";
import { ITest, ITestSchema, TestModelType } from "./type";
import { Test } from "../../bll/test/Test";
import { MainRepository } from "class-repo-mongo";

export class TestRepo extends MainRepository<ITest, ITestSchema> {
  private conn: mongoose.Connection;

  constructor(model: TestModelType, conn: mongoose.Connection) {
    super(model);
    this.conn = conn;
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
    return new Test(document, this.conn);
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
    return [...documents.map((document) => new Test(document, this.conn))];
  }

  public async create(docData: ITest) {
    const document = await this.createDocument(docData);
    return new Test(document, this.conn);
  }
}
