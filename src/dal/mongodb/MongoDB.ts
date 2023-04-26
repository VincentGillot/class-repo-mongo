import mongoose, { Schema } from "mongoose";

/**
 * TODO
 */
export class MongoDB {
  conn: mongoose.Connection;

  constructor(conn: mongoose.Connection) {
    this.conn = conn;
  }

  init(): Promise<void> {
    console.log("MongoDB: initializing mongo connection...");
    const { conn } = this;

    return new Promise((resolve, reject) => {
      conn.on("error", (err: any) => {
        console.error(`MongoDB: connection error on ${conn.host}`, err);
        reject();
      });
      conn.once("open", () => {
        console.log(`MongoDB: connected at ${conn.host}`);
        resolve();
      });
    });
  }
}
