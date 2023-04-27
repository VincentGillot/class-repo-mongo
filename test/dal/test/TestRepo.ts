import mongoose, { FilterQuery } from "mongoose";
import { ITest, ITestSchema, TestModelType } from "./type";
import { Test } from "../../bll/test/Test";
import { MainBLLType, MainRepository } from "class-repo-mongo";

export class TestRepo<BLLType> extends MainRepository<ITest, ITestSchema> {
  private bll: MainBLLType<BLLType>;

  constructor(model: TestModelType, bll: MainBLLType<BLLType>) {
    super(model);
    this.bll = bll;
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
    return new Test(document, this.bll);
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
    return [...documents.map((document) => new Test(document, this.bll))];
  }

  public async create(docData: ITest) {
    const document = await this.createDocument(docData);
    return new Test(document, this.bll);
  }
}
