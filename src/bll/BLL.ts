import { SessionRepo } from "../repository/session/SessionRepo";
import { UserRepo } from "../repository/user/UserRepo";
import { Password } from "./Password";
import { JWT } from "./JWT";
import { Mailer } from "./Mailer";

export class BLL {
  static user = new UserRepo();
  static session = new SessionRepo();

  static password = Password;
  static jwt = JWT;
  static mailer = new Mailer();
}
