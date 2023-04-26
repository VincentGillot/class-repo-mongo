import mongoose from "mongoose";
import { BLL, BLLOptions } from "./bll/BLL";
import { MongoDB } from "./dal/mongodb/MongoDB";

interface Constructable<T> {
  new (...args: any): T;
}

export interface APIOptions<BLLType> {
  BLL: Constructable<BLLType>;
  BLLOptions?: BLLOptions;
}

export class API<BLLType = BLL> {
  private mongoDB: MongoDB;
  bll: BLLType;

  constructor(conn: mongoose.Connection, options?: APIOptions<BLLType>) {
    this.mongoDB = new MongoDB(conn);
    if (options?.BLL) {
      this.bll = new options.BLL(conn, options?.BLLOptions);
    } else {
      this.bll = new BLL(conn, options?.BLLOptions) as BLLType;
    }
  }

  async init() {
    await this.mongoDB.init();
  }
}
