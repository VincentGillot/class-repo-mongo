import * as mongoose from "mongoose";

export class MongoDB {
  db: Record<string, unknown>;
  connectionString: string;

  constructor() {
    this.db = {};
    this.connectionString = `mongodb://`;
  }

  init(): Promise<any> {
    const db = mongoose.connection;
    const { connectionString } = this;

    return new Promise((resolve: any, reject) => {
      mongoose.connect(connectionString);
      db.on("error", (err: any) => {
        console.error(`MongoDB: connection error on ${connectionString}`, err);
        reject();
      });
      db.once("open", () => {
        console.log(`MongoDB: connected at ${connectionString}`);
        resolve();
      });
    });
  }
}
