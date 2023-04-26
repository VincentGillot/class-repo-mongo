import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./user/schema";
import { IUserSchema, UserModelType } from "./user/type";
import { UserRepo } from "./user/UserRepo";
import { SessionRepo } from "./session/SessionRepo";
import { ISessionSchema, SessionModelType } from "./session/type";
import { SessionSchema } from "./session/schema";
import { UserBLL } from "../bll/user/UserBLL";
import { SessionBLL } from "../bll/session/SessionBLL";

export class DAL {
  private conn: mongoose.Connection;
  protected userBLL: UserBLL;
  protected userRepo: UserRepo;
  protected sessionBLL: SessionBLL;
  protected sessionRepo: SessionRepo;

  constructor(conn: mongoose.Connection) {
    this.conn = conn;

    // User
    const userModel = this.modelFactory<IUserSchema, UserModelType>(
      "User",
      UserSchema
    );
    this.userBLL = new UserBLL(userModel, conn);
    this.userRepo = new UserRepo(userModel, conn);

    // Session
    const sessionModel = this.modelFactory<ISessionSchema, SessionModelType>(
      "Session",
      SessionSchema
    );
    this.sessionBLL = new SessionBLL(sessionModel, conn);
    this.sessionRepo = new SessionRepo(sessionModel, conn);
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
