import { Mongoose } from "mongoose";

export class MongoDB {
  mongoose: Mongoose;
  connectionString: string;

  constructor(mongoose: Mongoose, connectionString: string) {
    this.mongoose = mongoose;
    this.connectionString = connectionString;
  }

  init(): Promise<void> {
    console.log("MongoDB: initializing mongo connection...");
    const { mongoose, connectionString } = this;

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
