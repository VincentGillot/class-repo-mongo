import mongoose from "mongoose";
import { BLL, BLLOptions } from "./bll/BLL";
import { MongoDB } from "./dal/mongodb/MongoDB";

interface Constructable<T> {
  new (...args: any): T;
}

export interface APIOptions<BLLType> {
  customBLL: Constructable<BLLType>;
  BLLOptions?: BLLOptions;
}

export type MainBLLType<BLLType> = BLLType & BLL;

export class API<BLLType> {
  private mongoDB: MongoDB;
  bll: MainBLLType<BLLType>;

  constructor(
    conn: mongoose.Connection,
    options?: APIOptions<MainBLLType<BLLType>>
  ) {
    this.mongoDB = new MongoDB(conn);
    if (options?.customBLL) {
      this.bll = new options.customBLL(conn, options?.BLLOptions);
    } else {
      this.bll = new BLL(conn, options?.BLLOptions) as MainBLLType<BLLType>;
    }
  }

  async init() {
    await this.mongoDB.init();
  }
}
