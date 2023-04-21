import mongoose from "mongoose";

/**
 * TODO
 */
export class MongoDB {
  mongoose = mongoose;
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  init(): Promise<void> {
    console.log("MongoDB: initializing mongo connection...");
    const { connectionString } = this;

    return new Promise((resolve, reject) => {
      const db = mongoose.connection;
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
