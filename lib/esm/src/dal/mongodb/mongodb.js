import * as mongoose from "mongoose";
export class MongoDB {
    db;
    connectionString;
    constructor(connectionString) {
        this.db = {};
        this.connectionString = connectionString;
    }
    init() {
        const db = mongoose.connection;
        const { connectionString } = this;
        return new Promise((resolve, reject) => {
            mongoose.connect(connectionString);
            db.on("error", (err) => {
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
