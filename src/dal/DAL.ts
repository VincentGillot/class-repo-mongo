import mongoose, { Schema } from "mongoose";

export class DAL {
  private conn: mongoose.Connection;

  constructor(conn: mongoose.Connection) {
    this.conn = conn;
  }

  /**
   * Creates and returns models using name and schema.
   * Uses the connection given during instantiation.
   * Accepts 2 Generics:
   * @template U Schema object type
   * @template V Model object type
   *
   * This method is used to give the BLL the correct models created on the correct connection
   *
   */
  protected modelFactory<U, V>(modelName: string, modelSchema: Schema<U, V>) {
    const { conn } = this;
    return conn.model<U, V>(modelName, modelSchema);
  }
}
